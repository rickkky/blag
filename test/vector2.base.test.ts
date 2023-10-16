import { describe, expect, test } from 'vitest';
import { expectVector2 } from './vector2-expect';
import { NUMS } from './vector2-sample';
import { Matrix2, Matrix3, PRECISION, Vector2, vec2 } from '/src';

describe('create', () => {
  test('constructor', () => {
    expectVector2(new Vector2(), NUMS.ZERO);

    expectVector2(new Vector2(...NUMS.INDEX), NUMS.INDEX);

    expectVector2(new Vector2(NUMS.INDEX), NUMS.INDEX);

    expectVector2(new Vector2(new Vector2(NUMS.INDEX)), NUMS.INDEX);
  });

  test('vec2', () => {
    expectVector2(vec2(), NUMS.ZERO);

    expectVector2(vec2(...NUMS.INDEX), NUMS.INDEX);

    expectVector2(vec2(NUMS.INDEX), NUMS.INDEX);

    expectVector2(vec2(new Vector2(NUMS.INDEX)), NUMS.INDEX);
  });
});

describe('set', () => {
  test('Vector2.prototype.set', () => {
    expectVector2(vec2().set(...NUMS.INDEX), NUMS.INDEX);

    expectVector2(vec2().set(NUMS.INDEX), NUMS.INDEX);

    expectVector2(vec2().set(vec2(NUMS.INDEX)), NUMS.INDEX);
  });

  test('index setter', () => {
    const v = vec2();
    v[0] = NUMS.INDEX[0];
    v[1] = NUMS.INDEX[1];
    expectVector2(v, NUMS.INDEX);
  });

  test('xy setter', () => {
    const v = vec2();
    v.x = NUMS.INDEX[0];
    v.y = NUMS.INDEX[1];
    expectVector2(v, NUMS.INDEX);
  });
});

describe('convert to array', () => {
  test('iterator', () => {
    const v = vec2(NUMS.INDEX);
    expect([...v]).toEqual(NUMS.INDEX);
  });

  test('toArray', () => {
    const v = vec2(NUMS.INDEX);
    expect(vec2.toArray(v)).toEqual(NUMS.INDEX);
  });
});
