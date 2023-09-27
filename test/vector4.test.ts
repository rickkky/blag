import { describe, expect, test } from 'vitest';
import { expectVector4 } from './vector4-expect';
import { Matrix4, PRECISION, Vector4, vec2, vec3, vec4 } from '/src';

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

  test('transform', () => {
    const v = vec4(0, 1, 2, 3);
    const m = new Matrix4(0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0);
    expectVector4(vec4.transform(v, m), [3, 2, 1, 0]);
    expectVector4(v, [0, 1, 2, 3]);
    expectVector4(v.transform(m), [3, 2, 1, 0]);
    expectVector4(v, [3, 2, 1, 0]);
  });

  test('normalize', () => {
    const v = vec4(0, 0, 0, 2);
    expectVector4(vec4.normalize(v), [0, 0, 0, 1]);
    expectVector4(v, [0, 0, 0, 2]);
    expectVector4(v.normalize(), [0, 0, 0, 1]);
    expectVector4(v, [0, 0, 0, 1]);

    expect(() => vec4(0, 0, 0, 0).normalize()).toThrowError();
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
