# Start Here — `--token-*` → `--hds-*` Replacement

This folder holds the third step of the HDS token naming-convention effort:
replacing all `--token-*` CSS custom property usages with `--hds-*` across Ember
codebases that consume HDS design tokens.

The work is split into three separate AI sessions, each with a clean context.

## Phase 1 — Author the initial prompt ✅ done

- File: `initial-prompt.md`
- This is the finished specification for the plan. It is self-contained: it holds
  the rename rule, safety/idempotency constraints, exclusions, target environments,
  deliverables, expected plan structure, and the HDS pilot/validation context.

## Phase 2 — Generate the plan (do this next, in a FRESH session)

Start a new chat session (clean context) so the model reasons from the finished
prompt, not from the exploratory history that produced it. Kickoff message:

> Read `copilot-plans/hds-tokens-replacement/initial-prompt.md` in full. It is the
> specification for a plan you must generate. Follow its "Plan Structure Expected"
> and "Deliverables to Plan" sections. Before writing anything, ask me clarifying
> questions on anything low-confidence. Then generate the plan as file(s) under
> `copilot-plans/hds-tokens-replacement/` — Markdown for human-readable content,
> JSON/CSV only where strictly needed for execution data. Do NOT execute the
> migration yet.

Iterate on the plan the same way the initial prompt was iterated: review, request
changes, repeat. Remember the prompt's rule — the plan is the durable, portable
knowledge artifact; fold every new learning back into the plan file(s).

Expected output: a `generated-plan.md` (plus any `session-kit/` and `tooling/`
files the plan itself defines).

## Phase 3 — Execute the plan (later, in another FRESH session)

Once the plan is approved, run it in a separate clean session (or ask the AI to).
Then review the Git diff, refine the plan/tooling for any gap, `git restore` the
changed files, and re-run until the outcome is clean.

## Workflow reminders

- Lint may be run freely (`pnpm lint`, `pnpm lint:fix`). Do NOT run the test suite
  from the agent — ask the user to run it and report back.
- The tooling must be idempotent: every re-run from a clean checkout yields the same
  diff.
- Keep reusable transform logic separate from repo-specific config (roots,
  extensions, exclusion globs) so it ports to the next repo with minimal changes.
- Indirect `token-` prefix coupling in JS/TS/GTS logic is NOT auto-fixed — it is
  annotated with a `TODO [HDS-TOKEN-RENAMING]` marker for manual review after the
  run.
