# Component API Audit — Summary

> This summary covers components audited so far. It will be updated as more components are reviewed.
**Total issues: 19** (+ 2 potential source bugs noted separately)

| Issue type                          | Count |
|-------------------------------------|-------|
| Wrong default                       | 3     |
| Wrong type                          | 6     |
| Missing arg                         | 2     |
| Wrong required flag                 | 3     |
| Default specified but none exists   | 1     |
| Undocumented default                | 1     |
| Wrong values                        | 1     |
| Wrong arg name                      | 1     |
| Wrong content                       | 1     |
| Potential source bug                | 2     |

**Components with issues: 7 / 9 audited**

**Flagged for review: 2** (`density`, `isSelected`)

---


# Component API Audit — Findings

---

## Accordion

Source: `packages/components/src/components/hds/accordion/index.gts`, `item/index.gts`, `types.ts`
Docs: `website/docs/components/accordion/partials/code/component-api.md`

### [A].Item

- **`ariaLabel`: default specified but none exists**
  - Description: The docs claim a hardcoded string default that does not exist in source; the actual fallback is a completely different accessibility mechanism.
  - Source (`item/index.gts:42`):
    - `ariaLabel?: string`, optional, no default value
  - Source (`item/index.gts:68-71`):
    - When `ariaLabel` is absent, `ariaLabelledBy` is set to `_titleId`, pointing to the element wrapping the toggle block content; the accessible name is derived from whatever the consumer puts in the toggle block
  - Docs (`component-api.md:50`):
    - `@default='"Toggle display"'`, the string `"Toggle display"` does not exist anywhere in the source

---

## AdvancedTable

Source: `packages/components/src/components/hds/advanced-table/index.gts`, `tr.gts`, `th.gts`, `td.gts`, `types.ts`
Docs: `website/docs/components/table/advanced-table/partials/code/component-api.md`

### AdvancedTable (root)

- **`columns`: wrong required flag**
  - Description: `columns` is required in source but not marked required in the docs.
  - Source (`index.gts:168`):
    - `columns: HdsAdvancedTableColumn[]`, no `?`, required
  - Docs (`component-api.md:50`):
    - Not marked `@required`

- **`model`: wrong required flag**
  - Description: `model` is required in source but not marked required in the docs.
  - Source (`index.gts:174`):
    - `model: T[]`, no `?`, required
  - Docs (`component-api.md:39`):
    - Not marked `@required`

- **`selectionAriaLabelSuffix`: missing arg**
  - Description: This arg exists in source but is not documented on the root component.
  - Source (`index.gts:176`):
    - `selectionAriaLabelSuffix?: string`
  - Docs:
    - Not documented

- **`align`: missing arg**
  - Description: This arg exists in source but is not documented on the root component.
  - Source (`index.gts:166`):
    - `align?: HdsAdvancedTableHorizontalAlignment`
  - Docs:
    - Not documented

- **`density`: wrong values, FLAG FOR REVIEW**
  - Description: The source enum includes `"default"` which is absent from the docs; may be an intentional internal sentinel omission.
  - Source (`types.ts:8-13`):
    - `HdsAdvancedTableDensityValues`, values are `default`, `medium`, `short`, `tall`
  - Docs (`component-api.md:159`):
    - `@values={{array "short" "medium" "tall"}}`, `"default"` absent

- **`reorderedMessageText`: wrong default**
  - Description: The documented default uses different placeholder syntax than the actual translation string.
  - Source (`advanced-table/en-us.yaml:1`, `index.gts:750-757`):
    - Resolved via `hdsIntl.t` to `"Moved {columnLabel} column to position {newPosition}"`
  - Docs (`component-api.md:101`):
    - `@default="Moved (label) column to (position)"`, uses `(label)` / `(position)` instead of `{columnLabel}` / `{newPosition}`

- **`sortedMessageText`: wrong default**
  - Description: The documented default adds a comma not in source and uses an abstracted placeholder rather than the actual interpolation pattern.
  - Source (`index.gts:554`):
    - `` `Sorted by ${this.currentSortBy} ${this.currentSortOrder}ending` ``
  - Docs (`component-api.md:174`):
    - `@default="Sorted by (label), (asc/desc)ending"`, spurious comma after `(label)` and `(asc/desc)ending` does not reflect the actual interpolation

### AdvancedTable::Tr

- **`isSelected`: wrong default, FLAG FOR REVIEW**
  - Description: The default of `false` is attributed to the arg in docs, but it actually comes from the getter, not the `Args` interface.
  - Source (`tr.gts:106`):
    - `isSelected?: boolean`, no default in `Args`; `false` is the `?? false` fallback in the getter
  - Docs (`component-api.md:202`):
    - `@default="false"`, correct in practice but attributed to the arg rather than the getter

### AdvancedTable::Th

- **`colspan`: wrong type**
  - Description: Source defines `colspan` as `number` but docs document it as `string`.
  - Source (`th.gts:65`):
    - `colspan?: number`
  - Docs (`component-api.md:239`):
    - `@type="string"`

- **`rowspan`: wrong type**
  - Description: Source defines `rowspan` as `number` but docs document it as `string`.
  - Source (`th.gts:85`):
    - `rowspan?: number`
  - Docs (`component-api.md:242`):
    - `@type="string"`

### AdvancedTable::Td

- **`colspan`: wrong type**
  - Description: Source defines `colspan` as `number` but docs document it as `string`.
  - Source (`td.gts:33`):
    - `colspan?: number`
  - Docs (`component-api.md:264`):
    - `@type="string"`

- **`rowspan`: wrong type**
  - Description: Source defines `rowspan` as `number` but docs document it as `string`.
  - Source (`td.gts:32`):
    - `rowspan?: number`
  - Docs (`component-api.md:261`):
    - `@type="string"`

---

## Alert

Source: `packages/components/src/components/hds/alert/index.gts`, `title.gts`, `description.gts`, `types.ts`
Docs: `website/docs/components/alert/partials/code/component-api.md`

### [A].LinkStandalone

- **`@size` description: wrong content**
  - Description: The description sentence is cut off mid-way, leaving the pre-bound value unstated.
  - Source (`index.gts:86`):
    - `WithBoundArgs<typeof HdsLinkStandalone, 'size'>`, `size` is pre-bound to `"small"`
  - Docs (`component-api.md:93`):
    - Sentence reads: "apart from the `@size` argument, which is pre-defined to be", ends without stating the value

---

## AppFooter

Source: `packages/components/src/components/hds/app-footer/index.gts`, `status-link.gts`, `legal-links.gts`, `link.gts`, `item.gts`, `copyright.gts`, `types.ts`
Docs: `website/docs/components/app-footer/partials/code/component-api.md`

### [AF].LegalLinks

- **`hrefForAccessibility`: wrong arg name**
  - Description: The arg in source is `hrefForAccessibility` but the docs document it as `Accessibility`.
  - Source (`legal-links.gts:22`):
    - `hrefForAccessibility?: string`
  - Docs (`component-api.md:96`):
    - `@name="Accessibility"`, incorrect name, missing the `hrefFor` prefix

### [AF].StatusLink

- **`href`: undocumented default**
  - Description: Source falls back to `https://status.hashicorp.com` when `href` is absent, but docs do not document this default.
  - Source (`status-link.gts:96`):
    - `this.args.href ?? 'https://status.hashicorp.com'`
  - Docs (`component-api.md:59-61`):
    - `@name="href"` with no `@default` specified

### [AF].Link

- **`iconPosition`: wrong default**
  - Description: The docs document a default of `"trailing"` but the source does not set any default; `iconPosition` is passed directly to `HdsLinkInline` without a fallback.
  - Source (`link.gts:21`, `link.gts:44`):
    - `iconPosition?: HdsLinkIconPositions`, optional, no default; passed as `@iconPosition={{@iconPosition}}`
  - Docs (`component-api.md:130`):
    - `@default="trailing"`

- **`color`: potential source bug**
  - Description: `color` is declared as an optional arg in the signature but is hardcoded to `"secondary"` in the template and never forwarded, so the arg has no effect. Should it be removed from the `Args` interface?
  - Source (`link.gts:19`, `link.gts:34`):
    - `color?: HdsLinkColors` in `Args`; template hardcodes `@color="secondary"` and does not pass `@color={{@color}}`
  - Docs:
    - Correctly not documented

---

## AppHeader

Source: `packages/components/src/components/hds/app-header/index.gts`, `home-link.gts`, `menu-button.gts`
Docs: `website/docs/components/app-header/partials/code/component-api.md`

### AppHeader (root)

- **`a11yRefocusRouteChangeValidator`: wrong type**
  - Description: Docs document this as `@type="string"` but the type is a callback function.
  - Source (`index.gts:29`, `navigation-narrator.d.ts:12`):
    - `a11yRefocusRouteChangeValidator?: (transition: Transition) => boolean`, a function that receives an Ember `Transition` and returns a boolean indicating whether the route change should trigger an accessibility announcement
  - Docs (`component-api.md:33`):
    - `@type="string"`

---

## AppSideNav

Source: `packages/components/src/components/hds/app-side-nav/index.gts`, `list/index.gts`, `list/link.gts`, `list/back-link.gts`, `portal/index.gts`, `portal/target.gts`
Docs: `website/docs/components/app-side-nav/partials/code/component-api.md`

### AppSideNav::List::BackLink

- **`text`: wrong required flag**
  - Description: `text` is required in source (no `?`) but is not marked `@required` in the docs.
  - Source (`list/back-link.gts:16`):
    - `text: string`, no `?`, required
  - Docs (`component-api.md:131`):
    - Not marked `@required`

### AppSideNav::List::Link

- **`isActive`: wrong type**
  - Description: `isActive` is a boolean but `@type` is not set in the docs.
  - Source (`list/link.gts:24`):
    - `isActive?: boolean`
  - Docs (`component-api.md:187`):
    - No `@type` specified, should be `@type="boolean"`

---

## ApplicationState

Source: `packages/components/src/components/hds/application-state/index.gts`, `header.gts`, `body.gts`, `footer.gts`, `media.gts`, `types.ts`
Docs: `website/docs/components/application-state/partials/code/component-api.md`

### [A].Footer

- **`hasDivider`: potential source bug**
  - Description: `hasDivider` is declared as an optional arg in the signature but is never referenced in the template, so it has no effect. Should it be removed from the `Args` interface?
  - Source (`footer.gts:15`):
    - `hasDivider?: boolean` in `Args`; template does not reference it
  - Docs:
    - Correctly not documented

---
