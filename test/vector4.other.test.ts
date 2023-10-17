import { describe, expect, test } from 'vitest';
import { VEC4_NUMS, expectVector4 } from './vector4-prepare';
import { vec4 } from '/src';

describe('zero', () => {
  test('Vector4.prototype.zero', () => {
    const v = vec4(VEC4_NUMS.INDEX);
    const result = v.zero();
    expectVector4(v, VEC4_NUMS.ZERO);
    expect(result).toBe(v);
  });

  test('vec4.zero', () => {
    const result = vec4.zero();
    expectVector4(result, VEC4_NUMS.ZERO);
  });

  test('store result to target instance', () => {
    const target = vec4();
    const result = vec4.zero(target);
    expectVector4(target, VEC4_NUMS.ZERO);
    expect(result).toBe(target);
  });
});
