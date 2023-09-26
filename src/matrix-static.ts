import { MatrixBase } from './matrix-base';

export function createMatrixStatics<M extends MatrixBase>(Matrix: new () => M) {
  const statics = {};

  return statics;
}
