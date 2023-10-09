import { MatrixArgs } from './matrix-base';
import { createMatrixStatics } from './matrix-static';
import { Matrix2Base } from './matrix2-base';
import { VectorArgs } from './vector-base';
import { Vector2 } from './vector2';

export class Matrix2 extends Matrix2Base<Vector2> {
  constructor();
  constructor(...nums: number[]);
  constructor(nums: number[]);
  constructor(v0: Vector2, v1: Vector2);
  constructor(vecs: Vector2[]);
  constructor(m: Matrix2);
  constructor(...args: MatrixArgs);
  constructor(...args: MatrixArgs) {
    super(...args);
  }

  get dimension(): 2 {
    return 2;
  }

  protected _vector(...args: VectorArgs) {
    return new Vector2(...args);
  }

  set(): this;
  set(...nums: number[]): this;
  set(nums: number[]): this;
  set(v0: Vector2, v1: Vector2): this;
  set(vecs: Vector2[]): this;
  set(m: Matrix2): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }

  determinant() {
    return this[0][0] * this[1][1] - this[0][1] * this[1][0];
  }

  invert(target = this) {
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix is not invertible');
    }
    // prettier-ignore
    return target.set(
       this[1][1] / det, -this[0][1] / det,
      -this[1][0] / det,  this[0][0] / det,
    );
  }
}

export interface CreateMatrix2 {
  (): Matrix2;
  (...nums: number[]): Matrix2;
  (nums: number[]): Matrix2;
  (v0: Vector2, v1: Vector2): Matrix2;
  (vecs: Vector2[]): Matrix2;
  (m: Matrix2): Matrix2;
  (...args: MatrixArgs): Matrix2;
}

const createMatrix2: CreateMatrix2 = (...args: MatrixArgs) => {
  return new Matrix2(...args);
};

export const mat2 = Object.assign(
  createMatrix2,
  createMatrixStatics<Vector2, Matrix2>(Matrix2),
);
