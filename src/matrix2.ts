import { VectorArgs } from './vector-base';
import { Vector2 } from './vector2';
import { Matrix2Base } from './matrix2-base';

export class Matrix2 extends Matrix2Base<Vector2> {
  get dimension(): 2 {
    return 2;
  }

  protected _vec(...args: VectorArgs) {
    return new Vector2(...args);
  }

  determinant() {
    return this[0][0] * this[1][1] - this[0][1] * this[1][0];
  }
}
