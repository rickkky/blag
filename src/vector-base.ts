import { PRECISION } from './constant';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';

export type VectorArgs = (number | Iterable<number>)[];

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

  [Symbol.iterator]() {
    return this._array[Symbol.iterator]();
  }

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args) as this;
  }

  clone(target: this = new (Object.getPrototypeOf(this).constructor)()) {
    return target.set(this);
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

  normalize(target: this = this) {
    if (this.size === 0) {
      throw new Error('Cannot normalize a zero vector');
    }
    return target.scale(1 / target.size);
  }

  transform(m: any, target: this = this) {
    return transform.call(target, m) as this;
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

function set<V extends VectorBase>(this: V, ...args: VectorArgs) {
  const nums: number[] = [];
  out: for (const arg of args) {
    if (Number.isFinite(arg)) {
      nums.push(arg as number);
    } else if (
      arg &&
      typeof arg === 'object' &&
      typeof arg[Symbol.iterator] === 'function'
    ) {
      for (const n of arg) {
        nums.push(Number.isFinite(n) ? n : 0);
        if (nums.length >= this.dimension) {
          break out;
        }
      }
    } else {
      nums.push(0);
    }
    if (nums.length >= this.dimension) {
      break;
    }
  }
  if (nums.length < this.dimension) {
    for (let i = nums.length; i < this.dimension; i++) {
      nums.push(0);
    }
  }
  this._array = nums;
  return this;
}

function transform<V extends VectorBase>(
  this: V,
  m: Matrix2 | Matrix3 | Matrix4,
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
