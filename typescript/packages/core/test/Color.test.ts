import Color from "../src/Color";

describe('Color tests', () => {
  describe('creation', () => {
    it('should create a color', () => {
      const color = new Color(1, 2, 3);
      expect(color.red).toBe(1);
      expect(color.green).toBe(2);
      expect(color.blue).toBe(3);
    });

    it('should create a color from an array', () => {
      const color = Color.fromArray([1, 2, 3]);
      expect(color.red).toBe(1);
      expect(color.green).toBe(2);
      expect(color.blue).toBe(3);
    });

    it('should create a color from another color', () => {
      const inputColor = new Color(1, 2, 3);
      const outputColor = Color.fromColor(inputColor);
      expect(outputColor.red).toBe(1);
      expect(outputColor.green).toBe(2);
      expect(outputColor.blue).toBe(3);
    });

    it('should create a color from an object', () => {
      const color = Color.fromObject({red: 1, green: 2, blue: 3});
      expect(color.red).toBe(1);
      expect(color.green).toBe(2);
      expect(color.blue).toBe(3);
    });

    it('should create a color with the same values by cloning', () => {
      const color = new Color(1, 2, 3);
      const clone = color.clone();
      expect(clone.red).toBe(1);
      expect(clone.green).toBe(2);
      expect(clone.blue).toBe(3);
    });
  });

  describe('equality', () => {
    it('should be equal to another color with the same coordinates', () => {
      const color1 = new Color(1, 2, 3);
      const color2 = new Color(1, 2, 3);
      expect(color1.equals(color2)).toBe(true);
    });

    it('should not be equal to another color with different coordinates', () => {
      const color1 = new Color(1, 2, 3);
      const color2 = new Color(1, 2, 4);
      expect(color1.equals(color2)).toBe(false);
    });

    it('should be equal to a cloned color', () => {
      const color = new Color(1, 2, 3);
      const clone = color.clone();
      expect(color.equals(clone)).toBe(true);
    });
  });

  describe('addition', () => {
    it('should add two colors', () => {
      const color1 = new Color(1, 2, 3);
      const color2 = new Color(4, 5, 6);
      const result = color1.add(color2);
      expect(result.red).toBe(5);
      expect(result.green).toBe(7);
      expect(result.blue).toBe(9);
    });
  });

  describe('subtraction', () => {
    it('should subtract two colors', () => {
      const color1 = new Color(1, 2, 3);
      const color2 = new Color(4, 5, 6);
      const result = color1.subtract(color2);
      expect(result.red).toBe(-3);
      expect(result.green).toBe(-3);
      expect(result.blue).toBe(-3);
    });
  });

  describe('multiplication by a scalar', () => {
    it('should multiply a color by a scalar', () => {
      const color = new Color(1, 2, 3);
      const result = color.multiply(2);
      expect(result.red).toBe(2);
      expect(result.green).toBe(4);
      expect(result.blue).toBe(6);
    });
  });

  describe('multiplication by a color', () => {
    it('should multiply two colors', () => {
      const color1 = new Color(1, 2, 3);
      const color2 = new Color(4, 5, 6);
      const result = color1.hadamardProduct(color2);
      expect(result.red).toBe(4);
      expect(result.green).toBe(10);
      expect(result.blue).toBe(18);
    });
  });
});
