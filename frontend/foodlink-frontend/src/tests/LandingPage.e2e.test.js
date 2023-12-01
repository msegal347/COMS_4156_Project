import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('LandingPage', () => {
  test('Navigate to Register Page', async () => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('.container');

    await page.click('.registerButton');

    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    expect(currentUrl).toContain('/register');
  });
});
