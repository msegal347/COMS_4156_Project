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

describe('Navigation E2E Tests', () => {
  test('navigates to login page', async () => {
    await page.goto(APP_URL);

    await page.click('nav a[href="/login"]');

    await page.waitForSelector('form[name="loginForm"]');

    const pageTitle = await page.$eval('h1', el => el.innerText);
    expect(pageTitle).toBe('Login');
  }, 16000);

  test('navigates to dashboard page', async () => {
    await page.goto(APP_URL);

    await page.click('nav a[href="/dashboard"]');

    await page.waitForSelector('.dashboard-title');

    const pageTitle = await page.$eval('.dashboard-title', el => el.innerText);
    expect(pageTitle).toBe('Dashboard');
  }, 16000);
});
