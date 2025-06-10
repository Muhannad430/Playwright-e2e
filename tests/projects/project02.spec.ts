import { ShoppingCartPage } from '../../pages/ShoppingCartPage';
import { test, expect } from '../../fixtures/PageFixture'

test.describe('Validate Shopping-Cart page', () => {
    let shoppingCartPage: ShoppingCartPage
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.techglobal-training.com/frontend/shopping-cart')
        shoppingCartPage = new ShoppingCartPage(page);
    });
    /*
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Validate the heading is “Available Courses”
    Validate that there are 3 courses displayed
    Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero
    Validate the first 2 courses have discount tags
    Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”
    */
    test('Available Courses Section Validation', async ({ page }) => {
        // 1
        await expect(shoppingCartPage.availableCoursesHeader).toHaveText('Available Courses');
        // 2
        await expect(shoppingCartPage.courses).toHaveCount(3)
        // 3
        const count = await shoppingCartPage.courses.count()
        for (let i = 0; i < count; i++) {
            await expect(shoppingCartPage.images.nth(i)).toBeVisible();
            await expect(shoppingCartPage.nameTag.nth(i)).toBeVisible();
            await expect(shoppingCartPage.techGlobalSchoolTag.nth(i)).toContainText('TechGlobal School');


            const priceText = await shoppingCartPage.price.nth(i).innerText()
            const price: number = parseFloat(priceText.replace(/[^0-9.]/g, '') || '0');
            expect(price).toBeGreaterThan(0);
        }
        // 4
        for (let i = 0; i < 2; i++) {
            await expect(shoppingCartPage.discount.nth(i)).toBeVisible();
        }
        // 5
        for (let i = 0; i < count; i++) {
            await expect(shoppingCartPage.addToCartButton.nth(i)).toBeVisible();
            await expect(shoppingCartPage.addToCartButton.nth(i)).toBeEnabled();
            await expect(shoppingCartPage.addToCartButton.nth(i)).toHaveText('Add to Cart');
        }
    });
    /*
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Validate the heading is “Items Added to Cart”
    Validate that the cart is empty by default
    Validate that the total price is zero “$0” by default
    Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
    */
    test('Cart Section Validation', async ({ page }) => {
        // 1
        await expect(shoppingCartPage.itemsAddedToCart).toBeVisible();
        // 2
        await expect(shoppingCartPage.cartSection).not.toHaveAttribute('class', 'course-card');
        // 3
        const totalText = await shoppingCartPage.totalPrice.textContent();
        const total = parseFloat(totalText?.replace(/[^0-9.]/g, '') || '0');
        expect(total).toBe(0);
        // 4
        await expect(shoppingCartPage.placeOrderButton).toBeVisible();
        await expect(shoppingCartPage.placeOrderButton).toBeDisabled();
        await expect(shoppingCartPage.placeOrderButton).toHaveText('Place Order');
    });
    /*
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Click on the “Add to Cart” button for one of the courses
    Validate that the course is displayed in the cart with its image, name, and discount amount if available
    Validate that the course price is added to the total price excluding the discount amount
    Click on the “Place Order” button
    Validate a success message is displayed with the text “Your order has been placed.”
    Validate that the cart is empty
    */
    test('Add a Course to the Cart and Validate', async ({ page }) => {
        let count = await shoppingCartPage.courses.count()
        let randomCorse = Math.floor(Math.random() * count)
        // 1
        await shoppingCartPage.courses.nth(randomCorse).locator(shoppingCartPage.addToCartButton).click();
        // 2
        const image = shoppingCartPage.images.nth(randomCorse)
        const name = shoppingCartPage.nameTag.nth(randomCorse)
        await expect(image).toBeVisible();
        await expect(name).not.toHaveText('');
        const discountIsVisible = await shoppingCartPage.discount.nth(randomCorse).isVisible();
        if (discountIsVisible) {
            await expect(shoppingCartPage.discount.nth(randomCorse)).toBeVisible();
        }



        await shoppingCartPage.placeOrderButton.click();

        await expect(shoppingCartPage.message).toBeVisible();
        await expect(shoppingCartPage.message).toHaveText('Your order has been placed.')

    });
    /*
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Click on the “Add to Cart” button for one of the courses
    Click on the “Add to Cart” button for another course
    Validate that the courses are displayed in the cart with their image, name, and discount amount if available
    Validate that the course prices are added to the total price excluding the discount amounts
    Click on the “Place Order” button
    Validate a success message is displayed with the text “Your order has been placed.”
    Validate that the cart is empty
    */
    test('Add Two Courses to the Cart and Validate', async ({ page }) => {
        for (let courenum: number = 0; courenum < 2; courenum++) {
            let combinedPrice: number = 0
            const randomCourse: number = Math.floor(Math.random() * 3)
            if (courenum < 2) {
                const originalTextPrice: string = await shoppingCartPage.courses.nth(courenum).locator('p strong').textContent()!
                const discountString: string = await shoppingCartPage.courses.nth(courenum).getByTestId('discount').innerText()
                const originalPrice: number = Number(originalTextPrice.slice(1))
                const discountNumber: number = Number(discountString.slice(1, 3))
                combinedPrice += discountNumber
                await shoppingCartPage.courses.nth(courenum).locator('button').click()
                const totalPriceText: string = await shoppingCartPage.totalPrice.innerText()
                const totalPriceNumber: number = Number(totalPriceText.replace(/[^\d.]/g, ''))
                const calculationOfPrice: number = originalPrice - (originalPrice * (discountNumber / 100))
                await expect(shoppingCartPage.itemsInCart.locator(`[alt="Course ${courenum + 1}"]`)).toBeVisible()
                await expect(shoppingCartPage.itemsInCart.locator('p').first()).toBeVisible()
                await expect(shoppingCartPage.itemsInCart.locator('p').nth(1)).toContainText('%')
            } else {
                const originalTextPrice: string = await shoppingCartPage.courses.nth(2).locator('p strong').textContent()!
                const originalPrice: number = Number(originalTextPrice.slice(1))
                await shoppingCartPage.courses.nth(2).locator('button').click()
                const totalPriceText: string = await shoppingCartPage.totalPrice.innerText()
                const totalPriceNumber: number = Number(totalPriceText.replace(/[^\d.]/g, ''))
                await expect(shoppingCartPage.itemsInCart.locator(`[alt="Course ${courenum + 1}"]`)).toBeVisible()
                await expect(shoppingCartPage.itemsInCart.locator('p').first()).toBeVisible()
            }
        }
        const text = await shoppingCartPage.totalPrice.innerText()
        expect(text).toBe('Total: $152')
        await shoppingCartPage.placeOrderButton.click()
        await expect(shoppingCartPage.message).toContainText('Your order has been placed.')
        await expect(shoppingCartPage.itemsInCart).toHaveCount(0)

    });

    test('Add All Three Courses to the Cart and Validate', async ({ page }) => {

        for (let courenum: number = 0; courenum < 3; courenum++) {
            let combinedPrice: number = 0
            const randomCourse: number = Math.floor(Math.random() * 3)
            if (courenum < 2) {
                const originalTextPrice: string = await shoppingCartPage.courses.nth(courenum).locator('p strong').textContent()!
                const discountString: string = await shoppingCartPage.courses.nth(courenum).getByTestId('discount').innerText()
                const originalPrice: number = Number(originalTextPrice.slice(1))
                const discountNumber: number = Number(discountString.slice(1, 3))
                combinedPrice += discountNumber
                await shoppingCartPage.courses.nth(courenum).locator('button').click()
                const totalPriceText: string = await shoppingCartPage.totalPrice.innerText()
                const totalPriceNumber: number = Number(totalPriceText.replace(/[^\d.]/g, ''))
                const calculationOfPrice: number = originalPrice - (originalPrice * (discountNumber / 100))

                await expect(shoppingCartPage.itemsInCart.locator(`[alt="Course ${courenum + 1}"]`)).toBeVisible()
                await expect(shoppingCartPage.itemsInCart.locator('p').first()).toBeVisible()
                await expect(shoppingCartPage.itemsInCart.locator('p').nth(1)).toContainText('%')
            } else {
                const originalTextPrice: string = await shoppingCartPage.courses.nth(2).locator('p strong').textContent()!
                const originalPrice: number = Number(originalTextPrice.slice(1))
                await shoppingCartPage.courses.nth(2).locator('button').click()
                const totalPriceText: string = await shoppingCartPage.totalPrice.innerText()
                const totalPriceNumber: number = Number(totalPriceText.replace(/[^\d.]/g, ''))
                await expect(shoppingCartPage.itemsInCart.locator(`[alt="Course ${courenum + 1}"]`)).toBeVisible()
                await expect(shoppingCartPage.itemsInCart.locator('p').first()).toBeVisible()
            }
        }
        const text = await shoppingCartPage.totalPrice.innerText()
        expect(text).toBe('Total: $162')
        await shoppingCartPage.placeOrderButton.click()
        await expect(shoppingCartPage.message).toContainText('Your order has been placed.')
        await expect(shoppingCartPage.itemsInCart).toHaveCount(0)
    });

});
