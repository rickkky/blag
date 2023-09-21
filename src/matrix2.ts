import { VectorBase } from './vector';
import { Vector2 } from './vector2';
import { MatrixBase } from './matrix';

export abstract class Matrix2Base<V extends VectorBase> extends MatrixBase<V> {
  get 1() {
    return this._array[1];
  }

  set 1(v: V) {
    this._array[1].set(v);
  }
}

export class Matrix2 extends Matrix2Base<Vector2> {
  get dimension(): 2 {
    return 2;
  }

  protected _vec(...args: ConstructorParameters<typeof VectorBase>) {
    return new Vector2(...args);
  }

  determinant() {
    return this[0][0] * this[1][1] - this[0][1] * this[1][0];
  }
}
