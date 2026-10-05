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

        // Section-title color (#1DA1F2) is a deliberate brand decision — it matches
        // the favicon and CVeraPortfolio's accent color across both sites, chosen
        // over strict AA contrast after side-by-side feedback. Accepted knowingly;
        // every other contrast/a11y violation still fails the build.
        const blockingViolations = results.violations
            .map((v) => {
                if (v.id !== 'color-contrast') return v;
                const nodes = v.nodes.filter(
                    (n) => !n.target.some((t) => t.includes('.section-title'))
                );
                return { ...v, nodes };
            })
            .filter((v) => (v.impact === 'critical' || v.impact === 'serious') && v.nodes.length > 0);

        expect(
            blockingViolations,
            blockingViolations.map((v) => `${v.id}: ${v.description}`).join('\n')
        ).toEqual([]);
    });
});
