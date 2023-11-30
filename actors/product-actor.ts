import { type Page } from '@playwright/test';
import { ProductRegistrationPage } from '../pages/product-registration-page';
import { ProductPage } from '../pages/product-page';

export class ProductActor {
    readonly page: Page;
    readonly productPage: ProductPage;
    readonly productRegistrationPage: ProductRegistrationPage;

    constructor(page: Page) {
        this.page = page;
        this.productRegistrationPage = new ProductRegistrationPage(page);
        this.productPage = new ProductPage(page)
    }
    
    async handleProductRegistration() {
        const actions = Object.freeze({
            setRegister: Symbol("register"),
            setNoRegister: Symbol("not require register"),
        });

        let action = await Promise.any([
            this.productPage.registerButton.waitFor().then(() => actions.setRegister),
            this.productPage.registrationNotRequired.waitFor().then(() => actions.setNoRegister),
        ]);

        if (action === actions.setRegister) {
            await this.productPage.register();
            await this.productRegistrationPage.fillRegistrationCode(process.env.REGISTRATIONCODE);
            await this.productRegistrationPage.accept();
            await this.productPage.expectDeregisterShown();
        }
        await this.productPage.back()
    }
}
