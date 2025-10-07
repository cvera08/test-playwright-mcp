import { Page, Locator } from '@playwright/test';

/**
 * Page Object class for Google's homepage
 * Contains all locators and basic interactions for google.com
 */
export class GooglePage {
    readonly page: Page;
    
    // Page elements
    readonly searchBox: Locator;
    readonly luckyButton: Locator;
    readonly settingsButton: Locator;
    readonly settingsMenu: Locator;

    /**
     * Initialize Google page elements
     * @param page - Playwright page object
     */
    constructor(page: Page) {
        this.page = page;
        
        // Initialize locators
        this.searchBox = page.getByRole('combobox', { name: 'Buscar' });
        this.luckyButton = page.getByRole('button', { name: 'Voy a tener suerte' });
        this.settingsButton = page.getByRole('button', { name: 'Configuración' });
        this.settingsMenu = page.getByRole('menu');
    }

    /**
     * Navigate to Google homepage
     */
    async goto() {
        await this.page.goto('https://www.google.com');
    }

    /**
     * Get the page title
     * @returns Promise<string> - The page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Focus the search box
     */
    async focusSearchBox() {
        await this.searchBox.click();
    }

    /**
     * Type text into the search box
     * @param text - Text to type into search box
     */
    async typeIntoSearch(text: string) {
        await this.searchBox.fill(text);
    }

    /**
     * Open settings menu
     */
    async openSettings() {
        await this.settingsButton.click();
    }

    /**
     * Check if settings menu is visible
     * @returns Promise<boolean> - True if settings menu is visible
     */
    async isSettingsMenuVisible(): Promise<boolean> {
        return await this.settingsMenu.isVisible();
    }
}
