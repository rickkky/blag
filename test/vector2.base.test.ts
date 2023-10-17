import { describe, expect, test } from 'vitest';
import { VEC2_NUMS, expectVector2 } from './vector2-prepare';
import { PRECISION, Vector2, vec2 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectVector2(new Vector2(), VEC2_NUMS.ZERO);

    expectVector2(new Vector2(0, 1), VEC2_NUMS.INDEX);

    expectVector2(new Vector2(VEC2_NUMS.INDEX), VEC2_NUMS.INDEX);

    expectVector2(new Vector2(new Vector2(VEC2_NUMS.INDEX)), VEC2_NUMS.INDEX);
  });

  test('vec2', () => {
    expectVector2(vec2(), VEC2_NUMS.ZERO);

    expectVector2(vec2(0, 1), VEC2_NUMS.INDEX);

    expectVector2(vec2(VEC2_NUMS.INDEX), VEC2_NUMS.INDEX);

    expectVector2(vec2(vec2(VEC2_NUMS.INDEX)), VEC2_NUMS.INDEX);
  });
});

describe('set', () => {
  test('Vector2.prototype.set', () => {
    expectVector2(vec2().set(0, 1), VEC2_NUMS.INDEX);

    expectVector2(vec2().set(VEC2_NUMS.INDEX), VEC2_NUMS.INDEX);

    expectVector2(vec2().set(vec2(VEC2_NUMS.INDEX)), VEC2_NUMS.INDEX);
  });

  test('index setter', () => {
    const v = vec2();
    v[0] = VEC2_NUMS.INDEX[0];
    v[1] = VEC2_NUMS.INDEX[1];
    expectVector2(v, VEC2_NUMS.INDEX);
  });

  test('xy setter', () => {
    const v = vec2();
    v.x = VEC2_NUMS.INDEX[0];
    v.y = VEC2_NUMS.INDEX[1];
    expectVector2(v, VEC2_NUMS.INDEX);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const v = vec2(VEC2_NUMS.INDEX);
    expect([...v]).toEqual(VEC2_NUMS.INDEX);
  });

  test('vec2.toArray', () => {
    const v = vec2(VEC2_NUMS.INDEX);
    expect(vec2.toArray(v)).toEqual(VEC2_NUMS.INDEX);
  });
});

describe('clone', () => {
  test('clone to a new instance', () => {
    const v0 = vec2(VEC2_NUMS.INDEX);
    const result = vec2.clone(v0);
    expectVector2(result, VEC2_NUMS.INDEX);
    expect(result).not.toBe(v0);
  });

  test('clone to target instance', () => {
    const v0 = vec2(VEC2_NUMS.INDEX);
    const v1 = vec2();
    const result = vec2.clone(v0, v1);
    expectVector2(v1, VEC2_NUMS.INDEX);
    expect(result).toBe(v1);
  });
});

describe('equals', () => {
  test('exactly equals', () => {
    const v0 = vec2(VEC2_NUMS.ZERO);

    const v1 = vec2(VEC2_NUMS.ZERO);
    expect(vec2.equals(v0, v1)).toBe(true);

    const v2 = vec2(VEC2_NUMS.INDEX);
    expect(vec2.equals(v0, v2)).toBe(false);
  });

  test('approximately equals', () => {
    const v0 = vec2(VEC2_NUMS.ZERO);

    const v1 = vec2(0, PRECISION[15]);
    expect(vec2.equals(v0, v1, PRECISION[14])).toBe(true);
    expect(vec2.equals(v0, v1, PRECISION[15])).toBe(true);
    expect(vec2.equals(v0, v1, PRECISION[16])).toBe(false);
  });
});
