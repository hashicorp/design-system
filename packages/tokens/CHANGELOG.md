# @hashicorp/design-system-tokens

## 1.3.0

### Minor Changes

- [#740](https://github.com/hashicorp/design-system/pull/740) [`92c83961f`](https://github.com/hashicorp/design-system/commit/92c83961f0e8b01e52e3c596c85871ec5cf8c94d) Thanks [@alex-ju](https://github.com/alex-ju)! - Add design tokens for indeterminate `Checkbox`

## 1.2.0

### Minor Changes

- [#629](https://github.com/hashicorp/design-system/pull/629) [`a079992f`](https://github.com/hashicorp/design-system/commit/a079992fbbed11812fcf4cdd4409a00fa2d246f1) Thanks [@didoo](https://github.com/didoo)! - added component-level design tokens for `Tabs` component

* [#646](https://github.com/hashicorp/design-system/pull/646) [`ecbe26df`](https://github.com/hashicorp/design-system/commit/ecbe26df6bdbaf7b4f00c70d016eead0da9168f0) Thanks [@jorytindall](https://github.com/jorytindall)! - Updated the box-shadow values for overlay tokens.

### Patch Changes

- [#636](https://github.com/hashicorp/design-system/pull/636) [`27a283a5`](https://github.com/hashicorp/design-system/commit/27a283a52c2828b32c282401f91df9bd929f9dda) Thanks [@Dhaulagiri](https://github.com/Dhaulagiri)! - Add copyright notice to license file

## 1.1.0

### Minor Changes

- [#584](https://github.com/hashicorp/design-system/pull/584) [`258c06d9`](https://github.com/hashicorp/design-system/commit/258c06d952d41696bb8c5b4bab19eb46e4612cdc) Thanks [@didoo](https://github.com/didoo)! - added specific design tokens for the `RadioCard` component

## 1.0.1

### Patch Changes

- [#555](https://github.com/hashicorp/design-system/pull/555) [`0b245333`](https://github.com/hashicorp/design-system/commit/0b24533369ccc2d02aa5c6c8b8ba4f722e07d236) Thanks [@didoo](https://github.com/didoo)! - Added design tokens for `code-200` and `code-300` typographic styles

## 1.0.0

### Major Changes

This release signifies the first major release of the HashiCorp Design System. Moving forward we expect to respect [SemVer](https://semver.org/) as we make additional changes to the design system.

**Note:** Even though this is a major version bump, there should not be any breaking changes from the last minor releases.

### Minor Changes

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
