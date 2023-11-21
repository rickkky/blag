import { VectorBase } from './vector-base';
import { MatrixArgs } from './matrix-prototype';

export abstract class MatrixBase<V extends VectorBase = any> {
  _vecs: V[] = [];

  constructor() {}

  abstract get dimension(): number;

  [index: number]: V;

  [Symbol.iterator]() {
    return this._vecs[Symbol.iterator]();
  }

  abstract _sub(row: number, col: number): MatrixBase | number;

  abstract set(...args: MatrixArgs): MatrixBase;

  abstract clone(target?: MatrixBase): MatrixBase;

  abstract equals(m: MatrixBase, precision?: number): boolean;

  abstract multiplyScalar(s: number, target?: MatrixBase): MatrixBase;

  abstract multiply(m: MatrixBase, target?: MatrixBase): MatrixBase;

  abstract multiplication(mats: MatrixBase[], target?: MatrixBase): MatrixBase;

  abstract transpose(target?: MatrixBase): MatrixBase;

  abstract minor(row: number, col: number): number;

  abstract cofactor(row: number, col: number): number;

  abstract determinant(): number;

  abstract invert(target?: MatrixBase): MatrixBase;

  abstract identity(): MatrixBase;

  abstract toArray(): number[];

  abstract toColMajorArray(): number[];

  abstract toRowMajorArray(): number[];

  abstract toArray2D(): number[][];

  abstract toColMajorArray2D(): number[][];

  abstract toRowMajorArray2D(): number[][];
}
