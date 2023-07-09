import { VectorBase } from './vector';

export class MatrixBase<T extends VectorBase = VectorBase> {
  protected array: T[] = [];

  protected Vector = VectorBase;

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  get dimension() {
    return 0;
  }

  [i: number]: T;

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]();
  }

  set(...args: Parameters<typeof set>) {
    set.apply(this, args);
    return this;
  }

  clone() {
    const prototype = Object.getPrototypeOf(this);
    const Constructor = prototype.constructor;
    return new Constructor(...this.array) as typeof this;
  }

  toArray() {
    return this.array.map((v) => v.toArray()).flat();
  }

  equal(m: typeof this) {
    return (
      this.dimension === m.dimension &&
      this.array.every((v, i) => v.equal(m.array[i]))
    );
  }

  multiply(m: typeof this) {
    const array: number[] = new Array(this.dimension ** 2).fill(0);
    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < m.dimension; j++) {
        // TODO
      }
    }
    return this.set(array);
  }
}

export function set<M extends MatrixBase>(
  this: M,
  ...args: (number | number[])[]
) {
  let nums: number[] = [];
  if (Array.isArray(args[0])) {
    nums = args[0];
  } else {
    nums = args as number[];
  }
  const array = [];
  for (let i = 0; i < this.dimension; i++) {
    array[i] = new this.Vector(
      nums.slice(i * this.dimension, (i + 1) * this.dimension),
    );
  }
  this.array = array;
  return this;
}
