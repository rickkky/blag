import { describe, expect, test } from 'vitest';
import { VEC4_NUMS, expectVector4 } from './vector4-prepare';
import { mat4, vec4 } from '/src';

describe('add', () => {
  const nums0 = VEC4_NUMS.ZERO;
  const nums1 = VEC4_NUMS.INDEX;
  const expected = VEC4_NUMS.INDEX;

  test('Vector4.prototype.add', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const result = v0.add(v1);
    expectVector4(v0, expected);
    expect(result).toBe(v0);
    expectVector4(v1, nums1);
  });

  test('vec4.add', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const result = vec4.add(v0, v1);
    expectVector4(result, expected);
    expectVector4(v0, nums0);
    expectVector4(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const target = vec4();
    const result = vec4.add(v0, v1, target);
    expectVector4(target, expected);
    expect(result).toBe(target);
  });
});

describe('subtract', () => {
  const nums0 = VEC4_NUMS.INDEX;
  const nums1 = VEC4_NUMS.INDEX;
  const expected = VEC4_NUMS.ZERO;

  test('Vector4.prototype.subtract', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const result = v0.subtract(v1);
    expectVector4(v0, expected);
    expect(result).toBe(v0);
    expectVector4(v1, nums1);
  });

  test('vec4.subtract', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const result = vec4.subtract(v0, v1);
    expectVector4(result, expected);
    expectVector4(v0, nums0);
    expectVector4(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const target = vec4();
    const result = vec4.subtract(v0, v1, target);
    expectVector4(target, expected);
    expect(result).toBe(target);
  });
});

describe('scale', () => {
  const nums = VEC4_NUMS.INDEX;
  const scalar = 2;
  const expected = [0, 2, 4, 6];

  test('Vector4.prototype.scale', () => {
    const v = vec4(nums);
    const result = v.scale(scalar);
    expectVector4(v, expected);
    expect(result).toBe(v);
  });

  test('vec4.scale', () => {
    const v = vec4(nums);
    const result = vec4.scale(v, scalar);
    expectVector4(result, expected);
    expectVector4(v, nums);
  });

  test('store result to target instance', () => {
    const v = vec4(nums);
    const target = vec4();
    const result = vec4.scale(v, scalar, target);
    expectVector4(target, expected);
    expect(result).toBe(target);
  });
});

describe('normalize', () => {
  const nums = [0, 0, 0, 2];
  const expected = [0, 0, 0, 1];

  test('Vector4.prototype.normalize', () => {
    const v = vec4(nums);
    const result = v.normalize();
    expectVector4(v, expected);
    expect(result).toBe(v);
  });

  test('vec4.normalize', () => {
    const v = vec4(nums);
    const result = vec4.normalize(v);
    expectVector4(result, expected);
    expectVector4(v, nums);
  });

  test('store result to target instance', () => {
    const v = vec4(nums);
    const target = vec4();
    const result = vec4.normalize(v, target);
    expectVector4(target, expected);
    expect(result).toBe(target);
  });

  test('throw error for zero vector', () => {
    expect(() => vec4.zero().normalize()).toThrowError();
  });
});

describe('transform', () => {
  const samples = [
    {
      nums: VEC4_NUMS.INDEX,
      // prettier-ignore
      m: mat4(
        0, 0, 0, 1,
        0, 0, 1, 0,
        0, 1, 0, 0,
        1, 0, 0, 0,
      ),
      expected: [3, 2, 1, 0],
    },
  ];

  test('Vector4.prototype.transform', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec4(nums);
      const result = v.transform(m);
      expectVector4(v, expected);
      expect(result).toBe(v);
    }
  });

  test('vec4.transform', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec4(nums);
      const result = vec4.transform(v, m);
      expectVector4(result, expected);
      expectVector4(v, nums);
    }
  });

  test('store result to target instance', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec4(nums);
      const target = vec4();
      const result = vec4.transform(v, m, target);
      expectVector4(target, expected);
      expect(result).toBe(target);
    }
  });
});

describe('dot', () => {
  const nums0 = [0, 1, 2, 3];
  const nums1 = [4, 5, 6, 7];
  const expected = 38;

  test('vec4.dot', () => {
    const v0 = vec4(nums0);
    const v1 = vec4(nums1);
    const result = vec4.dot(v0, v1);
    expect(result).toBe(expected);
  });
});
