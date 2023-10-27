import { expect, type Locator, type Page } from '@playwright/test';

export class PatternsPage {
    readonly page: Page;
    readonly yastDesktopUtilitiesLabel: Locator;
    readonly gnomeDesktopBasicLabel: Locator;
    readonly enhancedBaseSystemLabel: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.yastDesktopUtilitiesLabel = page.getByText('YaST Desktop Utilities');
        this.gnomeDesktopBasicLabel = page.getByText('GNOME Desktop Environment (Basic)');
        this.enhancedBaseSystemLabel = page.getByText('Enhanced Base System');
        this.backButton = page.getByRole('button', { name: 'Back' });
    }

    async selectPatterns() {
        await expect(this.yastDesktopUtilitiesLabel).toBeVisible({ timeout: 30000 });
        await this.yastDesktopUtilitiesLabel.click();
        await this.gnomeDesktopBasicLabel.click();
    }

    async deSelectPatterns() {
        await this.enhancedBaseSystemLabel.click();
    }
    
    async back() {
        await this.backButton.click();
    }
}
