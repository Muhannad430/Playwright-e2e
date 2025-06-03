import { test, expect } from '@playwright/test';

test('Snapshot Test 1', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/frontend/alerts');
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - button "Warning alert"
      - listitem:
        - button "Confirmation alert"
      - listitem:
        - button "Prompt alert"
    `);
});

test('Snapshot Test 2', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/');
    await expect(page.locator('[class^="Footer_socials"]')).toMatchAriaSnapshot(`
    - link:
      - /url: https://www.linkedin.com/in/techglobalschool
    - link:
      - /url: https://www.facebook.com/techglobalschool
    - link:
      - /url: https://www.instagram.com/techglobal.school
    - link:
      - /url: https://x.com/techglobalschl
    - link:
      - /url: https://www.youtube.com/@techglobalschool
    `);
});

test('Snapshot Test 3', async ({ page }) => {
    await page.goto('https://www.techglobal-training.com/');
    await expect(page.locator('[class^="HeroBanner_container"]')).toMatchAriaSnapshot(`
    - heading "Welcome to TechGlobal" [level=1]
    - heading "School Training" [level=1]
    - paragraph: This website is created by TechGlobal School Alumni who completed the 6 months of the Software Engineer Program with the guidance of founders and instructors.
    - link "See Our Programs":
      - /url: https://www.techglobalschool.com/courses/
    - paragraph: Be Part of TechGlobal Today
    `);
});