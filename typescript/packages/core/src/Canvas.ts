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

  toPPM(): string {
    const lines = [];
    const PPM_IDENTIFIER = 'P3';
    const MAX_COLOR_VALUE = 255;
    const LINE_MAX_LENGTH = 70;
    lines.push(`${PPM_IDENTIFIER}`);
    lines.push(`${this.width} ${this.height}`);
    lines.push(`${MAX_COLOR_VALUE}`);
    const capNumber = (min: number, max: number) => (value: number) => Math.min(Math.max(value, min), max);
    const scaleColor = (value: number) => Math.round(capNumber(0, 1)(value) * MAX_COLOR_VALUE);
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const color = this.getPixel(x, y);
        const red = Math.round(scaleColor(color.red));
        const green = Math.round(scaleColor(color.green));
        const blue = Math.round(scaleColor(color.blue));
        const colors = [red, green, blue].map((value) => value.toString());
        colors.forEach((color) => {
          if (line.length + color.length >= LINE_MAX_LENGTH) {
            lines.push(line);
            line = color;
          } else {
            line = line.length === 0 ? color : `${line} ${color}`;
          }
        });
      }
      lines.push(line);
    }
    return lines.join('\r');
  }
}

export default Canvas;
