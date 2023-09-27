import { MatrixBase } from './matrix-base';
import { VectorBase } from './vector-base';

export abstract class Matrix2Base<V extends VectorBase> extends MatrixBase<V> {
  get 0() {
    return this._array[0];
  }

  set 0(v: V) {
    this._array[0] = v;
  }

  get 1() {
    return this._array[1];
  }

  set 1(v: V) {
    this._array[1].set(v);
  }
}
