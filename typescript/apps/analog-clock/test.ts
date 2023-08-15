import {getHourPoints} from './index';

describe('Analog clock tests', () => {
  describe('Hour points tests', () => {
    it('Gets 12 points', () => {
      const hourPoints = getHourPoints(100, 40);
      expect(hourPoints).toHaveLength(12);
    });

    it('Gets the correct points', () => {
      const hourPoints = getHourPoints(100, 40);
      const expectedPoints = [
        {x: 50, y: 90},
        {x: 70, y: 85},
        {x: 85, y: 70},
        {x: 90, y: 50},
        {x: 85, y: 30},
        {x: 70, y: 15},
        {x: 50, y: 10},
        {x: 30, y: 15},
        {x: 15, y: 30},
        {x: 10, y: 50},
        {x: 15, y: 70},
        {x: 30, y: 85},
      ];
      hourPoints.forEach((point, i) => {
        expect({x: point.x, y: point.y}).toEqual(
          expect.objectContaining(expectedPoints[i]),
        );
      });
    });
  });
});
