const pp = require("puppeteer");
const uuid = require("node-uuid");

const urls = [
  "url0",
  "url1",
  "url2"
]

const getScreenshot = async (browser, url) => {
  let page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({
    path: `test.png`,
    fullpage: true
  });
  await page.close();
}

(async () => {
  const browser = await pp.launch();
  for (const url of urls) {
    await getScreenshot(browser, url);
  }
  browser.close();
})()