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
    expect(vec4(1, 2, 3, 4).equals(vec4(1, 2, 3, 4))).toBe(true);
    expect(vec4(1, 2, 3, 4).equals(vec4(4, 3, 2, 1))).toBe(false);
  });

  test('setter', () => {
    const v = vec4(1, 2, 3, 4);
    v.set(5, 6, 7, 8);
    expect(v.equals(vec4(5, 6, 7, 8))).toBe(true);
    v[0] = 9;
    v[1] = 10;
    v[2] = 11;
    v[3] = 12;
    expect(v.equals(vec4(9, 10, 11, 12))).toBe(true);
    v.x = 13;
    v.y = 14;
    v.z = 15;
    v.w = 16;
    expect(v.equals(vec4(13, 14, 15, 16))).toBe(true);
  });

  test('2d getter', () => {
    const v = vec4(1, 2, 3, 4);
    expect(v.xy.equals(vec2(1, 2))).toBe(true);
    expect(v.xz.equals(vec2(1, 3))).toBe(true);
    expect(v.xw.equals(vec2(1, 4))).toBe(true);
    expect(v.yx.equals(vec2(2, 1))).toBe(true);
    expect(v.yz.equals(vec2(2, 3))).toBe(true);
    expect(v.yw.equals(vec2(2, 4))).toBe(true);
    expect(v.zx.equals(vec2(3, 1))).toBe(true);
    expect(v.zy.equals(vec2(3, 2))).toBe(true);
    expect(v.zw.equals(vec2(3, 4))).toBe(true);
    expect(v.wx.equals(vec2(4, 1))).toBe(true);
    expect(v.wy.equals(vec2(4, 2))).toBe(true);
    expect(v.wz.equals(vec2(4, 3))).toBe(true);
  });

  test('3d getter', () => {
    const v = vec4(1, 2, 3, 4);
    expect(v.xyz.equals(vec3(1, 2, 3))).toBe(true);
    expect(v.xyw.equals(vec3(1, 2, 4))).toBe(true);
    expect(v.xzy.equals(vec3(1, 3, 2))).toBe(true);
    expect(v.xzw.equals(vec3(1, 3, 4))).toBe(true);
    expect(v.xwy.equals(vec3(1, 4, 2))).toBe(true);
    expect(v.xwz.equals(vec3(1, 4, 3))).toBe(true);
    expect(v.yxz.equals(vec3(2, 1, 3))).toBe(true);
    expect(v.yxw.equals(vec3(2, 1, 4))).toBe(true);
    expect(v.yzx.equals(vec3(2, 3, 1))).toBe(true);
    expect(v.yzw.equals(vec3(2, 3, 4))).toBe(true);
    expect(v.ywx.equals(vec3(2, 4, 1))).toBe(true);
    expect(v.ywz.equals(vec3(2, 4, 3))).toBe(true);
    expect(v.zxy.equals(vec3(3, 1, 2))).toBe(true);
    expect(v.zxw.equals(vec3(3, 1, 4))).toBe(true);
    expect(v.zyx.equals(vec3(3, 2, 1))).toBe(true);
    expect(v.zyw.equals(vec3(3, 2, 4))).toBe(true);
    expect(v.zwx.equals(vec3(3, 4, 1))).toBe(true);
    expect(v.zwy.equals(vec3(3, 4, 2))).toBe(true);
    expect(v.wxy.equals(vec3(4, 1, 2))).toBe(true);
    expect(v.wxz.equals(vec3(4, 1, 3))).toBe(true);
    expect(v.wyx.equals(vec3(4, 2, 1))).toBe(true);
    expect(v.wyz.equals(vec3(4, 2, 3))).toBe(true);
    expect(v.wzx.equals(vec3(4, 3, 1))).toBe(true);
    expect(v.wzy.equals(vec3(4, 3, 2))).toBe(true);
  });

  test('4d getter', () => {
    const v = vec4(1, 2, 3, 4);
    expect(v.xyzw.equals(vec4(1, 2, 3, 4))).toBe(true);
    expect(v.xywz.equals(vec4(1, 2, 4, 3))).toBe(true);
    expect(v.xzyw.equals(vec4(1, 3, 2, 4))).toBe(true);
    expect(v.xzwy.equals(vec4(1, 3, 4, 2))).toBe(true);
    expect(v.xwyz.equals(vec4(1, 4, 2, 3))).toBe(true);
    expect(v.xwzy.equals(vec4(1, 4, 3, 2))).toBe(true);
    expect(v.yxzw.equals(vec4(2, 1, 3, 4))).toBe(true);
    expect(v.yxwz.equals(vec4(2, 1, 4, 3))).toBe(true);
    expect(v.yzxw.equals(vec4(2, 3, 1, 4))).toBe(true);
    expect(v.yzwx.equals(vec4(2, 3, 4, 1))).toBe(true);
    expect(v.ywxz.equals(vec4(2, 4, 1, 3))).toBe(true);
    expect(v.ywzx.equals(vec4(2, 4, 3, 1))).toBe(true);
    expect(v.zxyw.equals(vec4(3, 1, 2, 4))).toBe(true);
    expect(v.zxwy.equals(vec4(3, 1, 4, 2))).toBe(true);
    expect(v.zyxw.equals(vec4(3, 2, 1, 4))).toBe(true);
    expect(v.zywx.equals(vec4(3, 2, 4, 1))).toBe(true);
    expect(v.zwxy.equals(vec4(3, 4, 1, 2))).toBe(true);
    expect(v.zwyx.equals(vec4(3, 4, 2, 1))).toBe(true);
    expect(v.wxyz.equals(vec4(4, 1, 2, 3))).toBe(true);
    expect(v.wxzy.equals(vec4(4, 1, 3, 2))).toBe(true);
    expect(v.wyxz.equals(vec4(4, 2, 1, 3))).toBe(true);
    expect(v.wyzx.equals(vec4(4, 2, 3, 1))).toBe(true);
    expect(v.wzxy.equals(vec4(4, 3, 1, 2))).toBe(true);
    expect(v.wzyx.equals(vec4(4, 3, 2, 1))).toBe(true);
  });

  test('constructor overloads', () => {
    const v0 = new Vector4(1, 2, 3, 4);
    const v1 = new Vector4([1, 2, 3, 4]);
    expect(v1.equals(v0)).toBe(true);
    const v2 = new Vector4(v0);
    expect(v2.equals(v0)).toBe(true);
    const v3 = new Vector4(v0.xyz, 4);
    expect(v3.equals(v0)).toBe(true);
    const v4 = new Vector4(1, v0.yzw);
    expect(v4.equals(v0)).toBe(true);
    const v5 = new Vector4(v0.xy, v0.zw);
    expect(v5.equals(v0)).toBe(true);
    const v6 = new Vector4(v0.xy, 3, 4);
    expect(v6.equals(v0)).toBe(true);
    const v7 = new Vector4(1, v0.yz, 4);
    expect(v7.equals(v0)).toBe(true);
    const v8 = new Vector4(1, 2, v0.zw);
    expect(v8.equals(v0)).toBe(true);
  });

  test('create overloads', () => {
    const v0 = vec4(1, 2, 3, 4);
    const v1 = vec4([1, 2, 3, 4]);
    expect(v1.equals(v0)).toBe(true);
    const v2 = vec4(v0);
    expect(v2.equals(v0)).toBe(true);
    const v3 = vec4(v0.xyz, 4);
    expect(v3.equals(v0)).toBe(true);
    const v4 = vec4(1, v0.yzw);
    expect(v4.equals(v0)).toBe(true);
    const v5 = vec4(v0.xy, v0.zw);
    expect(v5.equals(v0)).toBe(true);
    const v6 = vec4(v0.xy, 3, 4);
    expect(v6.equals(v0)).toBe(true);
    const v7 = vec4(1, v0.yz, 4);
    expect(v7.equals(v0)).toBe(true);
    const v8 = vec4(1, 2, v0.zw);
    expect(v8.equals(v0)).toBe(true);
  });

  test('set overloads', () => {
    const v = vec4(1, 2, 3, 4);
    v.set([5, 6, 7, 8]);
    expect(v.equals(vec4(5, 6, 7, 8))).toBe(true);
    v.set(vec4(9, 10, 11, 12));
    expect(v.equals(vec4(9, 10, 11, 12))).toBe(true);
    v.set(vec3(13, 14, 15), 16);
    expect(v.equals(vec4(13, 14, 15, 16))).toBe(true);
    v.set(17, vec3(18, 19, 20));
    expect(v.equals(vec4(17, 18, 19, 20))).toBe(true);
    v.set(vec2(21, 22), vec2(23, 24));
    expect(v.equals(vec4(21, 22, 23, 24))).toBe(true);
    v.set(vec2(25, 26), 27, 28);
    expect(v.equals(vec4(25, 26, 27, 28))).toBe(true);
    v.set(29, vec2(30, 31), 32);
    expect(v.equals(vec4(29, 30, 31, 32))).toBe(true);
    v.set(33, 34, vec2(35, 36));
    expect(v.equals(vec4(33, 34, 35, 36))).toBe(true);
  });

  test('clone', () => {
    const v = vec4(1, 2, 3, 4);
    const c = v.clone();
    expect(c).not.toBe(v);
    expect(c.equals(v)).toBe(true);
  });

  test('iterator', () => {
    const v = vec4(1, 2, 3, 4);
    const array = [...v];
    expect(array).toEqual([1, 2, 3, 4]);
  });

  test('add', () => {
    const v = vec4(1, 2, 3, 4).add(vec4(4, 3, 2, 1));
    expect(v.equals(vec4(5, 5, 5, 5))).toBe(true);
  });

  test('substract', () => {
    const v = vec4(1, 2, 3, 4).substract(vec4(4, 3, 2, 1));
    expect(v.equals(vec4(-3, -1, 1, 3))).toBe(true);
  });

  test('scale', () => {
    const v = vec4(1, 2, 3, 4).scale(2);
    expect(v.equals(vec4(2, 4, 6, 8))).toBe(true);
  });

  test('normalize', () => {
    const v0 = vec4(1, 2, 3, 4);
    const v1 = v0.clone().normalize();
    expect(v1.equals(v0.clone().scale(1 / v0.size))).toBe(true);
  });

  test('dot', () => {
    const v0 = vec4(1, 2, 3, 4);
    const v1 = vec4(4, 3, 2, 1);
    expect(v0.dot(v1)).toBe(20);
  });
});
