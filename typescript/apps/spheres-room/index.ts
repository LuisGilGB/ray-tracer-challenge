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
  const wallMaterial = new PhongMaterial({
    color: new Color(1, 0.9, 0.9),
    specular: 0,
  });

  const floor = Sphere.unitSphere().cloneWith({
    material: wallMaterial,
    selfTransform: Scaling3D.scaling(10, 0.01, 10),
  });

  const leftWall = Sphere.unitSphere().cloneWith({
    material: wallMaterial,
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Scaling3D.scaling(10, 0.01, 10),
        Rotation3D.rotationX(Math.PI / 2),
        Rotation3D.rotationY(-Math.PI / 4),
        Translation3D.translation(0, 0, 5),
      )
      .value(),
  });

  const rightWall = Sphere.unitSphere().cloneWith({
    material: wallMaterial,
    selfTransform: Transform3DPipeline.init()
      .pipe(
        Scaling3D.scaling(10, 0.01, 10),
        Rotation3D.rotationX(Math.PI / 2),
        Rotation3D.rotationY(Math.PI / 4),
        Translation3D.translation(0, 0, 5),
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
        Scaling3D.scaling(0.5, 0.5, 0.5),
        Translation3D.translation(1.5, 0.5, -0.5),
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
        Scaling3D.scaling(0.33, 0.33, 0.33),
        Translation3D.translation(-1.5, 0.33, -0.75),
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
      new Point(0, 1.5, -5),
      new Point(0, 1, 0),
      new Vector3D(0, 1, 0),
    ),
  });

  const world = new World(lightSource, [
    floor,
    leftWall,
    rightWall,
    middleSphere,
    rightSphere,
    leftSphere,
  ]);

  const canvas = world.render(camera);

  console.log('Writing file...');
  fs.writeFileSync('output.ppm', canvas.toPPM());
  console.log('Done');
};

main();
