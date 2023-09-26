import { VectorBase } from './vector-base';
import { MatrixArgs, MatrixBase } from './matrix-base';
import { Matrix2Base } from './matrix2-base';

export abstract class Matrix3Base<
  V extends VectorBase,
  SM extends MatrixBase,
> extends Matrix2Base<V> {
  get 2(): V {
    return this._array[2];
  }

  set 2(v: V) {
    this._array[2].set(v);
  }

  protected abstract _smat(...args: MatrixArgs): SM;

  sub(row: number, column: number) {
    const nums = [];
    for (let i = 0; i < this.dimension; i++) {
      if (i === row) {
        continue;
      }
      const v = [];
      for (let j = 0; j < this.dimension; j++) {
        if (j === column) {
          continue;
        }
        v.push(this[i][j]);
      }
      nums.push(...v);
    }
    return this._smat(...nums);
  }

  determinant() {
    let count = 0;
    let flag = 1;
    for (let i = 0; i < this.dimension; i++) {
      count += this[0][i] * this.sub(0, i).determinant() * flag;
      flag *= -1;
    }
    return count;
  }
}
