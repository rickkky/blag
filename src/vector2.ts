import { VectorBase, createVectorStatics } from './vector';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';

export abstract class Vector2Base extends VectorBase {
  get 1() {
    return this._array[1];
  }

  set 1(n: number) {
    this._array[1] = n;
  }

  get y() {
    return this[1];
  }

  set y(n: number) {
    this[1] = n;
  }

  get xy() {
    return new Vector2(this.x, this.y);
  }

  get yx() {
    return new Vector2(this.y, this.x);
  }
}

export class Vector2 extends Vector2Base {
  constructor(x: number, y: number);
  constructor(list: number[]);
  constructor(v: Vector2);
  constructor(...args: ConstructorParameters<typeof VectorBase>);
  constructor(...args: ConstructorParameters<typeof VectorBase>) {
    super(...args);
  }

  get dimension(): 2 {
    return 2;
  }

  set(x: number, y: number): this;
  set(list: number[]): this;
  set(v: Vector2): this;
  set(...args: ConstructorParameters<typeof VectorBase>): this;
  set(...args: ConstructorParameters<typeof VectorBase>) {
    return super.set(...args);
  }

  transform(m: Matrix2 | Matrix3, target?: this) {
    return super.transform(m, target);
  }
}

interface Vec2
  extends ReturnType<typeof createVectorStatics<Vector2, Matrix2 | Matrix3>> {
  (x: number, y: number): Vector2;
  (list: number[]): Vector2;
  (v: Vector2): Vector2;
  (...args: ConstructorParameters<typeof VectorBase>): Vector2;
}

export const vec2: Vec2 = Object.assign(
  (...args: ConstructorParameters<typeof VectorBase>) => {
    return new Vector2(...args);
  },
  createVectorStatics<Vector2, Matrix2 | Matrix3>(Vector2),
);
