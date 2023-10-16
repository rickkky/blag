import { MatrixArgs } from './matrix-base';
import { createMatPrototype } from './matrix-static';
import { Matrix4 } from './matrix4';
import { Vector4 } from './vector4';

export interface CreateMatrix4 {
  (): Matrix4;
  (...nums: number[]): Matrix4;
  (nums: number[]): Matrix4;
  (nums: number[][]): Matrix4;
  (v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4): Matrix4;
  (vecs: Vector4[]): Matrix4;
  (m: Matrix4): Matrix4;
  (...args: MatrixArgs): Matrix4;
}

const createMatrix4: CreateMatrix4 = (...args: MatrixArgs) => {
  return new Matrix4(...args);
};

export const Mat4Prototype = {
  ...createMatPrototype<Vector4, Matrix4>(Matrix4),
};

export const mat4 = Object.assign(createMatrix4, Mat4Prototype);
