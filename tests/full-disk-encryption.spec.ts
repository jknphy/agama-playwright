import { test, expect } from '@playwright/test';
import { IndexActor } from "../actors/index-actor";
import { UserActor } from "../actors/user-actor";
import { StoragePage } from '../pages/storage-page';
import { MainPage } from '../pages/main-page';
import { ProductActor } from "../actors/product-actor";
import { ProductSelectionOpensusePage } from '../pages/product-selection-opensuse-page';
import { EncryptionPasswordPopup } from '../pages/encryption-password-popup';
import { InstallActor } from '../actors/install-actor';

const minute = 60 * 1000;
test.describe('The main page', () => {
    test.beforeEach(async ({ page }) => {
        const productSelectionOpensusePage = new ProductSelectionOpensusePage(page);
        const mainPage = new MainPage(page);
        const indexActor = new IndexActor(page, mainPage, productSelectionOpensusePage);
        indexActor.goto();
        indexActor.handleProductSelectionIfAny();
    });

    test('Full-disk encryption', async ({ page }) => {
        const mainPage = new MainPage(page);
        await test.step("Set for Full-disk encryption", async () => {
            await mainPage.accessProduct();
            await (new ProductActor(page)).handleProductRegistration();

            await mainPage.accessStorage();

            const storagePage = new StoragePage(page);
            await storagePage.useEncryption();

            const passwordPopup = new EncryptionPasswordPopup(page);
            await passwordPopup.fillPassword(UserActor.user.password);
            await passwordPopup.fillPasswordConfirmation(UserActor.user.password);
            await passwordPopup.accept();

            await storagePage.validateEncryptionIsUsed();
            await storagePage.back();

        });

        await test.step("set mandatory user and root password", async () => {
            await mainPage.accessUsers();
            await (new UserActor(page)).handleUser();
        });

        //Installation
        await test.step("Run installation", async () => {
            test.setTimeout(30 * minute);
            const installActor = new InstallActor(page, mainPage);
            await installActor.handleInstallation();
        })
    })
})
