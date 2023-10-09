import { MatrixArgs, MatrixBase } from './matrix-base';
import { Matrix2Base } from './matrix2-base';
import { VectorBase } from './vector-base';

export abstract class Matrix3Base<
  SV extends VectorBase,
  SM extends MatrixBase<SV>,
  V extends VectorBase,
> extends Matrix2Base<V> {
  get 2(): V {
    return this._array[2];
  }

  set 2(v: V) {
    this._array[2].set(v);
  }

  protected abstract _submatrix(...args: MatrixArgs): SM;

  minor(row: number, col: number, target = this._submatrix()) {
    const nums = this.toColMajorArray2D();
    nums.splice(row, 1);
    for (const v of nums) {
      v.splice(col, 1);
    }
    return target.set(...nums);
  }

  cofactor(row: number, col: number, target = this._submatrix()) {
    this.minor(row, col, target);
    if ((row + col) % 2 !== 0) {
      target.multiplyScalar(-1);
    }
    return target;
  }

  determinant() {
    let count = 0;
    let flag = 1;
    for (let i = 0; i < this.dimension; i++) {
      count += flag * this[0][i] * this.minor(0, i).determinant();
      flag *= -1;
    }
    return count;
  }
}
