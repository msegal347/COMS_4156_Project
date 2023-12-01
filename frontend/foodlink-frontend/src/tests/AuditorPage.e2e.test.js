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

describe('AuditorPage E2E Tests', () => {
  test('renders and interacts with the AuditorPage', async () => {
    await page.goto(APP_URL);

    const title = await page.$eval('.title', el => el.innerText);
    expect(title).toBe('Auditor Analytics');

    await page.waitForSelector('.chartContainer');

    await page.waitForSelector('.transactionTable');

    await page.waitForSelector('.transactionTableContainer');
    await page.click('.transactionTableContainer button');
  }, 16000);
});
