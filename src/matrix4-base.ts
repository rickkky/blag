import { VectorBase } from './vector-base';
import { MatrixBase } from './matrix-base';
import { Matrix3Base } from './matrix3-base';

export abstract class Matrix4Base<
  SV extends VectorBase,
  SM extends MatrixBase<SV>,
  V extends VectorBase,
> extends Matrix3Base<SV, SM, V> {
  get 3(): V {
    return this._array[3];
  }

  set 3(v: V) {
    this._array[3].set(v);
  }
}
