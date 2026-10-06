# AI-agent-assisted authoring & maintenance

This repo is deliberately named after the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) (`.vscode/mcp.json`) because that's the actual authoring workflow, not just a config file nobody uses: coding agents (Claude Code, GitHub Copilot agent mode) drive Playwright's MCP tools to inspect the live DOM, generate locators, and validate specs against the real page before a human reviews and commits.

![Agent → MCP → live site → proposed diff → human review, splitting into real-bug-fix-the-source or test-bug-fix-the-spec](assets/mcp-workflow.svg)

## Where the agent adds value

- **Locator discovery**: instead of hand-inspecting DevTools, the agent uses the MCP server's browser tools to navigate the live resume, read the rendered DOM, and propose selectors for `pages/ResumePage.ts`.
- **Fast iteration on assertions**: when a spec fails, the agent re-runs it, reads the trace/error, and proposes a fix in the same loop — the human decides whether the fix is a test bug or a real regression (see the `og:image`/`og:url` case below).
- **Maintenance trigger**: `full-resume/_data/data.yml` is the single source of truth for CV content. When a section is added/renamed there, an agent re-reads the live page through MCP and proposes the diff to `tests/fixtures/expectedSections.ts` — today that sync is manual, this is the intended near-term automation (tracked in README's Next Steps).

## Where the human stays in charge

The agent proposes; a human decides what's worth asserting and what a failure means. The `meta-tags.spec.ts` suite is the clearest example: the agent could easily have loosened the assertion to make a failing test "green" (e.g., stop checking that `og:image` resolves). Instead, the failure was treated as a real production bug on the live resume site, root-caused, and fixed at the source (`full-resume/_config.yml`) — the test stayed strict, and the site got fixed instead of the test getting weaker.

## Scope boundary

This workflow is about using an agent to **author and maintain deterministic Playwright tests faster** — it is not about evaluating LLM/agent outputs (no Ragas, no LLM-as-a-judge, no golden datasets here). That line is intentional: this repo stays a QA-architecture artifact; AI evaluation work lives in separate repos.
