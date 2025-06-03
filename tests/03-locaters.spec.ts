import { test, expect } from '@playwright/test'

test.describe('', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/html-elements')
    });

    test.skip('Explicit timeout for any action', async ({ page }) => {
        await expect(page.locator('#jkdhvkjhfg')).toBeVisible({ timeout: 10000 });
        page.click('#fdgdgf', { timeout: 10000 });
    });

    test.only('CSS/Xpath selectors', async ({ page }) => {

        page.locator(''); // you can pass any CSS/Xpath 
    });

});