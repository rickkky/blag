import { VectorArgs } from './vector-base';
import { Vector4 } from './vector4';
import { MatrixArgs } from './matrix-base';
import { Matrix3 } from './matrix3';
import { Matrix4Base } from './matrix4-base';

export class Matrix4 extends Matrix4Base<Vector4, Matrix3> {
  get dimension(): 4 {
    return 4;
  }

  protected _vec(...args: VectorArgs) {
    return new Vector4(...args);
  }

  protected _smat(...args: MatrixArgs) {
    return new Matrix3(...args);
  }
}
