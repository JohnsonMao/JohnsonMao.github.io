# Blog Testing

## Purpose

定義部落格專案的測試策略、工具、與必須被驗證的行為（build、內容、可選 E2E），以在變更時降低 regression 風險。

## Requirements

### Requirement: Automated test suite

The project SHALL provide an automated test suite that SHALL be runnable via a single command (e.g. `pnpm run test`) and SHALL complete in a deterministic way suitable for CI. The test suite SHALL use a standard test runner (e.g. Vitest) compatible with the project's ESM and build tooling.

#### Scenario: Test command runs and exits with code
- **WHEN** the designated test command is executed
- **THEN** all tests SHALL run and the process SHALL exit with code 0 on success or non-zero on failure

#### Scenario: Tests are repeatable
- **WHEN** the test command is run multiple times without code changes
- **THEN** the outcome (pass/fail) SHALL be consistent

### Requirement: Build verification

The system SHALL include tests or checks that verify the Astro build succeeds and produces expected static output. The project SHALL NOT consider the change complete without at least one automated verification that the build completes successfully.

#### Scenario: Build success is verified by test or script
- **WHEN** the test suite or a dedicated build-check step runs
- **THEN** the Astro build (e.g. `astro build`) SHALL be executed and SHALL be required to succeed for the overall run to pass

### Requirement: Content and schema validation

The project SHALL include tests or validation that ensure blog content and content collection schema can be loaded and validated without errors. Invalid schema or content that would break the build SHALL be detectable by the test suite or check step.

#### Scenario: Content collection is loadable
- **WHEN** tests or checks that depend on content collections run
- **THEN** the blog collection (and any other content collections in scope) SHALL load without throwing, or failures SHALL be reported as test/check failures

### Requirement: CI integration

The project SHALL run the test suite in CI (e.g. GitHub Actions) on relevant events (e.g. push or pull_request) so that regressions are caught before merge or deploy. The CI workflow SHALL run the same test command that is used locally.

#### Scenario: CI runs tests
- **WHEN** the configured CI workflow runs for the change
- **THEN** the test command SHALL be executed and the workflow SHALL fail if tests fail

### Requirement: Optional E2E or smoke tests

The project MAY include optional E2E or smoke tests that verify key pages or routes are reachable after build (e.g. home, blog list, or a sample post). Such tests are optional for this capability; if present, they SHALL be runnable as part of the same test command or a documented separate step.

#### Scenario: Optional E2E runs when present
- **WHEN** optional E2E or smoke tests exist and are run (e.g. via `pnpm run test` or `pnpm run test:e2e`)
- **THEN** they SHALL assert that configured critical URLs or pages are reachable or render as expected, and SHALL not block the main test suite if excluded by configuration
