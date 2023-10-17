import { describe, expect, test } from 'vitest';
import { VEC3_NUMS, expectVector3 } from './vector3-prepare';
import { mat3, mat4, vec3 } from '/src';

describe('add', () => {
  const nums0 = VEC3_NUMS.ZERO;
  const nums1 = VEC3_NUMS.INDEX;
  const expected = VEC3_NUMS.INDEX;

  test('Vector3.prototype.add', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = v0.add(v1);
    expectVector3(v0, expected);
    expect(result).toBe(v0);
    expectVector3(v1, nums1);
  });

  test('vec3.add', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = vec3.add(v0, v1);
    expectVector3(result, expected);
    expectVector3(v0, nums0);
    expectVector3(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const target = vec3();
    const result = vec3.add(v0, v1, target);
    expectVector3(target, expected);
    expect(result).toBe(target);
  });
});

describe('subtract', () => {
  const nums0 = VEC3_NUMS.INDEX;
  const nums1 = VEC3_NUMS.INDEX;
  const expected = VEC3_NUMS.ZERO;

  test('Vector3.prototype.subtract', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = v0.subtract(v1);
    expectVector3(v0, expected);
    expect(result).toBe(v0);
    expectVector3(v1, nums1);
  });

  test('vec3.subtract', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = vec3.subtract(v0, v1);
    expectVector3(result, expected);
    expectVector3(v0, nums0);
    expectVector3(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const target = vec3();
    const result = vec3.subtract(v0, v1, target);
    expectVector3(target, expected);
    expect(result).toBe(target);
  });
});

describe('scale', () => {
  const nums = VEC3_NUMS.INDEX;
  const scalar = 2;
  const expected = [0, 2, 4];

  test('Vector3.prototype.scale', () => {
    const v = vec3(nums);
    const result = v.scale(scalar);
    expectVector3(v, expected);
    expect(result).toBe(v);
  });

  test('vec3.scale', () => {
    const v = vec3(nums);
    const result = vec3.scale(v, scalar);
    expectVector3(result, expected);
    expectVector3(v, nums);
  });

  test('store result to target instance', () => {
    const v = vec3(nums);
    const target = vec3();
    const result = vec3.scale(v, scalar, target);
    expectVector3(target, expected);
    expect(result).toBe(target);
  });
});

describe('normalize', () => {
  const nums = [0, 0, 2];
  const expected = [0, 0, 1];

  test('Vector3.prototype.normalize', () => {
    const v = vec3(nums);
    const result = v.normalize();
    expectVector3(v, expected);
    expect(result).toBe(v);
  });

  test('vec3.normalize', () => {
    const v = vec3(nums);
    const result = vec3.normalize(v);
    expectVector3(result, expected);
    expectVector3(v, nums);
  });

  test('store result to target instance', () => {
    const v = vec3(nums);
    const target = vec3();
    const result = vec3.normalize(v, target);
    expectVector3(target, expected);
    expect(result).toBe(target);
  });

  test('throw error for zero vector', () => {
    expect(() => vec3.zero().normalize()).toThrowError();
  });
});

describe('transform', () => {
  const samples = [
    {
      nums: VEC3_NUMS.INDEX,
      // prettier-ignore
      m: mat3(
        0, 0, 1,
        0, 1, 0,
        1, 0, 0,
      ),
      expected: VEC3_NUMS.INDEX_REVERSE,
    },
    {
      nums: VEC3_NUMS.INDEX,
      // prettier-ignore
      m: mat4(
        0, 0, 1, 0,
        0, 1, 0, 0,
        1, 0, 0, 0,
        1, 1, 1, 1,
      ),
      expected: [3, 2, 1],
    },
  ];

  test('Vector3.prototype.transform', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec3(nums);
      const result = v.transform(m);
      expectVector3(v, expected);
      expect(result).toBe(v);
    }
  });

  test('vec3.transform', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec3(nums);
      const result = vec3.transform(v, m);
      expectVector3(result, expected);
      expectVector3(v, nums);
    }
  });

  test('store result to target instance', () => {
    for (const { nums, m, expected } of samples) {
      const v = vec3(nums);
      const target = vec3();
      const result = vec3.transform(v, m, target);
      expectVector3(target, expected);
      expect(result).toBe(target);
    }
  });
});

describe('dot', () => {
  const nums0 = [0, 1, 2];
  const nums1 = [3, 4, 5];
  const expected = 14;

  test('vec3.dot', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = vec3.dot(v0, v1);
    expect(result).toBe(expected);
  });
});

describe('cross', () => {
  const nums0 = [0, 1, 2];
  const nums1 = [3, 4, 5];
  const expected = [-3, 6, -3];

  test('Vector3.prototype.cross', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = v0.cross(v1);
    expectVector3(v0, expected);
    expect(result).toBe(v0);
    expectVector3(v1, nums1);
  });

  test('vec3.cross', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const result = vec3.cross(v0, v1);
    expectVector3(result, expected);
    expectVector3(v0, nums0);
    expectVector3(v1, nums1);
  });

  test('store result to target instance', () => {
    const v0 = vec3(nums0);
    const v1 = vec3(nums1);
    const target = vec3();
    const result = vec3.cross(v0, v1, target);
    expectVector3(target, expected);
    expect(result).toBe(target);
  });
});
