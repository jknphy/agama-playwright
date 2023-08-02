import { test, expect } from '@playwright/test';

export class ProductSelectionPage {
    readonly page: Page;
    readonly productSelectionText: Locator;
    readonly suseAlpServerCheck: Locator;
    readonly suseAlpMicroCheck: Locator;
    readonly opensuseTumbleweedCheck: Locator;
    readonly opensuseLeap_Check: Locator;
    readonly selectButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSelectionText = page.getByText('Product selection');
        this.opensuseServerType_Check = page.getByLabel(process.env.PRODUCTNAME);
        this.selectButton = page.getByRole('button', { name: 'Select' });
    }

    async expectProductSelection() {
        await expect(this.productSelectionText).toBeVisible(true);
    }

    async checkServerType(product: string) {
        await this.opensuseServerType_Check.check(productname);
    }

    async select() {
        await this.selectButton.click();
    }
}
