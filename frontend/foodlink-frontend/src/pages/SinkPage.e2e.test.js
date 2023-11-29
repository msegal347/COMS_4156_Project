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

describe('Sink Page E2E Tests', () => {
  test('submits material request', async () => {
    // Assuming your app is running on the specified URL
    await page.goto(APP_URL);

    // Navigate to the Sink page
    await page.click('nav a[href="/sink"]');

    // Wait for the material requests form to be rendered
    await page.waitForSelector('.form');

    // Change the quantity of the first material
    await page.type('input[name="0"]', '5'); // Change the quantity as needed

    // Submit the form
    await page.click('.submitButton');

    // Wait for submission success message
    await page.waitForSelector('.success');

    // Verify the success message
    const successMessage = await page.$eval('.success', el => el.textContent.trim());
    expect(successMessage).toBe('Request submitted successfully!');

    // Optionally, you can check if the requests state is reset to an empty object
    const requestsState = await page.evaluate(() => window.requests);
    expect(requestsState).toEqual({}); // Assuming you set the requests in the global window object
  }, 16000); // Adjust the timeout as needed
});
