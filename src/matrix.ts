import { VectorBase } from './vector-base';
import { PRECISION } from './constant';

export abstract class MatrixBase<V extends VectorBase = VectorBase> {
  protected _array: V[] = [];

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  abstract get dimension(): number;

  [index: number]: V;

  get 0() {
    return this._array[0];
  }

  set 0(v: V) {
    this._array[0] = v;
  }

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]();
  }

  protected abstract _vec(...args: ConstructorParameters<typeof VectorBase>): V;

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args) as this;
  }

  clone() {
    const prototype = Object.getPrototypeOf(this);
    const Ctor = prototype.constructor;
    return new Ctor(...this._array) as this;
  }

  equals(m: this, precision = PRECISION[0]) {
    return (
      this.dimension === m.dimension &&
      this._array.every((v, i) => v.equals(m._array[i], precision))
    );
  }

  /**
   * Calling `A.multiply(B)` represents the matrix multiplication B * A.
   */
  multiply(m: this, target: this = this) {
    const nums = [];
    for (let i = 0; i < target.dimension; i++) {
      const v = target[i].clone().transform(m);
      nums.push(...v);
    }
    return target.set(nums);
  }

  transpose(target: this = this) {
    const array: number[] = [];
    for (let i = 0; i < target.dimension; i++) {
      for (let j = 0; j < target.dimension; j++) {
        array[i * target.dimension + j] = target[j][i];
      }
    }
    return target.set(array);
  }

  identity() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this._array[i][j] = i === j ? 1 : 0;
      }
    }
  }

  abstract determinant(): number;

  toArray() {
    return this.toColMajorArray();
  }

  toColMajorArray() {
    return this._array.map((v) => v.toArray()).flat();
  }

  toRowMajorArray() {
    return this.clone().transpose().toColMajorArray();
  }
}

function set<V extends VectorBase, M extends MatrixBase<V>>(
  this: M,
  ...args: (number | V | number[])[]
) {
  let nums: number[] = [];
  if (Array.isArray(args[0])) {
    nums = args.flat() as number[];
  } else if (typeof args[0] === 'number') {
    nums = args as number[];
  } else if (args[0] instanceof VectorBase) {
    nums = (args as V[]).map((v) => [...v]).flat();
  }
  this._array = [];
  for (let i = 0; i < this.dimension; i++) {
    this._array[i] = this._vec(
      nums.slice(i * this.dimension, (i + 1) * this.dimension),
    );
  }
  return this;
}
