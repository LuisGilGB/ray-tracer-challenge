import Intersection from './Intersection';

class Hit {
  private readonly intersection: Intersection;

  protected constructor(intersection: Intersection) {
    this.intersection = intersection;
  }

  get t(): number {
    return this.intersection.t;
  }

  static fromIntersections(intersections: Intersection[]): Hit | null {
    const intersection = intersections
      .sort((a, b) => a.t - b.t)
      .find(i => i.t >= 0);
    if (intersection) {
      return new Hit(intersection);
    } else {
      return null;
    }
  }
}

export default Hit;
