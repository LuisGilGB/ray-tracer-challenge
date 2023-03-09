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

  describe('ppm conversion', () => {
    it('should create a ppm header', () => {
      const canvas = new Canvas(5, 3);
      const ppm = canvas.toPPM();
      const lines = ppm.split('\r');
      expect(lines[0]).toBe('P3');
      expect(lines[1]).toBe('5 3');
      expect(lines[2]).toBe('255');
    });

    it('should create a ppm body', () => {
      const canvas = new Canvas(5, 3);
      const c1 = new Color(1.5, 0, 0);
      const c2 = new Color(0, 0.5, 0);
      const c3 = new Color(-0.5, 0, 1);
      canvas.writePixel(0, 0, c1);
      canvas.writePixel(2, 1, c2);
      canvas.writePixel(4, 2, c3);
      const ppm = canvas.toPPM();
      const lines = ppm.split('\r');
      expect(lines[3]).toBe('255 0 0 0 0 0 0 0 0 0 0 0 0 0 0');
      expect(lines[4]).toBe('0 0 0 0 0 0 0 128 0 0 0 0 0 0 0');
      expect(lines[5]).toBe('0 0 0 0 0 0 0 0 0 0 0 0 0 0 255');
    });
  });
});
