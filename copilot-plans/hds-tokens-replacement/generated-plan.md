# Plan — Replace `--token-*` CSS Custom Property Usage with `--hds-*`

> **Status:** step 3 of the HDS token naming-convention effort (see
> [`initial-prompt.md`](initial-prompt.md) for the full specification and
> [`START-HERE.md`](START-HERE.md) for the three-phase workflow).
>
> **Scope of this step:** a purely mechanical prefix swap at every *consumption
> site* that still references the old `--token-*` token names, aligning them with
> the `--hds-*` names already emitted by `packages/tokens` (step 2, done).

---

## How to read and re-use this plan (delimiter convention)

This plan is written to be **portable across Ember consumer codebases**. The
reusable core (the rename rule, the tool design, the workflow) is codebase-agnostic.
Everything that is specific to the **HDS monorepo pilot** is fenced so you can strip
and re-populate it for the next repo.

- **Repo-specific blocks** are wrapped in paired HTML comments:

  ```md
  <!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
  … concrete HDS paths, counts, file names …
  <!-- END REPO-SPECIFIC (hds-pilot) -->
  ```

  To retarget: `grep -n "REPO-SPECIFIC" generated-plan.md`, then replace the content
  inside each block with the new repo's facts (or delete it if not applicable).

- **Placeholder tokens** appear in the portable prose as `{{UPPER_SNAKE}}` and are
  the values you configure per repo. Canonical set:
  - `{{TARGET_ROOTS}}` — top-level source folders to scan.
  - `{{IN_SCOPE_EXTENSIONS}}` — file extensions to edit.
  - `{{EXCLUDE_GLOBS}}` — paths never edited.
  - `{{TOKENS_PKG_VERSION}}` — the `@hashicorp/design-system-tokens` version that
    already emits `--hds-*`.
  - `{{BASELINE_TOKEN_COUNT}}` — baseline count of `--token-*` in source.

  The single source of truth for these values at runtime is the tool's external
  config file (see [§3.2](#32-external-config-repo-specific-inputs)); the
  placeholders in this document are documentation, not runtime inputs.

Keep this plan as the durable knowledge artifact: fold every new edge case, gotcha,
or learning discovered while running it back into this file and the tooling docs —
not just into chat.

---

## 1. Approach analysis and recommendation

### 1.1 The problem, precisely

The transform is a **literal prefix swap** on CSS custom property *usages*:

```
--token-  →  --hds-
```

The token name after the prefix is byte-for-byte identical
(`--token-color-foreground-strong` → `--hds-color-foreground-strong`). It is
collision-free because:

- `--hds-var-*` (step 1 output) never contains the substring `--token-`.
- The new `--hds-*` token names never contain `--token-`.
- The only remaining `--token-*` strings in source are stale token usages.

Consequently the operation reduces to replacing the **literal string `--token-`
with `--hds-`** in in-scope source files. It is inherently **idempotent** (`--hds-`
contains no `--token-`, so re-runs find nothing) and needs no parser, AST, or
semantic model.

A separate, non-CSS concern — **indirect `token-` prefix coupling** (code that
reads a token's `name` field and compares/strips the bare `token-` prefix) — is
*not* a `--token-*` usage (no leading `--`) and must **not** be auto-replaced. It is
handled by a distinct annotate-only audit (see [§8](#8-indirect-prefix-coupling-audit-annotate-dont-auto-fix)).

### 1.2 Options considered

| Option | Fit for a collision-free literal prefix swap | Portability across repos | Verdict |
|---|---|---|---|
| **A. Dependency-free Node script** (scan globs, literal `--token-`→`--hds-`, external config, `--check`/dry-run verify mode, separate coupling audit) | Ideal — the rule *is* a string replace; no AST needed | High — copy one file + a config; core logic never changes | **Recommended** |
| B. Deterministic stylesheet transform **+** a `packages/codemods` jscodeshift codemod for JS/TS/GTS/HBS | Over-engineered — an AST codemod adds no value for a literal string that is identical across all file types | Lower — codemod is Ember/JS-specific ceremony, two tools to port and keep in sync | Rejected |
| C. AI-driven replacement with deterministic verification | Non-deterministic edits; slower; harder to guarantee byte-identical diffs on re-run | Medium | Rejected as the *primary* driver; retained as **fallback** only |
| D. Shell `rg`/`sed` one-liners | Works, but per-OS `sed` quoting differences hurt portability and edge-case testing | Medium | Rejected as the recommended form; usable as an ad-hoc cross-check |

### 1.3 Recommendation

Use **Option A**: one small, dependency-free Node.js script that reads a
repo-specific external config and performs the literal prefix swap, plus a `--check`
mode for verification and a `--audit-coupling` mode for the annotate-only sweep. The
**AI layer's job is verification and fallback driving**, not primary editing.

> **This recommendation is intentionally left open per repo.** The *rule*
> (`--token-` → `--hds-`) and the *workflow* are fixed; the *implementation form* is
> a recommendation. If a future repo cannot run Node, the same rule can be executed
> by the shell cross-check ([§7.3](#73-optional-shell-cross-check)) or driven by the
> AI fallback ([§9](#9-verification--fallback-strategy)) — the verification contract
> in [§7](#7-testing--validation-strategy) is what actually gates success.

Rationale: reviewability (clean minimal diff, one obvious rule), repeatability
(idempotent by construction), and portability (retarget by editing config only).

---

## 2. Pre-conditions / audit step

Run before any edits, from a **clean checkout** on a dedicated branch.

### 2.1 Confirm the token build already emits `--hds-*`

The swap only produces valid references if the renamed `--hds-*` names exist in the
built token output. Confirm the target repo consumes a `@hashicorp/design-system-tokens`
version whose generated CSS uses `--hds-*` (and that there are **no** `--token-*`
names left in the token output).

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Verified in this monorepo: `packages/tokens/dist/products/css/tokens.css` emits
`--hds-color-foreground-strong: …;` and contains no `--token-*` declarations. The
pilot consumes the local workspace `packages/tokens` build, so `pnpm --filter
@hashicorp/design-system-tokens build` (or the repo-root build) is the source of
truth. `{{TOKENS_PKG_VERSION}}` = local workspace build.
<!-- END REPO-SPECIFIC (hds-pilot) -->

### 2.2 Capture baseline counts

Record the baseline count of `--token-*` occurrences in source (excluding
`{{EXCLUDE_GLOBS}}`) so success = count reaches zero. Use the tool's `--check` mode
(preferred, honors the config exactly) or the shell cross-check in
[§7.3](#73-optional-shell-cross-check).

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Baseline scope facts gathered for the pilot (source only; excludes `dist/**`,
compiled `public/assets/**`, `*.map`, `*.md`):

| Folder | `--token-*` occurrences |
|---|---|
| `packages/components` | ~1,525 |
| `showcase` | ~78 |
| `website` | ~67 |
| **Total** | **`{{BASELINE_TOKEN_COUNT}}` ≈ 1,670** |

By extension: `.scss` ~1,527 · `.ts` ~64 · `.gts` ~44 · `.js` ~7 · `.hbs` ~4
(`.md` ~24 is **excluded**). Re-measure with `--check` at run time; treat these as
approximate.
<!-- END REPO-SPECIFIC (hds-pilot) -->

Persist the baseline into [`tooling/reports/audit.md`](tooling/reports/audit.md).

---

## 3. Implementation — the reusable transform

### 3.1 Artifact locations

Mirrors the step-1 layout so the two efforts are consistent:

```
copilot-plans/hds-tokens-replacement/
  generated-plan.md              ← this file (portable plan + fenced pilot facts)
  tooling/
    replace-token-prefix.mjs     ← reusable, dependency-free transform (recommended impl)
    README.md                    ← how to run + how to retarget
    config/
      hds-pilot.config.json      ← REPO-SPECIFIC inputs (roots/extensions/excludes)
    reports/
      audit.md                   ← baseline + scope snapshot
      verification.md            ← post-run zero-residual proof
      indirect-coupling.md       ← annotate-only sweep results
      pr-notes.md                ← PR summary
  session-kit/
    fresh-session-prompt.md      ← paste into a clean AI session to execute
    sequential-checklist.md      ← ordered gate list the session must follow
```

> When retargeting to another repo, copy `tooling/replace-token-prefix.mjs`
> unchanged, add a new `tooling/config/<repo>.config.json`, and re-populate the
> `REPO-SPECIFIC` blocks + reports. **The core logic file is never edited per repo.**

### 3.2 External config (repo-specific inputs)

All per-repo variability lives in one JSON file so the core logic stays constant.
Fields:

| Field | Meaning | Placeholder |
|---|---|---|
| `roots` | source folders to scan, relative to repo root | `{{TARGET_ROOTS}}` |
| `extensions` | file extensions to edit (no leading dot) | `{{IN_SCOPE_EXTENSIONS}}` |
| `excludeGlobs` | glob patterns never edited | `{{EXCLUDE_GLOBS}}` |
| `matchPrefix` | literal prefix to match (`--token-`) | fixed |
| `replacePrefix` | literal replacement (`--hds-`) | fixed |
| `couplingPatterns` | regex sources for the annotate-only coupling sweep | see [§8](#8-indirect-prefix-coupling-audit-annotate-dont-auto-fix) |

See [`tooling/config/hds-pilot.config.json`](tooling/config/hds-pilot.config.json)
for the concrete pilot values.

### 3.3 Input/output contract

- **Input:** repo root (cwd), a config file (`--config <path>`), a mode flag.
- **Modes:**
  - *(default, apply):* rewrites in-scope files in place, replacing every literal
    `matchPrefix` with `replacePrefix`. Prints a per-file and total change summary.
  - `--check` *(dry run / verification):* makes **no writes**; reports remaining
    `matchPrefix` occurrences and their files; exits non-zero if any remain.
  - `--audit-coupling` *(+ optional `--annotate`):* scans in-scope `.js/.ts/.gts`
    for the `couplingPatterns`; with `--annotate`, inserts the TODO marker on the
    line above each candidate (idempotently); always prints a candidate report.
- **Output:** deterministic, byte-identical on every run from the same clean source.
  Non-zero exit codes signal "work remaining" (`--check`) or "candidates found"
  usefully for CI/gating.

### 3.4 Edge cases the transform must preserve

All of these are covered by the literal prefix swap — **do not skip any**:

1. **SCSS `var()` reads** — `border-radius: var(--token-tag-border-radius);`.
2. **Sass-interpolated suffixes** — `color: var(--token-color-#{$product}-brand);`
   → only the literal `--token-` head changes; the `#{…}` suffix is untouched.
3. **JS/TS string values** — `'var(--token-tooltip-max-width)'`, theme objects like
   `color: 'var(--token-code-block-foreground-color-primary)'`.
4. **TypeScript custom-property type keys** — `'--token-…'?: string`.
5. **GTS/HBS template attribute values** — `@color="var(--token-color-foreground-strong)"`.
6. **Inline styles** — `style="--token-foo: …"`.
7. **Test assertions** — `hasStyle({ '--token-…': … })` and string-form style
   expectations, including lines where `--token-*` co-exists with already-migrated
   `--hds-var-*` (change only the `--token-*` part).

Because the rule matches only the literal `--token-` head, none of `--hds-*`,
`--hds-var-*`, or bare `token-` are ever touched.

---

## 4. Exclusions (never edit)

`{{EXCLUDE_GLOBS}}` — the portable exclusion set:

- `**/dist/**` — built output in every package/app (regenerated by `pnpm build`).
- Compiled/vendored CSS assets (generated, not source).
- `**/*.map` — source maps.
- `**/*.md` — Markdown docs/CHANGELOGs/release-notes (updated separately).
- `**/node_modules/**`, `**/.git/**` — always skipped by the tool by default.

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Pilot-specific compiled asset to exclude explicitly:
`showcase/public/assets/styles/@hashicorp/design-system-components.css` (and any
sibling vendored/compiled stylesheets under `showcase/public/assets/**`). The raw
counts in the tens of thousands seen in unfiltered scans are entirely these
generated `.css`/`.map` assets and must not be edited.
<!-- END REPO-SPECIFIC (hds-pilot) -->

---

## 5. Execution order

Portable ordering (stylesheets first, then scripts/templates, then verify):

1. **Preflight audit** — baseline counts, confirm token build emits `--hds-*`, save
   [`audit.md`](tooling/reports/audit.md).
2. **Apply pass** — run the transform over all `{{TARGET_ROOTS}}` for all
   `{{IN_SCOPE_EXTENSIONS}}` (one invocation handles every file type uniformly).
3. **Residual verification** — run `--check`; must report zero.
4. **Indirect-coupling audit** — run `--audit-coupling --annotate`; save
   [`indirect-coupling.md`](tooling/reports/indirect-coupling.md).
5. **Rebuild + lint** — see [§7](#7-testing--validation-strategy).

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Concrete pilot order (a single invocation covers all roots, but if splitting for
reviewability, use this sequence):

1. SCSS sources — `packages/components/src/styles/`
2. Component GTS/TS sources — `packages/components/src/`
3. Showcase app + tests — `showcase/app/`, `showcase/tests/`
4. Website source — `website/app/` and `website/docs/` (all in-scope extensions).

   > **Scope note:** the initial prompt's execution-order line said website
   > "`.hbs`/`.gts`/`.ts` only", but the pilot's `website/` also contains genuine
   > `--token-*` source in `.scss` (app styles under `website/app/styles/**` and
   > documented code-snippet partials under `website/docs/**`) and `.js`
   > (e.g. `website/docs/foundations/border/index.js`). Those are real, non-Markdown
   > source and must be swapped for the zero-residual goal, so the pilot config
   > includes all in-scope extensions for website. Confirm this is desired per repo.
5. Rebuild tokens + components, then lint the folders.

`packages/components` alone holds ~1,500 occurrences; if context limits make a
single AI-driven pass impractical, drive per-root and verify incrementally.
Measured pilot baseline with the shipped config: **1,646** occurrences across
**112** files (3,098 files scanned).
<!-- END REPO-SPECIFIC (hds-pilot) -->

---

## 6. Idempotency & repeatability guarantees

- The rule replaces `--token-` with `--hds-`; the output contains no `--token-`, so
  a second apply is a no-op and `--check` reports zero.
- The tool depends on **no prior-run state**, assumes a clean checkout, and produces
  a **byte-identical diff** every run over the same source.
- Iteration loop: run → review Git diff → refine plan/tool → `git restore` the
  changed files → re-run. Never rely on partial state between runs.

---

## 7. Testing / validation strategy

> **The agent must NOT run the test suite** — it is slow and may hang. Ask the user
> to run tests and report results back, then act on them.

### 7.1 Deterministic gates (agent may run)

1. `--check` reports **zero** remaining `--token-*` in source scope.
2. Diff review confirms only `--token-`→`--hds-` prefix changes (no value/logic
   changes, no `--hds-var-*` or Sass `$…` edits).
3. Rebuild so renamed references resolve against real emitted tokens.
4. Lint (`pnpm lint`, and `pnpm lint:fix` where appropriate).

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
```bash
# rebuild tokens + components so --hds-* references resolve
pnpm --filter @hashicorp/design-system-tokens build
cd packages/components && pnpm build && pnpm lint

# apps that consume the tokens
cd ../../showcase && pnpm lint
cd ../website   && pnpm lint
```
Note: resolving a renamed `--hds-*` reference depends on the corresponding token
existing in the built token output — always rebuild before validating.
<!-- END REPO-SPECIFIC (hds-pilot) -->

### 7.2 Tests (user runs, agent waits)

Ask the user to run the suite for affected workspaces and report back:

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
```bash
cd showcase && pnpm test     # component acceptance/integration + Percy
cd website  && pnpm test
```
<!-- END REPO-SPECIFIC (hds-pilot) -->

### 7.3 Optional shell cross-check

Independent of the tool, to sanity-check residuals (adjust globs per repo):

```bash
rg -n --glob '**/*.{scss,css,gts,hbs,ts,js}' \
  --glob '!**/dist/**' --glob '!**/*.map' \
  --glob '!showcase/public/assets/**' \
  -- '--token-' {{TARGET_ROOTS}}
```

Record the final zero-residual proof in
[`verification.md`](tooling/reports/verification.md).

---

## 8. Indirect prefix-coupling audit (annotate, don't auto-fix)

A distinct, easy-to-miss class: code that reads a token's `name` field (sourced from
the tokens package JSON, whose `name` step 2 already changed to the `hds-` prefix)
and couples to the **bare `token-` prefix** via a string or regex. These have **no
leading `--`**, so the `--token-` swap never touches them — yet they are already
silently broken.

### 8.1 Why annotate instead of replace

- **True couplings** (compare/strip against the token-name prefix) must be fixed —
  ideally by *deriving* the prefix from the tokens package rather than re-hard-coding
  `hds-`, or at minimum updating `token-` → `hds-` in the literal/regex.
- **False positives must be left untouched** — arbitrary identifiers that merely
  contain `token-` (Algolia keys like `'token-name'`, component/partial names like
  `token-preview`). Blind replacement would corrupt these.

Because the judgement is per-site, the tool **leaves the flagged line unchanged** and
inserts a TODO marker on the line **above** each candidate, then reports the full
set for post-run human review.

### 8.2 Marker format (exact, greppable)

- JS/TS/GTS logic regions:
  ```js
  // 🚧 TODO [HDS-TOKEN-RENAMING]: verify manually — token-name prefix coupling
  ```
- Template regions (`.hbs`, or the template block of a `.gts`):
  ```hbs
  {{! 🚧 TODO [HDS-TOKEN-RENAMING]: verify manually — token-name prefix coupling }}
  ```

Insertion is **idempotent**: skip if the preceding non-empty line already contains
`[HDS-TOKEN-RENAMING]`.

### 8.3 Candidate detection

Default `couplingPatterns` target the **anchored-prefix** coupling forms (tight, to
avoid annotating arbitrary `token-` identifiers):

- `replace(/^token-` , `match(/^token-`
- `startsWith('token-` , `startsWith("token-`

Widen these per repo during initial analysis if other coupling shapes exist. Because
the anchored forms live in JS logic, the `//` marker applies; the `{{! }}` form is
reserved for genuine template-region matches.

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Confirmed pilot candidates (all JS-logic regions → `//` marker):

| File | Line(s) | Coupling |
|---|---|---|
| `showcase/app/components/page-carbonization/foundations/color/index.gts` | 15 | `token.name?.replace(/^token-/, '')` |
| `website/app/components/doc/token-preview/index.gts` | 80, 89 | `this.token.name.startsWith('token-typography…')` |
| `website/app/components/doc/page/header/algolia-search/parts/htmlTemplatesItemPreview.js` | 23, 25 | `tokenName.match(/^token-typography/)`, `/^token-color/` |

Known false positives to leave alone (do NOT annotate): Algolia index attribute keys
(`'token-name'`, `'token-type'`, `'token-value'`, `'token-group'`) and
component/partial/snippet names (`token-preview`, `token-import`,
`token-as-component-argument`). The anchored patterns above already avoid these.
<!-- END REPO-SPECIFIC (hds-pilot) -->

Record the annotated set in
[`indirect-coupling.md`](tooling/reports/indirect-coupling.md). The user reviews each
marker post-run and either fixes the coupling (preferably deriving the prefix from
the tokens package) or removes the marker if it is a false positive.

---

## 9. Verification / fallback strategy

The AI layer is packaged as a **session-kit** (a paste-in fresh-session prompt + an
ordered checklist + report templates) rather than a `.github` skill, matching step 1
and keeping zero coupling to Copilot's skill-matching system so it ports by
copy-paste. Its responsibilities:

- **Primary (verification):** after the deterministic pass, confirm via `--check`
  and an independent scan that **zero** `--token-*` usages remain in source; confirm
  the diff is a pure prefix swap; confirm no `--hds-var-*`/Sass edits leaked in;
  ensure rebuild + lint pass; and drive the coupling annotation + report.
- **Fallback (driver):** in a repo where the Node tool cannot run, the AI executes
  the *same rule* (`--token-`→`--hds-`) directly over the in-scope globs, honoring
  the same exclusions, then self-verifies with the shell cross-check
  ([§7.3](#73-optional-shell-cross-check)). It must still produce a clean, minimal,
  mechanical diff.

See [`session-kit/fresh-session-prompt.md`](session-kit/fresh-session-prompt.md) and
[`session-kit/sequential-checklist.md`](session-kit/sequential-checklist.md).

---

## 10. Definition of done

1. Zero `--token-*` usages remain in source scope (`--check` = 0, cross-check = 0).
2. The diff is a pure `--token-`→`--hds-` prefix swap — no value/logic changes, no
   `--hds-*`(new token) invention, no `--hds-var-*` or Sass `$…` edits.
3. Renamed `--hds-*` references resolve against the built token output (rebuild
   succeeds; lint passes).
4. Every indirect `token-` coupling candidate is annotated with the exact marker and
   listed in [`indirect-coupling.md`](tooling/reports/indirect-coupling.md); false
   positives left unannotated.
5. Tests were run **by the user** and reported back as passing (agent did not run
   them).
6. Reports are updated: [`audit.md`](tooling/reports/audit.md),
   [`verification.md`](tooling/reports/verification.md),
   [`indirect-coupling.md`](tooling/reports/indirect-coupling.md),
   [`pr-notes.md`](tooling/reports/pr-notes.md).
7. Re-running from a clean checkout yields a byte-identical diff (idempotent).

No changeset and no consumer migration guide are required for this step (the change
is technically non-breaking; maintainers handle any communication separately).
