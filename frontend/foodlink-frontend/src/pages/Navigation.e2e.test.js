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

describe('Navigation E2E Tests', () => {
  test('navigates to login page', async () => {
    await page.goto(APP_URL);

    // Click the "Login" link
    await page.click('nav a[href="/login"]');

    // Wait for the navigation or check for an element unique to the login page
    await page.waitForSelector('form[name="loginForm"]'); // Adjust the selector based on your actual structure

    // Verify the correct page is loaded
    const pageTitle = await page.$eval('h1', el => el.innerText);
    expect(pageTitle).toBe('Login');
  }, 16000); // Adjust the timeout as needed

  test('navigates to dashboard page', async () => {
    await page.goto(APP_URL);

    // Click the "Dashboard" link
    await page.click('nav a[href="/dashboard"]');

    // Wait for the navigation or check for an element unique to the dashboard page
    await page.waitForSelector('.dashboard-title'); // Adjust the selector based on your actual structure

    // Verify the correct page is loaded
    const pageTitle = await page.$eval('.dashboard-title', el => el.innerText);
    expect(pageTitle).toBe('Dashboard');
  }, 16000); // Adjust the timeout as needed

  // Add more test cases for other navigation links
});
