import { VectorArgs, VectorBase } from './vector-base';
import { PRECISION } from './constant';

export type MatrixArgs = number[] | Iterable<number>[] | Iterable<VectorBase>[];

export abstract class MatrixBase<V extends VectorBase = VectorBase> {
  protected _array: V[] = [];

  constructor(...args: MatrixArgs) {
    set.apply(this, args);
  }

  abstract get dimension(): number;

  [index: number]: V;

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]();
  }

  protected abstract _vec(...args: VectorArgs): V;

  set(...args: MatrixArgs) {
    return set.apply(this, args) as this;
  }

  clone(target: this = new (Object.getPrototypeOf(this).constructor)()) {
    return target.set(this);
  }

  equals(m: this, precision = PRECISION[0]) {
    return (
      this.dimension === m.dimension &&
      this._array.every((v, i) => v.equals(m._array[i], precision))
    );
  }

  abstract determinant(): number;

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
  ...args: MatrixArgs
) {
  const list: V[] = [];
  for (let i = 0; i < this.dimension; i++) {
    list.push(this._vec());
  }
  if (
    args.length === 1 &&
    args[0] &&
    typeof args[0] === 'object' &&
    typeof args[0][Symbol.iterator] === 'function'
  ) {
    args = [...args[0]] as number[] | Iterable<number>[];
  }
  if (typeof args[0] === 'number') {
    out: for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        const index = i * this.dimension + j;
        if (index >= args.length) {
          break out;
        }
        const num = args[index] as number;
        list[i][j] = Number.isFinite(num) ? num : 0;
      }
    }
  } else if (
    args[0] &&
    typeof args[0] === 'object' &&
    typeof args[0][Symbol.iterator] === 'function'
  ) {
    for (let i = 0; i < this.dimension; i++) {
      if (i >= args.length) {
        break;
      }
      list[i].set(args[i] as Iterable<number>);
    }
  }
  this._array = list;
  return this;
}
