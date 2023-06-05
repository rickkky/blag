import { VectorBase } from './vector';

export class MatrixBase {
  protected array: VectorBase[] = [];

  constructor(...args: Parameters<typeof set>) {
    set.apply(this, args);
  }

  get dimension() {
    return 0;
  }

  set(...args: Parameters<typeof set>) {
    return set.apply(this, args);
  }

  clone() {
    return new MatrixBase(...this.array);
  }
}

export function set<T extends MatrixBase>(this: T, ...args: VectorBase[]) {
  this.array = args.map((v) => v.clone());
  return this;
}
