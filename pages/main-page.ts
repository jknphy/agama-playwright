import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly accessProductLink: Locator;
    readonly accessStorageLink: Locator;
    readonly accessUsersLink: Locator;
    readonly installButton: Locator;
    readonly installationSize: Locator;
    readonly noUserDefined: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accessProductLink = page.getByRole('link', { name: 'Product' });
        this.accessStorageLink = page.getByRole('link', { name: 'Storage' });
        this.accessUsersLink = page.getByRole('link', { name: 'Users' });
        this.installButton = page.getByRole("button", { name: "Install", exact: true });
        this.installationSize = page.getByText("Installation will take");
        this.noUserDefined = page.getByText('No user defined yet');
    }

    async accessProduct() {
        await this.accessProductLink.click();
    }

    async accessStorage() {
        await this.accessStorageLink.click();
    }

    async accessUsers() {
        await this.accessUsersLink.click();
    }

    async expectInstallationSize() {
        await expect(this.installationSize).toBeVisible({ timeout: 2 * 60 * 1000 });
    }

    async install() {
        await this.installButton.click();
    }

}
