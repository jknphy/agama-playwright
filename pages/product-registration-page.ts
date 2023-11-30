import { type Locator, type Page } from '@playwright/test';

export class ProductRegistrationPage {
    readonly page: Page;
    readonly acceptButton: Locator;
    readonly registrationCode: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptButton = page.getByRole('button', { name: 'Accept' });
        this.registrationCode = page.getByLabel('Registration code *');
    }

    async fillRegistrationCode(registrationcode: string) {
        await this.registrationCode.fill(registrationcode);
    }

    async accept() {
        await this.acceptButton.click();
    }
}
