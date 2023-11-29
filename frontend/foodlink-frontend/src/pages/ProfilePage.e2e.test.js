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

describe('Profile Page E2E Tests', () => {
  test('updates user profile', async () => {
    // Assuming your app is running on the specified URL
    await page.goto(APP_URL);

    // Navigate to the Profile page
    await page.click('nav a[href="/profile"]');

    // Wait for the profile form to be rendered
    await page.waitForSelector('.profileForm');

    // Update the form
    await page.type('#name', 'New Name');
    await page.type('#email', 'new.email@example.com');
    await page.type('#address', 'New Address');

    // Submit the form
    await page.click('.saveButton');

    // Wait for the profile to be updated
    await page.waitForSelector('.success-message'); // Add a success message class in your actual implementation

    // Verify the changes
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
  }, 16000); // Adjust the timeout as needed
});
