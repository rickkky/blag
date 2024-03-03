import { Vector2Base } from './vector2-base';
import { Vector2 } from './vector2';
import { Vector3 } from './vector3';

export abstract class Vector3Base extends Vector2Base {
  get 2() {
    return this._nums[2];
  }

  set 2(n: number) {
    this._nums[2] = n;
  }

  get z() {
    return this[2];
  }

  set z(n: number) {
    this[2] = n;
  }

  get xz() {
    return new Vector2(this.x, this.z);
  }

  get yz() {
    return new Vector2(this.y, this.z);
  }

  get zx() {
    return new Vector2(this.z, this.x);
  }

  get zy() {
    return new Vector2(this.z, this.y);
  }

  get xyz() {
    return new Vector3(this.x, this.y, this.z);
  }

  get xzy() {
    return new Vector3(this.x, this.z, this.y);
  }

  get yxz() {
    return new Vector3(this.y, this.x, this.z);
  }

  get yzx() {
    return new Vector3(this.y, this.z, this.x);
  }

  get zxy() {
    return new Vector3(this.z, this.x, this.y);
  }

  get zyx() {
    return new Vector3(this.z, this.y, this.x);
  }
}
