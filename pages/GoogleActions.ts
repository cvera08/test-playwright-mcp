import { expect } from '@playwright/test';
import { GooglePage } from './GooglePage';

/**
 * Actions class for Google homepage
 * Contains complex interactions and validations
 */
export class GoogleActions {
    readonly page: GooglePage;

    /**
     * Initialize Google actions
     * @param googlePage - GooglePage object
     */
    constructor(googlePage: GooglePage) {
        this.page = googlePage;
    }

    /**
     * Verify that all essential elements are present on the page
     */
    async verifyPageElements() {
        await expect(this.page.searchBox).toBeVisible();
        await expect(this.page.luckyButton).toBeVisible();
        await expect(this.page.settingsButton).toBeVisible();
    }

    /**
     * Verify page title is correct
     */
    async verifyPageTitle() {
        await expect(this.page.page).toHaveTitle(/Google/);
    }

    /**
     * Verify search box functionality
     */
    async verifySearchBoxFunctionality() {
        // Verify visibility
        await expect(this.page.searchBox).toBeVisible();
        
        // Verify focus behavior
        await this.page.focusSearchBox();
        await expect(this.page.searchBox).toBeFocused();
    }

    /**
     * Verify settings menu functionality
     */
    async verifySettingsMenu() {
        await this.page.openSettings();
        await expect(this.page.settingsMenu).toBeVisible();
    }
}
