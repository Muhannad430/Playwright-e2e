import { BasePage } from '../../pages/BasePage';
import { ShoppingCartPage } from '../../pages/ShoppingCartPage';
import { test, expect } from '../../fixtures/PageFixture'

test.describe('Validate Shopping-Cart page', () => {
    /*
    Navigate to https://techglobal-training.com/frontend/shopping-cart
    Validate the heading is “Available Courses”
    Validate that there are 3 courses displayed
    Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero
    Validate the first 2 courses have discount tags
    Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”
    */
    test.only('Available Courses Section Validation', async ({ shoppingCartPage }) => {
        await expect(shoppingCartPage.images).toBeVisible();
    });


    test('Cart Section Validation', async ({ shoppingCartPage }) => {

    });



    test('Add a Course to the Cart and Validate', async ({ shoppingCartPage }) => {

    });



    test('Add Two Courses to the Cart and Validate', async ({ shoppingCartPage }) => {

    });



    test('Add All Three Courses to the Cart and Validate', async ({ shoppingCartPage }) => {

    });

});