import { test, expect } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';

const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
];

test.describe('Responsive layout', () => {
    for (const viewport of viewports) {
        test(`renders without horizontal overflow on ${viewport.name}`, async ({ page }) => {
            await page.setViewportSize({ width: viewport.width, height: viewport.height });
            const resumePage = new ResumePage(page);
            await resumePage.goto();

            const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
            const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
            expect(scrollWidth, `horizontal overflow on ${viewport.name}`).toBeLessThanOrEqual(clientWidth + 1);

            await expect(resumePage.sectionByClass('profile')).toBeVisible();
            await expect(resumePage.downloadPdfLink).toBeVisible();
        });
    }
});
