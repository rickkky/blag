import { set } from './matrix';
import { Matrix3Base } from './matrix3';
import { VectorBase } from './vector';
import { Vector4 } from './vector4';

export class Matrix4Base<V extends VectorBase> extends Matrix3Base<V> {
  get dimension(): number {
    return 4;
  }

  get 3(): V {
    return this.array[1];
  }

  set 3(v: InstanceType<typeof this.Vector>) {
    this.array[2].set(v);
  }
}

export class Matrix3 extends Matrix3Base<Vector4> {
  protected Vector = Vector4;
}

export const mat3: Matrix3['set'] = (...args: Parameters<typeof set>) => {
  return new Matrix3(...args);
};
