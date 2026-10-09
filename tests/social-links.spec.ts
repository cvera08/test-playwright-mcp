import { test, expect } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';

/**
 * LinkedIn returns HTTP 999 to non-browser clients (curl, Playwright's request
 * context) — its own anti-bot status, not a broken-link signal. So unlike
 * links.spec.ts, this doesn't assert on live resolution, only on the href
 * shape actually pointing at the right profile.
 */
test.describe('Social links', () => {
    const profilePattern = /^https:\/\/(www\.)?linkedin\.com\/in\/carlos-vera-automation-qa\/?$/;

    test('header LinkedIn link points at the right profile', async ({ page }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const href = (await resumePage.headerLinkedInLink.getAttribute('href'))?.trim();
        expect(href).toMatch(profilePattern);
    });

    test('footer LinkedIn link points at the right profile', async ({ page }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const href = (await resumePage.footerLinkedInLink.getAttribute('href'))?.trim();
        expect(href).toMatch(profilePattern);
    });
});
