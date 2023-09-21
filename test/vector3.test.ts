import { describe, expect, test } from 'vitest';
import { vec2 } from '/src/vector2';
import { Vector3, vec3 } from '/src/vector3';

describe('vector3', () => {
  test('constructor', () => {
    const v = new Vector3(1, 2, 3);
    expect(v.dimension).toBe(3);
    expect(v[0]).toBe(1);
    expect(v.x).toBe(1);
    expect(v[1]).toBe(2);
    expect(v.y).toBe(2);
    expect(v[2]).toBe(3);
    expect(v.z).toBe(3);
    expect(v.size).toBe(Math.hypot(1, 2, 3));
  });

  test('create', () => {
    const v = vec3(1, 2, 3);
    expect(v.dimension).toBe(3);
    expect(v[0]).toBe(1);
    expect(v.x).toBe(1);
    expect(v[1]).toBe(2);
    expect(v.y).toBe(2);
    expect(v[2]).toBe(3);
    expect(v.z).toBe(3);
    expect(v.size).toBe(Math.hypot(1, 2, 3));
  });

  test('equal', () => {
    expect(vec3(1, 2, 3).equals(vec3(1, 2, 3))).toBe(true);
    expect(vec3(1, 2, 3).equals(vec3(3, 2, 1))).toBe(false);
  });

  test('setter', () => {
    const v = vec3(1, 2, 3);
    v.set(4, 5, 6);
    expect(v.equals(vec3(4, 5, 6))).toBe(true);
    v[0] = 7;
    v[1] = 8;
    v[2] = 9;
    expect(v.equals(vec3(7, 8, 9))).toBe(true);
    v.x = 10;
    v.y = 11;
    v.z = 12;
    expect(v.equals(vec3(10, 11, 12))).toBe(true);
  });

  test('2d getter', () => {
    const v = vec3(1, 2, 3);
    expect(v.xy.equals(vec2(1, 2))).toBe(true);
    expect(v.xz.equals(vec2(1, 3))).toBe(true);
    expect(v.yx.equals(vec2(2, 1))).toBe(true);
    expect(v.yz.equals(vec2(2, 3))).toBe(true);
    expect(v.zx.equals(vec2(3, 1))).toBe(true);
    expect(v.zy.equals(vec2(3, 2))).toBe(true);
  });

  test('3d getter', () => {
    const v = vec3(1, 2, 3);
    expect(v.xyz.equals(vec3(1, 2, 3))).toBe(true);
    expect(v.xzy.equals(vec3(1, 3, 2))).toBe(true);
    expect(v.yxz.equals(vec3(2, 1, 3))).toBe(true);
    expect(v.yzx.equals(vec3(2, 3, 1))).toBe(true);
    expect(v.zxy.equals(vec3(3, 1, 2))).toBe(true);
    expect(v.zyx.equals(vec3(3, 2, 1))).toBe(true);
  });

  test('constructor overloads', () => {
    const v0 = new Vector3(1, 2, 3);
    const v1 = new Vector3([1, 2, 3]);
    expect(v1.equals(v0)).toBe(true);
    const v2 = new Vector3(v0);
    expect(v2.equals(v0)).toBe(true);
    const v3 = new Vector3(v0.xy, 3);
    expect(v3.equals(v0)).toBe(true);
    const v4 = new Vector3(1, v0.yz);
    expect(v4.equals(v0)).toBe(true);
  });

  test('create overloads', () => {
    const v0 = vec3(1, 2, 3);
    const v1 = vec3([1, 2, 3]);
    expect(v1.equals(v0)).toBe(true);
    const v2 = vec3(v0);
    expect(v2.equals(v0)).toBe(true);
    const v3 = vec3(v0.xy, 3);
    expect(v3.equals(v0)).toBe(true);
    const v4 = vec3(1, v0.yz);
    expect(v4.equals(v0)).toBe(true);
  });

  test('set overloads', () => {
    const v = vec3(1, 2, 3);
    v.set([4, 5, 6]);
    expect(v.equals(vec3(4, 5, 6))).toBe(true);
    v.set(vec3(7, 8, 9));
    expect(v.equals(vec3(7, 8, 9))).toBe(true);
    v.set(vec2(10, 11), 12);
    expect(v.equals(vec3(10, 11, 12))).toBe(true);
    v.set(13, vec2(14, 15));
    expect(v.equals(vec3(13, 14, 15))).toBe(true);
  });

  test('clone', () => {
    const v = vec3(1, 2, 3);
    const c = v.clone();
    expect(c).not.toBe(v);
    expect(c.equals(v)).toBe(true);
  });

  test('iterator', () => {
    const v = vec3(1, 2, 3);
    const array = [...v];
    expect(array).toEqual([1, 2, 3]);
  });

  test('add', () => {
    const v = vec3(1, 2, 3).add(vec3(3, 2, 1));
    expect(v.equals(vec3(4, 4, 4))).toBe(true);
  });

  test('substract', () => {
    const v = vec3(1, 2, 3).substract(vec3(3, 2, 1));
    expect(v.equals(vec3(-2, 0, 2))).toBe(true);
  });

  test('scale', () => {
    const v = vec3(1, 2, 3).scale(2);
    expect(v.equals(vec3(2, 4, 6))).toBe(true);
  });

  test('normalize', () => {
    const v0 = vec3(1, 2, 3);
    const v1 = v0.clone().normalize();
    expect(v1.equals(v0.clone().scale(1 / v0.size))).toBe(true);
  });

  test('dot', () => {
    const v0 = vec3(1, 2, 3);
    const v1 = vec3(3, 2, 1);
    expect(v0.dot(v1)).toBe(10);
  });

  test('cross', () => {
    const v0 = vec3(1, 2, 3);
    const v1 = vec3(3, 2, 1);
    expect(v0.cross(v1).equals(vec3(-4, 8, -4))).toBe(true);
  });
});
