const { bharatPetroleum } = require("./images.json");
const generatePdf = require("./generator");
const imageToBase64 = require("./imageToBase64");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals) {
  const factor = Math.pow(10, decimals);
  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getRandomDate() {
  const start = new Date(2024, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
}

function getRandomAgency() {
  const agencies = [
    {
      name: "SHREE BAGYAM AGENCY",
      dealer: "BPCL DEALER",
      address: "SATHY ROAD GANAPATHY, COIMBATORE - 641006",
      phone: "0422-2510992",
      gst: "33ABSFS5069G1ZQ",
    },
    {
      name: "SUPER AGENCIES",
      dealer: "",
      address: "625/3, Thudiyalur To Saravanampatty, COIMBATORE - 641049",
      phone: "9442826000",
      gst: "33AVMPD2247F1ZX",
    },
    {
      name: "SRI SARAVANA AGENCIES",
      dealer: "",
      address: "828/2, KULATHUPALAYAM, THONDAMUTHUR PO. COIMBATORE - 641109",
      phone: "0422-2617313",
      gst: "33BFMPS7553E1Z5",
    },
    {
      name: "K.P.N FUEL SERVICE",
      dealer: "",
      address: "SANKAGIRI MAIN ROAD (NH-47), NEIKARAPATTI, SALEM - 10",
      phone: "8925881199",
      gst: "33ABCPN6295M2Z6",
    },
  ];
  return agencies[getRandomInt(0, agencies.length - 1)];
}

function generateReceipt() {
  const agency = getRandomAgency();
  const transactionDate = getRandomDate();
  const [date, time] = transactionDate.split(" ");
  const rate = getRandomFloat(100, 120, 2);
  const volume = getRandomFloat(10, 22, 2);
  const amount = getRandomFloat(rate * volume, rate * volume, 2);
  return {
    agency: agency,
    documentType: "ORIGINAL",
    transactionDetails: {
      date: date,
      time: time,
      transactionNumber: getRandomInt(1000000000, 9999999999).toString(),
      invoiceNumber: getRandomInt(1000000, 9999999).toString(),
      vehicleNumber: "NOT ENTERED",
      preset: `${amount} INR`,
    },
    fuelingDetails: {
      nozzleNumber: getRandomInt(1, 5).toString(),
      product: "PETROL",
      density: `${getRandomFloat(752, 752.5, 1)} kg/m3`,
      rate: `${rate} INR/Ltr`,
      volume: `${volume} Ltr`,
      amount: `${amount} INR`,
    },
  };
}

function generateReceipts(num) {
  const receipts = [];
  for (let i = 0; i < num; i++) {
    receipts.push(generateReceipt());
  }
  return receipts;
}

// Generate an array of 5 random receipts
const randomReceipts = generateReceipts(10);

// Log the generated receipts
// console.log(JSON.stringify(randomReceipts, null, 2));

const payload = {
  imageLogo: imageToBase64("../Templates/petrol/bharat-logo.png"),
  receiptData: randomReceipts,
};

generatePdf("../Templates/petrol/petrol.html", payload, "../archive/petrol/receipt.pdf");
