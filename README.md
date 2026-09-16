# Playwright MCP Demo

End-to-end test suite built with **Playwright** and **TypeScript**, using the **Page Object Model** pattern and integrated into **CI/CD via GitHub Actions**.

Designed as a demo of how AI-assisted tools (like the [Playwright MCP server](https://github.com/microsoft/playwright-mcp)) can accelerate test authoring while keeping a clean, maintainable architecture.

## Stack

- Playwright 1.55+ · TypeScript · Node.js
- Page Object Model (Page + Actions separation)
- GitHub Actions (Chromium, Firefox, WebKit)

## Structure

```
pages/          — locators and actions separated by responsibility
tests/          — end-to-end specs with real assertions
.github/        — CI pipeline running on push
```

## Run locally

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

To run a specific spec:

```bash
npx playwright test tests/google.spec.ts
```

To open the HTML report after a run:

```bash
npx playwright show-report
```

## CI

Tests run automatically on every push across **3 browsers** (Chromium, Firefox, WebKit). HTML report artifact is uploaded on every run for easy debugging.

## Architecture

The suite follows a two-layer Page Object Model:

- **`pages/GooglePage.ts`** — owns all locators, navigation, and low-level interactions
- **`pages/GoogleActions.ts`** — owns assertions and higher-level test actions

This separation keeps specs clean and makes locator updates a single-file change.

## Next Steps

- Extend coverage to search result interactions and navigation flows
- Parameterize locale-dependent selectors to support multiple regions
- Add visual regression snapshots for key UI states
