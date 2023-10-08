import { expect } from 'vitest';
import { expectVector2 } from './vector2-expect';
import { Matrix2 } from '/src';

export const expectMatrix2 = (m: Matrix2, target: number[]) => {
  expect(m.dimension).toBe(2);
  expectVector2(m[0], [target[0], target[1]]);
  expectVector2(m[1], [target[2], target[3]]);
};
