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

describe('LoginPage E2E Tests', () => {
  test('logs in successfully with valid credentials', async () => {
    await page.goto(APP_URL);

    await page.type('input[name=email]', 'user@example.com');
    await page.type('input[name=password]', 'password');

    await page.click('button[type=submit]');

    await page.waitForSelector('.dashboard-title');

    const pageTitle = await page.$eval('.dashboard-title', el => el.innerText);
    expect(pageTitle).toBe('Dashboard');
  }, 16000);

  test('shows error message with invalid credentials', async () => {
    await page.goto(APP_URL);

    await page.type('input[name=email]', 'invalid@example.com');
    await page.type('input[name=password]', 'wrongpassword');

    await page.click('button[type=submit]');

    await page.waitForSelector('.error');

    const errorMessage = await page.$eval('.error', el => el.innerText);
    expect(errorMessage).toBe('Invalid login credentials');
  }, 16000);
});
