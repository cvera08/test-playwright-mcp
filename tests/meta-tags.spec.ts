import { test, expect } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';

/**
 * These checks exist because a broken og:image/canonical URL silently kills
 * link previews on LinkedIn/Slack/WhatsApp — the kind of regression nobody
 * notices until a recruiter shares the CV link and the preview is blank.
 */
test.describe('SEO / social preview meta tags', () => {
    test('canonical URL resolves without duplicated path segments', async ({ page, request }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const canonical = await resumePage.getCanonicalHref();
        expect(canonical).toBeTruthy();
        expect(canonical).not.toMatch(/full-resume.*full-resume/);

        const response = await request.get(canonical!);
        expect(response.status(), `canonical URL ${canonical} should resolve`).toBe(200);
    });

    test('og:image resolves to a real image', async ({ page, request }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const ogImage = await resumePage.getMetaContent('og:image');
        expect(ogImage).toBeTruthy();

        const response = await request.get(ogImage!);
        expect(response.status(), `og:image ${ogImage} should resolve`).toBe(200);
        expect(response.headers()['content-type']).toContain('image');
    });

    test('og:url resolves and matches the canonical URL', async ({ page, request }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const ogUrl = await resumePage.getMetaContent('og:url');
        const canonical = await resumePage.getCanonicalHref();

        expect(ogUrl).toBe(canonical);

        const response = await request.get(ogUrl!);
        expect(response.status(), `og:url ${ogUrl} should resolve`).toBe(200);
    });
});
