# Plan: move the 6.0.0 token tables to `MIGRATION-6.0.0.md`

## Why

The website page `/whats-new/release-notes` was very slow to render. Its "Design tokens" tab includes
`website/docs/whats-new/release-notes/partials/design-tokens.md`, which is generated from `packages/tokens/CHANGELOG.md`
and contained three very large markdown tables from the `6.0.0` release (420 + 630 + 22 rows).

The website converts markdown to HTML (showdown) and then compiles it as a Glimmer template **at runtime in the browser**
(`website/app/controllers/show.js` → `website/app/components/dynamic-template.gjs`). The template compilation was the
bottleneck:

| `design-tokens.md` partial | size   | showdown | `compileTemplate` |
| -------------------------- | ------ | -------- | ----------------- |
| before                     | ~127KB | ~100ms   | ~940ms            |
| after                      | ~9KB   | ~7ms     | ~23ms             |

(measured in Node; the browser is slower)

## Why not edit the website partial directly

`website/lib/changelog/generate-changelog-markdown-files.mjs` (run by the root `version-packages` script on every release)
fully overwrites all the files in `website/docs/whats-new/release-notes/partials/` with `fs.writeFileSync`, starting from
the source `CHANGELOG.md` files. Any manual edit to the partials is lost.

Instead, the **source** `packages/tokens/CHANGELOG.md` is edited. Changesets only prepends new entries to it, so the
change persists, and the partial is regenerated from it.

## Changes

1. Create `packages/tokens/MIGRATION-6.0.0.md` containing:
   - `## Renamed tokens` (420 rows)
   - `## Added tokens` (630 rows)
   - `## Removed tokens` (22 rows)
   - `## Renamed CSS helper classes` (2 rows, copied for completeness; also kept in the CHANGELOG)
   - a relative link back to `./CHANGELOG.md#600`
2. In `packages/tokens/CHANGELOG.md` (6.0.0 entry), replace the "Renamed tokens", "Added tokens" and "Removed tokens"
   tables with a single line linking to the migration guide via an **absolute GitHub URL** (relative links would break
   on the website, because the generator copies the text verbatim):
   `https://github.com/hashicorp/design-system/blob/main/packages/tokens/MIGRATION-6.0.0.md`
3. Regenerate the website partials.

Notes:

- `MIGRATION-6.0.0.md` is published to npm automatically (`packages/tokens/.npmignore` doesn't exclude it).
- The link points to `main` (not the `6.0.0` tag, which doesn't contain the file), so it will 404 until merged.
- No changeset is needed: it's a documentation-only change to an already released version.

## How to re-run

Run from the repository root, starting from the **original** `packages/tokens/CHANGELOG.md` (the one that still
contains the tables). If the changes were already applied, restore it first:

```bash
git checkout origin/main -- packages/tokens/CHANGELOG.md
rm -f packages/tokens/MIGRATION-6.0.0.md
```

### 1. Extract the tables and update the CHANGELOG

```bash
cd packages/tokens
node --input-type=module <<'EOF'
import fs from 'fs';

const CHANGELOG = 'CHANGELOG.md';
const MIGRATION = 'MIGRATION-6.0.0.md';
const MIGRATION_URL =
  'https://github.com/hashicorp/design-system/blob/main/packages/tokens/MIGRATION-6.0.0.md';

const src = fs.readFileSync(CHANGELOG, 'utf8').split('\n');

// find a label line (e.g. "Renamed tokens:") and the markdown table that follows it
const getTable = (label) => {
  const start = src.indexOf(label);
  if (start === -1) {
    throw new Error(`Label not found: "${label}" (were the changes already applied?)`);
  }
  let tableStart = start + 1;
  while (!src[tableStart].startsWith('|')) tableStart++;
  let tableEnd = tableStart;
  while (src[tableEnd] && src[tableEnd].startsWith('|')) tableEnd++;
  return { start, tableEnd, lines: src.slice(tableStart, tableEnd) };
};

const renamed = getTable('Renamed tokens:');
const added = getTable('Added tokens:');
const removed = getTable('Removed tokens:');
const cssClasses = getTable(
  'CSS helper classes for the focus ring have been renamed to follow the same naming convention as renamed tokens:',
);

const rows = (t) => t.lines.length - 2; // minus header + separator
console.log('rows (renamed, added, removed, css):', rows(renamed), rows(added), rows(removed), rows(cssClasses));

const migration = [
  '# @hashicorp/design-system-tokens 6.0.0 – Migration guide',
  '',
  'Version `6.0.0` renamed design tokens to align with the approved nomenclature. Use the tables below to find the new name of a token, and to check which tokens have been added or removed.',
  '',
  'For a summary of the changes, see the [6.0.0 entry in the CHANGELOG](./CHANGELOG.md#600).',
  '',
  '## Renamed tokens',
  '',
  ...renamed.lines,
  '',
  '## Added tokens',
  '',
  ...added.lines,
  '',
  '## Removed tokens',
  '',
  ...removed.lines,
  '',
  '## Renamed CSS helper classes',
  '',
  'CSS helper classes for the focus ring have been renamed to follow the same naming convention as renamed tokens:',
  '',
  ...cssClasses.lines,
  '',
];
fs.writeFileSync(MIGRATION, migration.join('\n'));

// replace everything from "Renamed tokens:" to the end of the "Removed tokens" table with a single link line
const link = `The full list of renamed, added, and removed tokens is available in the [6.0.0 migration guide](${MIGRATION_URL}).`;
const updated = [...src.slice(0, renamed.start), link, ...src.slice(removed.tableEnd)];
fs.writeFileSync(CHANGELOG, updated.join('\n'));
EOF
cd ../..
```

Expected output: `rows (renamed, added, removed, css): 420 630 22 2`

### 2. Regenerate the website partials

```bash
pnpm -F website generate-changelog-markdown-files
```

The generator rewrites **all** the partials. If any partial other than `design-tokens.md` shows up in `git status`
with unrelated changes (e.g. only a missing trailing newline in `components.md`), revert it:

```bash
git checkout website/docs/whats-new/release-notes/partials/components.md
```

### 3. Verify

```bash
# formatting
pnpm -F website exec prettier --check \
  docs/whats-new/release-notes/partials/design-tokens.md \
  ../packages/tokens/MIGRATION-6.0.0.md \
  ../packages/tokens/CHANGELOG.md

# no table row has been lost (expected output: 0)
git --no-pager diff packages/tokens/CHANGELOG.md | grep '^-|' | sed 's/^-//' | sort > /tmp/removed.txt
grep '^|' packages/tokens/MIGRATION-6.0.0.md | sort > /tmp/migration.txt
comm -23 /tmp/removed.txt /tmp/migration.txt | wc -l
rm /tmp/removed.txt /tmp/migration.txt

# the partial should now be ~9KB (was ~127KB)
wc -c website/docs/whats-new/release-notes/partials/design-tokens.md
```

Finally, check the page in the browser (`pnpm -F website start` → `/whats-new/release-notes`, "Design tokens" tab).

## Expected diff

- `packages/tokens/MIGRATION-6.0.0.md` (new)
- `packages/tokens/CHANGELOG.md`
- `website/docs/whats-new/release-notes/partials/design-tokens.md`
