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

describe('DashboardPage E2E Tests', () => {
  test('renders and interacts with the DashboardPage', async () => {
    await page.goto(APP_URL);

    const title = await page.$eval('.title', el => el.innerText);
    expect(title).toBe('Dashboard');

    await page.waitForSelector('.transactionTable');
    await page.click('.transactionTable button');

    await page.waitForSelector('.mapSection');
    await page.click('.mapSection button');
  }, 16000);
});
