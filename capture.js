const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv');

(async () => {

  const browser = await puppeteer.launch({slowMo:300, headless:false});

  fs.createReadStream(__dirname + '/data/test.csv')
    .pipe(csv.parse(function(err, data) {
      data.forEach(function( value, index ) {
        captureCreate(browser, value[0],value[1],value[2],value[3]);
      });
    }
  ));
})()



const captureCreate = async (browser, passName, url, USER, PASSWORD) => {
  // const page = await browser.newPage();
  // await page.setViewport({width: 1200, height: 800});
  // await page.setExtraHTTPHeaders({
  //   Authorization: `Basic ${new Buffer.alloc(`${USER}:${PASSWORD}`).toString('base64')}`
  // });
  // passName = '/img/' + passName + '.png';
  // await page.goto(url, { waitUntil: 'domcontentloaded' });
  // await page.screenshot({path: 'int.png', fullPage:true})
  // console.log("save screenshot: " + url)
  // await browser.close()


  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 800});
  // basic認証の設定
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${new Buffer(`${USER}:${PASSWORD}`).toString('base64')}`
  });

  // passName = '/img/' + passName + '.png';

  await page.goto(url, {waitUntil: "domcontentloaded"});
  await page.screenshot({path: './img/' + passName + '.png', fullPage:true})
}