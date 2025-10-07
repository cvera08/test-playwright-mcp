import { test } from '@playwright/test';
import { GooglePage } from '../pages/GooglePage';
import { GoogleActions } from '../pages/GoogleActions';

/**
 * Test suite for Google's homepage functionality
 * These tests verify basic UI elements and interactions on google.com
 * Note: Tests are designed to work with Spanish localization (Uruguay region)
 */
test.describe('Google Search Tests', () => {
    let googlePage: GooglePage;
    let googleActions: GoogleActions;

    /**
     * Before each test, initialize page objects and navigate to Google's homepage
     */
    test.beforeEach(async ({ page }) => {
        googlePage = new GooglePage(page);
        googleActions = new GoogleActions(googlePage);
        await googlePage.goto();
    });

    /**
     * Verify that the page title is correct
     * This test ensures we've landed on the proper Google homepage
     */
    test('should have correct title', async () => {
        await googleActions.verifyPageTitle();
    });

    /**
     * Test the search box functionality
     * Verifies that:
     * 1. The search box is visible on the page
     * 2. The search box becomes focused when clicked
     */
    test('should have search box', async () => {
        await googleActions.verifySearchBoxFunctionality();
    });

    /**
     * Verify the presence of the "I'm Feeling Lucky" button
     * Note: Button text is in Spanish ("Voy a tener suerte")
     */
    test('should have "Voy a tener suerte" button', async () => {
        await googleActions.verifyPageElements();
    });

    /**
     * Test the settings menu functionality
     * Verifies that:
     * 1. The settings button is clickable
     * 2. Clicking it reveals a menu
     */
    test('should toggle search options', async () => {
        await googleActions.verifySettingsMenu();
    });
});
