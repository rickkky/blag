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

    multiplyScalar(m: M, s: number, target = new Matrix()) {
      return m.multiplyScalar(s, target);
    },

    multiply(m0: M, m1: M, target = new Matrix()) {
      return m0.multiply(m1, target);
    },

    transpose(m: M, target = new Matrix()) {
      return m.transpose(target);
    },

    determinant(m: M) {
      return m.determinant();
    },

    identity(target = new Matrix()) {
      return target.identity();
    },

    toArray(m: M) {
      return m.toArray();
    },

    toArray2D(m: M) {
      return m.toArray2D();
    },

    toColMajorArray(m: M) {
      return m.toColMajorArray();
    },

    toColMajorArray2D(m: M) {
      return m.toColMajorArray2D();
    },

    toRowMajorArray(m: M) {
      return m.toRowMajorArray();
    },

    toRowMajorArray2D(m: M) {
      return m.toRowMajorArray2D();
    },
  };

  return statics;
}
