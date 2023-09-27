import { MatrixArgs } from './matrix-base';
import { Matrix3, createMatrix3Statics } from './matrix3';
import { Matrix4Base } from './matrix4-base';
import { VectorArgs } from './vector-base';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';

export class Matrix4 extends Matrix4Base<Vector3, Matrix3, Vector4> {
  constructor();
  constructor(...list: number[]);
  constructor(list: number[]);
  constructor(v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4);
  constructor(m: Matrix4);
  constructor(...args: MatrixArgs);
  constructor(...args: MatrixArgs) {
    super(...args);
  }

  get dimension(): 4 {
    return 4;
  }

  protected _vector(...args: VectorArgs) {
    return new Vector4(...args);
  }

  protected _submatrix(...args: MatrixArgs) {
    return new Matrix3(...args);
  }

  set(): this;
  set(...list: number[]): this;
  set(list: number[]): this;
  set(v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4): this;
  set(m: Matrix4): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }
}

export interface CreateMatrix4 {
  (): Matrix4;
  (...list: number[]): Matrix4;
  (list: number[]): Matrix4;
  (v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4): Matrix4;
  (m: Matrix4): Matrix4;
  (...args: MatrixArgs): Matrix4;
}

const createMatrix4: CreateMatrix4 = (...args: MatrixArgs) => {
  return new Matrix4(...args);
};

export const mat4 = Object.assign(
  createMatrix4,
  createMatrix3Statics<Vector3, Matrix3, Vector4, Matrix4>(Matrix4),
);
