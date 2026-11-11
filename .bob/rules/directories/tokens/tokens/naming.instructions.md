---
applyTo: "packages/tokens/src/{global,products}/**/*.json"
description: "HDS token naming structure, semantic roles, component scopes, modifiers, and form-control rules"
---

## Naming structure

The following describes generated names. "?" indicates an optional block.

```text
Core:      [prefix]-[property]-[sub-property?]-[modifier?]
Semantic:  [prefix]-[semantic]-[property]-[sub-property?]-[modifier?]
Component: [prefix]-[component]-[semantic?]-[property]-[sub-property?]-[modifier?]
```

| Block | Purpose | Examples |
| --- | --- | --- |
| Prefix | Avoid collisions with other systems. Always `hds`. | `hds` |
| Component | Identifies the component, family, or nested element. | `badge`, `modal-header-title`, `form-control-boolean` |
| Semantic | Identifies the role being addressed. Use only in semantic or component scope. | `foreground`, `surface`, `page`, `border` |
| Property | Describes the affected property. Often related to the CSS property. | `padding`, `margin`, `gap`, `color`, `height`, `width`, `font-size` |
| Sub-property | Adds specificity to the property. | `horizontal`, `vertical`, `radius` |
| Modifier | Attribute of the object such as variant, state, scale, or mode. | `neutral`, `critical`, `hover`, `small`, `checked-disabled` |

Use lowercase with hyphens between blocks, including within multiword blocks: `advanced-table`, not `advancedTable` or `advanced_table`. Do not add a component block to an unrelated global token or use a semantic role outside its intended context.

Component and modifier blocks can be stacked. Preserve their meaningful order, for example `app-header-home-link-application-title`, `form-control-boolean`, `checked-focus`, and `unchecked-disabled`.

## Source keys and generated names

Express the name as nested JSON keys. The build joins the path with hyphens and adds `hds`; CSS output adds `--`.

```text
accordion.card.gap.small -> --hds-accordion-card-gap-small
```

Use `{accordion.card.gap.small}` to reference that source token. Do not write a generated CSS variable name inside a token alias, and do not duplicate the `hds` prefix in JSON keys.

Choose nesting that preserves the intended naming order. Filenames organize sources but do not add name segments.

## Consistent vocabulary

- Use `surface-color`, not `background-color`, for element backgrounds.
- Use `foreground-color`, not a bare `color`, for text and icon foreground roles.
- Use `page` for page-background semantics and `border` for border-color semantics.
- Use `font-size`, `font-family`, and `font-weight` for typography.
- Use `padding`, `margin`, and `gap` for space inside, outside, and between elements respectively.
- Use `size` when an element has equal height and width.
- Use `small`, `medium`, and `large`, not `sm`, `md`, and `lg`. Other scales include `x-small` and `x-large`.
- Align equivalent names across components, code, and design tools. Discuss necessary tool-specific deviations instead of inventing synonyms.

## States and modifiers

Place modifiers after the property and sub-property. Keep variants and state combinations consistently ordered, such as `critical-hover` and `checked-disabled`.

Omit `default` only when there are no alternative interaction-state tokens for the same role. For example, a pagination bar with only a default surface can use `pagination-bar-surface-color`. If navigation controls have default and interactive foreground states, retain `-default` alongside `-hover`, `-focus`, or `-active`, as applicable.

This naming rule does not remove the need for a `$modes.default` entry on a token with mode-specific values.

## Form-control tokens

Use shared families rather than creating duplicate component-specific names:

| Family | Elements |
| --- | --- |
| `form-control` | FileInput, MaskedInput, Select, SuperSelect, Textarea, TextInput |
| `form-control-boolean` | Checkbox, Radio, SuperSelect multiple checkboxes, Toggle |

Place the interaction state at the end, after `checked` or `unchecked` when present:

```text
form-control-boolean-surface-color-checked-default
form-control-foreground-color-readonly
```

`form-control-border-color-invalid-hover` is an exception; preserve that established invalid/hover ordering.

## Good and bad names

| Good | Bad | Reason |
| --- | --- | --- |
| `--hds-advanced-table-header-surface-color` | `--hds-advancedTable-header-surface-color` | Multiword blocks use kebab case. |
| `--hds-alert-border-color-neutral` | `--hds-alert-neutral-border-color` | Modifiers come after the property. |
| `--hds-app-header-surface-color` | `--hds-app-header-background-color` | Reuse the established semantic vocabulary. |
| `--hds-accordion-card-gap-small` | `--hds-accordion-card-gap-sm` | Spell out scale names. |

Before adding a token, check nearby definitions for the same role and verify the generated name after building. See [source context](context.instructions.md) and [format](format.instructions.md).
