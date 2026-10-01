import { test, expect } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';
import { expectedSections } from './fixtures/expectedSections';

test.describe('Resume content sections', () => {
    let resumePage: ResumePage;

    test.beforeEach(async ({ page }) => {
        resumePage = new ResumePage(page);
        await resumePage.goto();
    });

    for (const section of expectedSections) {
        test(`renders "${section.title}" section`, async () => {
            await expect(resumePage.sectionByClass(section.className)).toBeVisible();
            await expect(resumePage.sectionTitle(section.className)).toHaveText(section.title);
        });
    }

    test('lists the expected personal projects', async () => {
        await expect(resumePage.projectItems).toHaveCount(3);
    });
});
