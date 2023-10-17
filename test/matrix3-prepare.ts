import { expect } from 'vitest';
import { expectVector3 } from './vector3-prepare';
import { Matrix3 } from '/src';

export const expectMatrix3 = (m: Matrix3, target: number[]) => {
  expect(m.dimension).toBe(3);
  expectVector3(m[0], [target[0], target[1], target[2]]);
  expectVector3(m[1], [target[3], target[4], target[5]]);
  expectVector3(m[2], [target[6], target[7], target[8]]);
};

// prettier-ignore
export const MAT3_NUMS = {
  IDENTITY: [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ],
  INDEX_ROW: [
    0, 0, 0,
    1, 1, 1,
    2, 2, 2,
  ],
  INDEX_COL: [
    0, 1, 2,
    0, 1, 2,
    0, 1, 2,
  ],
};
