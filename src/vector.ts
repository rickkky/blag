import { MatrixBase } from './matrix';
import { PRECISION } from './constant';

export abstract class VectorBase {
  protected _array: number[] = [];

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  abstract get dimension(): number;

  get size() {
    return Math.hypot(...this._array);
  }

  [index: number]: number;

  get 0() {
    return this._array[0];
  }

  set 0(n: number) {
    this._array[0] = n;
  }

  get x() {
    return this[0];
  }

  set x(n: number) {
    this[0] = n;
  }

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args) as this;
  }

  clone() {
    const proto = Object.getPrototypeOf(this);
    const Ctor = proto.constructor;
    return new Ctor(this._array) as this;
  }

  equals(v: this, precision = PRECISION[0]) {
    return (
      this.dimension === v.dimension &&
      this._array.every((n, i) => Math.abs(n - v[i]) <= precision)
    );
  }

  add(v: this, target: this = this) {
    for (let i = 0; i < target.dimension; i++) {
      target[i] += v[i];
    }
    return target;
  }

  substract(v: this, target: this = this) {
    for (let i = 0; i < target.dimension; i++) {
      target[i] -= v[i];
    }
    return target;
  }

  scale(n: number, target: this = this) {
    for (let i = 0; i < target.dimension; i++) {
      target[i] *= n;
    }
    return target;
  }

  transform(m: MatrixBase, target: this = this) {
    return transform.call(target, m);
  }

  normalize(target: this = this) {
    if (this.size === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return target.scale(1 / target.size);
  }

  zero() {
    return this.set();
  }

  dot(v: this) {
    return this._array.reduce((acc, n, i) => acc + n * v[i], 0);
  }

  toArray() {
    return [...this._array];
  }
}

function set<V extends VectorBase>(
  this: V,
  ...args: (number | number[] | VectorBase | undefined)[]
) {
  const list = [];
  for (const arg of args) {
    if (typeof arg === 'number') {
      list.push(arg);
    } else if (arg instanceof VectorBase || Array.isArray(arg)) {
      list.push(...arg);
    } else {
      list.push(0);
    }
  }
  const array = [];
  for (let i = 0; i < this.dimension; i++) {
    array[i] = Number.isFinite(list[i]) ? list[i] : 0;
  }
  this._array = array;
  return this;
}

function transform<V extends VectorBase, M extends MatrixBase<VectorBase>>(
  this: V,
  m: M,
) {
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
  this._array = array;
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

    equals(v1: V, v2: V, precision?: number) {
      return v1.equals(v2, precision);
    },

    add(v1: V, v2: V) {
      return v1.clone().add(v2);
    },

    substract(v1: V, v2: V) {
      return v1.clone().substract(v2);
    },

    scale(v: V, n: number) {
      return v.clone().scale(n);
    },

    transform(v: V, m: TM) {
      return v.clone().transform(m);
    },

    normalize(v: V) {
      return v.clone().normalize();
    },

    zero() {
      return new Ctor();
    },

    dot(v1: V, v2: V) {
      return v1.dot(v2);
    },
  };
}
