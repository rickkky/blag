import { expect } from 'vitest';
import { expectVector2 } from './vector2-expect';
import { Matrix2, Vector2 } from '/src';

export const expectMatrix2 = (m: Matrix2, target: number[] | Vector2[]) => {
  let nums: number[] = [];
  if (target[0] instanceof Vector2 && target[1] instanceof Vector2) {
    nums = [...target[0], ...target[1]];
  } else {
    nums = target as number[];
  }
  expect(m.dimension).toBe(2);
  expectVector2(m[0], [nums[0], nums[1]]);
  expectVector2(m[1], [nums[2], nums[3]]);
};
