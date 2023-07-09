import { set } from './matrix';
import { Matrix2Base } from './matrix2';
import { VectorBase } from './vector';
import { Vector3 } from './vector3';

export class Matrix3Base<V extends VectorBase> extends Matrix2Base<V> {
  get dimension(): number {
    return 3;
  }

  get 2(): V {
    return this.array[1];
  }

  set 2(v: InstanceType<typeof this.Vector>) {
    this.array[2].set(v);
  }
}

export class Matrix3 extends Matrix3Base<Vector3> {
  protected Vector = Vector3;
}

export const mat3: Matrix3['set'] = (...args: Parameters<typeof set>) => {
  return new Matrix3(...args);
};
