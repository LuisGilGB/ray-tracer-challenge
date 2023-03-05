import { Projectile, tick } from "./index";
import { Point, Vector } from "core";

describe('Projectile Simulator tests', () => {
  describe('tick tests', () => {
    const previousProjectile = new Projectile(
      new Point(3, 8, 0),
      new Vector(5, 7, 0)
    );
    const environment = {
      gravity: new Vector(0, -0.1, 0),
      wind: new Vector(-0.01, 0, 0)
    };

    const newProjectile = tick(environment, previousProjectile);

    it('Calculates the expected position', () => {
      expect(newProjectile.position).toEqual(new Point(8, 15, 0));
    });

    it('Calculates the expected velocity', () => {
      expect(newProjectile.velocity).toEqual(new Vector(4.99, 6.9, 0));
    });
  });
});
