const generatePdf = require("./generator");
const imageToBase64 = require("./imageToBase64");

// Function to generate random rent receipts
function generateRandomRentReceipt() {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentYear = new Date().getFullYear() - 1;
  const nextYear = currentYear + 1;

  let payload = [];
  for (let i = 0; i <= 2; i++) {
    const top = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    const left = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    console.log(top, left);
    payload.push({
      date: `${monthNames[i]} ${nextYear}`,
      period_of_rent: `${monthNames[i]} 01 ${nextYear} to ${monthNames[i]} ${new Date(nextYear, i + 1, 0).getDate()} ${nextYear}`,
      signStyle: `top: ${top}px;left: ${left}px;`,
    });
  }
  for (let i = 3; i < monthNames.length; i++) {
    const top = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    const left = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    console.log(top, left);
    payload.push({
      date: `${monthNames[i]} ${currentYear}`,
      period_of_rent: `${monthNames[i]} 01 ${currentYear} to ${monthNames[i]} ${new Date(currentYear, i + 1, 0).getDate()} ${currentYear}`,
      signStyle: `top: ${top}px;left: ${left}px;`,
    });
  }
  return { receiptData: payload, sign: imageToBase64("../Templates/house/sig.png"), stamp: imageToBase64("../Templates/house/revenue-stamp.jpg") };
}

// Generate a random rent receipt
const randomReceipt = generateRandomRentReceipt();
console.log("RandomeReceipt");
// Log the random receipt to the console
// console.log(JSON.stringify(randomReceipt, null, 2));
generatePdf("../Templates/house/rent.html", randomReceipt, "../archive/rent/receipt.pdf");
