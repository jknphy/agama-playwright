import { type Locator, type Page } from '@playwright/test';

export class ProductSelectionOpensusePage {
    readonly page: Page;
    readonly productSelectionText: Locator;
    readonly opensuseTumbleweedLabel: Locator;
    readonly opensuseLeapLabel: Locator;
    readonly selectButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSelectionText = page.getByText('Product selection');
        this.opensuseTumbleweedLabel = page.locator('#Tumbleweed');
        this.opensuseLeapLabel = page.locator('#Leap16');
        this.selectButton = page.getByRole('button', { name: 'Select' });
    }

    async chooseOpensuseTumbleweed() {
        await this.opensuseTumbleweedLabel.check();
    }

    async chooseOpensuseLeap() {
        await this.opensuseLeapLabel.check();
    }

    async select() {
        await this.selectButton.click();
    }
}
