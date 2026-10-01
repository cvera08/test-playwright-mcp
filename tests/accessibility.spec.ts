import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ResumePage } from '../pages/ResumePage';

test.describe('Accessibility', () => {
    test('homepage has no critical or serious a11y violations', async ({ page }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const results = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa'])
            .analyze();

        const blockingViolations = results.violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );

        expect(
            blockingViolations,
            blockingViolations.map((v) => `${v.id}: ${v.description}`).join('\n')
        ).toEqual([]);
    });
});
