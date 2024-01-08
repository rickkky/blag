import { Vector3, vec3 } from './vector3';
import { Vector4 } from './vector4';
import { createMatrixPrototype } from './matrix-prototype';
import { Matrix4 } from './matrix4';
import { BoundingBox, CLIP } from './constant';

export function createMatrix4Prototype() {
  const createVector = () => new Vector4();
  const createMatrix = () => new Matrix4();
  const prototype = createMatrixPrototype(createVector, createMatrix);

  function translation(
    tx: number,
    ty: number,
    tz: number,
    target = createMatrix(),
  ) {
    // prettier-ignore
    const nums = [
      1,  0,  0, 0,
      0,  1,  0, 0,
      0,  0,  1, 0,
      tx, ty, tz, 1,
    ];
    return prototype.set(target, nums);
  }

  function scaling(
    sx: number,
    sy: number,
    sz: number,
    target = createMatrix(),
  ) {
    // prettier-ignore
    const nums = [
      sx, 0,  0, 0,
      0,  sy, 0, 0,
      0,  0,  sz, 0,
      0,  0,  0, 1,
    ];
    return prototype.set(target, nums);
  }

  function rotationX(angle: number, target = createMatrix()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const nums = [
      1,  0,  0, 0,
      0,  c,  s, 0,
      0, -s,  c, 0,
      0,  0,  0, 1,
    ];
    return prototype.set(target, nums);
  }

  function rotationY(angle: number, target = createMatrix()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const nums = [
      c, 0, -s, 0,
      0, 1,  0, 0,
      s, 0,  c, 0,
      0, 0,  0, 1,
    ];
    return prototype.set(target, nums);
  }

  function rotationZ(angle: number, target = createMatrix()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const nums = [
      c,  s, 0, 0,
     -s,  c, 0, 0,
      0,  0, 1, 0,
      0,  0, 0, 1,
    ];
    return prototype.set(target, nums);
  }

  function rotation(
    angleX: number,
    angleY: number,
    angleZ: number,
    target = createMatrix(),
  ) {
    return prototype.multiplication(
      [rotationX(angleX), rotationY(angleY), rotationZ(angleZ)],
      target,
    );
  }

  /**
   * Transform the view bounding box to clip space bounding box.
   */
  function orthographic(
    view: BoundingBox,
    clip: BoundingBox = CLIP.WEBGL,
    target = createMatrix(),
  ) {
    const width = view.xmax - view.xmin;
    const height = view.ymax - view.ymin;
    const depth = view.zmax - view.zmin;
    const sx = (clip.xmax - clip.xmin) / width;
    const sy = (clip.ymax - clip.ymin) / height;
    const sz = -(clip.zmax - clip.zmin) / depth;
    const tx = (clip.xmin * view.xmax - clip.xmax * view.xmin) / width;
    const ty = (clip.ymin * view.ymax - clip.ymax * view.ymin) / height;
    const tz = (clip.zmin * view.zmax - clip.zmax * view.zmin) / depth;
    // prettier-ignore
    const nums = [
      sx, 0,  0,  0,
      0,  sy, 0,  0,
      0,  0,  sz, 0,
      tx, ty, tz, 1,
    ];
    return prototype.set(target, nums);
  }

  /**
   * Convert the view frustum to clip space.
   * Observer is at (0, 0, 0) and facing negative z axis.
   * The clip space bounding box should be symmetrical to x and y axis.
   *
   * @param {number} fovy - field of view for y in radian
   * @param {number} aspect - width / height ratio
   * @param {number} near - distance to near plane
   * @param {number} far - distance to far plane
   * @param {BoundingBox} clip - clip space bounding box
   */
  function perspective(
    fovy: number,
    aspect: number,
    near: number,
    far: number,
    clip: BoundingBox = CLIP.WEBGL,
    target = createMatrix(),
  ) {
    const f = 1 / Math.tan(fovy / 2);
    const sy = ((clip.ymax - clip.ymin) * f) / 2;
    const sx = ((clip.xmax - clip.xmin) * f) / (2 * aspect);
    const wz = -1;
    const rangeInv = -1 / (far - near);
    const sz = (clip.zmax * far - clip.zmin * near) * rangeInv;
    const tz = (clip.zmax - clip.zmin) * near * far * rangeInv;
    // prettier-ignore
    const nums = [
      sx, 0,  0,  0,
      0,  sy, 0,  0,
      0,  0,  sz, wz,
      0,  0,  tz, 0,
    ];
    return prototype.set(target, nums);
  }

  /**
   * Transformation that makes something look at something else.
   */
  function targetTo(
    eye: Vector3,
    aim: Vector3,
    up: Vector3,
    target = createMatrix(),
  ) {
    if (eye.equals(aim)) {
      return prototype.identity();
    }
    const zUnit = vec3.subtract(eye, aim).normalize();
    const xUnit = vec3.cross(up, zUnit).normalize();
    const yUnit = vec3.cross(zUnit, xUnit).normalize();
    // prettier-ignore
    const nums = [
      xUnit.x,  xUnit.y,  xUnit.z, 0,
      yUnit.x,  yUnit.y,  yUnit.z, 0,
      zUnit.x,  zUnit.y,  zUnit.z, 0,
      eye.x,    eye.y,    eye.z,   1,
    ];
    return prototype.set(target, nums);
  }

  function lookAt(
    eye: Vector3,
    aim: Vector3,
    up: Vector3,
    target = createMatrix(),
  ) {
    return prototype.invert(targetTo(eye, aim, up, target));
  }

  return {
    ...prototype,
    translation,
    scaling,
    rotationX,
    rotationY,
    rotationZ,
    rotation,
    orthographic,
    perspective,
    targetTo,
    lookAt,
  };
}
