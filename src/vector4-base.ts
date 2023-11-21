import { Vector3Base } from './vector3-base';

export abstract class Vector4Base extends Vector3Base {
  get 3() {
    return this._nums[3];
  }

  set 3(n: number) {
    this._nums[3] = n;
  }

  get w() {
    return this[3];
  }

  set w(n: number) {
    this[3] = n;
  }
}
