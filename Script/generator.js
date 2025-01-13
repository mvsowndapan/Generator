const puppeteer = require("puppeteer");
const fs = require("fs");
const ejs = require("ejs");
function generatePdf(template, payload, output) {
  puppeteer
    .launch()
    .then(async (browser) => {
      console.log("entered");
      const page = await browser.newPage();

      const templateFileStream = fs.readFileSync(template, "utf8");
      const compiledTemplate = ejs.compile(templateFileStream)(payload);
      // console.log(compiledTemplate);
      await page.setContent(compiledTemplate, {
        timeout: 0,
      });

      await page.pdf({
        path: output, // Ensure path has the full file name
        format: "A4",
        printBackground: true,
        timeout: 0,
      });

      await browser.close(); // Don't forget to close the browser!
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = generatePdf;
