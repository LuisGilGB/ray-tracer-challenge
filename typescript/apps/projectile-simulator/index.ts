import {Canvas, Color, Point, Vector3D} from 'core';
import * as fs from 'fs';

export class Projectile {
  constructor(
    public position: Point,
    public velocity: Vector3D,
  ) {}

  format(): string {
    return `(${this.position.format()}, ${this.velocity.format()})`;
  }

  print() {
    console.log(
      `Projectile: (position: ${this.position.format()}, velocity: ${this.velocity.format()})`,
    );
  }
}

export class Environment {
  constructor(
    public gravity: Vector3D,
    public wind: Vector3D,
  ) {}
}

export const tick = (
  environment: Environment,
  projectile: Projectile,
): Projectile => {
  const position = projectile.position.addVector(projectile.velocity);
  const velocity = projectile.velocity
    .add(environment.gravity)
    .add(environment.wind);
  return new Projectile(position, velocity);
};

const main = () => {
  const canvas = new Canvas(800, 320);
  let projectile = new Projectile(
    new Point(0, 32, 0),
    new Vector3D(3, 2, 0).normalize().multiply(10),
  );
  const environment = new Environment(
    new Vector3D(0, -0.1, 0),
    new Vector3D(-0.01, 0, 0),
  );

  while (projectile.position.y > 0 || projectile.velocity.y > 0) {
    projectile = tick(environment, projectile);
    projectile.print();
    const x = Math.round(projectile.position.x);
    const y = Math.round(canvas.height - projectile.position.y);
    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      canvas.writePixel(x, y, new Color(1, 1, 1));
    }
  }
  fs.writeFileSync('projectile.ppm', canvas.toPPM());
};

main();
