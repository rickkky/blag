import { VectorBase } from './vector-base';
import { Vector2 } from './vector2';

export abstract class Vector2Base extends VectorBase {
  get 0() {
    return this._nums[0];
  }

  set 0(n: number) {
    this._nums[0] = n;
  }

  get x() {
    return this[0];
  }

  set x(n: number) {
    this[0] = n;
  }

  get 1() {
    return this._nums[1];
  }

  set 1(n: number) {
    this._nums[1] = n;
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
