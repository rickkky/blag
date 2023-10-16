import { MatrixArgs } from './matrix-base';
import { Matrix2 } from './matrix2';
import { Matrix3Base } from './matrix3-base';
import { VectorArgs } from './vector-base';
import { Vector3 } from './vector3';

export class Matrix3 extends Matrix3Base<Vector3> {
  constructor();
  constructor(...nums: number[]);
  constructor(nums: number[]);
  constructor(nums: number[][]);
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

  protected _vec(...args: VectorArgs) {
    return new Vector3(...args);
  }

  protected _sub(row: number, col: number) {
    const vecs = this.toColMajorArray2D();
    vecs.splice(row, 1);
    for (const v of vecs) {
      v.splice(col, 1);
    }
    return new Matrix2(vecs);
  }

  set(): this;
  set(...nums: number[]): this;
  set(nums: number[]): this;
  set(nums: number[][]): this;
  set(v0: Vector3, v1: Vector3, v2: Vector3): this;
  set(vecs: Vector3[]): this;
  set(m: Matrix3): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }
}
