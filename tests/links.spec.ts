import { test, expect } from '@playwright/test';
import { ResumePage } from '../pages/ResumePage';
import { expectedProjectLinks } from './fixtures/expectedSections';

test.describe('Outbound link integrity', () => {
    test('every personal project links to a resolvable GitHub repo', async ({ page, request }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        const hrefs = await resumePage.getProjectLinkHrefs();
        const repoLinks = hrefs.filter((href) => href.startsWith('https://github.com/cvera08/'));

        expect(repoLinks.sort()).toEqual(expectedProjectLinks.sort());

        for (const href of repoLinks) {
            const response = await request.get(href);
            expect(response.status(), `${href} should resolve`).toBe(200);
        }
    });

    test('the PDF download link is present and reachable', async ({ page, request, baseURL }) => {
        const resumePage = new ResumePage(page);
        await resumePage.goto();

        await expect(resumePage.downloadPdfLink).toBeVisible();
        const href = await resumePage.downloadPdfLink.getAttribute('href');
        expect(href).toBeTruthy();

        const absoluteUrl = new URL(href!, baseURL).toString();
        const response = await request.get(absoluteUrl);
        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('pdf');
    });
});
