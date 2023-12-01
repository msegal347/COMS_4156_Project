import puppeteer from 'puppeteer';

const APP_URL = 'http://localhost:3000';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe('Sink Page E2E Tests', () => {
  test('submits material request', async () => {
    await page.goto(APP_URL);

    await page.click('nav a[href="/sink"]');

    await page.waitForSelector('.form');

    await page.type('input[name="0"]', '5');

    await page.click('.submitButton');

    await page.waitForSelector('.success');

    const successMessage = await page.$eval('.success', el => el.textContent.trim());
    expect(successMessage).toBe('Request submitted successfully!');

    const requestsState = await page.evaluate(() => window.requests);
    expect(requestsState).toEqual({});
  }, 16000);
});
