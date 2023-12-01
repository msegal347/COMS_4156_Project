import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  } catch (error) {
    console.error('Error during browser launch:', error);
  }
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('SourcePage', () => {
  test('Submitting material data', async () => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('.container');

    await page.select('select[name=category]', 'Fruits');
    await page.type('input[name=quantity]', '10');
    await page.type('input[name=expirationDate]', '2023-12-31');

    await page.click('button[type=submit]');

    await page.waitForTimeout(1000);

    const consoleLogs = await page.evaluate(() => {
      return JSON.stringify(window.consoleLogs);
    });

    expect(consoleLogs).toContain('Material data submitted');
  });
});
