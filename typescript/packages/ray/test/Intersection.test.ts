import {
  Point,
  Rotation3D,
  Scaling3D,
  Transform3DPipeline,
  Translation3D,
  Vector3D,
} from 'core';
import {Sphere} from 'shapes';
import Intersection from '../src/Intersection';
import Ray from '../src/Ray';

describe('Intersection tests', () => {
  describe('Ray sphere intersection', () => {
    it('should return two intersections when the ray intersects the sphere twice', () => {
      const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));
      const sphere = Sphere.unitSphere();
      const intersections = Intersection.raySphere(ray, sphere);
      expect(intersections.length).toBe(2);
      expect(intersections[0].t).toBe(4);
      expect(intersections[0].object).toBe(sphere);
      expect(intersections[1].t).toBe(6);
      expect(intersections[1].object).toBe(sphere);
    });

    it('should return one intersection when the ray intersects the sphere only as a tangent', () => {
      const ray = new Ray(new Point(0, 1, -5), new Vector3D(0, 0, 1));
      const sphere = Sphere.unitSphere();
      const intersections = Intersection.raySphere(ray, sphere);
      expect(intersections.length).toBe(1);
      expect(intersections[0].t).toBe(5);
      expect(intersections[0].object).toBe(sphere);
    });

    it('should return no intersections when the ray misses to intersect the sphere', () => {
      const ray = new Ray(new Point(0, 2, -5), new Vector3D(0, 0, 1));
      const sphere = Sphere.unitSphere();
      const intersections = Intersection.raySphere(ray, sphere);
      expect(intersections.length).toBe(0);
    });

    it('should return two intersections when the ray originates inside the sphere', () => {
      const ray = new Ray(new Point(0, 0, 0), new Vector3D(0, 0, 1));
      const sphere = Sphere.unitSphere();
      const intersections = Intersection.raySphere(ray, sphere);
      expect(intersections.length).toBe(2);
      expect(intersections[0].t).toBe(-1);
      expect(intersections[0].object).toBe(sphere);
      expect(intersections[1].t).toBe(1);
      expect(intersections[1].object).toBe(sphere);
    });

    it('should return two intersections when the sphere is behind the ray', () => {
      const ray = new Ray(new Point(0, 0, 5), new Vector3D(0, 0, 1));
      const sphere = Sphere.unitSphere();
      const intersections = Intersection.raySphere(ray, sphere);
      expect(intersections.length).toBe(2);
      expect(intersections[0].t).toBe(-6);
      expect(intersections[0].object).toBe(sphere);
      expect(intersections[1].t).toBe(-4);
      expect(intersections[1].object).toBe(sphere);
    });

    describe('Non unit sphere tests', () => {
      it('should return two intersections when the ray intersects the sphere twice', () => {
        const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));
        const sphere = Sphere.unitSphere().transform(
          Transform3DPipeline.init()
            .pipe(
              Scaling3D.scaling(2, 2, 2),
              Translation3D.translation(0, 0, 1),
            )
            .value(),
        );
        const intersections = Intersection.raySphere(ray, sphere);
        expect(intersections.length).toBe(2);
        expect(intersections[0].t).toBe(4);
        expect(intersections[0].object).toBe(sphere);
        expect(intersections[1].t).toBe(8);
        expect(intersections[1].object).toBe(sphere);
      });

      it('should return one intersection when the ray intersects the sphere only as a tangent', () => {
        const ray = new Ray(new Point(0, 2, -5), new Vector3D(0, 0, 1));
        const sphere = Sphere.unitSphere().transform(
          Transform3DPipeline.init()
            .pipe(
              Scaling3D.scaling(2, 2, 2),
              Translation3D.translation(0, 0, 1),
            )
            .value(),
        );
        const intersections = Intersection.raySphere(ray, sphere);
        expect(intersections.length).toBe(1);
        expect(intersections[0].t).toBe(6);
        expect(intersections[0].object).toBe(sphere);
      });

      it('should return no intersections when the ray misses to intersect the sphere', () => {
        const ray = new Ray(new Point(3, 1, -5), new Vector3D(0, 0, 1));
        const sphere = new Sphere(new Point(0, 0, 1), 2);
        const intersections = Intersection.raySphere(ray, sphere);
        expect(intersections.length).toBe(0);
      });

      describe('Transformed sphere tests', () => {
        it('should return two intersections when the ray intersects the sphere twice', () => {
          const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));
          const sphere = Sphere.unitSphere().transform(
            Scaling3D.scaling(2, 2, 2),
          );
          const intersections = Intersection.raySphere(ray, sphere);
          expect(intersections.length).toBe(2);
          expect(intersections[0].t).toBe(3);
          expect(intersections[0].object).toBe(sphere);
          expect(intersections[1].t).toBe(7);
          expect(intersections[1].object).toBe(sphere);
        });

        it('should return no intersections when the ray misses to intersect a translated sphere', () => {
          const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));
          const sphere = Sphere.unitSphere().transform(
            Translation3D.translation(5, 0, 0),
          );
          const intersections = Intersection.raySphere(ray, sphere);
          expect(intersections.length).toBe(0);
        });

        it('should return the expected intersections when the ray intersects a scaled and rotated sphere', () => {
          const ray = new Ray(new Point(0, 0, -5), new Vector3D(0, 0, 1));
          const sphere = Sphere.unitSphere().transform(
            Transform3DPipeline.init()
              .pipe(
                Scaling3D.scaling(0.5, 0.5, 2),
                Rotation3D.rotationX(Math.PI / 2),
              )
              .value(),
          );
          const intersections = Intersection.raySphere(ray, sphere);
          expect(intersections.length).toBe(2);
          expect(intersections[0].t).toBe(4.5);
          expect(intersections[0].object).toBe(sphere);
          expect(intersections[1].t).toBe(5.5);
          expect(intersections[1].object).toBe(sphere);
        });
      });
    });
  });
});
