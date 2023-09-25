import { MatrixBase } from './matrix';
import { Matrix3Base, Matrix3 } from './matrix3';
import { VectorBase } from './vector-base';
import { Vector4 } from './vector4';

export abstract class Matrix4Base<
  V extends VectorBase,
  SM extends MatrixBase,
> extends Matrix3Base<V, SM> {
  get 3(): V {
    return this._array[3];
  }

  set 3(v: V) {
    this._array[3].set(v);
  }
}

export class Matrix4 extends Matrix4Base<Vector4, Matrix3> {
  get dimension(): 4 {
    return 4;
  }

  protected _vec(...args: ConstructorParameters<typeof VectorBase>) {
    return new Vector4(...args);
  }

  protected _smat(...args: ConstructorParameters<typeof Matrix3>) {
    return new Matrix3(...args);
  }
}
