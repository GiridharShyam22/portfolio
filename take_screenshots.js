const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const url = 'https://agent-flow-ai-eosin.vercel.app/';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));

  console.log('Taking screenshot 1...');
  await page.screenshot({ path: 'public/screenshots/ss1.png' });

  // Scroll down a bit
  console.log('Taking screenshot 2...');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/screenshots/ss2.png' });

  // Scroll more
  console.log('Taking screenshot 3...');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/screenshots/ss3.png' });

  // Scroll more
  console.log('Taking screenshot 4...');
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'public/screenshots/ss4.png' });

  await browser.close();
  console.log('Done!');
})();
