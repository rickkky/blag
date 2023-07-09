import { MatrixBase, set } from './matrix';
import { VectorBase } from './vector';
import { Vector2 } from './vector2';

export class Matrix2Base<V extends VectorBase> extends MatrixBase<V> {
  get dimension(): number {
    return 2;
  }

  get 0(): V {
    return this.array[0];
  }

  set 0(v: InstanceType<typeof this.Vector>) {
    this.array[0].set(v);
  }

  get 1(): V {
    return this.array[1];
  }

  set 1(v: InstanceType<typeof this.Vector>) {
    this.array[1].set(v);
  }
}

export class Matrix2 extends Matrix2Base<Vector2> {
  protected Vector = Vector2;
}

export const mat2: Matrix2['set'] = (...args: Parameters<typeof set>) => {
  return new Matrix2(...args);
};
