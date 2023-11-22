import { Vector2 } from './vector2';
import { createMatrixPrototype, MatrixArgs } from './matrix-prototype';
import { Matrix2Base } from './matrix2-base';

const prototype = createMatrixPrototype<Vector2, Matrix2>(
  () => new Vector2(),
  () => new Matrix2(),
);

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
    super();
    prototype.set(this, ...args);
  }

  get dimension(): 2 {
    return 2;
  }

  _sub(row: number, col: number) {
    return this[(row + 1) % 2][(col + 1) % 2];
  }

  set(): Matrix2;
  set(...nums: number[]): Matrix2;
  set(nums: number[]): Matrix2;
  set(nums: number[][]): Matrix2;
  set(v0: Vector2, v1: Vector2): Matrix2;
  set(vecs: Vector2[]): Matrix2;
  set(m: Matrix2): Matrix2;
  set(...args: MatrixArgs): Matrix2;
  set(...args: MatrixArgs): Matrix2 {
    return prototype.set(this, ...args);
  }

  clone(target?: Matrix2): Matrix2 {
    return prototype.clone(this, target);
  }

  equals(m: Matrix2, precision?: number): boolean {
    return prototype.equals(this, m, precision);
  }

  multiplyScalar(s: number, target: Matrix2 = this): Matrix2 {
    return prototype.multiplyScalar(this, s, target);
  }

  multiply(m: Matrix2, target: Matrix2 = this): Matrix2 {
    return prototype.multiply(this, m, target);
  }

  multiplication(mats: Matrix2[], target: Matrix2 = this): Matrix2 {
    return prototype.multiplication(mats, target);
  }

  transpose(target: Matrix2 = this): Matrix2 {
    return prototype.transpose(this, target);
  }

  minor(row: number, col: number): number {
    return prototype.minor(this, row, col);
  }

  cofactor(row: number, col: number): number {
    return prototype.cofactor(this, row, col);
  }

  determinant(): number {
    return prototype.determinant(this);
  }

  invert(target: Matrix2 = this): Matrix2 {
    return prototype.invert(this, target);
  }

  identity(): Matrix2 {
    return prototype.identity(this);
  }

  toArray(): number[] {
    return prototype.toArray(this);
  }

  toColMajorArray(): number[] {
    return prototype.toColMajorArray(this);
  }

  toRowMajorArray(): number[] {
    return prototype.toRowMajorArray(this);
  }

  toArray2D(): number[][] {
    return prototype.toArray2D(this);
  }

  toColMajorArray2D(): number[][] {
    return prototype.toColMajorArray2D(this);
  }

  toRowMajorArray2D(): number[][] {
    return prototype.toRowMajorArray2D(this);
  }
}

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

export const mat2 = Object.assign(createMatrix2, prototype);
