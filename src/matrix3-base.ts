import { Matrix2Base } from './matrix2-base';
import { VectorBase } from './vector-base';

export abstract class Matrix3Base<V extends VectorBase> extends Matrix2Base<V> {
  get 2(): V {
    return this._vecs[2];
  }

  set 2(v: V) {
    this._vecs[2].set(v);
  }
}
