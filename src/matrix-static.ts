import { VectorBase } from './vector-base';
import { MatrixBase } from './matrix-base';

export function createMatrixStatics<
  V extends VectorBase,
  M extends MatrixBase<V>,
>(Matrix: new () => M) {
  const statics = {
    clone(m: M, target = new Matrix()) {
      return m.clone(target);
    },

    equals(m0: M, m1: M, precision?: number) {
      return m0.equals(m1, precision);
    },

    determinant(m: M) {
      return m.determinant();
    },

    multiply(m0: M, m1: M, target = new Matrix()) {
      return m0.multiply(m1, target);
    },

    transpose(m: M, target = new Matrix()) {
      return m.transpose(target);
    },

    identity(target = new Matrix()) {
      return target.identity();
    },

    toArray(m: M) {
      return m.toArray();
    },

    toColMajorArray(m: M) {
      return m.toColMajorArray();
    },

    toRowMajorArray(m: M) {
      return m.toRowMajorArray();
    },
  };

  return statics;
}
