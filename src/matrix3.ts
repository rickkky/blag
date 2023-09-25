import { MatrixBase } from './matrix';
import { Matrix2Base, Matrix2 } from './matrix2';
import { VectorBase } from './vector-base';
import { Vector3 } from './vector3';

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

  protected abstract _smat(
    ...args: ConstructorParameters<typeof MatrixBase>
  ): SM;

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
    let flat = 1;
    for (let i = 0; i < this.dimension; i++) {
      count += this[0][i] * this.sub(0, i).determinant() * flat;
      flat *= -1;
    }
    return count;
  }
}

export class Matrix3 extends Matrix3Base<Vector3, Matrix2> {
  get dimension(): 3 {
    return 3;
  }

  protected _vec(...args: ConstructorParameters<typeof VectorBase>) {
    return new Vector3(...args);
  }

  protected _smat(...args: ConstructorParameters<typeof Matrix2>) {
    return new Matrix2(...args);
  }
}
