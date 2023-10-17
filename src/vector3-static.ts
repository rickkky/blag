import { Matrix3 } from './matrix3-class';
import { Matrix4 } from './matrix4-class';
import { VectorArgs } from './vector-base';
import { createVecPrototype } from './vector-static';
import { Vector2 } from './vector2-class';
import { Vector3 } from './vector3-class';

export interface CreateVector3 {
  (): Vector3;
  (x: number, y: number, z: number): Vector3;
  (nums: number[]): Vector3;
  (v: Vector3): Vector3;
  (xy: Vector2, z: number): Vector3;
  (x: number, yz: Vector2): Vector3;
  (...args: VectorArgs): Vector3;
}

const createVector3: CreateVector3 = (...args: VectorArgs) => {
  return new Vector3(...args);
};

const Vec3Prototype = {
  ...createVecPrototype<Vector3, Matrix3 | Matrix4>(Vector3),

  cross(v0: Vector3, v1: Vector3, target = new Vector3()) {
    return v0.cross(v1, target);
  },
};

export const vec3 = Object.assign(createVector3, Vec3Prototype);
