import { MatrixArgs } from './matrix-base';
import { createMatPrototype } from './matrix-static';
import { Matrix2 } from './matrix2-class';
import { Vector2 } from './vector2-class';

interface CreateMatrix2 {
  (): Matrix2;
  (...nums: number[]): Matrix2;
  (nums: number[]): Matrix2;
  (nums: number[][]): Matrix2;
  (v0: Vector2, v1: Vector2): Matrix2;
  (vecs: Vector2[]): Matrix2;
  (m: Matrix2): Matrix2;
  (...args: MatrixArgs): Matrix2;
}

const createMatrix2: CreateMatrix2 = (...args: MatrixArgs) => {
  return new Matrix2(...args);
};

const Mat2Prototype = {
  ...createMatPrototype<Vector2, Matrix2>(Matrix2),
};

export const mat2 = Object.assign(createMatrix2, Mat2Prototype);
