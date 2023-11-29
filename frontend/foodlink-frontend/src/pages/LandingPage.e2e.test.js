import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('LandingPage', () => {
  test('Navigate to Register Page', async () => {
    // Go to the landing page
    await page.goto('http://localhost:3000'); // Update the URL accordingly

    // Wait for the landing page to load
    await page.waitForSelector('.container');

    // Click on the "Get Started" button to navigate to the register page
    await page.click('.registerButton');

    // Wait for the navigation to complete (you might need to adjust this time)
    await page.waitForTimeout(1000);

    // Check if the current URL is the register page
    const currentUrl = page.url();
    expect(currentUrl).toContain('/register');
  });
});
