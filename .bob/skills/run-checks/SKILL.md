---
name: run-checks
description: "Skill to check for linting errors, test failures, and other issues."
---

## Objective
The objective of this skill is to automatically check for linting errors, test failures, and other issues in the codebase to ensure code quality and maintainability prior to pushing changes or creating a pull request (PR).

## Non-negotiables
- DO NOT fix any failures without first raising them to the user and asking for permission to fix them.
  - Exception: `pnpm lint:fix` or `pnpm lint:format --write` commands can be run as part of the checks
- Run all checks across all directories before presenting failures back to the user

## Procedure
1. Determine the scope of checks to be run
- Run `git merge-base origin/main HEAD` and `git log --oneline origin/main..HEAD` to list commits on this branch
- Run `git diff-tree --no-commit-id -r --name-only <sha>` for each commit sha to get the files changed in that commit. Combine those file lists — these are the only files in scope.
  - **Do not** use `git diff --name-only origin/main..HEAD`; that compares the full working-tree against `main` and will include files changed by others on `main` since the branch was cut.
- Check if any of the in-scope files belong to the following directories:- Check if any of the in-scope files belong to the following directories:
  - `packages/components`
  - `packages/flight-icons`
  - `packages/mcp`
  - `packages/tokens`
  - `showcase`
  - `website`

2. Run apprpopriate checks and generate any fixes based on the changed files or directories
- `packages/components`: `./package-components-checks.md`
- `packages/flight-icons`: `./package-flight-icons-checks.md`
- `packages/mcp`: `./package-mcp-checks.md`
- `packages/tokens`: `./package-tokens-checks.md`
- `showcase`: `./showcase-checks.md`
- `website`: `./website-checks.md`

3. Report any issues found during the checks
- For any checks that fail or generate errors, report the issues found and provide guidance on how to fix them.
- **IMPORTANT** Run all checks before reporting any issues and then present any remaining isuses in a condense summarized report.