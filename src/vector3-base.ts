import { Vector2Base } from './vector2-base';

export abstract class Vector3Base extends Vector2Base {
  get 2() {
    return this._array[2];
  }

  set 2(n: number) {
    this._array[2] = n;
  }

  get z() {
    return this[2];
  }

  set z(n: number) {
    this[2] = n;
  }
}
