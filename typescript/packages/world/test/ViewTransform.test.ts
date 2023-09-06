import {
  Matrix,
  Point,
  Scaling3D,
  Transform3D,
  Translation3D,
  Vector3D,
} from 'core';
import ViewTransform from '../src/ViewTransform';

describe('View transform tests', () => {
  it('Returns the identity transform when the view transformation is the default one', () => {
    const from = new Point(0, 0, 0);
    const to = new Point(0, 0, -1);
    const up = new Vector3D(0, 1, 0);

    const transform = ViewTransform.build(from, to, up);

    expect(transform).toEqual(Transform3D.identity());
  });

  it('Returns the properly mirrored transformation when looking on Z positive direction', () => {
    const from = new Point(0, 0, 0);
    const to = new Point(0, 0, 1);
    const up = new Vector3D(0, 1, 0);

    const transform = ViewTransform.build(from, to, up);

    expect(transform).toEqual(Scaling3D.scaling(-1, 1, -1));
  });

  it('Returns a transformation that proves translation', () => {
    const from = new Point(0, 0, 8);
    const to = new Point(0, 0, 0);
    const up = new Vector3D(0, 1, 0);

    const transform = ViewTransform.build(from, to, up);

    expect(transform).toEqual(Translation3D.translation(0, 0, -8));
  });

  it('Returns a transformation that proves an arbitrary scenario', () => {
    const from = new Point(1, 3, 2);
    const to = new Point(4, -2, 8);
    const up = new Vector3D(1, 1, 0);

    const transform = ViewTransform.build(from, to, up);
    const expectedTransform = Transform3D.fromMatrix(
      Matrix.fromArray([
        [-0.50709, 0.50709, 0.67612, -2.36643],
        [0.76772, 0.60609, 0.12122, -2.82843],
        [-0.35857, 0.59761, -0.71714, 0],
        [0, 0, 0, 1],
      ]),
    );

    transform.matrix.toArray().forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        expect(value).toBeCloseTo(
          expectedTransform.matrix.at(rowIndex, colIndex),
        );
      });
    });
  });
});
