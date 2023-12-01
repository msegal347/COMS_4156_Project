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

describe('Profile Page E2E Tests', () => {
  test('updates user profile', async () => {
    await page.goto(APP_URL);

    await page.click('nav a[href="/profile"]');

    await page.waitForSelector('.profileForm');

    await page.type('#name', 'New Name');
    await page.type('#email', 'new.email@example.com');
    await page.type('#address', 'New Address');

    await page.click('.saveButton');

    await page.waitForSelector('.success-message');

    const updatedProfile = await page.evaluate(() => {
      return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
      };
    });

    expect(updatedProfile).toEqual({
      name: 'New Name',
      email: 'new.email@example.com',
      address: 'New Address',
    });
  }, 16000);
});
