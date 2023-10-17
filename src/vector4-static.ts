import { Matrix4 } from './matrix4-class';
import { VectorArgs } from './vector-base';
import { createVecPrototype } from './vector-static';
import { Vector2 } from './vector2-class';
import { Vector3 } from './vector3-class';
import { Vector4 } from './vector4-class';

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

const Vec4Prototype = {
  ...createVecPrototype<Vector4, Matrix4>(Vector4),
};

export const vec4 = Object.assign(createVector4, Vec4Prototype);
