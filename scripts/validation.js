const robot = require("robotjs");
const fs = require("fs");
const { PNG } = require("pngjs");
const path = require("path");
const Tesseract = require('tesseract.js');

async function getName() {
  let screenshot = robot.screen.capture(336, 432, 400, 78);
  const png = new PNG({
    width: 400,
    height: 78,
  });

  // นำพิกเซลมาเรียงใส่ buffer
  for (let y = 0; y < screenshot.height; y++) {
    for (let x = 0; x < screenshot.width; x++) {
      const i = (y * screenshot.width + x) * 4;
      const j = screenshot.byteWidth * y + x * screenshot.bytesPerPixel;

      png.data[i] = screenshot.image[j + 2]; // R
      png.data[i + 1] = screenshot.image[j + 1]; // G
      png.data[i + 2] = screenshot.image[j]; // B
      png.data[i + 3] = 255; // Alpha (เต็ม 100%)
    }
  }

  const outputPath = path.join("..../assets", "screenshot.png");
  png.pack().pipe(fs.createWriteStream(outputPath));

  // รอจนกว่าไฟล์จะถูกเขียนสำเร็จ
  await new Promise((resolve) => png.on('end', resolve));

  // ทำการ OCR
  const result = await Tesseract.recognize(outputPath, "eng");
  const text = result.data.text.trim();
  
  console.log("Found:", text);
  return text;
}

async function validate() {
  // inspect doodle //
  robot.moveMouse(105, 250);
  robot.moveMouseSmooth(110, 250);
  robot.mouseClick();
  robot.mouseClick();
  // inspect doodle //

  // ส่อง stat //
  robot.moveMouse(510, 150);
  robot.moveMouseSmooth(525, 150);
  robot.mouseClick();
  // ส่อง stat //

  await delay(200);

  // capture screen //
  const img = robot.screen.capture(0, 0, 2880, 1920);
  const png = new PNG({
    width: 2880,
    height: 1920,
  });
  // capture screen //

  // นำพิกเซลมาเรียงใส่ buffer
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const i = (y * img.width + x) * 4;
      const j = img.byteWidth * y + x * img.bytesPerPixel;

      png.data[i] = img.image[j + 2]; // R
      png.data[i + 1] = img.image[j + 1]; // G
      png.data[i + 2] = img.image[j]; // B
      png.data[i + 3] = 255; // Alpha (เต็ม 100%)
    }
  }

  const outputP = path.join("./pictures", "info.png");
  png.pack().pipe(fs.createWriteStream(outputP));

  // รอจนกว่าไฟล์จะถูกเขียนสำเร็จ
  await new Promise((resolve) => png.on('end', resolve));

  // ปิดหน้า inspect doodle //
  robot.moveMouse(1176, 200);
  robot.moveMouseSmooth(1176, 215);
  robot.mouseClick();
  // ปิดหน้า inspect doodle //

  return new Promise((resolve) => {
    fs.createReadStream(outputP)
      .pipe(new PNG())
      .on('parsed', function () {
        // อ่านค่าสีพิกเซล
        const checkFirst = getPixelColorHex(this, 568, 1066); // เช็ค 6 ดาว
        const checkSecond = getPixelColorHex(this, 588, 574); // เช็ค misprint
        const checkThird = getPixelColorHex(this, 2315, 1339); // เช็ค ht

        let isSixStars = false;
        let isMisPrint = false;
        let isHiddenTrait = false;

        if (checkFirst === '#efce4a') {
          isSixStars = true;
        }
        if (checkSecond === '#f8d743') {
          isMisPrint = true;
        }
        if (checkThird === '#fdfbd6' || checkThird === '#fdfbd5') {
          isHiddenTrait = true;
        }

        console.log("6 ดาว: " + checkFirst + '  ' + isSixStars);
        console.log("Misprint: " + checkSecond + '  ' + isMisPrint);
        console.log("Hidden Trait: " + checkThird + '  ' + isHiddenTrait + '\n');

        resolve(isSixStars && isMisPrint && isHiddenTrait);
      });
  });
}


// ฟังก์ชันที่ใช้แปลงค่าสีพิกเซลเป็น HEX
function getPixelColorHex(png, x, y) {
  const idx = (y * png.width + x) * 4;
  const r = png.data[idx];
  const g = png.data[idx + 1];
  const b = png.data[idx + 2];
  return rgbToHex(r, g, b);
}

// ฟังก์ชันแปลง RGB เป็น HEX
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = { delay, validate, getName };
