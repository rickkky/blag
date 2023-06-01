import { describe, expect, test } from 'vitest';
import { vec2 } from '/src/vector2';

describe('vector2', () => {
  test('create', () => {
    const v = vec2(1, 2);
    expect(v[0]).toBe(1);
    expect(v.x).toBe(1);
    expect(v[1]).toBe(2);
    expect(v.y).toBe(2);
    expect(v.dimension).toBe(2);
    expect(v.size).toBe(Math.hypot(1, 2));
  });

  test('setter', () => {
    const v = vec2(1, 2);
    v.set(3, 4);
    expect(v[0]).toBe(3);
    expect(v.x).toBe(3);
    expect(v[1]).toBe(4);
    expect(v.y).toBe(4);
    v[0] = 5;
    v[1] = 6;
    expect(v[0]).toBe(5);
    expect(v.x).toBe(5);
    expect(v[1]).toBe(6);
    expect(v.y).toBe(6);
    v.x = 7;
    v.y = 8;
    expect(v[0]).toBe(7);
    expect(v.x).toBe(7);
    expect(v[1]).toBe(8);
    expect(v.y).toBe(8);
  });

  test('2d getter', () => {
    const v = vec2(1, 2);
    const xy = v.xy;
    expect(xy[0]).toBe(1);
    expect(xy.x).toBe(1);
    const yx = v.yx;
    expect(yx[0]).toBe(2);
    expect(yx.x).toBe(2);
  });

  test('clone', () => {
    const v = vec2(1, 2);
    const c = v.clone();
    expect(c[0]).toBe(1);
    expect(c.x).toBe(1);
    expect(c[1]).toBe(2);
    expect(c.y).toBe(2);
    expect(c.dimension).toBe(2);
    expect(c.size).toBe(Math.hypot(1, 2));
  });

  test('iterator', () => {
    const v = vec2(1, 2);
    const array = [...v];
    expect(array[0]).toBe(1);
    expect(array[1]).toBe(2);
  });

  test('equal', () => {
    const v1 = vec2(1, 2);
    const v2 = vec2(1, 2);
    const v3 = vec2(2, 1);
    expect(v1.equal(v2)).toBe(true);
    expect(v1.equal(v3)).toBe(false);
  });

  test('add', () => {
    const v1 = vec2(1, 2);
    const v2 = vec2(2, 1);
    v1.add(v2);
    expect(v1.x).toBe(3);
    expect(v1.y).toBe(3);
  });

  test('substract', () => {
    const v1 = vec2(1, 2);
    const v2 = vec2(2, 1);
    v1.substract(v2);
    expect(v1.x).toBe(-1);
    expect(v1.y).toBe(1);
  });

  test('scale', () => {
    const v1 = vec2(1, 2);
    v1.scale(2);
    expect(v1.x).toBe(2);
    expect(v1.y).toBe(4);
  });

  test('normalize', () => {
    const v1 = vec2(1, 2);
    const v2 = v1.clone().normalize();
    expect(v2.x).toBe(v1.x / v1.size);
    expect(v2.y).toBe(v1.y / v1.size);
  });

  test('dot', () => {
    const v1 = vec2(1, 2);
    const v2 = vec2(2, 1);
    expect(v1.dot(v2)).toBe(4);
  });
});
