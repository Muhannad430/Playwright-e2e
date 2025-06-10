import { chromium } from '@playwright/test';

// This will run once before execution
export default async function globalSetup() {
    // Set browser-context-page
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');
    await page.waitForTimeout(3000);

    console.log('This is GLOBAL SET UP Running!');

    // Login and store auth state
}