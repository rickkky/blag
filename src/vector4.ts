import { createVectorPrototype, VectorArgs } from './vector-prototype';
import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector4Base } from './vector4-base';
import { Matrix4 } from './matrix4';

const prototype = createVectorPrototype<Vector4, Matrix4>(() => new Vector4());

export class Vector4 extends Vector4Base {
  constructor();
  constructor(x: number, y: number, z: number, w: number);
  constructor(nums: number[]);
  constructor(v: Vector4);
  constructor(xyz: Vector3, w: number);
  constructor(x: number, yzw: Vector3);
  constructor(xy: Vector2, zw: Vector2);
  constructor(xy: Vector2, z: number, w: number);
  constructor(x: number, yz: Vector2, w: number);
  constructor(x: number, y: number, zw: Vector2);
  constructor(...args: VectorArgs);
  constructor(...args: VectorArgs) {
    super();
    prototype.set(this, ...args);
  }

  get dimension(): 4 {
    return 4;
  }

  set(): Vector4;
  set(x: number, y: number, z: number, w: number): Vector4;
  set(nums: number[]): Vector4;
  set(v: Vector4): Vector4;
  set(xyz: Vector3, w: number): Vector4;
  set(x: number, yzw: Vector3): Vector4;
  set(xy: Vector2, zw: Vector2): Vector4;
  set(xy: Vector2, z: number, w: number): Vector4;
  set(x: number, yz: Vector2, w: number): Vector4;
  set(x: number, y: number, zw: Vector2): Vector4;
  set(...args: VectorArgs): Vector4;
  set(...args: VectorArgs) {
    return prototype.set(this, ...args);
  }

  clone(target: Vector4): Vector4 {
    return prototype.clone(this, target);
  }

  equals(v: Vector4, precision?: number): boolean {
    return prototype.equals(this, v, precision);
  }

  add(v: Vector4, target: Vector4 = this): Vector4 {
    return prototype.add(this, v, target);
  }

  subtract(v: Vector4, target: Vector4 = this): Vector4 {
    return prototype.subtract(this, v, target);
  }

  scale(n: number, target: Vector4 = this): Vector4 {
    return prototype.scale(this, n, target);
  }

  normalize(target: Vector4 = this): Vector4 {
    return prototype.normalize(this, target);
  }

  transform(m: Matrix4, target: Vector4 = this): Vector4 {
    return prototype.transform(this, m, target);
  }

  dot(v: Vector4): number {
    return prototype.dot(this, v);
  }

  zero(): Vector4 {
    return prototype.zero(this);
  }

  toArray(): number[] {
    return prototype.toArray(this);
  }
}

export interface CreateVector4 {
  (): Vector4;
  (x: number, y: number, z: number, w: number): Vector4;
  (nums: number[]): Vector4;
  (v: Vector4): Vector4;
  (xyz: Vector3, w: number): Vector4;
  (x: number, yzw: Vector3): Vector4;
  (xy: Vector2, zw: Vector2): Vector4;
  (xy: Vector2, z: number, w: number): Vector4;
  (x: number, yz: Vector2, w: number): Vector4;
  (x: number, y: number, zw: Vector2): Vector4;
  (...args: VectorArgs): Vector4;
}

const createVector4: CreateVector4 = (...args: VectorArgs) => {
  return new Vector4(...args);
};

export const vec4 = Object.assign(createVector4, prototype);
