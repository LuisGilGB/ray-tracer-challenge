import {
  Color,
  Point,
  Rotation3D,
  Scaling3D,
  Transform3DPipeline,
  Translation3D,
  Vector3D,
} from 'core';
import fs from 'fs';
import {PointLight} from 'light';
import {PhongMaterial} from 'material';
import {Sphere} from 'shapes';
import {Camera, ViewTransform, World} from 'world';

const main = () => {
  const floor = Sphere.unitSphere().cloneWith({
    material: new PhongMaterial({
      color: new Color(1, 0.9, 0.9),
      specular: 0,
    }),
    selfTransform: Scaling3D.scaling(10, 0.01, 10),
  });

  const leftWall = Sphere.unitSphere().cloneWith({
    material: floor.material,
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Translation3D.translation(0, 0, 5),
        Rotation3D.rotationY(-Math.PI / 4),
        Rotation3D.rotationX(Math.PI / 2),
        Scaling3D.scaling(10, 0.01, 10),
      )
      .value(),
  });

  const rightWall = Sphere.unitSphere().cloneWith({
    material: floor.material,
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Translation3D.translation(0, 0, 5),
        Rotation3D.rotationY(Math.PI / 4),
        Rotation3D.rotationX(Math.PI / 2),
        Scaling3D.scaling(10, 0.01, 10),
      )
      .value(),
  });

  const middleSphere = Sphere.unitSphere().cloneWith({
    material: new PhongMaterial({
      color: new Color(0.1, 1, 0.5),
      diffuse: 0.7,
      specular: 0.3,
    }),
    selfTransform: Translation3D.translation(-0.5, 1, 0.5),
  });

  const rightSphere = Sphere.unitSphere().cloneWith({
    material: new PhongMaterial({
      color: new Color(0.5, 1, 0.1),
      diffuse: 0.7,
      specular: 0.3,
    }),
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Translation3D.translation(1.5, 0.5, -0.5),
        Scaling3D.scaling(0.5, 0.5, 0.5),
      )
      .value(),
  });

  const leftSphere = Sphere.unitSphere().cloneWith({
    material: new PhongMaterial({
      color: new Color(1, 0.8, 0.1),
      diffuse: 0.7,
      specular: 0.3,
    }),
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Translation3D.translation(-1.5, 0.33, -0.75),
        Scaling3D.scaling(0.33, 0.33, 0.33),
      )
      .value(),
  });

  const lightSource = new PointLight(
    new Point(-10, 10, -10),
    new Color(1, 1, 1),
  );

  const camera = new Camera({
    hSize: 100,
    vSize: 50,
    fieldOfView: Math.PI / 3,
    transform: ViewTransform.build(
      new Point(1, 2, -5),
      new Point(0, 1, 0),
      new Vector3D(0, 1, 0),
    ),
  });

  const world = new World(lightSource, [leftSphere]);

  const canvas = world.render(camera);

  console.log('Writing file...');
  fs.writeFileSync('output.ppm', canvas.toPPM());
  console.log('Done');
};

main();
