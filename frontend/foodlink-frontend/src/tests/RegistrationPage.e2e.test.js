import puppeteer from 'puppeteer';

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

describe('Registration Page E2E Tests', () => {
  test('registers a new user', async () => {
    // Assuming your app is running on the specified URL
    await page.goto(APP_URL);

    // Navigate to the Registration page
    await page.click('nav a[href="/register"]');

    // Wait for the registration form to be rendered
    await page.waitForSelector('.form');

    // Fill out the form
    await page.type('input[name="email"]', 'newuser@example.com');
    await page.type('input[name="password"]', 'password123');
    await page.select('select[name="role"]', 'source'); // Change the role as needed

    // Submit the form
    await page.click('.submitButton');

    // Wait for registration success message
    await page.waitForSelector('.success');

    // Verify the success message
    const successMessage = await page.$eval('.success', el => el.textContent.trim());
    expect(successMessage).toBe('Registration successful!');

    // Optionally, you can also check if the user is redirected to the login page
    const currentUrl = page.url();
    expect(currentUrl).toBe(`${APP_URL}/login`);
  }, 16000); // Adjust the timeout as needed
});
