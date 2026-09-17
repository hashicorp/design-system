# Icons pipeline — Carbon-theme fallback for colored service icons

## Problem

The Carbon (CDS) theme supports dark mode. The colored service icons (`aws-cloudwatch-color`,
`youtube-color`, …) use hardcoded brand hex fills that don't always work against dark backgrounds.

These icons have **no IBM Carbon equivalent** — `@carbon/icons` ships no vendor/brand logos — so
before this change they had `carbon: null` in the generated registry. `HdsIcon` therefore kept
rendering the colored Flight glyph even when the Carbon theme was active.

The desired behaviour: in Carbon themes, render the **monochrome** counterpart of the icon instead
(`aws-cloudwatch` in place of `aws-cloudwatch-color`). The monochrome glyphs use Figma's dynamic
color, which the pipeline converts to `currentColor`, so they adapt to the active theme.

## Solution

Implemented entirely in the build pipeline, in a single file:
[`scripts/build-parts/generateBundleSymbolJS.ts`](../../../packages/flight-icons/scripts/build-parts/generateBundleSymbolJS.ts).

When an asset has no `[carbon:…]` mapping but **is in a fallback category and its name ends with
`-color`**, the generator emits a Carbon symbol module whose artwork is taken from the monochrome
counterpart's already-optimized SVG, and registers it in the `carbon` slot of the registry.

Two constants hold the policy:

```ts
const CDS_MONOCHROME_FALLBACK_CATEGORIES = ['Services'];
const CDS_MONOCHROME_FALLBACK_SIZE = '24';
```

The resolution order inside the asset loop is:

1. `if (mapping)` — a real `@carbon/icons` icon. Unchanged behaviour, always wins.
2. `else if` category is a fallback category **and** `baseName` ends with `-color` **and** the
   `carbon` slot isn't already filled — read `temp/{baseName-without-color}-24.svg` and emit it as
   the Carbon symbol.
3. Otherwise `carbon` stays `null`.

A shared `writeCarbonSymbol(baseName, source)` helper does the actual emit for **both** branches:
it derives the symbol id, formats the module, writes `symbol-js/carbon/{baseName}.js`, and sets the
registry loader.

Also added: a changeset (`minor` on `@hashicorp/flight-icons`).

### What is deliberately *not* touched

- **`packages/components`** — no changes. `HdsIcon` and `hds-icon-registry` are unaware of this.
- **`catalog.json` and its schema** — no new fields.
- **`sync.ts` / `getAssetsMetadata.ts`** — no new Figma API calls; **no re-sync required**.
- The other bundle generators (`generateBundleSVG`, `…SVGSprite`, `…SVGReact`) never read
  `mapping`, so they are unaffected.

## Why it works

### The registry contract is unchanged

`registry.d.ts` still declares `carbon: (() => Promise<HdsIconModule>) | null`. The fallback simply
fills a slot that used to be `null`. `HdsIcon.hasCarbonEquivalent` → `isCarbon` → the service's
`_resolveLoader` all behave exactly as they already do for real Carbon icons. Nothing downstream
needs to know the artwork came from a Flight SVG rather than `@carbon/icons`.

### The symbol id matches at runtime

This is the load-bearing detail. The symbol id is **baked into the generated module** at build time,
but `hds-icon-registry` **recomputes it independently** at runtime:

- Service: `_makeKey({library: 'carbon', name})` → `carbon-{name}` →
  `makeSymbolIdFromKey` → `hds-icon-carbon-{name}`, used for `_symbolExists()` and for
  `<use href="#…">`.
- Pipeline: `writeCarbonSymbol` derives the id with the identical
  `makeSymbolIdFromKey('carbon-' + baseName)`.

Because the fallback goes through the same helper as real Carbon icons, the two agree by
construction. Aliasing a Flight *module* into the `carbon` slot instead would break this — see
[Anti-patterns](#anti-patterns-do-not-do-these) below. This is why the artwork is re-emitted under a
Carbon-namespaced id rather than aliased.

`makeDomSafeId` / `makeSymbolIdFromKey` are duplicated in the pipeline and in
`packages/components/src/services/hds-icon-registry.ts`; both copies carry a comment requiring
them to be kept in sync. Extracting `writeCarbonSymbol` means the pipeline now derives that id in
exactly one place.

### One size-agnostic entry is sufficient

The registry's `carbon` slot has no size dimension (Carbon icons are a single 32×32 glyph), whereas
Flight art is per-size. That's fine here: service icons contain **no strokes**, so the 16 and 24
variants are the same artwork scaled, with no size-specific optical adjustment. The `24` source is
used for higher fidelity.

Geometrically this resolves correctly because `<use>` scales a symbol's `viewBox` to the referencing
viewport. `HdsIcon` renders `<svg viewBox="0 0 {{size}} {{size}}">`, so a `0 0 24 24` symbol fits a
16px icon exactly as a `0 0 32 32` Carbon symbol already does.

### Colors resolve to `currentColor` for free

`getSymbolModule` runs `replaceDynamicColor`, which strips `fill="#000001"` (Figma's dynamic color)
so the glyph inherits fill from the parent `<svg fill={{this.fillColor}}>`. The monochrome service
SVGs already use dynamic color, so reusing them through the normal emit path yields theme-adaptive
icons with no extra handling. The colored variants' hardcoded hex fills never enter the Carbon slot.

### The name convention is a verified invariant, not an assumption

Checked against `catalog.json`:

| Check | Result |
| --- | --- |
| `Services` icons ending in `-color` | 86 |
| …missing a monochrome counterpart | **0** |
| …whose counterpart lacks both `16` and `24` | **0** |
| …whose counterpart sits in another category | **0** |
| …that already had a real `[carbon:…]` mapping | **0** |

So `{name}-color → {name}` holds for all 86, and step 2 can never shadow a real Carbon mapping.

Cross-checked against the Figma file (`TLnoT5AYQfy3tZ0H68BgOr`): those same 86 component sets are
*exactly* the ones carrying a `cds` layer, and all 86 of those layers resolve to the local
monochrome counterpart (0 point at a remote Carbon component, 0 point anywhere else). The code
convention and the design source agree perfectly — which is why reading Figma layer structure at
build time is unnecessary.

### Scope is limited to `Services`

The 36 `Products` `-color` icons (`terraform-color`, `vault-color`, …) are intentionally excluded:
they keep their colored glyph in Carbon themes. In Figma they carry no `cds` layer, confirming this
is deliberate. `CDS_MONOCHROME_FALLBACK_CATEGORIES` is the single knob controlling this.

## Verification

Dry-run of the branch logic against `catalog.json` (rebased tree):

| | |
| --- | --- |
| Real `@carbon/icons` mappings | 355 (unchanged) |
| New monochrome fallbacks | **86** |
| Total `carbon` entries | 441 |
| Still `null` | 234 |
| Warnings | **0** |

Spot checks: `aws-cloudwatch-color` → set · `youtube-color` → set · `aws-cloudwatch` → null ·
`apple` → null · `activity` → set (real Carbon) · `terraform-color` → null.

`pnpm lint` clean. `pnpm typecheck` unchanged at 4 pre-existing errors (`cheerio` module resolution
in `generateBundleSVG`/`generateBundleSVGReact`, two null-checks in `getAssetsCatalog`); none in the
modified file.

The `apple` case matters: it's the `ICON_WITHOUT_CARBON_EQUIVALENT` fixture in the showcase icon
tests. It's a *monochrome* `Services` icon, so it stays `null` and those tests remain valid.

## Consequences

- **86 icons now report `data-has-carbon-equivalent="true"`** (and `data-is-carbon="true"` under a
  Carbon theme). The attribute's meaning widens from "has an IBM Carbon icon" to "has a Carbon-theme
  rendition". Nothing in `packages/components` distinguishes the two cases.
- The showcase icon library's "With mapping / Without mapping" filter reclassifies those 86.
- `symbol-js/carbon/` gains ~86 modules that duplicate monochrome artwork already present under
  `symbol-js/flight/`. Unavoidable, since a distinct symbol id is required. They're lazy-loaded
  dynamic imports, so the cost is only paid when the icon is actually rendered in a Carbon theme.
- Generated `symbol-js/carbon/*.js` files carry no copyright header, consistent with the existing
  files in that folder. Note `.copywrite.hcl` does *not* ignore `symbol-js/**`, so running
  `copywrite headers` will add headers there (and to `registry.js` / `symbol-js/flight/*.js`, which
  the build also emits without them).

## Anti-patterns (do not do these)

### Do NOT alias a Flight module into the `carbon` slot

It looks like an obvious simplification — it avoids generating any `symbol-js/carbon/*.js` files for
these icons:

```js
// ❌ BROKEN — do not do this
'aws-cloudwatch-color': {
    flight: { 16: () => import('./flight/aws-cloudwatch-color-16.js'),
              24: () => import('./flight/aws-cloudwatch-color-24.js') },
    carbon: () => import('./flight/aws-cloudwatch-24.js')
},
```

**This does not render.** The symbol id is baked into the module at build time, but the service
recomputes it independently and never reads it back from the markup:

```
service _makeKey()          : carbon-aws-cloudwatch-color
service expects <use href=  : #hds-icon-carbon-aws-cloudwatch-color
module actually injects id= :  hds-icon-flight-aws-cloudwatch-24     ← MISMATCH
```

Runtime sequence:

1. `_makeKey` → `carbon-aws-cloudwatch-color` → `symbolId = hds-icon-carbon-aws-cloudwatch-color`.
2. Loads `flight/aws-cloudwatch-24.js`, whose markup carries `id="hds-icon-flight-aws-cloudwatch-24"`.
3. Injects that markup into the sprite root.
4. Marks the entry **`Loaded`** against `hds-icon-carbon-aws-cloudwatch-color`.
5. `HdsIcon` renders `<use href="#hds-icon-carbon-aws-cloudwatch-color">` → no such element.

The failure characteristics are what make this dangerous:

- **Silent.** No exception, no console warning. The icon renders as an empty `<svg>` of the right
  size, so layout looks correct and only the glyph is missing.
- **Permanent.** Step 4 marks the entry `Loaded`, so it is never retried and the DOM check in
  `requestLoad` short-circuits every later render.
- **Cross-talk.** The injected symbol carries the *Flight* id, so it silently satisfies a different
  icon's lookup: rendering the color icon under a Carbon theme pre-loads the monochrome Flight icon,
  and that unrelated icon then works "by accident".

Making it work would require `_makeKey` in `packages/components` to know that certain icons' Carbon
key is really a Flight key — reintroducing precisely the coupling this design keeps out.

The duplication it would save is not worth pursuing: the 86 generated modules total **102 KB**
(~1.2 KB each, 9.8% of `symbol-js/flight`). They are lazy `import()`s, fetched only when that icon
actually renders under a Carbon theme, at most one per icon.

### Do NOT reuse the `mapping` field for HDS icon names

`mapping` means "a name in `@carbon/icons`" and is resolved against
`node_modules/@carbon/icons/svg/32/{name}.svg`. Putting an HDS icon name there (e.g.
`mapping: 'aws-cloudwatch'`) produces a `⚠️ Carbon icon missing` warning and leaves the entry `null`.

### A variant that *does* work, but isn't worth it

For completeness: a thin re-export that rewrites the id is correct, and avoids duplicating artwork.

```js
import flight from '../flight/aws-cloudwatch-24.js';
export default flight.replace(
  'id="hds-icon-flight-aws-cloudwatch-24"',
  'id="hds-icon-carbon-aws-cloudwatch-color"'
);
```

It still generates 86 files, so it doesn't achieve the goal of removing them, and the wire saving
only materialises when both the color-Carbon and mono-Flight icons appear on the same page. It
trades a self-contained artifact for indirection plus a runtime string replace. Rejected.

## Known issues

### `google-docs-color` still renders a hardcoded blue

The monochrome `google-docs` icon is **not actually monochrome**. Its Figma source mixes dynamic
color with a hardcoded brand blue on the folded-corner path, at both sizes:

```
svg-original/google-docs-{16,24}.svg → fill="#000001"  (dynamic ✅)
                                       fill="#0C67D6"  (hardcoded ❌)
```

`replaceDynamicColor` only strips `#000001`, so the `#0C67D6` survives into
`symbol-js/carbon/google-docs-color.js`. That icon therefore won't fully adapt in Carbon dark mode —
the exact problem this work set out to solve.

This is **pre-existing and not a regression**: `origin/main` already ships `fill="#0c67d6"` in
`symbol-js/flight/google-docs-{16,24}.js`, so the Flight icon has always had it. The fallback merely
copies the monochrome glyph faithfully.

It is the **only** offender: all 172 monochrome counterparts (86 icons × 2 sizes) were scanned and
`google-docs` is the sole icon containing a non-dynamic fill. The fix belongs in Figma — make that
path use dynamic color — followed by a re-sync. No pipeline change is needed.

## Guard rails and iteration notes

- If a `-color` icon ever lacks its monochrome counterpart, the build logs
  `⚠️ Monochrome fallback missing: … - Expected by "…"`. This turns a future naming-convention break
  into a visible warning instead of a silently `null` registry entry. It is a warning, not a hard
  failure — worth promoting to an error if the convention is ever formalised.
- **To extend to another category** (e.g. `Products`): add it to
  `CDS_MONOCHROME_FALLBACK_CATEGORIES`. Verify first that every `-color` icon in that category has a
  monochrome counterpart.
- **The policy lives in code, not in Figma.** There is currently no per-icon opt-out. If designers
  need one, the natural upgrade is to drive detection from the Figma `cds` layer (present on exactly
  the intended 86 sets today) by extending `getAssetsMetadata` to resolve node trees and emitting a
  dedicated catalog field. That costs extra API calls and a re-sync, which is why it wasn't done now.
- **Do not reuse the existing `mapping` field** to express this — see
  [Anti-patterns](#anti-patterns-do-not-do-these).
- If service icons ever gain strokes or size-specific optical adjustment, the single size-agnostic
  Carbon entry stops being adequate and the registry shape would need a size dimension for these
  fallbacks.
