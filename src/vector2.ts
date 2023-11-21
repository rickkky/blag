import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { createVectorPrototype, VectorArgs } from './vector-prototype';
import { Vector2Base } from './vector2-base';

const prototype = createVectorPrototype<Vector2, Matrix2 | Matrix3>(
  () => new Vector2(),
);

export class Vector2 extends Vector2Base {
  constructor();
  constructor(x: number, y: number);
  constructor(nums: number[]);
  constructor(v: Vector2);
  constructor(...args: VectorArgs);
  constructor(...args: VectorArgs) {
    super();
    prototype.set(this, ...args);
  }

  get dimension(): 2 {
    return 2;
  }

  set(): Vector2;
  set(x: number, y: number): Vector2;
  set(nums: number[]): Vector2;
  set(v: Vector2): Vector2;
  set(...args: VectorArgs): Vector2;
  set(...args: VectorArgs): Vector2 {
    return prototype.set(this, ...args);
  }

  clone(target: Vector2): Vector2 {
    return prototype.clone(this, target);
  }

  equals(v: Vector2, precision?: number): boolean {
    return prototype.equals(this, v, precision);
  }

  add(v: Vector2, target: Vector2 = this): Vector2 {
    return prototype.add(this, v, target);
  }

  subtract(v: Vector2, target: Vector2 = this): Vector2 {
    return prototype.subtract(this, v, target);
  }

  scale(n: number, target: Vector2 = this): Vector2 {
    return prototype.scale(this, n, target);
  }

  normalize(target: Vector2 = this): Vector2 {
    return prototype.normalize(this, target);
  }

  transform(m: Matrix2 | Matrix3, target: Vector2 = this): Vector2 {
    return prototype.transform(this, m, target);
  }

  dot(v: Vector2): number {
    return prototype.dot(this, v);
  }

  zero(): Vector2 {
    return prototype.zero(this);
  }

  toArray(): number[] {
    return prototype.toArray(this);
  }
}

export interface CreateVector2 {
  (): Vector2;
  (x: number, y: number): Vector2;
  (nums: number[]): Vector2;
  (v: Vector2): Vector2;
  (...args: VectorArgs): Vector2;
}

const createVector2: CreateVector2 = (...args: VectorArgs) => {
  return new Vector2(...args);
};

export const vec2 = Object.assign(createVector2, prototype);
