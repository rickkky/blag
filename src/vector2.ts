import { Vector, set } from './vector';

export class Vector2 extends Vector {
  constructor(x?: number, y?: number);
  constructor(...args: Parameters<typeof set>) {
    super(...(args as any));
  }

  get dimension() {
    return 2;
  }

  set(x?: number, y?: number): void;
  set(...args: Parameters<typeof set>): void {
    set.call(this, ...args);
  }

  get 1() {
    return this.array[1];
  }

  set 1(n: number) {
    this.array[1] = n;
  }

  get y() {
    return this[1];
  }

  set y(n: number) {
    this[1] = n;
  }

  clone() {
    return new Vector2(...this.array);
  }

  get xy() {
    return new Vector2(this.x, this.y);
  }

  get yx() {
    return new Vector2(this.y, this.x);
  }
}

export const vec2: (...args: Parameters<Vector2['set']>) => Vector2 = (
  ...args
) => {
  return new Vector2(...args);
};
