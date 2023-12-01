const puppeteer = require('puppeteer');

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

describe('AdminPage E2E Test', () => {
  it('should render AdminPage and perform basic interactions', async () => {
    await page.goto(APP_URL);

    await page.waitForSelector('.title');

    const title = await page.$eval('.title', el => el.textContent);
    expect(title).toBe('Admin Dashboard');

    const userManagementSection = await page.$('.collapsibleComponent:nth-child(1)');
    expect(userManagementSection).toBeTruthy();

    await userManagementSection.click();

    const createNewUserButton = await page.$('button:has-text("Create New User")');
    expect(createNewUserButton).toBeTruthy();

    const alertSpy = jest.spyOn(global, 'alert');
    await createNewUserButton.click();
    expect(alertSpy).toHaveBeenCalledWith('Create new user');
    alertSpy.mockRestore();
  });
});
