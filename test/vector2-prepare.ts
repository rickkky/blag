import { expect } from 'vitest';
import { Vector2 } from '/src/index';

export const expectVector2 = (v: Vector2, target: number[]) => {
  const [x, y] = target;
  expect(v.dimension).toBe(2);
  expect(v[0]).toBe(x);
  expect(v.x).toBe(x);
  expect(v[1]).toBe(y);
  expect(v.y).toBe(y);
  expect(v.size).toBeCloseTo(Math.sqrt(x * x + y * y), 12);
};

export const VEC2_NUMS = {
  ZERO: [0, 0],
  INDEX: [0, 1],
  INDEX_REVERSE: [1, 0],
};
