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

describe('Registration Page E2E Tests', () => {
  test('registers a new user', async () => {
    await page.goto(APP_URL);

    await page.click('nav a[href="/register"]');

    await page.waitForSelector('.form');

    await page.type('input[name="email"]', 'newuser@example.com');
    await page.type('input[name="password"]', 'password123');
    await page.select('select[name="role"]', 'source');

    await page.click('.submitButton');

    await page.waitForSelector('.success');

    const successMessage = await page.$eval('.success', el => el.textContent.trim());
    expect(successMessage).toBe('Registration successful!');

    const currentUrl = page.url();
    expect(currentUrl).toBe(`${APP_URL}/login`);
  }, 16000);
});
