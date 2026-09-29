# Part 1 — taxonomy reorganisation

- Generated: 2026-09-29T16:59:44.151Z
- Map: `ai-plans/project-solar-carbonization/full-tokens-replacement/tooling/reports/hds/token-map.generated.json`
- Changes **no** `(before, after)` pair — only category membership.
- Input was already recategorised; this run is a no-op.

## Verification gates

| Gate | Result | Detail |
| --- | --- | --- |
| T1 Pair conservation | ✅ pass | 1068 pairs in, 1068 out — multiset identical |
| T2 Entry conservation | ✅ pass | 1068 → 1068 |
| T3 One category each | ✅ pass | 1068 entries across 11 categories |
| T4 `prefix-only` untouched | ✅ pass | 228 members (was 228); 0 not a true prefix swap |
| T5 Expected membership | ✅ pass | prefix-plus-renaming__form-elements=9 (want 9); prefix-plus-renaming__form-control-checked=gone; prefix-plus-renaming__other=4 (want 4), 0 form entries left (want 0) |
| T6 `form-radio-card` intact | ✅ pass | 5 members (was 5); rule reconstructs 5/5 |
| T7 Changeset untouched | ✅ pass | no changes under .changeset/ |
| T8 Idempotence | ✅ pass | input was already recategorised — 0 entries moved |


## Categories — before → after

| Category | Before | After | Δ |
| --- | --- | --- | --- |
| `prefix-only` | 228 | 228 | — |
| `prefix-plus-renaming__palette-colors` | 42 | 42 | — |
| `prefix-plus-renaming__product-colors` | 86 | 86 | — |
| `prefix-plus-renaming__semantic-colors` | 46 | 46 | — |
| `prefix-plus-renaming__focus-ring` | 2 | 2 | — |
| `prefix-plus-renaming__transition-function` | 2 | 2 | — |
| `prefix-plus-renaming__form-radio-card` | 5 | 5 | — |
| `prefix-plus-renaming__form-elements` | 9 | 9 | — |
| `prefix-plus-renaming__other` | 4 | 4 | — |
| `removed` | 18 | 18 | — |
| `added` | 626 | 626 | — |


**Total: 1068 → 1068** ✅ invariant

## Entries moved

### From `prefix-plus-renaming__form-control-checked` (dissolved)

_None._


### From `prefix-plus-renaming__other` (form entries only)

_None._


## Follow-up (manual, this part)

- `full-tokens-replacement/tooling/README.md` — category bullet list: drop `prefix-plus-renaming__form-control-checked`, add `prefix-plus-renaming__form-elements`, note that `prefix-plus-renaming__other` is now non-form only.
- `full-tokens-replacement/tooling/diff-tokens.mjs` — `CATEGORY_ORDER` / `classify()`, plus a note that Phase A is a spent one-off and re-running it will NOT reproduce this map.
- `HANDOVER-full-tokens-replacement.md` §2 — map-schema table and its arithmetic line.

**Part 2 has not been started.**
