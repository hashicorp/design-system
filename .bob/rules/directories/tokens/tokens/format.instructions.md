---
applyTo: "packages/tokens/src/{global,products}/**/*.json"
description: "DTCG-style HDS token JSON properties, repository metadata, aliases, units, and mode values"
---

## Scope and terminology

Helios uses DTCG (Design Tokens Community Group) JSON with custom Style Dictionary processing and legacy metadata. The [DTCG format specification](https://www.designtokens.org/tr/2025.10/format/) is useful background, but its latest value shapes are not automatically supported by this package.

These instructions describe hand-authored tokens in `src/global/` and `src/products/`.

## Groups, tokens, and references

A token is an object containing `$value`. Other nested objects organize groups. The object's key supplies its name; there is no separate token-name property.

```json
{
  "accordion": {
    "card": {
      "gap": {
        "small": {
          "$type": "dimension",
          "$value": "4",
          "unit": "px",
          "$modes": {
            "default": "4",
            "cds-g0": "0",
            "cds-g10": "0",
            "cds-g90": "0",
            "cds-g100": "0"
          }
        }
      }
    }
  }
}
```

This example follows [accordion.json](../../../../../packages/tokens/src/products/shared/accordion.json). Its path is `accordion.card.gap.small`; an alias to it is `{accordion.card.gap.small}`.

- References use source JSON paths, not filenames or generated CSS variable names.
- Reference targets must exist in the inputs selected for the build target. Avoid circular references.
- Keep dots and braces out of individual token/group keys; dots delimit alias paths and braces delimit references. Keys beginning with `$` are reserved for format properties.
- Prefer aliases over repeating values. Preserve composite strings that combine multiple references, such as shadow offsets, blur, spread, and color.

## Current source properties

These are all properties currently present on hand-authored token objects. Properties inside `$modes` overrides have the same meaning.

| Property | Purpose and supported source convention |
| --- | --- |
| `$value` | Required to identify a token. The literal or alias to transform. Existing values include strings, numbers, arrays, and composed strings of aliases; use the shape supported for that token family. |
| `$type` | Describes the value for transforms and consumers. Preserve existing type spellings; some tokens have no local `$type`, so do not assume every existing token declares one. |
| `$modes` | Repository-specific map of mode names to replacement values or token-property overrides. Not a standard DTCG token property. |
| `unit` | Separate unit metadata for literal numeric values (including numeric strings), for example `"px"` for dimensions or `"s"` for durations. Pure aliases do not require a local unit. Do not append the same unit to `$value` as well. |
| `alpha` | Color-opacity metadata consumed by `color/with-alpha`, including decimal strings such as `"0.4"`. Can be supplied by a mode override. |
| `comment` | Descriptive metadata for the active/default output; may be replaced by the comments preprocessor. This is the repository's existing field, not standard `$description`. |
| `comments` | Description map using `hds` and/or `cds` keys, not individual mode names. Non-default builds select `cds` only when the token has `$modes`; otherwise they select `hds`. Missing entries leave `comment` unchanged. |
| `deprecated` | Legacy boolean deprecation flag, currently used as `true`. It is not standard `$deprecated`, and the custom build does not use it to automatically remove or redirect tokens. |
| `group` | Optional classification string such as `core`, `semantic`, `branding`, or `components`. This leaf-token metadata does not contribute to the public name and has no custom product-build filtering behavior. |
| `private` | Marks implementation-only tokens. The output filter excludes any truthy value; existing files include boolean `true` and legacy string `"true"`. Use a boolean for new flags; string `"false"` would also be truthy and exclude the token. |

Distinguish metadata on a token from ordinary grouping keys: `form.group.control-field.margin.top`, for example, contains a nested group named `group`, not the classification metadata above. Put `comments` on token objects; the preprocessor warns about and ignores `comments` on parent groups.

### Types and value shapes

Supported `$type` values are:

```text
color
cubicBezier
dimension
duration
font-family
font-size
font-weight
letter-spacing
number
```

- Dimensions and durations commonly use a numeric string plus separate `unit` metadata.
- Font-family values can be arrays; the build formats them into a CSS font stack.
- Font sizes and letter spacing are handled by custom typography transforms. Web font sizes become rem; email font sizes become px.
- Colors can be literals or aliases and can carry `alpha` metadata.
- Composite elevation values can be strings containing multiple aliases, rather than modern DTCG composite objects.

Do not convert existing types to `fontFamily`, replace dimensions with `{ "value": ..., "unit": ... }` objects, or rewrite colors into structured DTCG objects without an intentional, validated build change.

## Mode values

Supported modes are `default`, `cds-g0`, `cds-g10`, `cds-g90`, and `cds-g100`. When a token has `$modes`, supply every requested mode: missing entries fail the themed build. Keep `$modes.default` consistent with the base `$value`.

The mode preprocessor distinguishes two shapes:

1. A primitive, array, or object without its own `$value` replaces the token's `$value`.
2. An object with its own `$value` overrides token properties. An override property set to `null` deletes that property.

For example, this is a single mode-entry shape used for an alert border:

```json
{
  "$value": "{carbon.themes.white.borderStrong01}",
  "alpha": "0.4"
}
```

Placed under a Carbon mode key, this replaces both the base alias and the opacity metadata. It is not the complete `$modes` map; retain the other mode entries.

Aliases can inherit theme-dependent values through reference chains without declaring `$modes` themselves. Do not add redundant mode maps solely because the referenced token is themed.

## Format rules

- Hex codes should be lowercase.
- Literal numeric font-size and letter-spacing values should use a "px" unit; pure aliases do not require a local unit.
- Literal numeric duration values should use a "s" unit; pure aliases do not require a local unit.
- Durations should include a leading zero for values less than one.
- `transparent` should be used instead of hex codes or rgba values for fully transparent colors.

## Authoring checks

- Follow the neighboring token family for type, units, and nesting.
- Preserve references and all required mode values.
- Keep private implementation tokens out of published outputs.
- Validate changes through the [build pipeline](../scripts.instructions.md), including standard CSS/Sass, themed CSS, and documentation JSON.
- Documentation JSON is generated, not the source format: its formatter resolves mode values and strips top-level processing metadata such as `unit`, `alpha`, and `comments`.

See [source context](context.instructions.md) and [naming](naming.instructions.md) for placement and public-name rules.
