import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly backButton: Locator;
    readonly deregisterButton: Locator;
    readonly registerButton: Locator;
    readonly registrationNotRequired: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deregisterButton = page.getByRole('button', { name: 'Deregister product' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.backButton = page.getByRole('button', { name: 'Back' });
        this.registrationNotRequired = page.getByText('This product does not require');
    }

    async expectDeregisterShown() {
        await expect(this.deregisterButton).toBeVisible({ timeout: 2 * 60 * 1000 });
    }

    async register() {
        await this.registerButton.click();
    }

    async back() {
        await this.backButton.click();
    }
}
