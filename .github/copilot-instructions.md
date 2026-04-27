# Copilot / AI agent guidance for this repository

Purpose
- Help an AI coding agent be productive in this Playwright JS repository (tests in `tests/`).

Quick start (commands an agent may run)
- Install deps: `npm install` (uses `devDependencies` in `package.json`). See [package.json](package.json).
- Run all tests: `npx playwright test` (repo contains Playwright tests under `tests/`).
- Run a single test: `npx playwright test tests/HandlingCalendar.spec.js`.
- View HTML report: open `playwright-report/index.html` or run `npx playwright show-report`.

Key files
- Tests: [tests/](tests/) — test files are `*.spec.js` using CommonJS-style `require("@playwright/test")`.
- Config: [playwright.config.js](playwright.config.js) — defines `testDir: './tests'`, timeouts, `reporter: 'html'`, and `use` defaults (browser, headless). Note the file exports a `configO` object via `module.exports`.
- Package manifest: [package.json](package.json) — contains `@playwright/test` in `devDependencies` but no npm `scripts` configured.

Repository-specific patterns and conventions
- CommonJS tests: Tests use `const { expect, test } = require("@playwright/test")` (not ESM imports). Keep new test files consistent with CommonJS.
- Test directory: All tests live under `tests/` and are named `*.spec.js` (Playwright default test discovery).
- Locator usage: Code uses Playwright `page.locator(...)`, `page.getByText(...)`, and occasional XPath strings. Example from `tests/HandlingCalendar.spec.js`:

```js
await page.locator(".react-calendar__navigation__label").click();
await page.getByText(year).click();
await page.locator("//abbr[text()='"+date+"']").click();
```

- Numeric conversion pattern: tests sometimes compute indices with `Number(monthNumber)-1` before calling `.nth(...)` — preserve this pattern when manipulating month/day indices.

Config and environment notes
- `playwright.config.js` sets `headless: false` under `use`. Be mindful when running CI: headless may be required there. The config file contains commented guidance and exports a plain object.
- Node `type: "commonjs"` is set in `package.json`. Maintain CommonJS compatibility.
- There are no npm scripts; CI or contributor workflows may rely on `npx playwright test` directly. Avoid inserting global tooling assumptions.

Testing and debugging tips
- To reproduce locally: `npm install`, then `npx playwright test --debug` or `npx playwright test --headed`.
- To inspect failing runs, open `playwright-report/index.html` produced by the default HTML reporter.

What to avoid / gotchas
- Do not convert tests to ESM or change `type` in `package.json` without coordinating with maintainers.
- Avoid changing Playwright major versions in `devDependencies` without running the full test suite — tests rely on Playwright v1.x API.

When editing code
- Keep changes minimal and consistent with existing conventions (CommonJS, `tests/*.spec.js`, Playwright locators).
- If adding `npm` scripts`, prefer adding non-breaking, descriptive names (e.g., `test`, `test:debug`) and mention the change in the PR description.

If something is unclear
- Ask for clarification about CI expectations (headless vs headed) and whether adding npm `scripts` is allowed.

Contact / Next steps
- After making changes, run `npx playwright test` and open `playwright-report/index.html` to validate.
