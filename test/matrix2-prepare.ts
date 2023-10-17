import { expect } from 'vitest';
import { expectVector2 } from './vector2-prepare';
import { Matrix2 } from '/src';

export const expectMatrix2 = (m: Matrix2, target: number[]) => {
  expect(m.dimension).toBe(2);
  expectVector2(m[0], [target[0], target[1]]);
  expectVector2(m[1], [target[2], target[3]]);
};

// prettier-ignore
export const MAT2_NUMS = {
  IDENTITY: [
    1, 0,
    0, 1,
  ],
  INDEX_ROW: [
    0, 0,
    1, 1,
  ],
  INDEX_COL: [
    0, 1,
    0, 1,
  ],
};
