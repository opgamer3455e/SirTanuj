const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 2500 });
    await page.goto('https://bulky-star-835753.framer.app/', { waitUntil: 'domcontentloaded' });
    // Wait an extra few seconds for JS animations to settle
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({ path: 'skolla-screenshot.png', fullPage: true });
    await browser.close();
    console.log('Screenshot saved to skolla-screenshot.png');
    process.exit(0);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
})();
