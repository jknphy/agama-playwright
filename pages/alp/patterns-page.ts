import { expect, type Locator, type Page } from '@playwright/test';

export class PatternsPage {
    readonly page: Page;
    readonly ldapclientLabel: Locator;
    readonly selinuxSupport: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ldapclientLabel = page.getByText('LDAP Client', { exact: true });
        this.selinuxSupport = page.getByText('SELinux Support', { exact: true });
        this.backButton = page.getByRole('button', { name: 'Back' });
    }

    async selectPatterns() {
        try { //try to workaround the page never really loading...
            await expect(this.ldapclientLabel).toBeVisible({ timeout: 20000 });
        } catch (error) {
            console.error("LDAP client label was not visible within the timeout. Refreshing the page.");
            await this.page.reload(); 
            await expect(this.ldapclientLabel).toBeVisible({ timeout: 20000 });
        }
        
        await this.ldapclientLabel.click();
    }

    async deSelectPatterns() {
        await this.selinuxSupport.click();
    }
    
    async back() {
        await this.backButton.click();
    }
}
