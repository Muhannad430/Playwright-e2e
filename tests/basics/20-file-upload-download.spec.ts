import { test, expect, chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';


test.describe('file Upload and Download', () => {
    test.beforeEach(async ({ page }) => {
        // const browser = await chromium.launch();
        // const context = await browser.newContext();
        // const page = await context.newPage();
        await page.goto('https://www.techglobal-training.com/frontend/file-download');
    });
    test('File download', async ({ page }) => {
        await page.locator('#file_download').click()

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('#file_download').click()
        ]);

        const path = 'downloads/' + download.suggestedFilename();
        await download.saveAs(path)

        expect(fs.existsSync(path)).toBeTruthy();

    });

    test('File Upload', async ({ page }) => {
        await page.locator('#file_upload').setInputFiles('downloads/Sampletext.txt');
        await page.locator('#file_submit').click();

        await expect(page.locator('#result')).toContainText('Sampletext.txt');
    });

});