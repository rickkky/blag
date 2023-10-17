import { describe, expect, test } from 'vitest';
import { VEC3_NUMS, expectVector3 } from './vector3-prepare';
import { vec3 } from '/src';

describe('zero', () => {
  test('Vector3.prototype.zero', () => {
    const v = vec3(VEC3_NUMS.INDEX);
    const result = v.zero();
    expectVector3(v, VEC3_NUMS.ZERO);
    expect(result).toBe(v);
  });

  test('vec3.zero', () => {
    const result = vec3.zero();
    expectVector3(result, VEC3_NUMS.ZERO);
  });

  test('store result to target instance', () => {
    const target = vec3();
    const result = vec3.zero(target);
    expectVector3(target, VEC3_NUMS.ZERO);
    expect(result).toBe(target);
  });
});
