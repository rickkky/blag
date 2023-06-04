import { describe, expect, test } from 'vitest';
import { vec2 } from '/src/vector2';
import { vec3 } from '/src/vector3';
import { Vector4, vec4 } from '/src/vector4';

describe('vector4', () => {
  test('constructor', () => {
    const v = new Vector4(1, 2, 3, 4);
    expect(v.dimension).toBe(4);
    expect(v[0]).toBe(1);
    expect(v.x).toBe(1);
    expect(v[1]).toBe(2);
    expect(v.y).toBe(2);
    expect(v[2]).toBe(3);
    expect(v.z).toBe(3);
    expect(v[3]).toBe(4);
    expect(v.w).toBe(4);
    expect(v.size).toBe(Math.hypot(1, 2, 3, 4));
  });

  test('create', () => {
    const v = vec4(1, 2, 3, 4);
    expect(v.dimension).toBe(4);
    expect(v[0]).toBe(1);
    expect(v.x).toBe(1);
    expect(v[1]).toBe(2);
    expect(v.y).toBe(2);
    expect(v[2]).toBe(3);
    expect(v.z).toBe(3);
    expect(v[3]).toBe(4);
    expect(v.w).toBe(4);
    expect(v.size).toBe(Math.hypot(1, 2, 3, 4));
  });

  test('equal', () => {
    expect(vec4(1, 2, 3, 4).equal(vec4(1, 2, 3, 4))).toBe(true);
    expect(vec4(1, 2, 3, 4).equal(vec4(4, 3, 2, 1))).toBe(false);
  });

  test('setter', () => {
    const v = vec4(1, 2, 3, 4);
    v.set(5, 6, 7, 8);
    expect(v.equal(vec4(5, 6, 7, 8))).toBe(true);
    v[0] = 9;
    v[1] = 10;
    v[2] = 11;
    v[3] = 12;
    expect(v.equal(vec4(9, 10, 11, 12))).toBe(true);
    v.x = 13;
    v.y = 14;
    v.z = 15;
    v.w = 16;
    expect(v.equal(vec4(13, 14, 15, 16))).toBe(true);
  });

  test('2d getter', () => {
    const v = vec4(1, 2, 3, 4);
    expect(v.xy.equal(vec2(1, 2))).toBe(true);
    expect(v.xz.equal(vec2(1, 3))).toBe(true);
    expect(v.xw.equal(vec2(1, 4))).toBe(true);
    expect(v.yx.equal(vec2(2, 1))).toBe(true);
    expect(v.yz.equal(vec2(2, 3))).toBe(true);
    expect(v.yw.equal(vec2(2, 4))).toBe(true);
    expect(v.zx.equal(vec2(3, 1))).toBe(true);
    expect(v.zy.equal(vec2(3, 2))).toBe(true);
    expect(v.zw.equal(vec2(3, 4))).toBe(true);
    expect(v.wx.equal(vec2(4, 1))).toBe(true);
    expect(v.wy.equal(vec2(4, 2))).toBe(true);
    expect(v.wz.equal(vec2(4, 3))).toBe(true);
  });

  test('3d getter', () => {
    const v = vec4(1, 2, 3, 4);
    expect(v.xyz.equal(vec3(1, 2, 3))).toBe(true);
    expect(v.xzy.equal(vec3(1, 3, 2))).toBe(true);
    expect(v.xyw.equal(vec3(1, 2, 4))).toBe(true);
    expect(v.xwy.equal(vec3(1, 4, 2))).toBe(true);
    expect(v.xzw.equal(vec3(1, 3, 4))).toBe(true);
    expect(v.xwz.equal(vec3(1, 4, 3))).toBe(true);
    expect(v.yxz.equal(vec3(2, 1, 3))).toBe(true);
    expect(v.yzx.equal(vec3(2, 3, 1))).toBe(true);
    expect(v.yxw.equal(vec3(2, 1, 4))).toBe(true);
    expect(v.ywx.equal(vec3(2, 4, 1))).toBe(true);
    expect(v.yzw.equal(vec3(2, 3, 4))).toBe(true);
    expect(v.ywz.equal(vec3(2, 4, 3))).toBe(true);
    expect(v.zxy.equal(vec3(3, 1, 2))).toBe(true);
    expect(v.zyx.equal(vec3(3, 2, 1))).toBe(true);
    expect(v.zxw.equal(vec3(3, 1, 4))).toBe(true);
    expect(v.zwx.equal(vec3(3, 4, 1))).toBe(true);
    expect(v.zyw.equal(vec3(3, 2, 4))).toBe(true);
    expect(v.zwy.equal(vec3(3, 4, 2))).toBe(true);
    expect(v.wxy.equal(vec3(4, 1, 2))).toBe(true);
    expect(v.wyx.equal(vec3(4, 2, 1))).toBe(true);
    expect(v.wxz.equal(vec3(4, 1, 3))).toBe(true);
    expect(v.wzx.equal(vec3(4, 3, 1))).toBe(true);
    expect(v.wyz.equal(vec3(4, 2, 3))).toBe(true);
    expect(v.wzy.equal(vec3(4, 3, 2))).toBe(true);
  });

  test('constructor overloads', () => {
    const v0 = new Vector4(1, 2, 3, 4);
    const v1 = new Vector4([1, 2, 3, 4]);
    expect(v1.equal(v0)).toBe(true);
    const v2 = new Vector4(v0);
    expect(v2.equal(v0)).toBe(true);
    const v3 = new Vector4(v0.xyz, 4);
    expect(v3.equal(v0)).toBe(true);
    const v4 = new Vector4(1, v0.yzw);
    expect(v4.equal(v0)).toBe(true);
    const v5 = new Vector4(v0.xy, v0.zw);
    expect(v5.equal(v0)).toBe(true);
    const v6 = new Vector4(v0.xy, 3, 4);
    expect(v6.equal(v0)).toBe(true);
    const v7 = new Vector4(1, v0.yz, 4);
    expect(v7.equal(v0)).toBe(true);
    const v8 = new Vector4(1, 2, v0.zw);
    expect(v8.equal(v0)).toBe(true);
  });

  test('create overloads', () => {
    const v0 = vec4(1, 2, 3, 4);
    const v1 = vec4([1, 2, 3, 4]);
    expect(v1.equal(v0)).toBe(true);
    const v2 = vec4(v0);
    expect(v2.equal(v0)).toBe(true);
    const v3 = vec4(v0.xyz, 4);
    expect(v3.equal(v0)).toBe(true);
    const v4 = vec4(1, v0.yzw);
    expect(v4.equal(v0)).toBe(true);
    const v5 = vec4(v0.xy, v0.zw);
    expect(v5.equal(v0)).toBe(true);
    const v6 = vec4(v0.xy, 3, 4);
    expect(v6.equal(v0)).toBe(true);
    const v7 = vec4(1, v0.yz, 4);
    expect(v7.equal(v0)).toBe(true);
    const v8 = vec4(1, 2, v0.zw);
    expect(v8.equal(v0)).toBe(true);
  });

  test('clone', () => {
    const v = vec4(1, 2, 3, 4);
    const c = v.clone();
    expect(c).not.toBe(v);
    expect(c.equal(v)).toBe(true);
  });

  test('iterator', () => {
    const v = vec4(1, 2, 3, 4);
    const array = [...v];
    expect(array).toEqual([1, 2, 3, 4]);
  });

  test('add', () => {
    const v = vec4(1, 2, 3, 4).add(vec4(4, 3, 2, 1));
    expect(v.equal(vec4(5, 5, 5, 5))).toBe(true);
  });

  test('substract', () => {
    const v = vec4(1, 2, 3, 4).substract(vec4(4, 3, 2, 1));
    expect(v.equal(vec4(-3, -1, 1, 3))).toBe(true);
  });

  test('scale', () => {
    const v = vec4(1, 2, 3, 4).scale(2);
    expect(v.equal(vec4(2, 4, 6, 8))).toBe(true);
  });

  test('normalize', () => {
    const v0 = vec4(1, 2, 3, 4);
    const v1 = v0.clone().normalize();
    expect(v1.equal(v0.clone().scale(1 / v0.size))).toBe(true);
  });

  test('dot', () => {
    const v0 = vec4(1, 2, 3, 4);
    const v1 = vec4(4, 3, 2, 1);
    expect(v0.dot(v1)).toBe(20);
  });
});
