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
    row = Math.min(Math.max(Math.floor(row), 0), this.dimension - 1);
    col = Math.min(Math.max(Math.floor(col), 0), this.dimension - 1);
    const nums = [];
    for (let i = 0; i < this.dimension; i++) {
      if (i === row) {
        continue;
      }
      const v = [];
      for (let j = 0; j < this.dimension; j++) {
        if (j === col) {
          continue;
        }
        v.push(this[i][j]);
      }
      nums.push(...v);
    }
    return target.set(nums);
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
