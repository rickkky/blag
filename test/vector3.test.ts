import { describe, expect, test } from 'vitest';
import { expectVector3 } from './vector3-expect';
import { Matrix3, Matrix4, PRECISION, Vector3, vec2, vec3 } from '/src';

describe('vector3', () => {
  test('constructor', () => {
    expectVector3(new Vector3(), [0, 0, 0]);

    expectVector3(new Vector3(0, 1, 2), [0, 1, 2]);

    expectVector3(new Vector3([0, 1, 2]), [0, 1, 2]);

    expectVector3(new Vector3(new Vector3(0, 1, 2)), [0, 1, 2]);

    expectVector3(new Vector3(vec2(0, 1), 2), [0, 1, 2]);

    expectVector3(new Vector3(0, vec2(1, 2)), [0, 1, 2]);
  });

  test('create', () => {
    expectVector3(vec3(), [0, 0, 0]);

    expectVector3(vec3(0, 1, 2), [0, 1, 2]);

    expectVector3(vec3([0, 1, 2]), [0, 1, 2]);

    expectVector3(vec3(vec3(0, 1, 2)), [0, 1, 2]);

    expectVector3(vec3(vec2(0, 1), 2), [0, 1, 2]);

    expectVector3(vec3(0, vec2(1, 2)), [0, 1, 2]);
  });

  test('setter', () => {
    const a = vec3();
    a[0] = 0;
    a[1] = 1;
    a[2] = 2;
    expectVector3(a, [0, 1, 2]);

    const b = vec3();
    b.x = 0;
    b.y = 1;
    b.z = 2;
    expectVector3(b, [0, 1, 2]);

    expectVector3(vec3().set(0, 1, 2), [0, 1, 2]);

    expectVector3(vec3().set([0, 1, 2]), [0, 1, 2]);

    expectVector3(vec3().set(vec3(0, 1, 2)), [0, 1, 2]);

    expectVector3(vec3().set(vec2(0, 1), 2), [0, 1, 2]);

    expectVector3(vec3().set(0, vec2(1, 2)), [0, 1, 2]);
  });

  test('iterator', () => {
    const v = vec3(0, 1, 2);
    expect([...v]).toEqual([0, 1, 2]);
  });

  test('clone', () => {
    const a = vec3(0, 1, 2);
    const b = vec3.clone(a);
    expect(b).not.toBe(a);
    expectVector3(b, [0, 1, 2]);
    const c = a.clone();
    expect(c).not.toBe(a);
    expectVector3(c, [0, 1, 2]);
  });

  test('equals', () => {
    const a = vec3(0, 1, 2);

    const b = vec3(0, 1, 2);
    expect(vec3.equals(a, b)).toBe(true);
    expect(a.equals(b)).toBe(true);

    const c = vec3(2, 1, 0);
    expect(vec3.equals(a, c)).toBe(false);
    expect(a.equals(c)).toBe(false);

    const d = vec3(PRECISION[15], 1, 2);
    expect(vec3.equals(a, d, PRECISION[14])).toBe(true);
    expect(a.equals(d, PRECISION[14])).toBe(true);
    expect(vec3.equals(a, d, PRECISION[15])).toBe(true);
    expect(a.equals(d, PRECISION[15])).toBe(true);
    expect(vec3.equals(a, d, PRECISION[16])).toBe(false);
    expect(a.equals(d, PRECISION[16])).toBe(false);
  });

  test('add', () => {
    const a = vec3(0, 0, 0);
    const b = vec3(0, 1, 2);
    expectVector3(vec3.add(a, b), [0, 1, 2]);
    expectVector3(a, [0, 0, 0]);
    expectVector3(a.add(b), [0, 1, 2]);
    expectVector3(a, [0, 1, 2]);
  });

  test('substract', () => {
    const a = vec3(0, 1, 2);
    const b = vec3(0, 0, 1);
    expectVector3(vec3.substract(a, b), [0, 1, 1]);
    expectVector3(a, [0, 1, 2]);
    expectVector3(a.substract(b), [0, 1, 1]);
    expectVector3(a, [0, 1, 1]);
  });

  test('scale', () => {
    const v = vec3(0, 1, 2);
    expectVector3(vec3.scale(v, 2), [0, 2, 4]);
    expectVector3(v, [0, 1, 2]);
    expectVector3(v.scale(2), [0, 2, 4]);
    expectVector3(v, [0, 2, 4]);
  });

  test('transform', () => {
    const v0 = vec3(0, 1, 2);
    // prettier-ignore
    const m0 = new Matrix3(
      0, 0, 1,
      0, 1, 0,
      1, 0, 0,
    );
    expectVector3(vec3.transform(v0, m0), [2, 1, 0]);
    expectVector3(v0, [0, 1, 2]);
    expectVector3(v0.transform(m0), [2, 1, 0]);
    expectVector3(v0, [2, 1, 0]);

    const v1 = vec3(0, 1, 2);
    // prettier-ignore
    const m1 = new Matrix4(
      0, 0, 1, 0,
      0, 1, 0, 0,
      1, 0, 0, 0,
      1, 1, 1, 1,
    );
    expectVector3(vec3.transform(v1, m1), [3, 2, 1]);
    expectVector3(v1, [0, 1, 2]);
    expectVector3(v1.transform(m1), [3, 2, 1]);
    expectVector3(v1, [3, 2, 1]);
  });

  test('normalize', () => {
    const v = vec3(0, 0, 2);
    expectVector3(vec3.normalize(v), [0, 0, 1]);
    expectVector3(v, [0, 0, 2]);
    expectVector3(v.normalize(), [0, 0, 1]);
    expectVector3(v, [0, 0, 1]);

    expect(() => vec3(0, 0, 0).normalize()).toThrowError();
  });

  test('zero', () => {
    expectVector3(vec3.zero(), [0, 0, 0]);

    const v = vec3(0, 1, 2).zero();
    expectVector3(v, [0, 0, 0]);
  });

  test('dot', () => {
    const a = vec3(0, 1, 2);
    const b = vec3(3, 4, 5);
    expect(vec3.dot(a, b)).toBe(14);
    expect(a.dot(b)).toBe(14);
  });

  test('cross', () => {
    const a = vec3(0, 1, 2);
    const b = vec3(3, 4, 5);
    expectVector3(vec3.cross(a, b), [-3, 6, -3]);
    expectVector3(a, [0, 1, 2]);
    expectVector3(a.cross(b), [-3, 6, -3]);
    expectVector3(a, [-3, 6, -3]);
  });

  test('toArray', () => {
    const v = vec3(0, 1, 2);
    expect(v.toArray()).toEqual([0, 1, 2]);
  });
});
