export class VectorBase {
  protected array: number[] = [];

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args);
  }

  clone() {
    return new VectorBase(...this.array);
  }

  get dimension() {
    return 1;
  }

  get size() {
    return Math.hypot(...this.array);
  }

  get 0() {
    return this.array[0];
  }

  set 0(n: number) {
    this.array[0] = n;
  }

  get x() {
    return this[0];
  }

  set x(n: number) {
    this[0] = n;
  }

  [Symbol.iterator]() {
    return this.array[Symbol.iterator]();
  }

  equal(v: typeof this) {
    return this.array.every((n, i) => n === v.array[i]);
  }

  add(v: typeof this) {
    for (let i = 0; i < this.dimension; i++) {
      this.array[i] += v.array[i];
    }
    return this;
  }

  substract(v: typeof this) {
    for (let i = 0; i < this.dimension; i++) {
      this.array[i] -= v.array[i];
    }
    return this;
  }

  scale(n: number) {
    for (let i = 0; i < this.dimension; i++) {
      this.array[i] *= n;
    }
    return this;
  }

  normalize() {
    if (this.size === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return this.scale(1 / this.size);
  }

  dot(v: typeof this) {
    return this.array.reduce((acc, n, i) => acc + n * v.array[i], 0);
  }
}

export function set<T extends VectorBase>(
  this: T,
  ...args: (number | number[] | VectorBase | undefined)[]
) {
  const elements = [];
  for (const arg of args) {
    if (typeof arg === 'number') {
      elements.push(arg);
    } else if (arg instanceof VectorBase || Array.isArray(arg)) {
      elements.push(...arg);
    } else {
      elements.push(0);
    }
  }
  const array = [];
  for (let i = 0; i < this.dimension; i++) {
    array[i] = Number.isFinite(elements[i]) ? elements[i] : 0;
  }
  this.array = array;
  return this;
}
