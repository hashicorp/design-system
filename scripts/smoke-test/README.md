# HDS smoke-test helpers

The engineer-facing entry point is the repository's [`smoke-test` skill](../../.bob/skills/smoke-test/SKILL.md). Ask the agent to use it with a candidate PR and project scope, for example: "Use the smoke-test skill to prepare candidate PR #4251 for Example Product A; stop before committing, pushing, or opening a PR." The skill handles scope, approval boundaries, and explaining evidence; the commands below are its deterministic implementation helpers and remain available for direct use.

The helpers support inspecting a release-candidate PR's successful publication comment, producing a local preflight plan, preparing a local consumer smoke-test branch, and closing identified smoke-test PRs. Automated PR creation, CI polling, visual approvals, public reporting, and end-to-end resume are not implemented in the helpers. The skill can guide approved PR submission and read-only evidence inspection using GitHub tools; it does not turn those into unattended operations. Live `run` execution is deliberately rejected; only `cleanup --execute` can mutate GitHub through these helpers.

## Testing and CI

Run `node --test scripts/smoke-test/*.test.mjs` (or `pnpm test:smoke-test`).
The suite checks candidate parsing, project scoping, public-summary filtering,
guarded PR cleanup, local preparation using temporary Git repositories, and CI
change detection. GitHub responses and clone/pnpm operations are simulated; no
consumer access, private config, dependency installation, or credentials are
required. These tests do not validate real consumer builds, live GitHub behavior,
preview readiness, or agent compliance with the skill.

The `CI - Smoke-test helpers` workflow uses the shared changed-file filter.
It runs for helper, skill, discovery-adapter, and workflow changes, plus the
shared global triggers (including root dependency/toolchain configuration and
the filter itself). Unrelated PRs skip its test job; pushes to `main` always run.
The workflow invokes Node directly without pnpm or an install step.

## Setup

Use Node.js 24 and pnpm 12.14.0. Authenticate `gh` for read access to `hashicorp/design-system`, then create `smoke-test.local.json` at the repository root (this filename is gitignored):

```json
{
  "consumers": [
    {
      "id": "consumer-a",
      "publicName": "Example Product A",
      "repository": "example/consumer-a",
      "packageRoot": "frontend/app",
      "hdsDependencies": ["@hashicorp/design-system-components"],
      "expectedChecks": [],
      "preview": {}
    }
  ]
}
```

Replace the placeholders with your consumers' actual settings. Required CI checks and preview support are deliberately unconfigured above, not assumed to be available. The CLI validates the config when it runs; there is no separate schema. Consumer package-manager versions belong in their manifests; local preparation reads the pinned version and uses it to update the lockfile.

`publicName` is optional and explicitly approves a product name for public reporting. Use a public product name, never an internal repository name. Consumers without it contribute only to aggregate counts; the CLI never falls back to their internal ID or repository name. The public summary contains only these approved names, generic states, and aggregate counts, not private links, checks, deployment details, or diagnostics.

The `consumers` array in the private config is the source of scope for each invocation. Add or remove entries there as the approved smoke-test set changes; the CLI does not hardcode consumer repositories. Each consumer targets `main` unless its entry sets an optional `"targetRef"` branch name (for example `"master"`). The value must be a plain, existing branch name; it is validated at config load and checked against the repository's branches. Configure each consumer with its repository, application package root, HDS dependencies to update, and required check names. Preview configuration identifies the existing workflow and deployment selector, for example `"preview": { "workflow": "preview", "selector": "production-deployment" }`; use `{}` when these are not configured. The existing workflow determines its build settings. Do not add tokens, commands, credentials, or private repository details to committed files.

## Commands

```sh
pnpm smoke-test plan --pr <release-candidate-pr-number>
pnpm smoke-test run --pr <release-candidate-pr-number> --dry-run
```

The CLI uses `smoke-test.local.json` in the repository root by default; pass `--config <path>` only to override it. By default, all configured projects are included. Repeat `--project <id>` to select a subset without changing the config:

```sh
pnpm smoke-test plan --pr 4251 --project consumer-a --project consumer-b
```

IDs must match entries in the config, not public product names. Unknown IDs fail before any GitHub reads. Only selected projects are inspected and included in the report.

`plan` and `run --dry-run` use the same discovery and planning logic. They read the local config, the candidate PR, its latest successful RC publication comment, and each configured consumer's target branch (`main` unless `targetRef` is set) app manifest and root pnpm lockfile. The publication comment must name the candidate PR's current head SHA; stale comments are rejected. A matching successful workflow comment is treated as confirmation that the listed RC packages were published; the command does not independently query npm or attempt installation. The candidate package list shows all published packages, while `consumerValidationConfigured` identifies whether any configured consumer app declares that package as a dependency. For example, `@hashicorp/design-system-mcp` is published but is not tested in consuming apps. The command does not write files/state, create checkouts, run package scripts, publish packages, or call GitHub mutation endpoints. The report distinguishes the app's declared version, lockfile-resolved version, stable package version, and exact RC version reported by the workflow. A non-pnpm or missing lockfile is reported as an unresolved blocker, not inferred. Dry-run returns a nonzero exit code when preflight has blockers. A successful report would only mean preflight completed with available evidence; it does not mean consumer CI or previews were validated.

Use the direct Node command for strict dry-run behavior. This repository configures pnpm to install dependencies before running scripts when they are out of sync, which can mutate `node_modules` before a package script starts.

The plan identifies the exact candidate PR head SHA and packages listed in its successful RC publication comment, configured dependency updates, and generic public-summary content. Consumer repository identities are only included in local output. No public comment, status, artifact, or log is posted by the CLI.

## Preparing a consumer smoke-test branch

Preparation updates one selected consumer's manifest to the exact RC versions and refreshes its lockfile in a new local clone. It uses that consumer's pinned pnpm version and `--ignore-scripts`; it does not install dependencies, run project scripts, commit, push, open a PR, or trigger CI. The output directory must not already exist:

```sh
pnpm smoke-test prepare \
  --pr 4251 \
  --project consumer-a \
  --output-dir smoke-test/pr-4251/consumer-a
```

The output directory must be new or an existing preparation clone that passes the command's repository, base-SHA, branch, and changed-file checks. The command confirms the consumer target branch SHA has not changed since planning, creates the reserved local smoke-test branch, updates only the app manifest and root pnpm lockfile, and checks that both resolve to the exact candidate versions. Because an RC may be newer than the consumer's minimum package-age threshold, that check is overridden only for the lockfile-only command; the consumer's workspace policy is not changed. It prints a suggested draft PR title/body marker, but stops before commit, push, or PR creation. Review the diff in the output directory. Opening the PR and collecting CI/preview evidence remain separate steps.

## Closing smoke-test PRs

Cleanup is scoped to one candidate PR across all configured projects, or a subset selected with repeated `--project` flags. It works even after the candidate PR is closed. Preview first, then explicitly execute:

```sh
pnpm smoke-test cleanup --pr 4251
pnpm smoke-test cleanup --pr 4251 --execute
```

Cleanup never closes the candidate PR, deletes branches, or matches PR titles. It only closes open, unmerged draft PRs targeting the consumer's target branch (`main` unless `targetRef` is set, compared exactly) from the same consumer repository with both the exact branch and body marker produced by `smokeTestIdentity(candidatePrNumber, consumerId)`:

```text
branch: hds-smoke-test/pr-4251/consumer-a
body marker: <!-- hds-smoke-test:hashicorp/design-system#4251:consumer-a -->
```

Local preparation creates the reserved branch and marker; opening the PR is not implemented. Existing unmarked/manual PRs are not adopted or closed. A PR on the reserved branch with mismatched identity aborts cleanup. Each PR is re-read immediately before closure, and rerunning cleanup skips already closed PRs. An API error stops execution; prior successful closures are not rolled back. `--execute` cannot be combined with `--dry-run`.

## Current limitations

The first milestone does not create a release candidate, push consumer changes, open consumer PRs, collect CI/preview evidence, verify write permissions or CI filters, or establish preview readiness. It reports those gaps as pending. The existing release process remains authoritative; use a test/candidate PR such as #4251, not the Changesets Version Packages PR, for this command. Local orchestration is not an always-on service, target CI may omit required coverage, and zero consumer changes cannot create missing preview infrastructure.

## Possible future phase

A later phase may trigger reconciliation from an authorized label and release-PR updates, using an approved service account to update consumer draft PRs. It will also need a centrally managed, privacy-safe source of truth for the in-scope consumer set; the current per-user local config is not sufficient for shared CI. Before enabling it, verify that the account has the required write access in every target repository and define least-privilege credential handling, event authorization, stale-run protection, and concurrency behavior. This phase is not implemented or assumed by the current CLI.
