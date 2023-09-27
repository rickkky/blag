import { describe, expect, test } from 'vitest';
import { expectVector2 } from './vector2-expect';
import { Matrix2, Matrix3, PRECISION, Vector2, vec2 } from '/src';

describe('vector2', () => {
  test('constructor', () => {
    expectVector2(new Vector2(), [0, 0]);

    expectVector2(new Vector2(0, 1), [0, 1]);

    expectVector2(new Vector2([0, 1]), [0, 1]);

    expectVector2(new Vector2(new Vector2(0, 1)), [0, 1]);
  });

  test('create', () => {
    expectVector2(vec2(), [0, 0]);

    expectVector2(vec2(0, 1), [0, 1]);

    expectVector2(vec2([0, 1]), [0, 1]);

    expectVector2(vec2(vec2(0, 1)), [0, 1]);
  });

  test('setter', () => {
    const v0 = vec2();
    v0[0] = 0;
    v0[1] = 1;
    expectVector2(v0, [0, 1]);

    const v1 = vec2();
    v1.x = 0;
    v1.y = 1;
    expectVector2(v1, [0, 1]);

    expectVector2(vec2().set(0, 1), [0, 1]);

    expectVector2(vec2().set([0, 1]), [0, 1]);

    expectVector2(vec2().set(vec2(0, 1)), [0, 1]);
  });

  test('iterator', () => {
    const v = vec2(0, 1);
    expect([...v]).toEqual([0, 1]);
  });

  test('clone', () => {
    const v0 = vec2(0, 1);
    const v1 = vec2.clone(v0);
    expect(v1).not.toBe(v0);
    expectVector2(v1, [0, 1]);
    const v2 = v0.clone();
    expect(v2).not.toBe(v0);
    expectVector2(v2, [0, 1]);
  });

  test('equals', () => {
    const v0 = vec2(0, 1);

    const v1 = vec2(0, 1);
    expect(vec2.equals(v0, v1)).toBe(true);
    expect(v0.equals(v1)).toBe(true);

    const v2 = vec2(1, 0);
    expect(vec2.equals(v0, v2)).toBe(false);
    expect(v0.equals(v2)).toBe(false);

    const v3 = vec2(PRECISION[15], 1);
    expect(vec2.equals(v0, v3, PRECISION[14])).toBe(true);
    expect(v0.equals(v3, PRECISION[14])).toBe(true);
    expect(vec2.equals(v0, v3, PRECISION[15])).toBe(true);
    expect(v0.equals(v3, PRECISION[15])).toBe(true);
    expect(vec2.equals(v0, v3, PRECISION[16])).toBe(false);
    expect(v0.equals(v3, PRECISION[16])).toBe(false);
  });

  test('add', () => {
    const v0 = vec2(0, 0);
    const v1 = vec2(0, 1);
    expectVector2(vec2.add(v0, v1), [0, 1]);
    expectVector2(v0, [0, 0]);
    expectVector2(v0.add(v1), [0, 1]);
    expectVector2(v0, [0, 1]);
  });

  test('substract', () => {
    const v0 = vec2(0, 1);
    const v1 = vec2(0, 1);
    expectVector2(vec2.substract(v0, v1), [0, 0]);
    expectVector2(v0, [0, 1]);
    expectVector2(v0.substract(v1), [0, 0]);
    expectVector2(v0, [0, 0]);
  });

  test('scale', () => {
    const v = vec2(0, 1);
    expectVector2(vec2.scale(v, 2), [0, 2]);
    expectVector2(v, [0, 1]);
    expectVector2(v.scale(2), [0, 2]);
    expectVector2(v, [0, 2]);
  });

  test('transform', () => {
    const v0 = vec2(0, 1);
    // prettier-ignore
    const m0 = new Matrix2(
      0, 1,
      1, 0
    );
    expectVector2(vec2.transform(v0, m0), [1, 0]);
    expectVector2(v0, [0, 1]);
    expectVector2(v0.transform(m0), [1, 0]);
    expectVector2(v0, [1, 0]);

    const v1 = vec2(0, 1);
    // prettier-ignore
    const m1 = new Matrix3(
      0, 1, 0,
      1, 0, 0,
      1, 1, 1,
    )
    expectVector2(vec2.transform(v1, m1), [2, 1]);
    expectVector2(v1, [0, 1]);
    expectVector2(v1.transform(m1), [2, 1]);
    expectVector2(v1, [2, 1]);
  });

  test('normalize', () => {
    const v = vec2(0, 2);
    expectVector2(vec2.normalize(v), [0, 1]);
    expectVector2(v, [0, 2]);
    expectVector2(v.normalize(), [0, 1]);
    expectVector2(v, [0, 1]);

    expect(() => vec2(0, 0).normalize()).toThrowError();
  });

  test('zero', () => {
    expectVector2(vec2.zero(), [0, 0]);

    const v = vec2(0, 1).zero();
    expectVector2(v, [0, 0]);
  });

  test('dot', () => {
    const v0 = vec2(0, 1);
    const v1 = vec2(2, 3);
    expect(vec2.dot(v0, v1)).toBe(3);
    expect(v0.dot(v1)).toBe(3);
  });

  test('toArray', () => {
    const v = vec2(0, 1);
    expect(v.toArray()).toEqual([0, 1]);
  });
});
