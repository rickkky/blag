import { describe, expect, test } from 'vitest';
import { Vector2, vec2 } from '/src/vector2';

describe('vector2', () => {
  test('constructor', () => {
    const v0 = new Vector2(1, 2);
    expect(v0.dimension).toBe(2);
    expect(v0[0]).toBe(1);
    expect(v0.x).toBe(1);
    expect(v0[1]).toBe(2);
    expect(v0.y).toBe(2);
    expect(v0.size).toBe(Math.hypot(1, 2));
  });

  test('create', () => {
    const v0 = vec2(1, 2);
    expect(v0.dimension).toBe(2);
    expect(v0[0]).toBe(1);
    expect(v0.x).toBe(1);
    expect(v0[1]).toBe(2);
    expect(v0.y).toBe(2);
    expect(v0.size).toBe(Math.hypot(1, 2));
  });

  test('equal', () => {
    expect(vec2(1, 2).equal(vec2(1, 2))).toBe(true);
    expect(vec2(1, 2).equal(vec2(2, 1))).toBe(false);
  });

  test('constructor overloads', () => {
    const v0 = new Vector2(1, 2);
    const v1 = new Vector2([1, 2]);
    expect(v1.equal(v0)).toBe(true);
    const v2 = new Vector2(v0);
    expect(v2.equal(v0)).toBe(true);
  });

  test('create overloads', () => {
    const v0 = vec2(1, 2);
    const v1 = vec2([1, 2]);
    expect(v1.equal(v0)).toBe(true);
    const v2 = vec2(v0);
    expect(v2.equal(v0)).toBe(true);
  });

  test('setter', () => {
    const v = vec2(1, 2);
    v.set(3, 4);
    expect(v.equal(vec2(3, 4))).toBe(true);
    v[0] = 5;
    v[1] = 6;
    expect(v.equal(vec2(5, 6))).toBe(true);
    v.x = 7;
    v.y = 8;
    expect(v.equal(vec2(7, 8))).toBe(true);
  });

  test('2d getter', () => {
    const v = vec2(1, 2);
    expect(v.xy.equal(vec2(1, 2))).toBe(true);
    expect(v.yx.equal(vec2(2, 1))).toBe(true);
  });

  test('clone', () => {
    const v = vec2(1, 2);
    const c = v.clone();
    expect(c).not.toBe(v);
    expect(c.equal(v)).toBe(true);
  });

  test('iterator', () => {
    const v = vec2(1, 2);
    const array = [...v];
    expect(array).toEqual([1, 2]);
  });

  test('add', () => {
    const v = vec2(1, 2).add(vec2(2, 1));
    expect(v.equal(vec2(3, 3))).toBe(true);
  });

  test('substract', () => {
    const v = vec2(1, 2).substract(vec2(2, 1));
    expect(v.equal(vec2(-1, 1))).toBe(true);
  });

  test('scale', () => {
    const v = vec2(1, 2).scale(2);
    expect(v.equal(vec2(2, 4))).toBe(true);
  });

  test('normalize', () => {
    const v0 = vec2(1, 2);
    const v1 = v0.clone().normalize();
    expect(v1.equal(v0.clone().scale(1 / v0.size))).toBe(true);
  });

  test('dot', () => {
    const v0 = vec2(1, 2);
    const v1 = vec2(2, 1);
    expect(v0.dot(v1)).toBe(4);
  });
});
