import { describe, expect, test } from 'vitest';
import { PRECISION } from '/src/constant';
import { vec2 } from '/src/vector2';
import { vec3 } from '/src/vector3';
import { Vector4, vec4 } from '/src/vector4';
import { expectVector2 } from './vector2.test';
import { expectVector3 } from './vector3.test';

export const expectVector4 = (v: Vector4, [x, y, z, w]: number[]) => {
  expect(v.dimension).toBe(4);
  expect(v[0]).toBe(x);
  expect(v.x).toBe(x);
  expect(v[1]).toBe(y);
  expect(v.y).toBe(y);
  expect(v[2]).toBe(z);
  expect(v.z).toBe(z);
  expect(v[3]).toBe(w);
  expect(v.w).toBe(w);
  expect(v.size).toBeCloseTo(Math.sqrt(x * x + y * y + z * z + w * w), 12);
};

describe('vector4', () => {
  test('constructor', () => {
    expectVector4(new Vector4(), [0, 0, 0, 0]);

    expectVector4(new Vector4(0, 1, 2, 3), [0, 1, 2, 3]);

    expectVector4(new Vector4([0, 1, 2, 3]), [0, 1, 2, 3]);

    expectVector4(new Vector4(new Vector4(0, 1, 2, 3)), [0, 1, 2, 3]);

    expectVector4(new Vector4(vec3(0, 1, 2), 3), [0, 1, 2, 3]);

    expectVector4(new Vector4(0, vec3(1, 2, 3)), [0, 1, 2, 3]);

    expectVector4(new Vector4(vec2(0, 1), vec2(2, 3)), [0, 1, 2, 3]);

    expectVector4(new Vector4(vec2(0, 1), 2, 3), [0, 1, 2, 3]);

    expectVector4(new Vector4(0, vec2(1, 2), 3), [0, 1, 2, 3]);

    expectVector4(new Vector4(0, 1, vec2(2, 3)), [0, 1, 2, 3]);
  });

  test('create', () => {
    expectVector4(vec4(), [0, 0, 0, 0]);

    expectVector4(vec4(0, 1, 2, 3), [0, 1, 2, 3]);

    expectVector4(vec4([0, 1, 2, 3]), [0, 1, 2, 3]);

    expectVector4(vec4(vec4(0, 1, 2, 3)), [0, 1, 2, 3]);

    expectVector4(vec4(vec3(0, 1, 2), 3), [0, 1, 2, 3]);

    expectVector4(vec4(0, vec3(1, 2, 3)), [0, 1, 2, 3]);

    expectVector4(vec4(vec2(0, 1), vec2(2, 3)), [0, 1, 2, 3]);

    expectVector4(vec4(vec2(0, 1), 2, 3), [0, 1, 2, 3]);

    expectVector4(vec4(0, vec2(1, 2), 3), [0, 1, 2, 3]);

    expectVector4(vec4(0, 1, vec2(2, 3)), [0, 1, 2, 3]);
  });

  test('setter', () => {
    const a = vec4();
    a[0] = 0;
    a[1] = 1;
    a[2] = 2;
    a[3] = 3;
    expectVector4(a, [0, 1, 2, 3]);

    const b = vec4();
    b.x = 0;
    b.y = 1;
    b.z = 2;
    b.w = 3;
    expectVector4(b, [0, 1, 2, 3]);

    expectVector4(vec4().set(0, 1, 2, 3), [0, 1, 2, 3]);

    expectVector4(vec4().set([0, 1, 2, 3]), [0, 1, 2, 3]);

    expectVector4(vec4().set(vec4(0, 1, 2, 3)), [0, 1, 2, 3]);

    expectVector4(vec4().set(vec3(0, 1, 2), 3), [0, 1, 2, 3]);

    expectVector4(vec4().set(0, vec3(1, 2, 3)), [0, 1, 2, 3]);

    expectVector4(vec4().set(vec2(0, 1), vec2(2, 3)), [0, 1, 2, 3]);

    expectVector4(vec4().set(vec2(0, 1), 2, 3), [0, 1, 2, 3]);

    expectVector4(vec4().set(0, vec2(1, 2), 3), [0, 1, 2, 3]);

    expectVector4(vec4().set(0, 1, vec2(2, 3)), [0, 1, 2, 3]);
  });

  test('group getter', () => {
    const v = vec4(0, 1, 2, 3);

    expectVector2(v.xy, [0, 1]);
    expectVector2(v.xz, [0, 2]);
    expectVector2(v.xw, [0, 3]);
    expectVector2(v.yx, [1, 0]);
    expectVector2(v.yz, [1, 2]);
    expectVector2(v.yw, [1, 3]);
    expectVector2(v.zx, [2, 0]);
    expectVector2(v.zy, [2, 1]);
    expectVector2(v.zw, [2, 3]);
    expectVector2(v.wx, [3, 0]);
    expectVector2(v.wy, [3, 1]);
    expectVector2(v.wz, [3, 2]);

    expectVector3(v.xyz, [0, 1, 2]);
    expectVector3(v.xyw, [0, 1, 3]);
    expectVector3(v.xzy, [0, 2, 1]);
    expectVector3(v.xzw, [0, 2, 3]);
    expectVector3(v.xwy, [0, 3, 1]);
    expectVector3(v.xwz, [0, 3, 2]);
    expectVector3(v.yxz, [1, 0, 2]);
    expectVector3(v.yxw, [1, 0, 3]);
    expectVector3(v.yzx, [1, 2, 0]);
    expectVector3(v.yzw, [1, 2, 3]);
    expectVector3(v.ywx, [1, 3, 0]);
    expectVector3(v.ywz, [1, 3, 2]);
    expectVector3(v.zxy, [2, 0, 1]);
    expectVector3(v.zxw, [2, 0, 3]);
    expectVector3(v.zyx, [2, 1, 0]);
    expectVector3(v.zyw, [2, 1, 3]);
    expectVector3(v.zwx, [2, 3, 0]);
    expectVector3(v.zwy, [2, 3, 1]);
    expectVector3(v.wxy, [3, 0, 1]);
    expectVector3(v.wxz, [3, 0, 2]);
    expectVector3(v.wyx, [3, 1, 0]);
    expectVector3(v.wyz, [3, 1, 2]);
    expectVector3(v.wzx, [3, 2, 0]);
    expectVector3(v.wzy, [3, 2, 1]);

    expectVector4(v.xyzw, [0, 1, 2, 3]);
    expectVector4(v.xywz, [0, 1, 3, 2]);
    expectVector4(v.xzyw, [0, 2, 1, 3]);
    expectVector4(v.xzwy, [0, 2, 3, 1]);
    expectVector4(v.xwyz, [0, 3, 1, 2]);
    expectVector4(v.xwzy, [0, 3, 2, 1]);
    expectVector4(v.yxzw, [1, 0, 2, 3]);
    expectVector4(v.yxwz, [1, 0, 3, 2]);
    expectVector4(v.yzxw, [1, 2, 0, 3]);
    expectVector4(v.yzwx, [1, 2, 3, 0]);
    expectVector4(v.ywxz, [1, 3, 0, 2]);
    expectVector4(v.ywzx, [1, 3, 2, 0]);
    expectVector4(v.zxyw, [2, 0, 1, 3]);
    expectVector4(v.zxwy, [2, 0, 3, 1]);
    expectVector4(v.zyxw, [2, 1, 0, 3]);
    expectVector4(v.zywx, [2, 1, 3, 0]);
    expectVector4(v.zwxy, [2, 3, 0, 1]);
    expectVector4(v.zwyx, [2, 3, 1, 0]);
    expectVector4(v.wxyz, [3, 0, 1, 2]);
    expectVector4(v.wxzy, [3, 0, 2, 1]);
    expectVector4(v.wyxz, [3, 1, 0, 2]);
    expectVector4(v.wyzx, [3, 1, 2, 0]);
    expectVector4(v.wzxy, [3, 2, 0, 1]);
    expectVector4(v.wzyx, [3, 2, 1, 0]);
  });

  test('iterator', () => {
    const v = vec4(0, 1, 2, 3);
    expect([...v]).toEqual([0, 1, 2, 3]);
  });

  test('clone', () => {
    const a = vec4(0, 1, 2, 3);
    const b = vec4.clone(a);
    expect(b).not.toBe(a);
    expectVector4(b, [0, 1, 2, 3]);
    const c = a.clone();
    expect(c).not.toBe(a);
    expectVector4(c, [0, 1, 2, 3]);
  });

  test('equals', () => {
    const a = vec4(0, 1, 2, 3);

    const b = vec4(0, 1, 2, 3);
    expect(vec4.equals(a, b)).toBe(true);
    expect(a.equals(b)).toBe(true);

    const c = vec4(3, 2, 1, 0);
    expect(vec4.equals(a, c)).toBe(false);
    expect(a.equals(c)).toBe(false);

    const d = vec4(PRECISION[15], 1, 2, 3);
    expect(vec4.equals(a, d, PRECISION[14])).toBe(true);
    expect(a.equals(d, PRECISION[14])).toBe(true);
    expect(vec4.equals(a, d, PRECISION[15])).toBe(true);
    expect(a.equals(d, PRECISION[15])).toBe(true);
    expect(vec4.equals(a, d, PRECISION[16])).toBe(false);
    expect(a.equals(d, PRECISION[16])).toBe(false);
  });

  test('add', () => {
    const a = vec4(0, 0, 0, 0);
    const b = vec4(0, 1, 2, 3);
    expectVector4(vec4.add(a, b), [0, 1, 2, 3]);
    expectVector4(a, [0, 0, 0, 0]);
    expectVector4(a.add(b), [0, 1, 2, 3]);
    expectVector4(a, [0, 1, 2, 3]);
  });

  test('substract', () => {
    const a = vec4(0, 1, 2, 3);
    const b = vec4(0, 0, 0, 1);
    expectVector4(vec4.substract(a, b), [0, 1, 2, 2]);
    expectVector4(a, [0, 1, 2, 3]);
    expectVector4(a.substract(b), [0, 1, 2, 2]);
    expectVector4(a, [0, 1, 2, 2]);
  });

  test('scale', () => {
    const v = vec4(0, 1, 2, 3);
    expectVector4(vec4.scale(v, 2), [0, 2, 4, 6]);
    expectVector4(v, [0, 1, 2, 3]);
    expectVector4(v.scale(2), [0, 2, 4, 6]);
    expectVector4(v, [0, 2, 4, 6]);
  });

  test.todo('transform');

  test('normalize', () => {
    const v = vec4(0, 0, 0, 2);
    expectVector4(vec4.normalize(v), [0, 0, 0, 1]);
    expectVector4(v, [0, 0, 0, 2]);
    expectVector4(v.normalize(), [0, 0, 0, 1]);
    expectVector4(v, [0, 0, 0, 1]);
  });

  test('zero', () => {
    expectVector4(vec4.zero(), [0, 0, 0, 0]);

    const v = vec4(0, 1, 2, 3).zero();
    expectVector4(v, [0, 0, 0, 0]);
  });

  test('dot', () => {
    const a = vec4(0, 1, 2, 3);
    const b = vec4(4, 5, 6, 7);
    expect(vec4.dot(a, b)).toBe(38);
    expect(a.dot(b)).toBe(38);
  });
});
