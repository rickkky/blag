import { describe, expect, test } from 'vitest';
import { VEC4_NUMS, expectVector4 } from './vector4-prepare';
import { PRECISION, Vector4, vec3, vec4, vec2 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectVector4(new Vector4(), VEC4_NUMS.ZERO);

    expectVector4(new Vector4(0, 1, 2, 3), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(VEC4_NUMS.INDEX), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(new Vector4(VEC4_NUMS.INDEX)), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(vec3(0, 1, 2), 3), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(0, vec3(1, 2, 3)), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(vec2(0, 1), vec2(2, 3)), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(vec2(0, 1), 2, 3), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(0, vec2(1, 2), 3), VEC4_NUMS.INDEX);

    expectVector4(new Vector4(0, 1, vec2(2, 3)), VEC4_NUMS.INDEX);
  });

  test('vec4', () => {
    expectVector4(vec4(), VEC4_NUMS.ZERO);

    expectVector4(vec4(0, 1, 2, 3), VEC4_NUMS.INDEX);

    expectVector4(vec4(VEC4_NUMS.INDEX), VEC4_NUMS.INDEX);

    expectVector4(vec4(vec4(VEC4_NUMS.INDEX)), VEC4_NUMS.INDEX);

    expectVector4(vec4(vec3(0, 1, 2), 3), VEC4_NUMS.INDEX);

    expectVector4(vec4(0, vec3(1, 2, 3)), VEC4_NUMS.INDEX);

    expectVector4(vec4(vec2(0, 1), vec2(2, 3)), VEC4_NUMS.INDEX);

    expectVector4(vec4(vec2(0, 1), 2, 3), VEC4_NUMS.INDEX);

    expectVector4(vec4(0, vec2(1, 2), 3), VEC4_NUMS.INDEX);

    expectVector4(vec4(0, 1, vec2(2, 3)), VEC4_NUMS.INDEX);
  });
});

describe('set', () => {
  test('Vector4.prototype.set', () => {
    expectVector4(vec4().set(0, 1, 2, 3), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(VEC4_NUMS.INDEX), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(vec4(VEC4_NUMS.INDEX)), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(vec3(0, 1, 2), 3), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(0, vec3(1, 2, 3)), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(vec2(0, 1), vec2(2, 3)), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(vec2(0, 1), 2, 3), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(0, vec2(1, 2), 3), VEC4_NUMS.INDEX);

    expectVector4(vec4().set(0, 1, vec2(2, 3)), VEC4_NUMS.INDEX);
  });

  test('index setter', () => {
    const v = vec4();
    v[0] = VEC4_NUMS.INDEX[0];
    v[1] = VEC4_NUMS.INDEX[1];
    v[2] = VEC4_NUMS.INDEX[2];
    v[3] = VEC4_NUMS.INDEX[3];
    expectVector4(v, VEC4_NUMS.INDEX);
  });

  test('xyzw setter', () => {
    const v = vec4();
    v.x = VEC4_NUMS.INDEX[0];
    v.y = VEC4_NUMS.INDEX[1];
    v.z = VEC4_NUMS.INDEX[2];
    v.w = VEC4_NUMS.INDEX[3];
    expectVector4(v, VEC4_NUMS.INDEX);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const v = vec4(VEC4_NUMS.INDEX);
    expect([...v]).toEqual(VEC4_NUMS.INDEX);
  });

  test('vec4.toArray', () => {
    const v = vec4(VEC4_NUMS.INDEX);
    expect(v.toArray()).toEqual(VEC4_NUMS.INDEX);
  });
});

describe('clone', () => {
  test('Vector4.prototype.clone', () => {
    const v = vec4(VEC4_NUMS.INDEX);
    const result = v.clone();
    expectVector4(result, VEC4_NUMS.INDEX);
    expect(result).not.toBe(v);
  });

  test('vec4.clone', () => {
    const v = vec4(VEC4_NUMS.INDEX);
    const result = vec4.clone(v);
    expectVector4(result, VEC4_NUMS.INDEX);
    expect(result).not.toBe(v);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const v0 = vec4(VEC4_NUMS.ZERO);

    const v1 = vec4(VEC4_NUMS.ZERO);
    expect(v0.equals(v1)).toBe(true);

    const v2 = vec4(VEC4_NUMS.INDEX);
    expect(v0.equals(v2)).toBe(false);
  });

  test('approximately equals', () => {
    const v0 = vec4(VEC4_NUMS.ZERO);

    const v1 = vec4(0, 0, PRECISION[15]);
    expect(vec4.equals(v0, v1, PRECISION[14])).toBe(true);
    expect(vec4.equals(v0, v1, PRECISION[15])).toBe(true);
    expect(vec4.equals(v0, v1, PRECISION[16])).toBe(false);
  });
});
