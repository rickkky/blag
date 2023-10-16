import { MatrixArgs } from './matrix-base';
import { createMatPrototype } from './matrix-static';
import { Matrix3 } from './matrix3';
import { Vector3 } from './vector3';

interface CreateMatrix3 {
  (): Matrix3;
  (...nums: number[]): Matrix3;
  (nums: number[]): Matrix3;
  (nums: number[][]): Matrix3;
  (v0: Vector3, v1: Vector3, v2: Vector3): Matrix3;
  (vecs: Vector3[]): Matrix3;
  (m: Matrix3): Matrix3;
  (...args: MatrixArgs): Matrix3;
}

const createMatrix3: CreateMatrix3 = (...args: MatrixArgs) => {
  return new Matrix3(...args);
};

const Mat3Prototype = {
  ...createMatPrototype<Vector3, Matrix3>(Matrix3),
};

export const mat3 = Object.assign(createMatrix3, Mat3Prototype);
