import { MatrixArgs } from './matrix-base';
import { Matrix2Base } from './matrix2-base';
import { VectorArgs } from './vector-base';
import { Vector2 } from './vector2';

export class Matrix2 extends Matrix2Base<Vector2> {
  constructor();
  constructor(...nums: number[]);
  constructor(nums: number[]);
  constructor(nums: number[][]);
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

  protected _vec(...args: VectorArgs) {
    return new Vector2(...args);
  }

  protected _sub(row: number, col: number) {
    return this[(row + 1) % 2][(col + 1) % 2];
  }

  set(): this;
  set(...nums: number[]): this;
  set(nums: number[]): this;
  set(nums: number[][]): this;
  set(v0: Vector2, v1: Vector2): this;
  set(vecs: Vector2[]): this;
  set(m: Matrix2): this;
  set(...args: MatrixArgs): this;
  set(...args: MatrixArgs) {
    return super.set(...args);
  }
}
