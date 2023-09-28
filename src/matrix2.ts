import { MatrixArgs } from './matrix-base';
import { createMatrixStatics } from './matrix-static';
import { Matrix2Base } from './matrix2-base';
import { VectorArgs } from './vector-base';
import { Vector2 } from './vector2';

export class Matrix2 extends Matrix2Base<Vector2> {
  constructor();
  constructor(...ns: number[]);
  constructor(ns: number[]);
  constructor(v0: Vector2, v1: Vector2);
  constructor(vs: Vector2[]);
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
  set(...ns: number[]): this;
  set(ns: number[]): this;
  set(v0: Vector2, v1: Vector2): this;
  set(vs: Vector2[]): this;
  set(m: Matrix2): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }

  determinant() {
    return this[0][0] * this[1][1] - this[0][1] * this[1][0];
  }
}

export interface CreateMatrix2 {
  (): Matrix2;
  (...ns: number[]): Matrix2;
  (ns: number[]): Matrix2;
  (v0: Vector2, v1: Vector2): Matrix2;
  (vs: Vector2[]): Matrix2;
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
