import { expect } from 'vitest';
import { Vector2 } from '/src/index';

export const expectVector2 = (v: Vector2, [x, y]: number[]) => {
  expect(v.dimension).toBe(2);
  expect(v[0]).toBe(x);
  expect(v.x).toBe(x);
  expect(v[1]).toBe(y);
  expect(v.y).toBe(y);
  expect(v.size).toBeCloseTo(Math.sqrt(x * x + y * y), 12);
};
