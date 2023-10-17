import { describe, expect, test } from 'vitest';
import { VEC3_NUMS, expectVector3 } from './vector3-prepare';
import { PRECISION, Vector3, vec3, vec2 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectVector3(new Vector3(), VEC3_NUMS.ZERO);

    expectVector3(new Vector3(0, 1, 2), VEC3_NUMS.INDEX);

    expectVector3(new Vector3(VEC3_NUMS.INDEX), VEC3_NUMS.INDEX);

    expectVector3(new Vector3(new Vector3(VEC3_NUMS.INDEX)), VEC3_NUMS.INDEX);

    expectVector3(new Vector3(vec2(0, 1), 2), VEC3_NUMS.INDEX);

    expectVector3(new Vector3(0, vec2(1, 2)), VEC3_NUMS.INDEX);
  });

  test('vec3', () => {
    expectVector3(vec3(), VEC3_NUMS.ZERO);

    expectVector3(vec3(0, 1, 2), VEC3_NUMS.INDEX);

    expectVector3(vec3(VEC3_NUMS.INDEX), VEC3_NUMS.INDEX);

    expectVector3(vec3(vec3(VEC3_NUMS.INDEX)), VEC3_NUMS.INDEX);

    expectVector3(vec3(vec2(0, 1), 2), VEC3_NUMS.INDEX);

    expectVector3(vec3(0, vec2(1, 2)), VEC3_NUMS.INDEX);
  });
});

describe('set', () => {
  test('Vector3.prototype.set', () => {
    expectVector3(vec3().set(0, 1, 2), VEC3_NUMS.INDEX);

    expectVector3(vec3().set(VEC3_NUMS.INDEX), VEC3_NUMS.INDEX);

    expectVector3(vec3().set(vec3(VEC3_NUMS.INDEX)), VEC3_NUMS.INDEX);

    expectVector3(vec3().set(vec2(0, 1), 2), VEC3_NUMS.INDEX);

    expectVector3(vec3().set(0, vec2(1, 2)), VEC3_NUMS.INDEX);
  });

  test('index setter', () => {
    const v = vec3();
    v[0] = VEC3_NUMS.INDEX[0];
    v[1] = VEC3_NUMS.INDEX[1];
    v[2] = VEC3_NUMS.INDEX[2];
    expectVector3(v, VEC3_NUMS.INDEX);
  });

  test('xyz setter', () => {
    const v = vec3();
    v.x = VEC3_NUMS.INDEX[0];
    v.y = VEC3_NUMS.INDEX[1];
    v.z = VEC3_NUMS.INDEX[2];
    expectVector3(v, VEC3_NUMS.INDEX);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const v = vec3(VEC3_NUMS.INDEX);
    expect([...v]).toEqual(VEC3_NUMS.INDEX);
  });

  test('vec3.toArray', () => {
    const v = vec3(VEC3_NUMS.INDEX);
    expect(vec3.toArray(v)).toEqual(VEC3_NUMS.INDEX);
  });
});

describe('clone', () => {
  test('Vector3.prototype.clone', () => {
    const v = vec3(VEC3_NUMS.INDEX);
    const result = v.clone();
    expectVector3(result, VEC3_NUMS.INDEX);
    expect(result).not.toBe(v);
  });

  test('vec3.clone', () => {
    const v = vec3(VEC3_NUMS.INDEX);
    const result = vec3.clone(v);
    expectVector3(result, VEC3_NUMS.INDEX);
    expect(result).not.toBe(v);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const v0 = vec3(VEC3_NUMS.ZERO);

    const v1 = vec3(VEC3_NUMS.ZERO);
    expect(v0.equals(v1)).toBe(true);

    const v2 = vec3(VEC3_NUMS.INDEX);
    expect(v0.equals(v2)).toBe(false);
  });

  test('approximately equals', () => {
    const v0 = vec3(VEC3_NUMS.ZERO);

    const v1 = vec3(0, 0, PRECISION[15]);
    expect(vec3.equals(v0, v1, PRECISION[14])).toBe(true);
    expect(vec3.equals(v0, v1, PRECISION[15])).toBe(true);
    expect(vec3.equals(v0, v1, PRECISION[16])).toBe(false);
  });
});
