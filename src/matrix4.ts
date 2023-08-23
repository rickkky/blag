import { Matrix3Base } from './matrix3';
import { VectorBase } from './vector';
import { Vector4 } from './vector4';

export abstract class Matrix4Base<V extends VectorBase> extends Matrix3Base<V> {
  get 3(): V {
    return this.array[3];
  }

  set 3(v: V) {
    this.array[3].set(v);
  }
}

export class Matrix4 extends Matrix4Base<Vector4> {
  get dimension(): 4 {
    return 4;
  }

  protected vec(...args: ConstructorParameters<typeof VectorBase>) {
    return new Vector4(...args);
  }
}
