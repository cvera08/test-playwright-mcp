# Playwright MCP — Resume QA Suite

End-to-end test suite built with **Playwright** and **TypeScript**, using the **Page Object Model** pattern, integrated into **CI/CD via GitHub Actions**, and authored/maintained with AI-agent assistance through the [Playwright MCP server](https://github.com/microsoft/playwright-mcp).

Target under test: [cvera08.github.io/full-resume](https://cvera08.github.io/full-resume/) — my own live resume site. Dogfooding the same rigor I'd apply to a production product: content integrity, outbound link health, SEO/social preview correctness, accessibility, and responsive layout.

## Stack

- Playwright 1.55+ · TypeScript · Node.js
- Page Object Model (`pages/ResumePage.ts`)
- `@axe-core/playwright` for accessibility checks
- GitHub Actions (Chromium, Firefox, WebKit)

## Structure

```
pages/                    — ResumePage: locators + low-level page interactions
tests/
  content.spec.ts         — data-driven section rendering checks
  links.spec.ts           — outbound project links + PDF download resolve
  meta-tags.spec.ts       — og:image / og:url / canonical resolve correctly
  accessibility.spec.ts   — axe-core scan, no critical/serious violations
  responsive.spec.ts      — no horizontal overflow across mobile/tablet/desktop
  fixtures/                — expected section titles & links, mirrors full-resume/_data/data.yml
.github/                  — CI pipeline running on push
docs/AI-WORKFLOW.md       — how MCP-assisted agents help author/maintain this suite
```

## Run locally

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

To run a specific spec:

```bash
npx playwright test tests/content.spec.ts
```

To open the HTML report after a run:

```bash
npx playwright show-report
```

## CI

Tests run automatically on every push across **3 browsers** (Chromium, Firefox, WebKit). HTML report artifact is uploaded on every run for easy debugging.

## Architecture

`pages/ResumePage.ts` owns all locators and page-level reads (meta tags, canonical link, project link hrefs). Specs stay declarative and only orchestrate assertions, so a markup change to the resume theme means updating one file, not every spec.

`tests/fixtures/expectedSections.ts` mirrors the section titles and project links defined in `full-resume/_data/data.yml`, making the content checks data-driven against the actual CV source of truth rather than hardcoded per test.

## Found in production

This suite caught a real bug on day one: `og:image`, `og:url`, and the canonical link on the live resume were resolving to a duplicated path (`/full-resume/full-resume/...`, 404), silently breaking link previews on LinkedIn/Slack/WhatsApp. Root cause and fix are documented in the `full-resume` repo. See `tests/meta-tags.spec.ts`.

## Next Steps

- Add visual regression snapshots for key sections
- Extend `fixtures/expectedSections.ts` generation to read `data.yml` directly (see `docs/AI-WORKFLOW.md`)
