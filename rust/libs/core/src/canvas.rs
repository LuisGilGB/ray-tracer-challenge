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
        const PPM_HEADER: &str = "P3";
        const MAX_COLOR_VALUE: u8 = 255;
        const MAX_LINE_LENGTH: usize = 70;
        ppm.push_str(&format!("{PPM_HEADER}\r"));
        ppm.push_str(&format!("{} {}\r", self.width, self.height));
        ppm.push_str(&format!("{MAX_COLOR_VALUE}\r"));
        fn cap_number(min: f32, max: f32, n: f32) -> f32 {
            if n < min {
                min
            } else if n > max {
                max
            } else {
                n
            }
        }
        let scale_color =
            |n: f32| -> u8 { (cap_number(0.0, 1.0, n) * MAX_COLOR_VALUE as f32).round() as u8 };
        for y in 0..self.height {
            let mut line = String::new();
            for x in 0..self.width {
                let pixel = self.pixel_at(x, y);
                let colors = [pixel.red(), pixel.green(), pixel.blue()]
                    .iter()
                    .map(|c| scale_color(*c))
                    .map(|c| c.to_string())
                    .collect::<Vec<String>>();
                for color in colors {
                    if line.len() + color.len() >= MAX_LINE_LENGTH {
                        line = String::from(line.trim());
                        ppm.push_str(&format!("{line}\r",));
                        line = String::new();
                    }
                    line.push_str(&format!("{color} "));
                }
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

    #[test]
    fn test_to_ppm_splitting() {
        let mut c = Canvas::new(10, 2);
        let color = Color::new(1.0, 0.8, 0.6);
        for y in 0..c.height {
            for x in 0..c.width {
                c.write_pixel(x, y, color.clone());
            }
        }
        let ppm = c.to_ppm();
        let lines: Vec<&str> = ppm.split('\r').collect();
        assert_eq!(
            lines[3],
            "255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204"
        );
        assert_eq!(
            lines[4],
            "153 255 204 153 255 204 153 255 204 153 255 204 153"
        );
        assert_eq!(
            lines[5],
            "255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204"
        );
        assert_eq!(
            lines[6],
            "153 255 204 153 255 204 153 255 204 153 255 204 153"
        );
    }

    #[test]
    fn test_to_ppm_ends_with_newline() {
        let c = Canvas::new(5, 3);
        let ppm = c.to_ppm();
        assert_eq!(ppm.chars().last().unwrap(), '\r');
    }
}
