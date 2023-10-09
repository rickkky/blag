import { MatrixArgs, MatrixBase } from './matrix-base';
import { createMatrixStatics } from './matrix-static';
import { Matrix2 } from './matrix2';
import { Matrix3Base } from './matrix3-base';
import { VectorArgs, VectorBase } from './vector-base';
import { Vector2 } from './vector2';
import { Vector3 } from './vector3';
import { Vector3Base } from './vector3-base';

export class Matrix3 extends Matrix3Base<Vector2, Matrix2, Vector3> {
  constructor();
  constructor(...nums: number[]);
  constructor(nums: number[]);
  constructor(v0: Vector3, v1: Vector3, v2: Vector3);
  constructor(vecs: Vector3[]);
  constructor(m: Matrix3);
  constructor(...args: MatrixArgs);
  constructor(...args: MatrixArgs) {
    super(...args);
  }

  get dimension(): 3 {
    return 3;
  }

  protected _vector(...args: VectorArgs) {
    return new Vector3(...args);
  }

  protected _submatrix(...args: MatrixArgs) {
    return new Matrix2(...args);
  }

  set(): this;
  set(...nums: number[]): this;
  set(nums: number[]): this;
  set(v0: Vector3, v1: Vector3, v2: Vector3): this;
  set(vecs: Vector3[]): this;
  set(m: Matrix3): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }

  invert(target = this) {
    const det = this.determinant();
    if (det === 0) {
      throw new Error('Matrix is not invertible');
    }
    const detInv = 1 / det;
    return target;
  }
}

export function createMatrix3Statics<
  SV extends VectorBase,
  SM extends MatrixBase<SV>,
  V extends Vector3Base,
  M extends Matrix3Base<SV, SM, V>,
>(Matrix: new () => M) {
  const statics = {
    ...createMatrixStatics<V, M>(Matrix),

    minor(m: M, row: number, col: number, target?: SM) {
      return m.minor(row, col, target);
    },
  };

  return statics;
}

export interface CreateMatrix3 {
  (): Matrix3;
  (...nums: number[]): Matrix3;
  (nums: number[]): Matrix3;
  (v0: Vector3, v1: Vector3, v2: Vector3): Matrix3;
  (vecs: Vector3[]): Matrix3;
  (m: Matrix3): Matrix3;
  (...args: MatrixArgs): Matrix3;
}

const createMatrix3: CreateMatrix3 = (...args: MatrixArgs) => {
  return new Matrix3(...args);
};

export const mat3 = Object.assign(
  createMatrix3,
  createMatrix3Statics<Vector2, Matrix2, Vector3, Matrix3>(Matrix3),
);
