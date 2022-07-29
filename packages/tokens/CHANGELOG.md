# @hashicorp/design-system-tokens

## 1.0.0

### Major Changes

- [#447](https://github.com/hashicorp/design-system/pull/447) [`0b1e9855`](https://github.com/hashicorp/design-system/commit/0b1e985586b8f531a6208ea5ce25ac74faa77dda) Thanks [@didoo](https://github.com/didoo)! - # Form controls components

  - Added the form **`TextInput`** controls (`Base`, `Field`)
  - Added the form **`Textarea`** controls (`Base`, `Field`)
  - Added the form **`Select`** controls (`Base`, `Field`)
  - Added the form **`Checkbox`** controls (`Base`, `Field`, `Group`)
  - Added the form **`Radio`** controls (`Base`, `Field`, `Group`)
  - Added the form **`Toggle`** controls (`Base`, `Field`, `Group`)
  - Added the form "base" low-level elements: **`Label`**, **`HelperText`**, **`Error`**, **`Legend`**, **`Field`**, **`Fieldset`**

  # Design tokens

  - added specific design tokens for the `form controls` components

## 0.8.1

### Patch Changes

- [#327](https://github.com/hashicorp/design-system/pull/327) [`a46fc035`](https://github.com/hashicorp/design-system/commit/a46fc03570f51e8375b15571ddcb10e62ba446fb) Thanks [@didoo](https://github.com/didoo)! - removed deprecated design tokens for old semantic colors

## 0.8.0

### Minor Changes

- [#136](https://github.com/hashicorp/design-system/pull/136) [`c17f142c`](https://github.com/hashicorp/design-system/commit/c17f142c0c938b471b696820d1fa440f62f7315b) Thanks [@didoo](https://github.com/didoo)! - Updated the font-stack design tokens in “typography”

  - removed `SF Pro Display/Text` in `Display/Text` (we can rely on `-apple-system + BlinkMacSystemFont`)
  - replaced `Segoe UI Display/Text` with `Segoe UI` in `Display/Text`
  - added `Helvetica, Arial` to the `sans` block in `Display/Text`
  - added explicit emoji support for `Display/Text`
  - replaced `SF Mono` with `ui-monospace` in Code
  - added `Menlo` to `Code`

## 0.7.0

### Minor Changes

- [#98](https://github.com/hashicorp/design-system/pull/98) [`411cd9b9`](https://github.com/hashicorp/design-system/commit/411cd9b949e376d38eb1dc4d4af93ae17e6c686a) Thanks [@didoo](https://github.com/didoo)! - refactored “focus-ring” tokens and CSS helpers to support both “action” and “critical“ colors

## 0.6.1

### Patch Changes

- [#83](https://github.com/hashicorp/design-system/pull/83) [`df267ec6`](https://github.com/hashicorp/design-system/commit/df267ec6cb27d68d0e835357ba736830cac9ce64) Thanks [@didoo](https://github.com/didoo)! - Added “foreground-action-visited-hover” color token to DevDot

## 0.6.0

### Minor Changes

- [#70](https://github.com/hashicorp/design-system/pull/70) [`04db4d9e`](https://github.com/hashicorp/design-system/commit/04db4d9ece6aba358acfa0721a78dfe84c561b5e) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)!

#### 💥 Breaking change

Changes the output path for tokens to include `dist/ in the path

##### Before

`/products/css/tokens.css`

##### After

`/dist/products/css/tokens.css`

## 0.5.2

### Patch Changes

- [#69](https://github.com/hashicorp/design-system/pull/69) [`94edb63b`](https://github.com/hashicorp/design-system/commit/94edb63bd51c48c25f9fa80dfd12f8bd02ade09e) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Publish assets also to dist/
