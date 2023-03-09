use crate::color::Color;

pub struct Canvas {
    pub width: usize,
    pub height: usize,
    pub pixels: Vec<Color>,
}

impl Canvas {
    pub fn new(width: usize, height: usize) -> Canvas {
        Canvas {
            width,
            height,
            pixels: vec![Color::new(0.0, 0.0, 0.0); width * height],
        }
    }

    pub fn pixel_at(&self, x: usize, y: usize) -> Color {
        self.pixels[y * self.width + x].clone()
    }

    pub fn write_pixel(&mut self, x: usize, y: usize, color: Color) {
        self.pixels[y * self.width + x] = color;
    }

    pub fn to_ppm(&self) -> String {
        let mut ppm = String::new();
        ppm.push_str("P3\r");
        ppm.push_str(&format!("{} {}\r", self.width, self.height));
        ppm.push_str(&format!("{}\r", 255));
        for y in 0..self.height {
            let mut line = String::new();
            for x in 0..self.width {
                let color = self.pixel_at(x, y);
                let r = (color.red() * 255.0).round() as u8;
                let g = (color.green() * 255.0).round() as u8;
                let b = (color.blue() * 255.0).round() as u8;
                line.push_str(&format!("{r} {g} {b} "));
            }
            line = String::from(line.trim());
            ppm.push_str(&format!("{line}\r",));
        }
        ppm
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new() {
        let c = Canvas::new(10, 20);
        assert_eq!(c.width, 10);
        assert_eq!(c.height, 20);
        assert_eq!(c.pixels.len(), 200);
        assert_eq!(c.pixels[0], Color::new(0.0, 0.0, 0.0));
    }

    #[test]
    fn test_write_pixel() {
        let mut c = Canvas::new(10, 20);
        let red = Color::new(1.0, 0.0, 0.0);
        c.write_pixel(2, 3, red.clone());
        assert_eq!(c.pixel_at(2, 3), red);
    }

    #[test]
    fn test_to_ppm_header() {
        let c = Canvas::new(5, 3);
        let ppm = c.to_ppm();
        let lines: Vec<&str> = ppm.split('\r').collect();
        assert_eq!(lines[0], "P3");
        assert_eq!(lines[1], "5 3");
        assert_eq!(lines[2], "255");
    }

    #[test]
    fn test_to_ppm() {
        let mut c = Canvas::new(5, 3);
        let c1 = Color::new(1.5, 0.0, 0.0);
        let c2 = Color::new(0.0, 0.5, 0.0);
        let c3 = Color::new(-0.5, 0.0, 1.0);
        c.write_pixel(0, 0, c1.clone());
        c.write_pixel(2, 1, c2.clone());
        c.write_pixel(4, 2, c3.clone());
        let ppm = c.to_ppm();
        let lines: Vec<&str> = ppm.split('\r').collect();
        assert_eq!(lines[3], "255 0 0 0 0 0 0 0 0 0 0 0 0 0 0");
        assert_eq!(lines[4], "0 0 0 0 0 0 0 128 0 0 0 0 0 0 0");
        assert_eq!(lines[5], "0 0 0 0 0 0 0 0 0 0 0 0 0 0 255");
    }
}
