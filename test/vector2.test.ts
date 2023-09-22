import { describe, expect, test } from 'vitest';
import { PRECISION } from '/src/constant';
import { Vector2, vec2 } from '/src/vector2';

export const expectVector2 = (v: Vector2, [x, y]: number[]) => {
  expect(v.dimension).toBe(2);
  expect(v[0]).toBe(x);
  expect(v.x).toBe(x);
  expect(v[1]).toBe(y);
  expect(v.y).toBe(y);
  expect(v.size).toBeCloseTo(Math.sqrt(x * x + y * y), 12);
};

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
    const a = vec2();
    a[0] = 0;
    a[1] = 1;
    expectVector2(a, [0, 1]);

    const b = vec2();
    b.x = 0;
    b.y = 1;
    expectVector2(b, [0, 1]);

    expectVector2(vec2().set(0, 1), [0, 1]);

    expectVector2(vec2().set([0, 1]), [0, 1]);

    expectVector2(vec2().set(vec2(0, 1)), [0, 1]);
  });

  test('group getter', () => {
    const v = vec2(0, 1);
    expectVector2(v.xy, [0, 1]);
    expectVector2(v.yx, [1, 0]);
  });

  test('iterator', () => {
    const v = vec2(0, 1);
    expect([...v]).toEqual([0, 1]);
  });

  test('clone', () => {
    const a = vec2(0, 1);
    const b = vec2.clone(a);
    expect(b).not.toBe(a);
    expectVector2(b, [0, 1]);
    const c = a.clone();
    expect(c).not.toBe(a);
    expectVector2(c, [0, 1]);
  });

  test('equals', () => {
    const a = vec2(0, 1);

    const b = vec2(0, 1);
    expect(vec2.equals(a, b)).toBe(true);
    expect(a.equals(b)).toBe(true);

    const c = vec2(1, 0);
    expect(vec2.equals(a, c)).toBe(false);
    expect(a.equals(c)).toBe(false);

    const d = vec2(PRECISION[15], 1);
    expect(vec2.equals(a, d, PRECISION[14])).toBe(true);
    expect(a.equals(d, PRECISION[14])).toBe(true);
    expect(vec2.equals(a, d, PRECISION[15])).toBe(true);
    expect(a.equals(d, PRECISION[15])).toBe(true);
    expect(vec2.equals(a, d, PRECISION[16])).toBe(false);
    expect(a.equals(d, PRECISION[16])).toBe(false);
  });

  test('add', () => {
    const a = vec2(0, 0);
    const b = vec2(0, 1);
    expectVector2(vec2.add(a, b), [0, 1]);
    expectVector2(a, [0, 0]);
    expectVector2(a.add(b), [0, 1]);
    expectVector2(a, [0, 1]);
  });

  test('substract', () => {
    const a = vec2(0, 1);
    const b = vec2(0, 1);
    expectVector2(vec2.substract(a, b), [0, 0]);
    expectVector2(a, [0, 1]);
    expectVector2(a.substract(b), [0, 0]);
    expectVector2(a, [0, 0]);
  });

  test('scale', () => {
    const v = vec2(0, 1);
    expectVector2(vec2.scale(v, 2), [0, 2]);
    expectVector2(v, [0, 1]);
    expectVector2(v.scale(2), [0, 2]);
    expectVector2(v, [0, 2]);
  });

  test.todo('transform');

  test('normalize', () => {
    const v = vec2(0, 2);
    expectVector2(vec2.normalize(v), [0, 1]);
    expectVector2(v, [0, 2]);
    expectVector2(v.normalize(), [0, 1]);
    expectVector2(v, [0, 1]);
  });

  test('zero', () => {
    expectVector2(vec2.zero(), [0, 0]);

    const v = vec2(0, 1).zero();
    expectVector2(v, [0, 0]);
  });

  test('dot', () => {
    const a = vec2(0, 1);
    const b = vec2(2, 3);
    expect(vec2.dot(a, b)).toBe(3);
    expect(a.dot(b)).toBe(3);
  });

  test('toArray', () => {
    const v = vec2(0, 1);
    expect(v.toArray()).toEqual([0, 1]);
  });
});
