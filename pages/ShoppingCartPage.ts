import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
    readonly availableCoursesHeader: Locator;
    readonly itemsAddedToCart: Locator;
    readonly cartHearder: Locator;
    readonly courses: Locator
    readonly images: Locator;
    readonly nameTag: Locator;
    readonly techGlobalSchoolTag: Locator;
    readonly price: Locator;
    readonly discount: Locator;
    readonly addToCartButton: Locator;
    readonly totalPrice: Locator;
    readonly placeOrderButton: Locator;
    readonly message: Locator;
    readonly cartSection: Locator;
    readonly itemsInCart: Locator;

    constructor(page: Page) {
        super(page);

        this.availableCoursesHeader = this.page.locator('[class="mt-2 mb-4"]');
        this.cartHearder = this.page.locator('[class="mb-1"]');
        this.itemsAddedToCart = this.page.locator('[class="mb-2"]')
        this.courses = this.page.locator('[class^="Project8_courseColumn"]');
        this.images = this.page.locator('[alt^="Course"]');
        this.nameTag = this.page.locator('div h3');
        this.techGlobalSchoolTag = this.page.locator('[class="my-3"]');
        this.price = this.page.getByTestId('full-price');
        this.discount = this.page.getByTestId('discount');
        this.addToCartButton = this.page.locator('[class="button is-primary is-fullwidth"]');
        this.totalPrice = this.page.locator('#total-price');
        this.placeOrderButton = this.page.getByText('Place Order');
        this.message = this.page.locator('[class^="notification is-success"]');
        this.cartSection = this.page.locator('[class^="column p-0"]');
        this.itemsInCart = this.page.locator('[class^="course-card "]')
    }
}