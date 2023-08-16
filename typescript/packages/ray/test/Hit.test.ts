import {Sphere} from 'shapes';
import Hit from '../src/Hit';
import Intersection from '../src/Intersection';

describe('Hit tests', () => {
  it('should return a hit when all intersections have positive t', () => {
    const s = Sphere.unitSphere();
    const i1 = new Intersection(1, s);
    const i2 = new Intersection(2, s);
    const hit = Hit.fromIntersections([i1, i2]);
    expect(hit?.t).toBe(1);
  });

  it('should return a hit when there are both intersections with positive and negative t', () => {
    const s = Sphere.unitSphere();
    const i1 = new Intersection(-1, s);
    const i2 = new Intersection(2, s);
    const hit = Hit.fromIntersections([i1, i2]);
    expect(hit?.t).toBe(2);
  });

  it('should return null when there are only intersections with negative t', () => {
    const s = Sphere.unitSphere();
    const i1 = new Intersection(-2, s);
    const i2 = new Intersection(-1, s);
    const hit = Hit.fromIntersections([i1, i2]);
    expect(hit).toBeNull();
  });

  it('should return the lowest non-negative intersection when there are multiple intersections with positive t', () => {
    const s = Sphere.unitSphere();
    const i1 = new Intersection(5, s);
    const i2 = new Intersection(7, s);
    const i3 = new Intersection(-3, s);
    const i4 = new Intersection(2, s);
    const hit = Hit.fromIntersections([i1, i2, i3, i4]);
    expect(hit?.t).toBe(2);
  });
});
