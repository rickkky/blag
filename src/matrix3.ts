import { Vector3 } from './vector3';
import { createMatrixPrototype, MatrixArgs } from './matrix-prototype';
import { Matrix2 } from './matrix2';
import { Matrix3Base } from './matrix3-base';

const prototype = createMatrixPrototype<Vector3, Matrix3>(
  () => new Vector3(),
  () => new Matrix3(),
);

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
    super();
    prototype.set(this, ...args);
  }

  get dimension(): 3 {
    return 3;
  }

  _sub(row: number, col: number) {
    const vecs = this.toColMajorArray2D();
    vecs.splice(row, 1);
    for (const v of vecs) {
      v.splice(col, 1);
    }
    return new Matrix2(vecs);
  }

  set(): Matrix3;
  set(...nums: number[]): Matrix3;
  set(nums: number[]): Matrix3;
  set(nums: number[][]): Matrix3;
  set(v0: Vector3, v1: Vector3, v2: Vector3): Matrix3;
  set(vecs: Vector3[]): Matrix3;
  set(m: Matrix3): Matrix3;
  set(...args: MatrixArgs): Matrix3;
  set(...args: MatrixArgs) {
    return prototype.set(this, ...args);
  }

  clone(target: Matrix3): Matrix3 {
    return prototype.clone(this, target);
  }

  equals(m: Matrix3, precision?: number): boolean {
    return prototype.equals(this, m, precision);
  }

  multiplyScalar(s: number, target: Matrix3 = this): Matrix3 {
    return prototype.multiplyScalar(this, s, target);
  }

  multiply(m: Matrix3, target: Matrix3 = this): Matrix3 {
    return prototype.multiply(this, m, target);
  }

  multiplication(mats: Matrix3[], target: Matrix3 = this): Matrix3 {
    return prototype.multiplication(mats, target);
  }

  transpose(target: Matrix3 = this): Matrix3 {
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

  invert(target: Matrix3 = this): Matrix3 {
    return prototype.invert(this, target);
  }

  identity(): Matrix3 {
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

export const mat3 = Object.assign(createMatrix3, prototype);
