const puppeteer = require('puppeteer');

const APP_URL = 'http://localhost:3000'; // Update with your app's URL

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

    // Fill in the login form
    await page.type('input[name=email]', 'user@example.com');
    await page.type('input[name=password]', 'password');

    // Submit the form
    await page.click('button[type=submit]');

    // Wait for the navigation or check for an element unique to the target page
    await page.waitForSelector('.dashboard-title'); // Adjust the selector based on your actual structure

    // Verify the correct page is loaded after login
    const pageTitle = await page.$eval('.dashboard-title', el => el.innerText);
    expect(pageTitle).toBe('Dashboard');
  }, 16000); // Adjust the timeout as needed

  test('shows error message with invalid credentials', async () => {
    await page.goto(APP_URL);

    // Fill in the login form with invalid credentials
    await page.type('input[name=email]', 'invalid@example.com');
    await page.type('input[name=password]', 'wrongpassword');

    // Submit the form
    await page.click('button[type=submit]');

    // Wait for the error message to appear
    await page.waitForSelector('.error'); // Adjust the selector based on your actual structure

    // Verify the error message is displayed
    const errorMessage = await page.$eval('.error', el => el.innerText);
    expect(errorMessage).toBe('Invalid login credentials');
  }, 16000); // Adjust the timeout as needed
});
