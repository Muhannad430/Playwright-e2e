import { test, expect } from '@playwright/test'

test.describe('Playwright actions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/actions')
    });

    /*
    Go to https://www.techglobal-training.com/frontend/actions
    Click on "Click on me" button
    Validate "You clicked on a button!" text is visible
    */
    test.only('Validate "You clicked on a button!" text is visible', async ({ page }) => {

        await page.locator('#click').click()
        expect(page.locator('#click_result')).toHaveText('You clicked on a button!')
    });

});