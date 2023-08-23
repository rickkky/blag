import { VectorBase } from './vector';

export abstract class MatrixBase<V extends VectorBase> {
  protected array: V[] = [];

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  get dimension(): number {
    return 1;
  }

  [index: number]: V;

  get 0() {
    return this.array[0];
  }

  set 0(v: V) {
    this.array[0] = v;
  }

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]();
  }

  protected abstract vec(...args: ConstructorParameters<typeof VectorBase>): V;

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args) as this;
  }

  clone() {
    const prototype = Object.getPrototypeOf(this);
    const Constructor = prototype.constructor;
    return new Constructor(...this.array) as this;
  }

  toArray() {
    return this.array.map((v) => v.toArray()).flat();
  }

  equal(m: this) {
    return (
      this.dimension === m.dimension &&
      this.array.every((v, i) => v.equal(m.array[i]))
    );
  }

  /**
   * `A.multiply(B)` means matrix multiplication B * A, not A * B.
   */
  multiply(m: this) {
    const nums = [];
    for (let i = 0; i < this.dimension; i++) {
      const v = this[i].clone().transform(m);
      nums.push(...v);
    }
    return this.set(nums);
  }

  transpose() {
    const array: number[] = new Array(this.dimension ** 2).fill(0);
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        array[i * this.dimension + j] = this.array[j][i];
      }
    }
    return this.set(array);
  }

  identity() {
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        this.array[i][j] = i === j ? 1 : 0;
      }
    }
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
  this.array = [];
  for (let i = 0; i < this.dimension; i++) {
    this.array[i] = this.vec(
      nums.slice(i * this.dimension, (i + 1) * this.dimension),
    );
  }
  return this;
}
