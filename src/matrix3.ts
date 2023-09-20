import { Matrix2Base } from './matrix2';
import { VectorBase } from './vector';
import { Vector3 } from './vector3';

export abstract class Matrix3Base<V extends VectorBase> extends Matrix2Base<V> {
  get 2(): V {
    return this._array[2];
  }

  set 2(v: V) {
    this._array[2].set(v);
  }
}

export class Matrix3 extends Matrix3Base<Vector3> {
  get dimension(): 3 {
    return 3;
  }

  protected _vec(...args: ConstructorParameters<typeof VectorBase>) {
    return new Vector3(...args);
  }
}
