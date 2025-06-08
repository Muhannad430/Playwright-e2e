import { test, expect } from "@playwright/test";

test.describe("Demo Blaze Dashboard test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByRole("link", { name: "Log in" }).click();
        await page.locator("#loginusername").fill("test");
        await page.locator("#loginpassword").fill("test");
        await page.getByRole("button", { name: "Log in" }).click();
    });

    test("Header Snapshot", async ({ page }) => {
        await expect(page.locator("#navbarExample")).toMatchAriaSnapshot(`
      - list:
        - listitem:
          - link "Home (current)":
            - /url: index.html
        - listitem:
          - link "Contact":
            - /url: "#"
        - listitem:
          - link "About us":
            - /url: "#"
        - listitem:
          - link "Cart":
            - /url: cart.html
        - listitem
        - listitem:
          - link "Log out":
            - /url: "#"
        - listitem:
          - link "Welcome test":
            - /url: "#"
        - listitem
      `);
    });

    test("Logo Snapshot", async ({ page }) => {
        await expect(page.locator("#nava")).toMatchAriaSnapshot(`
      - link "PRODUCT STORE":
        - /url: index.html
        - img
      `);
    });

});