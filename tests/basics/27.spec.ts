import { test, expect } from '@playwright/test';

test('Test Visual Regression', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/');

    await page.waitForTimeout(3000);
    
});