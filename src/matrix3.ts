import { VectorArgs } from './vector-base';
import { Vector3 } from './vector3';
import { MatrixArgs } from './matrix-base';
import { Matrix3Base } from './matrix3-base';
import { Matrix2 } from './matrix2';

export class Matrix3 extends Matrix3Base<Vector3, Matrix2> {
  get dimension(): 3 {
    return 3;
  }

  protected _vec(...args: VectorArgs) {
    return new Vector3(...args);
  }

  protected _smat(...args: MatrixArgs) {
    return new Matrix2(...args);
  }
}
