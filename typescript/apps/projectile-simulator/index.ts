import { Point, Vector } from "core";

export class Projectile {
  constructor(
    public position: Point,
    public velocity: Vector,
  ) {}

  format(): string {
    return `(${this.position.format()}, ${this.velocity.format()})`;
  }

  print() {
    console.log(`Projectile: (position: ${this.position.format()}, velocity: ${this.velocity.format()})`);
  }
}

export class Environment {
  constructor(
    public gravity: Vector,
    public wind: Vector,
  ) {}
}

export const tick = (environment: Environment, projectile: Projectile): Projectile => {
  const position = projectile.position.addVector(projectile.velocity);
  const velocity = projectile.velocity.add(environment.gravity).add(environment.wind);
  return new Projectile(position, velocity);
};

const main = () => {
  let projectile = new Projectile(
    new Point(0, 1, 0),
    new Vector(1, 1, 0).normalize(),
  );
  const environment = new Environment(
    new Vector(0, -0.1, 0),
    new Vector(-0.01, 0, 0)
  );

  while (projectile.position.y > 0 || projectile.velocity.y > 0) {
    projectile = tick(environment, projectile);
    console.log('The current projectile situation is', projectile.print());
  }
}

main();
