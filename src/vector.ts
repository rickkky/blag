export class Vector {
  protected array: number[] = [];

  constructor(x?: number);
  constructor(...args: Parameters<typeof set>) {
    set.call(this, ...args);
  }

  set(x?: number): void;
  set(...args: Parameters<typeof set>): void {
    set.call(this, ...args);
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

  clone() {
    return new Vector(...this.array);
  }

  equal(v: typeof this) {
    return this.array.every((n, i) => n === v.array[i]);
  }

  add(v: typeof this) {
    for (const i of this.array.keys()) {
      this.array[i] += v.array[i];
    }
    return this;
  }

  substract(v: typeof this) {
    for (const i of this.array.keys()) {
      this.array[i] -= v.array[i];
    }
    return this;
  }

  scale(n: number) {
    for (const i of this.array.keys()) {
      this.array[i] *= n;
    }
    return this;
  }

  normalize() {
    const size = this.size;
    if (size === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return this.scale(1 / size);
  }

  dot(v: typeof this) {
    return this.array.reduce((acc, n, i) => acc + n * v.array[i], 0);
  }
}

export function set(
  this: Vector,
  ...args: (number | number[] | Vector | undefined)[]
) {
  const elements = [];
  for (const arg of args) {
    if (typeof arg === 'number') {
      elements.push(arg);
    } else if (arg instanceof Vector) {
      elements.push(...arg);
    } else if (Array.isArray(arg)) {
      elements.push(...arg);
    } else {
      elements.push(0);
    }
  }
  const array = [];
  for (let i = 0; i < this.dimension; i++) {
    array[i] = elements[i] || 0;
  }
  this.array = array;
}
