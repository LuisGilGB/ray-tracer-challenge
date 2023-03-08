import Canvas from "../src/Canvas";
import Color from "../src/Color";

describe('Canvas tests', () => {
  describe('creation', () => {
    it('should create a canvas', () => {
      const canvas = new Canvas(10, 20);
      expect(canvas.width).toBe(10);
      expect(canvas.height).toBe(20);
    });

    it('should create all pixels in black', () => {
      const canvas = new Canvas(10, 20);
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          expect(canvas.getPixel(x, y)).toEqual(new Color(0, 0, 0));
        }
      }
    });
  });

  describe('writing pixels', () => {
    it('should write a pixel', () => {
      const canvas = new Canvas(10, 20);
      const red = new Color(1, 0, 0);
      canvas.writePixel(2, 3, red);
      expect(canvas.getPixel(2, 3)).toEqual(red);
    });
  });
});