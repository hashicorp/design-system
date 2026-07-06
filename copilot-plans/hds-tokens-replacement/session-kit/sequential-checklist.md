# Sequential checklist — execute the `--token-*` → `--hds-*` swap

Follow in order. If the session deviates, restart from Phase 1. Full detail lives in
`../generated-plan.md` (section references in brackets).

## Phase 1 — Preflight [plan §2]

1. Confirm you are on a dedicated branch with a clean checkout.
2. Confirm the token build emits `--hds-*` and has no `--token-*` left [§2.1].
3. Capture baseline: `node …/replace-token-prefix.mjs --check` (read-only) [§2.2].
4. Record baseline in `tooling/reports/audit.md`.

Gate: baseline count captured; token build confirmed. If not, stop.

## Phase 2 — Apply [plan §3, §5]

5. Run the transform: `node …/replace-token-prefix.mjs` (uses the repo config).
   - For very large repos, optionally run per-root for reviewable diffs.
6. Review the Git diff: confirm every change is only `--token-`→`--hds-`; no
   value/logic changes; no `--hds-var-*` or Sass `$…` edits.

Gate: diff is a pure mechanical prefix swap.

## Phase 3 — Verify residuals [plan §7.1, §7.3]

7. Run `node …/replace-token-prefix.mjs --check` → must report **0** (exit 0).
8. Run the independent shell cross-check (`rg … '--token-'`) → must be empty.
9. Record proof in `tooling/reports/verification.md`.

Gate: zero residuals by both methods. Otherwise fix misses and repeat Phase 3.

## Phase 4 — Indirect coupling [plan §8]

10. Run `node …/replace-token-prefix.mjs --audit-coupling` to list candidates.
11. Run again with `--annotate` to insert `🚧 TODO [HDS-TOKEN-RENAMING]` markers.
12. Record the annotated set in `tooling/reports/indirect-coupling.md`. Do NOT fix
    couplings automatically — leave them for human review.

Gate: all candidates annotated; false positives left as-is.

## Phase 5 — Build + lint [plan §7.1]

13. Rebuild the token/component packages so `--hds-*` references resolve.
14. Run `pnpm lint` (and `pnpm lint:fix` where appropriate) for touched workspaces.

Gate: build + lint pass.

## Phase 6 — Tests (user-run) [plan §7.2]

15. Ask the user to run the test suite for affected workspaces and report back.
    **Do not run tests yourself.**
16. Act on any reported failures; re-verify.

Gate: user reports tests passing.

## Phase 7 — Wrap up [plan §10]

17. Update `tooling/reports/pr-notes.md` (before/after counts, validation, coupling).
18. Fold any new learnings/edge cases back into `generated-plan.md` and tooling docs.
19. Confirm Definition of Done [§10] is fully met.
