const fs = require("fs");

// Function to convert image to Base64
function imageToBase64(filePath) {
  // Read the image file
  const imageBuffer = fs.readFileSync(filePath);

  // Get the image's file extension (e.g., jpg, png)
  const imageType = filePath.split(".").pop(); // Get file extension

  // Create the base64 string with a proper data URI prefix
  const base64Image = `data:image/${imageType};base64,${imageBuffer.toString("base64")}`;

  return base64Image;
}

// // Convert an image to base64 and log the HTML tag with embedded image
// const base64String = imageToBase64("../Templates/petrol/bharat-logo.png");
// const imgTag = `<img src="${base64String}" alt="Base64 Image" />`;

// console.log(imgTag);

module.exports = imageToBase64;
