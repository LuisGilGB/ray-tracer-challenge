import Matrix from '../Matrix';
import Point from '../Point';
import Vector3D from '../Vector3D';

export interface Transform3D {
  matrix: Matrix;

  transformPoint(point: Point): Point;

  transformVector(vector: Vector3D): Vector3D;
}

class Transform3DPipeline {
  private transformations: Transform3D[];

  private constructor() {
    this.transformations = [];
  }

  public get matrix(): Matrix {
    return this.transformations.reduce(
      (acc, transformation) => acc.multiply(transformation.matrix),
      Matrix.identity(4),
    );
  }

  public static init(): Transform3DPipeline {
    return new Transform3DPipeline();
  }

  public andThen(transformation: Transform3D): Transform3DPipeline {
    this.transformations.push(transformation);
    return this;
  }

  public pipe(...transformations: Transform3D[]): Transform3DPipeline {
    this.transformations.push(...transformations);
    return this;
  }

  public transformPoint(point: Point): Point {
    return this.transformations.reduce(
      (acc, transformation) => transformation.transformPoint(acc),
      point,
    );
  }

  public transformVector(vector: Vector3D): Vector3D {
    return this.transformations.reduce(
      (acc, transformation) => transformation.transformVector(acc),
      vector,
    );
  }
}

export default Transform3DPipeline;
