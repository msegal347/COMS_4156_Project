import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async () => {
  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  } catch (error) {
    console.error('Error during browser launch:', error);
  }
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

describe('SourcePage', () => {
  test('Submitting material data', async () => {
    // Go to the page
    await page.goto('http://localhost:3000'); // Update the URL accordingly

    // Wait for the page to load
    await page.waitForSelector('.container');

    // Fill out the form
    await page.select('select[name=category]', 'Fruits');
    await page.type('input[name=quantity]', '10');
    await page.type('input[name=expirationDate]', '2023-12-31');

    // Submit the form
    await page.click('button[type=submit]');

    // Wait for the submission to complete (you might need to adjust this time)
    await page.waitForTimeout(1000);

    // Check if the console log contains the expected message
    const consoleLogs = await page.evaluate(() => {
      return JSON.stringify(window.consoleLogs);
    });

    expect(consoleLogs).toContain('Material data submitted');
  });
});
