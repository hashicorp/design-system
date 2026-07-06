# Indirect `token-` prefix coupling — annotate-only sweep

> Fill this in after `--audit-coupling --annotate` (plan §8). These are **not**
> `--token-*` usages and are **never auto-replaced** — each is annotated with a
> `🚧 TODO [HDS-TOKEN-RENAMING]` marker for manual review.

## Command

```bash
node …/replace-token-prefix.mjs --audit-coupling --annotate
```

## Candidates (annotated)

Run result: **5 candidate lines across 3 files, all newly annotated** (scanned 2161
code files). All are JS-logic regions → `//` marker. Re-run reports `0 newly
annotated` (idempotent).

| File | Line | Coupling snippet | Verdict (true coupling / false positive) | Resolved? |
|---|---|---|---|---|
| `showcase/app/components/page-carbonization/foundations/color/index.gts` | 15 | `token.name?.replace(/^token-/, '')` | true coupling — fix | `[ ]` |
| `website/app/components/doc/token-preview/index.gts` | 80 | `this.token.name.startsWith('token-typography')` | true coupling — fix | `[ ]` |
| `website/app/components/doc/token-preview/index.gts` | 89 | `this.token.name.startsWith('token-typography-font-weight')` | true coupling — fix | `[ ]` |
| `website/app/components/doc/page/header/algolia-search/parts/htmlTemplatesItemPreview.js` | 23 | `tokenName.match(/^token-typography/)` | true coupling — fix | `[ ]` |
| `website/app/components/doc/page/header/algolia-search/parts/htmlTemplatesItemPreview.js` | 25 | `tokenName.match(/^token-color/)` | true coupling — fix | `[ ]` |

> Line numbers are the pre-annotation candidate lines from the audit report; after
> annotation + `lint:fix` the marker sits on the line above each. No false
> positives were annotated (the anchored patterns matched only true couplings).

<!-- BEGIN REPO-SPECIFIC (hds-pilot) -->
Confirmed pilot candidates (all JS-logic regions → `//` marker):

| File | Line(s) | Coupling | Verdict |
|---|---|---|---|
| `showcase/app/components/page-carbonization/foundations/color/index.gts` | 15 | `token.name?.replace(/^token-/, '')` | true coupling — fix |
| `website/app/components/doc/token-preview/index.gts` | 80, 89 | `this.token.name.startsWith('token-typography…')` | true coupling — fix |
| `website/app/components/doc/page/header/algolia-search/parts/htmlTemplatesItemPreview.js` | 23, 25 | `tokenName.match(/^token-typography/)`, `/^token-color/` | true coupling — fix |

Preferred fix: derive the prefix from the tokens package rather than re-hard-coding
`hds-`. Minimum fix: update `token-` → `hds-` in the literal/regex.

Known false positives to leave unannotated (the anchored patterns already avoid
these): Algolia keys `'token-name'`/`'token-type'`/`'token-value'`/`'token-group'`;
component/partial/snippet names `token-preview`, `token-import`,
`token-as-component-argument`.
<!-- END REPO-SPECIFIC (hds-pilot) -->

## Resolution notes

- Reviewer removes the marker after fixing a true coupling or after confirming a
  false positive.
- Bulk-find remaining markers: `rg -n "\[HDS-TOKEN-RENAMING\]"`.
