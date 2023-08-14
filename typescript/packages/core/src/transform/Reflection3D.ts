import Matrix from '../Matrix';
import Point from '../Point';
import Tuple3D from '../Tuple3D';
import Vector3D from '../Vector3D';
import Scaling3D from './Scaling3D';

class Reflection3D {
  private readonly _scaling: Scaling3D;

  private constructor(tuple: Tuple3D) {
    this._scaling = Scaling3D.scaling(tuple.at(0), tuple.at(1), tuple.at(2));
    Object.freeze(this);
    Object.freeze(this._scaling);
  }

  public get matrix(): Matrix {
    return this._scaling.matrix;
  }

  public static reflectionOnX(): Reflection3D {
    return new Reflection3D(Tuple3D.fromArray([-1, 1, 1]));
  }

  public static reflectionOnY(): Reflection3D {
    return new Reflection3D(Tuple3D.fromArray([1, -1, 1]));
  }

  public static reflectionOnZ(): Reflection3D {
    return new Reflection3D(Tuple3D.fromArray([1, 1, -1]));
  }

  public static reflectionOnOrigin(): Reflection3D {
    return new Reflection3D(Tuple3D.fromArray([-1, -1, -1]));
  }

  public reflectPoint(point: Point): Point {
    return this._scaling.scalePoint(point);
  }

  public reflectVector(vector: Vector3D): Vector3D {
    return this._scaling.scaleVector(vector);
  }
}

export default Reflection3D;
