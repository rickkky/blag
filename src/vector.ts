import { MatrixBase } from './matrix';

export abstract class VectorBase {
  protected array: number[] = [];

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  abstract get dimension(): number;

  get size() {
    return Math.hypot(...this.array);
  }

  [index: number]: number;

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

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args) as this;
  }

  clone() {
    const proto = Object.getPrototypeOf(this);
    const Ctor = proto.constructor;
    return new Ctor(this.array) as this;
  }

  toArray() {
    return [...this.array];
  }

  equal(v: typeof this) {
    return (
      this.dimension === v.dimension &&
      this.array.every((n, i) => n === v.array[i])
    );
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
    return this.array.reduce((acc, n, i) => acc + n * v[i], 0);
  }

  transform(m: MatrixBase<VectorBase>) {
    return transform.call(this, m) as this;
  }

  zero() {
    return this.set();
  }
}

function set<V extends VectorBase>(
  this: V,
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

export function transform<
  V extends VectorBase,
  M extends MatrixBase<VectorBase>,
>(this: V, m: M) {
  const v = [...this];
  let homogenous = false;
  if (this.dimension === m.dimension - 1) {
    v.push(1);
    homogenous = true;
  }
  if (v.length !== m.dimension) {
    throw new Error('Matrix dimension does not match the vector');
  }
  const array = [];
  for (let i = 0; i < v.length; i++) {
    array[i] = 0;
    for (let j = 0; j < m.dimension; j++) {
      array[i] += v[j] * m[j][i];
    }
  }
  if (homogenous) {
    const w = array.pop()!;
    for (let i = 0; i < array.length; i++) {
      array[i] /= w;
    }
  }
  this.array = array;
  return this;
}

export function createVectorStatics<
  V extends VectorBase,
  TM extends MatrixBase<VectorBase>,
>(Ctor: new () => V) {
  return {
    clone(v: V) {
      return v.clone();
    },

    equal(v0: V, v1: V) {
      return v0.equal(v1);
    },

    add(v0: V, v1: V) {
      return v0.clone().add(v1);
    },

    substract(v0: V, v1: V) {
      return v0.clone().substract(v1);
    },

    scale(v: V, n: number) {
      return v.clone().scale(n);
    },

    normalize(v: V) {
      return v.clone().normalize();
    },

    dot(v0: V, v1: V) {
      return v0.dot(v1);
    },

    transform(v: V, m: TM) {
      return v.clone().transform(m);
    },

    zero() {
      return new Ctor();
    },
  };
}
