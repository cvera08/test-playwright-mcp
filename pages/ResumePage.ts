import { Page, Locator } from '@playwright/test';

/**
 * Page Object for the live full-resume site (Jekyll + GitHub Pages).
 * Sections are data-driven from full-resume/_data/data.yml — see fixtures/expectedSections.ts.
 */
export class ResumePage {
    readonly page: Page;

    readonly downloadPdfLink: Locator;
    readonly projectItems: Locator;
    readonly sections: Locator;

    constructor(page: Page) {
        this.page = page;
        this.downloadPdfLink = page.locator('a.download-pdf-btn');
        this.projectItems = page.locator('section.project .items .item');
        this.sections = page.locator('section');
    }

    async goto() {
        await this.page.goto('./');
    }

    sectionByClass(className: string): Locator {
        return this.page.locator(`section.${className}`);
    }

    sectionTitle(className: string): Locator {
        return this.sectionByClass(className).locator('.section-title h2');
    }

    async getMetaContent(property: string): Promise<string | null> {
        return this.page.locator(`meta[property="${property}"], meta[name="${property}"]`).getAttribute('content');
    }

    async getCanonicalHref(): Promise<string | null> {
        return this.page.locator('link[rel="canonical"]').getAttribute('href');
    }

    async getProjectLinkHrefs(): Promise<string[]> {
        const hrefs = await this.projectItems.locator('.description a').evaluateAll(
            (anchors) => anchors.map((a) => (a as HTMLAnchorElement).href)
        );
        return hrefs;
    }
}
