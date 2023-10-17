import { describe, expect, test } from 'vitest';
import { VEC2_NUMS, expectVector2 } from './vector2-prepare';
import { mat2, mat3, vec2 } from '/src';

describe('add', () => {
  const nums0 = VEC2_NUMS.ZERO;
  const nums1 = VEC2_NUMS.INDEX;
  const expected = VEC2_NUMS.INDEX;

  test('Vector2.prototype.add', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const result = v0.add(v1);
    expectVector2(v0, expected);
    expect(result).toBe(v0);
    expectVector2(v1, nums1);
  });

  test('vec2.add', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const result = vec2.add(v0, v1);
    expectVector2(result, expected);
    expectVector2(v0, nums0);
    expectVector2(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const target = vec2();
    const result = vec2.add(v0, v1, target);
    expectVector2(target, expected);
    expect(result).toBe(target);
  });
});

describe('subtract', () => {
  const nums0 = VEC2_NUMS.INDEX;
  const nums1 = VEC2_NUMS.INDEX;
  const expected = VEC2_NUMS.ZERO;

  test('Vector2.prototype.subtract', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const result = v0.subtract(v1);
    expectVector2(v0, expected);
    expect(result).toBe(v0);
    expectVector2(v1, nums1);
  });

  test('vec2.subtract', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const result = vec2.subtract(v0, v1);
    expectVector2(result, expected);
    expectVector2(v0, nums0);
    expectVector2(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const target = vec2();
    const result = vec2.subtract(v0, v1, target);
    expectVector2(target, expected);
    expect(result).toBe(target);
  });
});

describe('scale', () => {
  const nums = VEC2_NUMS.INDEX;
  const scalar = 2;
  const expected = [0, 2];

  test('Vector2.prototype.scale', () => {
    const v = vec2(nums);
    const result = v.scale(scalar);
    expectVector2(v, expected);
    expect(result).toBe(v);
  });

  test('vec2.scale', () => {
    const v = vec2(nums);
    const result = vec2.scale(v, scalar);
    expectVector2(result, expected);
    expectVector2(v, nums);
  });

  test('store result to target instance', () => {
    const v = vec2(nums);
    const target = vec2();
    const result = vec2.scale(v, scalar, target);
    expectVector2(target, expected);
    expect(result).toBe(target);
  });
});

describe('normalize', () => {
  const nums = [0, 2];
  const expected = [0, 1];

  test('Vector2.prototype.normalize', () => {
    const v = vec2(nums);
    const result = v.normalize();
    expectVector2(v, expected);
    expect(result).toBe(v);
  });

  test('vec2.normalize', () => {
    const v = vec2(nums);
    const result = vec2.normalize(v);
    expectVector2(result, expected);
    expectVector2(v, nums);
  });

  test('store result to target instance', () => {
    const v = vec2(nums);
    const target = vec2();
    const result = vec2.normalize(v, target);
    expectVector2(target, expected);
    expect(result).toBe(target);
  });

  test('throw error for zero vector', () => {
    expect(() => vec2.zero().normalize()).toThrowError();
  });
});

describe('transform', () => {
  const samples = [
    {
      nums: VEC2_NUMS.INDEX,
      // prettier-ignore
      m: mat2(
        0, 1,
        1, 0,
      ),
      expected: VEC2_NUMS.INDEX_REVERSE,
    },
    {
      nums: VEC2_NUMS.INDEX,
      // prettier-ignore
      m: mat3(
        0, 1, 0,
        1, 0, 0,
        1, 1, 1,
      ),
      expected: [2, 1],
    },
  ];

  test('Vector2.prototype.transform', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec2(nums);
      const result = v.transform(m);
      expectVector2(v, expected);
      expect(result).toBe(v);
    }
  });

  test('vec2.transform', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec2(nums);
      const result = vec2.transform(v, m);
      expectVector2(result, expected);
      expectVector2(v, nums);
    }
  });

  test('store result to target instance', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec2(nums);
      const target = vec2();
      const result = vec2.transform(v, m, target);
      expectVector2(target, expected);
      expect(result).toBe(target);
    }
  });
});

describe('dot', () => {
  const nums0 = [0, 1];
  const nums1 = [2, 3];
  const expected = 3;

  test('vec2.dot', () => {
    const v0 = vec2(nums0);
    const v1 = vec2(nums1);
    const result = vec2.dot(v0, v1);
    expect(result).toBe(expected);
  });
});
