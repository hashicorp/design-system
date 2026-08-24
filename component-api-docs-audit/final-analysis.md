# Component API Audit Summary

**Total issues: 34** (+ 8 potential source bugs noted separately, + 2 minor docs formatting inconsistencies noted but excluded from count)

| Issue type                          | Count |
|-------------------------------------|-------|
| Wrong default                       | 6     |
| Wrong type                          | 7     |
| Missing arg                         | 8     |
| Wrong required flag                 | 4     |
| Extra arg                           | 2     |
| Default specified but none exists   | 1     |
| Undocumented default                | 2     |
| Wrong values                        | 2     |
| Wrong arg name                      | 1     |
| Wrong content                       | 1     |
| Potential source bug                | 8     |
| Minor docs formatting inconsistency | 2     |

**Components with issues: 27 / 66 audited**

---


# Component API Audit Findings - Components

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

## CodeBlock

Source: `packages/components/src/components/hds/code-block/index.gts`, `copy-button.gts`, `title.gts`, `description.gts`, `types.ts`
Docs: `website/docs/components/code-block/partials/code/component-api.md`

### CodeBlock (root)

- **`copySuccessMessageText`: missing arg**
  - Description: This arg exists in source but is not documented.
  - Source (`index.gts:71`):
    - `copySuccessMessageText?: HdsCopyButtonSignature['Args']['ariaMessageText']`
  - Docs:
    - Not documented

---

## CodeEditor

Source: `packages/components/src/components/hds/code-editor/index.gts`, `title.gts`, `description.gts`, `generic.gts`
Docs: `website/docs/components/code-editor/partials/code/component-api.md`

### CodeEditor (root)

- **`extraKeys`: missing arg**
  - Description: This arg exists in the modifier signature and is forwarded from the component, but is not documented.
  - Source (`index.gts:223`, `modifiers/hds-code-editor.ts:55`):
    - `extraKeys?: HdsCodeEditorExtraKeys` (typed as `{ [key: string]: () => boolean }`)
  - Docs:
    - Not documented

---

## Dropdown

Source: `packages/components/src/components/hds/dropdown/index.gts`, `toggle/button.gts`, `toggle/icon.gts`, `list-item/interactive.gts`, `list-item/copy-item.gts`, `list-item/checkmark.gts`, `types.ts`
Docs: `website/docs/components/dropdown/partials/code/component-api.md`

### [D].ToggleButton

- **`isFullWidth`: missing arg**
  - Description: `isFullWidth` exists in source but is not documented.
  - Source (`toggle/button.gts:46`):
    - `isFullWidth?: boolean`
  - Docs:
    - Not documented

---

## FilterBar

Source: `packages/components/src/components/hds/filter-bar/index.gts`, `types.ts`
Docs: `website/docs/components/filter-bar/partials/code/component-api.md`

### Filter types

- **`type`: minor docs formatting inconsistency**
  - Description: The `@required` attribute uses a string value `"true"` instead of the boolean `{{true}}`, which is inconsistent with the rest of the docs. This is a docs template authoring quirk, not a source/docs mismatch; excluded from the issue count.
  - Docs (`component-api.md:45`):
    - `@required="true"` (string), should be `@required={{true}}`

---

## Icon

Source: `packages/components/src/components/hds/icon/index.gts`, `types.ts`
Docs: `website/docs/components/icon/partials/code/component-api.md`

### Icon (root)

- **`name`: minor docs formatting inconsistency**
  - Description: The `@required` attribute uses a string value `"true"` instead of the boolean `{{true}}`, which is inconsistent with the rest of the docs. This is a docs template authoring quirk, not a source/docs mismatch; excluded from the issue count.
  - Docs (`component-api.md:4`):
    - `@required="true"` (string), should be `@required={{true}}`

- **`size`: wrong type**
  - Description: `size` is documented as `@type="number"` but the source type `HdsIconSizes` resolves to the string union `'16' | '24'`; consumers pass a string, not a number.
  - Source (`index.gts:24`, `types.ts:6-11`):
    - `size?: HdsIconSizes`, which is `` `${HdsIconSizeValues}` `` resolving to `'16' | '24'`
  - Docs (`component-api.md:7`):
    - `@type="number"`
  -Note:
    - Passing a number works at runtime due to Handlebars coercion, but since the TypeScript type is '16' | '24', Glint would reject the number if enabled.

---

## IconTile

Source: `packages/components/src/components/hds/icon-tile/index.gts`, `types.ts`
Docs: `website/docs/components/icon-tile/partials/code/component-api.md`

### IconTile (root)

- **`color`: wrong values**
  - Description: The docs are missing `"hcp"` and `"vault-radar"` from the `@values` list; both are valid product values in the source enum.
  - Source (`types.ts:14-28`):
    - `HdsIconTileProductValues` includes `HCP = 'hcp'` and `'Vault Radar' = 'vault-radar'`
  - Docs (`component-api.md:7`):
    - `@values={{array "neutral" "boundary" "consul" "nomad" "packer" "terraform" "vagrant" "vault" "vault-secrets" "waypoint"}}`, missing `"hcp"` and `"vault-radar"`
---

## PageHeader

Source: `packages/components/src/components/hds/page-header/index.gts`, `title.gts`, `subtitle.gts`, `description.gts`, `badges.gts`, `actions.gts`
Docs: `website/docs/components/page-header/partials/code/component-api.md`

### [PH].Title

- **`close`: extra arg**
  - Description: The docs document a `close` function arg on `[PH].Title` that does not exist in `HdsPageHeaderTitleSignature`; it appears to be stale copy-paste from the Modal docs.
  - Source (`title.gts:12-18`):
    - `HdsPageHeaderTitleSignature` has `Args: HdsTextDisplaySignature['Args']`, no `close` arg
  - Docs (`component-api.md:22`):
    - `<C.Property @name="close" @type="function">`

---

## Pagination

Source: `packages/components/src/components/hds/pagination/compact/index.gts`, `numbered/index.gts`, `types.ts`
Docs: `website/docs/components/pagination/partials/code/component-api.md`

### Pagination::Numbered

- **`showInfo`: missing arg**
  - Description: `showInfo` controls visibility of the info block and defaults to `true` in source but is not documented.
  - Source (`numbered/index.gts:61`, `:193`):
    - `showInfo?: boolean`, default `true` (`this.args.showInfo ?? true`)
  - Docs (`component-api.md`):
    - Not documented

- **`showPageNumbers`: missing arg**
  - Description: `showPageNumbers` controls visibility of the page number list and defaults to `true` in source but is not documented.
  - Source (`numbered/index.gts:62`, `:196`):
    - `showPageNumbers?: boolean`, default `true` (`this.args.showPageNumbers ?? true`)
  - Docs (`component-api.md`):
    - Not documented

---

## RichTooltip

Source: `packages/components/src/components/hds/rich-tooltip/index.gts`, `toggle.gts`, `bubble.gts`, `types.ts`
Docs: `website/docs/components/rich-tooltip/partials/code/component-api.md`

### RichTooltip (root)

- **`enableSoftEvents`: extra arg**
  - Description: The docs expose `enableSoftEvents` as a consumer-facing arg, but the source explicitly omits it from the public `Args` via `Omit<HdsPopoverPrimitiveSignature['Args'], 'enableSoftEvents'>`; it is computed internally from `enableClickEvents` and cannot be passed by consumers.
  - Source (`index.gts:19`):
    - `Args: Omit<HdsPopoverPrimitiveSignature['Args'], 'enableSoftEvents'>`, `enableSoftEvents` is excluded
  - Source (`index.gts:44-46`):
    - `get enableSoftEvents() { return this.args.enableClickEvents !== true; }`, computed internally, not an arg
  - Docs (`component-api.md:18-20`):
    - `<C.Property @name="enableSoftEvents" @type="boolean" @default="true">`

---

## Time

Source: `packages/components/src/components/hds/time/index.gts`, `single.gts`, `range.gts`
Docs: `website/docs/components/time/partials/code/component-api.md`

### Time (root)

- **`isoUtcString`: potential source bug**
  - Description: `isoUtcString` is declared in `Args` but the getter `get isoUtcString()` always derives the value from `this.date` via the time service and never reads `this.args.isoUtcString`. The argument is appropriately omitted from the docs currently since it isn't used currently. Should it be removed from the `Args` interface?
  - Source (`index.gts:32`):
    - `isoUtcString?: string` declared in `Args`
  - Source (`index.gts:95-105`):
    - `get isoUtcString()` ignores `this.args.isoUtcString` entirely
  - Docs:
    - Correctly not documented

---

## Tooltip

Source: `packages/components/src/components/hds/tooltip-button/index.gts`, `types.ts`
Docs: `website/docs/components/tooltip/partials/code/component-api.md`

### TooltipButton

- **`text`: wrong required flag**
  - Description: `text` is required in source (`text: string`, no `?`) but is not marked `@required={{true}}` in the docs.
  - Source (`tooltip-button/index.gts:25`):
    - `text: string`, required
  - Docs (`component-api.md:6`):
    - `<C.Property @name="text" @type="string">`, no `@required`

---


# Component API Audit Findings - Form components

## Form / Layout

Source: `packages/components/src/components/hds/form/index.gts`, `form/header/index.gts`, `form/header/title.gts`, `form/header/description.gts`, `form/section/index.gts`, `form/section/header.gts`, `form/section/multi-field-group/index.gts`, `form/section/multi-field-group/item.gts`, `form/footer/index.gts`, `form/separator/index.gts`, `form/types.ts`
Docs: `website/docs/components/form/layout/partials/code/component-api.md`

### Form (root)

- **`sectionMaxWidth`: undocumented default**
  - Description: The default value of `672px` is not shown. `@default="672px"` is set in the markdown but is ignored at render time because `@valueNote` is also present. The `672px` value comes from the SCSS stylesheet, not from the TypeScript arg, so it should be communicated in the description rather than via `@default`.
  - Source (`styles/components/form/layout.scss:15`):
    - `--hds-form-section-max-width: 672px;`, CSS default, independent of the arg
  - Docs (`component-api.md:42`):
    - `@valueNote="any valid CSS width (px, rem, etc)" @default="672px"`, `@default` is dead markup here; `672px` never appears on the rendered page
  - Note:
    - Have it match the pattern used for documenting `Dropdown` `@width`.

### Form::Header::Title

- **`size`: wrong default**
  - Description: The docs document a default of `"200"` but the source constant `DEFAULT_SIZE` resolves to `400`.
  - Source (`header/title.gts:16`, `text/types.ts:48-49`):
    - `DEFAULT_SIZE = HdsTextSizeValues.FourHundred`, which is `400`
  - Docs (`component-api.md:79`):
    - `@default="200"`

---

## Form / Primitives

Source: `packages/components/src/components/hds/form/label/index.gts`, `form/helper-text/index.gts`, `form/error/index.gts`, `form/legend/index.gts`, `form/character-count/index.gts`, `form/indicator/index.gts`, `form/field/index.gts`, `form/fieldset/index.gts`
Docs: `website/docs/components/form/primitives/partials/code/component-api.md`

### Form::Label

- **`hiddenText`: missing arg**
  - Description: `Form::Label` accepts a `hiddenText` arg that renders visually hidden accessible text, but it is not documented.
  - Source (`label/index.gts:20`):
    - `hiddenText?: string`, renders a `<span class="sr-only">` when present
  - Docs (`component-api.md:3-21`):
    - Not documented

### Form::Fieldset

- **`id`: potential source bug**
  - Description: The docs document a consumer-facing `id` arg, but `id?: string` is missing from `HdsFormFieldsetSignature['Args']`. It has been working at runtime because `getElementId` reads directly from `element.args.id`, but it should be formally declared in `Args`.
  - Source (`fieldset/index.gts:30-36`):
    - `id` absent from `Args`
  - Docs (`component-api.md:176`):
    - Correctly documented as `<C.Property @name="id" @type="string">`

---

## Form::KeyValueInputs

Source: `packages/components/src/components/hds/form/key-value-inputs/index.gts`, `field.gts`, `add-row-button.gts`, `delete-row-button.gts`, `generic.gts`
Docs: `website/docs/components/form/key-value-inputs/partials/code/component-api.md`

### [F].AddRowButton

- **`ariaLabel`: missing arg**
  - Description: `HdsFormKeyValueInputsAddRowButton` accepts an `ariaLabel` arg but it is not documented.
  - Source (`add-row-button.gts:18`):
    - `ariaLabel?: string`
  - Docs (`component-api.md:181-191`):
    - Not documented

### [R].Field

- **`width`: wrong default**
  - Description: The docs document the default as `"1f"` (missing the `r`); the actual default applied by the grid layout logic is `"1fr"`.
  - Source (`index.gts:157`):
    - `updatedGridTemplateColumns += '1fr ';`, applied when no `dataset['width']` is set
  - Docs (`component-api.md:135`):
    - `@default="1f"` (should be `"1fr"`)

---

## Form::MaskedInput

Source: `packages/components/src/components/hds/form/masked-input/base.gts`, `field.gts`
Docs: `website/docs/components/form/masked-input/partials/code/component-api.md`

### Form::MaskedInput::Base

- **`visibilityToggleAriaLabel`: potential source bug**
  - Description: The arg accepts only a single static string, so a consumer cannot provide different labels for the masked and unmasked states. Passing any value means the same string is used regardless of state.
  - Source (`base.gts:83-101`):
    - `if (this.args.visibilityToggleAriaLabel) { return this.args.visibilityToggleAriaLabel; }`, no mechanism to pass state-dependent overrides
  - Docs:
    - Not a docs issue

- **`visibilityToggleAriaMessageText`: potential source bug**
  - Description: Same limitation as `visibilityToggleAriaLabel`: only a single static string can be provided, with no way to supply different text for the masked and unmasked states.
  - Source (`base.gts:103-121`):
    - `if (this.args.visibilityToggleAriaMessageText) { return this.args.visibilityToggleAriaMessageText; }`, no mechanism to pass state-dependent overrides
  - Docs:
    - Not a docs issue

---

## Form::RadioCard

Source: `packages/components/src/components/hds/form/radio-card/index.gts`, `group.gts`, `types.ts`
Docs: `website/docs/components/form/radio-card/partials/code/component-api.md`

### Form::RadioCard::Group

- **`isOptional`: missing arg**
  - Description: `Form::RadioCard::Group` extends `HdsFormFieldsetSignature['Args']` which includes `isOptional`, but the docs do not document this arg.
  - Source (`group.gts:22-26`):
    - `Args: HdsFormFieldsetSignature['Args'] & { ... }`, includes `isOptional?: boolean`
  - Source (`group.gts:49`):
    - `@isOptional={{@isOptional}}` is passed to `HdsFormFieldset`
  - Docs (`component-api.md:68-86`):
    - No entry for `isOptional`

---

## Form::TextInput

Source: `packages/components/src/components/hds/form/text-input/base.gts`, `field.gts`, `types.ts`
Docs: `website/docs/components/form/text-input/partials/code/component-api.md`

### Form::TextInput::Field

- **`visibilityToggleAriaLabel`: wrong default**
  - Description: The docs document a default of `"Show masked content"` but the source default is `"Show password"` (when masked) or `"Hide password"` (when unmasked).
  - Source (`field.gts:62-68`):
    - When `_isPasswordMasked` is true: `'Show password'`; when false: `'Hide password'`
  - Docs (`component-api.md:72`):
    - `@default="Show masked content"`

- **`visibilityToggleAriaMessageText`: wrong default**
  - Description: The docs document a default of `"Input content is hidden"` but the source default is `"Password is hidden"` (when masked) or `"Password is visible"` (when unmasked).
  - Source (`field.gts:70-78`):
    - When `_isPasswordMasked` is true: `'Password is hidden'`; when false: `'Password is visible'`
  - Docs (`component-api.md:75`):
    - `@default="Input content is hidden"`

- **`visibilityToggleAriaLabel`: potential source bug**
  - Description: Same limitation as `Form::MaskedInput::Base`: only a single static string can be provided, with no way to supply different text for the masked and unmasked states.
  - Source (`field.gts:60-68`):
    - `if (this.args.visibilityToggleAriaLabel) { return this.args.visibilityToggleAriaLabel; }`, no mechanism to pass state-dependent overrides
  - Docs:
    - Not a docs issue

- **`visibilityToggleAriaMessageText`: potential source bug**
  - Description: Same limitation as `Form::MaskedInput::Base`: only a single static string can be provided, with no way to supply different text for the masked and unmasked states.
  - Source (`field.gts:70-78`):
    - `if (this.args.visibilityToggleAriaMessageText) { return this.args.visibilityToggleAriaMessageText; }`, no mechanism to pass state-dependent overrides
  - Docs:
    - Not a docs issue

---


# Component API Audit Findings - Layouts

## Layout::Grid

Source: `packages/components/src/components/hds/layout/grid/index.gts`, `item.gts`, `types.ts`
Docs: `website/docs/layouts/grid/partials/code/component-api.md`

### Layout::Grid (root)

- **`gap`: wrong values**
  - Description: The docs `@values` list is missing `"24"`; the source enum `HdsLayoutGridGapValues` includes it.
  - Source (`types.ts:23`):
    - `'TwentyFour' = '24'` is a valid member of `HdsLayoutGridGapValues`
  - Docs (`component-api.md:35`):
    - `@values={{array "0" "4" "8" "12" "16" "32" "48"}}`, `"24"` absent

---


# Component API Audit Findings - Utilities

## DismissButton

Source: `packages/components/src/components/hds/dismiss-button/index.gts`
Docs: `website/docs/utilities/dismiss-button/partials/code/component-api.md`

### DismissButton (root)

- **`ariaLabel`: wrong default**
  - Description: The docs document the default as `"dismiss"` (lowercase) but the source translation fallback is `"Dismiss"` (capitalized).
  - Source (`index.gts:26-28`):
    - `default: 'Dismiss'`
  - Docs (`component-api.md:6`):
    - `@default="dismiss"`