import { Vector3 } from './vector3';
import { createMatrixPrototype } from './matrix-prototype';
import { Matrix3 } from './matrix3';

export function createMatrix3Prototype() {
  const createVector = () => new Vector3();
  const createMatrix = () => new Matrix3();
  const prototype = createMatrixPrototype(createVector, createMatrix);

  function translation(tx: number, ty: number, target = createMatrix()) {
    // prettier-ignore
    const nums = [
      1,  0,  0,
      0,  1,  0,
      tx, ty, 1,
    ];
    return prototype.set(target, nums);
  }

  function scaling(sx: number, sy: number, target = createMatrix()) {
    // prettier-ignore
    const nums = [
      sx, 0,  0,
      0,  sy, 0,
      0,  0,  1,
    ];
    return prototype.set(target, nums);
  }

  function rotation(angle: number, target = createMatrix()) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    // prettier-ignore
    const nums = [
      c, s, 0,
     -s, c, 0,
      0, 0, 1,
    ];
    return prototype.set(target, nums);
  }

  return {
    ...prototype,
    translation,
    scaling,
    rotation,
  };
}
