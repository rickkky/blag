import { describe, expect, test } from 'vitest';
import { VEC2_NUMS, expectVector2 } from './vector2-prepare';
import { vec2 } from '/src';

describe('zero', () => {
  test('Vector2.prototype.zero', () => {
    const v = vec2(VEC2_NUMS.INDEX);
    const result = v.zero();
    expectVector2(v, VEC2_NUMS.ZERO);
    expect(result).toBe(v);
  });

  test('vec2.zero', () => {
    const result = vec2.zero();
    expectVector2(result, VEC2_NUMS.ZERO);
  });

  test('store result to target instance', () => {
    const target = vec2();
    const result = vec2.zero(target);
    expectVector2(target, VEC2_NUMS.ZERO);
    expect(result).toBe(target);
  });
});
