import { VectorBase } from './vector-base';
import { Matrix3Base } from './matrix3-base';

export abstract class Matrix4Base<V extends VectorBase> extends Matrix3Base<V> {
  get 3(): V {
    return this._vecs[3];
  }

  set 3(v: V) {
    this._vecs[3].set(v);
  }
}
