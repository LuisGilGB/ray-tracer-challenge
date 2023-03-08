import Color from "./Color";

class Canvas {
  constructor(public width: number, public height: number) {
    this.pixels = new Array(width * height).fill(new Color(0, 0, 0));
  }

  pixels: Color[];

  getPixel(x: number, y: number): Color {
    return this.pixels[y * this.width + x];
  }

  writePixel(x: number, y: number, color: Color) {
    this.pixels[y * this.width + x] = color;
  }
}

export default Canvas;
