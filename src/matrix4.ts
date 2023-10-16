import { MatrixArgs } from './matrix-base';
import { Matrix3 } from './matrix3';
import { Matrix4Base } from './matrix4-base';
import { VectorArgs } from './vector-base';
import { Vector4 } from './vector4';

export class Matrix4 extends Matrix4Base<Vector4> {
  constructor();
  constructor(...nums: number[]);
  constructor(nums: number[]);
  constructor(nums: number[][]);
  constructor(v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4);
  constructor(vecs: Vector4[]);
  constructor(m: Matrix4);
  constructor(...args: MatrixArgs);
  constructor(...args: MatrixArgs) {
    super(...args);
  }

  get dimension(): 4 {
    return 4;
  }

  protected _vec(...args: VectorArgs) {
    return new Vector4(...args);
  }

  protected _sub(row: number, col: number) {
    const vecs = this.toColMajorArray2D();
    vecs.splice(row, 1);
    for (const v of vecs) {
      v.splice(col, 1);
    }
    return new Matrix3(vecs);
  }

  set(): this;
  set(...nums: number[]): this;
  set(nums: number[]): this;
  set(nums: number[][]): this;
  set(v0: Vector4, v1: Vector4, v2: Vector4, v3: Vector4): this;
  set(vecs: Vector4[]): this;
  set(m: Matrix4): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }
}
