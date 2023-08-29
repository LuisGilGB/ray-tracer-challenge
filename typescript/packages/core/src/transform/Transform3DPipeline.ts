import Matrix from '../Matrix';
import Point from '../Point';
import Vector3D from '../Vector3D';
import Transform3D, {ITransform3D} from './Transform3D';

class Transform3DPipeline {
  private transformations: ITransform3D[];

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

  public static identity(): Transform3DPipeline {
    return Transform3DPipeline.init().andThen(
      Transform3D.fromMatrix(Matrix.identity(4)),
    );
  }

  public andThen(transformation: ITransform3D): Transform3DPipeline {
    this.transformations.push(transformation);
    return this;
  }

  public pipe(...transformations: ITransform3D[]): Transform3DPipeline {
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
