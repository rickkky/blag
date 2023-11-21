import { expect } from 'vitest';
import { Vector2 } from '/src/index';
import { numDigits } from './constant';

export const expectVector2 = (v: Vector2, target: number[]) => {
  const [x, y] = target;
  expect(v.dimension).toBe(2);
  expect(v[0]).toBeCloseTo(x, numDigits);
  expect(v.x).toBeCloseTo(x, numDigits);
  expect(v[1]).toBeCloseTo(y, numDigits);
  expect(v.y).toBeCloseTo(y, numDigits);
  expect(v.size ** 2).toBeCloseTo(x * x + y * y, numDigits);
};

export const VEC2_NUMS = {
  ZERO: [0, 0],
  INDEX: [0, 1],
  INDEX_REVERSE: [1, 0],
};
