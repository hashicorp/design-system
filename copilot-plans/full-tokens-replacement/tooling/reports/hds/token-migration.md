# Token Migration — Phase B

- Generated: 2026-07-17T13:16:54.135Z
- Map: `copilot-plans/full-tokens-replacement/tooling/reports/hds/token-map.generated.json`
- Prefix scanned: `--token-`
- Roots: `packages/components/src`, `showcase/app`, `showcase/tests`, `website/app`, `website/docs`
- Dry run: no

## Summary

| Metric | Count |
| --- | ---: |
| Files scanned | 2970 |
| Files changed | 99 |
| Replacements | 1176 |
| TODO markers (no successor) | 34 |
| Interpolated (skipped) | 33 |
| Stale tokens remaining (verify) | 0 |

## Replacements by token

| Before | After | Count |
| --- | --- | ---: |
| `--token-app-header-height` | `--hds-app-header-height` | 7 |
| `--token-app-side-nav-body-list-item-border-radius` | `--hds-app-side-nav-body-list-item-border-radius` | 2 |
| `--token-app-side-nav-body-list-item-content-spacing-horizontal` | `--hds-app-side-nav-body-list-item-padding-horizontal` | 1 |
| `--token-app-side-nav-body-list-item-height` | `--hds-app-side-nav-body-list-item-height` | 2 |
| `--token-app-side-nav-body-list-item-padding-horizontal` | `--hds-app-side-nav-body-list-item-padding-horizontal` | 2 |
| `--token-app-side-nav-body-list-item-padding-vertical` | `--hds-app-side-nav-body-list-item-padding-vertical` | 1 |
| `--token-app-side-nav-body-list-item-spacing-vertical` | `--hds-app-side-nav-body-list-margin-vertical` | 1 |
| `--token-app-side-nav-body-list-margin-vertical` | `--hds-app-side-nav-body-list-margin-vertical` | 1 |
| `--token-app-side-nav-color-surface-primary` | `--hds-app-side-nav-wrapper-surface-color` | 7 |
| `--token-app-side-nav-toggle-button-border-radius` | `--hds-app-side-nav-toggle-button-border-radius` | 14 |
| `--token-app-side-nav-wrapper-border-color` | `--hds-app-side-nav-wrapper-border-color` | 8 |
| `--token-app-side-nav-wrapper-border-width` | `--hds-app-side-nav-wrapper-border-width` | 9 |
| `--token-app-side-nav-wrapper-padding-horizontal` | `--hds-app-side-nav-wrapper-padding-horizontal` | 11 |
| `--token-app-side-nav-wrapper-padding-vertical` | `--hds-app-side-nav-wrapper-padding-vertical` | 9 |
| `--token-badge-border-radius` | `--hds-badge-border-radius` | 1 |
| `--token-border-radius-large` | `--hds-border-radius-large` | 1 |
| `--token-border-radius-medium` | `--hds-border-radius-medium` | 29 |
| `--token-border-radius-small` | `--hds-border-radius-small` | 14 |
| `--token-border-radius-x-small` | `--hds-border-radius-x-small` | 10 |
| `--token-color-border-action` | `--hds-border-color-action` | 1 |
| `--token-color-border-critical` | `--hds-border-color-critical` | 3 |
| `--token-color-border-highlight` | `--hds-border-color-highlight` | 3 |
| `--token-color-border-primary` | `--hds-border-color-primary` | 25 |
| `--token-color-border-strong` | `--hds-border-color-strong` | 31 |
| `--token-color-border-success` | `--hds-border-color-success` | 2 |
| `--token-color-border-warning` | `--hds-border-color-warning` | 3 |
| `--token-color-boundary-brand` | `--hds-product-boundary-brand-color` | 6 |
| `--token-color-focus-action-external` | `--hds-focus-color-action-external` | 19 |
| `--token-color-focus-action-internal` | `--hds-focus-color-action-internal` | 19 |
| `--token-color-focus-critical-external` | `--hds-focus-color-critical-external` | 5 |
| `--token-color-focus-critical-internal` | `--hds-focus-color-critical-internal` | 5 |
| `--token-color-foreground-action` | `--hds-foreground-color-action` | 27 |
| `--token-color-foreground-action-active` | `--hds-foreground-color-action-active` | 22 |
| `--token-color-foreground-action-hover` | `--hds-foreground-color-action-hover` | 22 |
| `--token-color-foreground-critical` | `--hds-foreground-color-critical` | 5 |
| `--token-color-foreground-critical-on-surface` | `--hds-foreground-color-critical-on-surface` | 5 |
| `--token-color-foreground-disabled` | `--hds-foreground-color-disabled` | 7 |
| `--token-color-foreground-faint` | `--hds-foreground-color-faint` | 26 |
| `--token-color-foreground-high-contrast` | `--hds-foreground-color-high-contrast` | 23 |
| `--token-color-foreground-highlight` | `--hds-foreground-color-highlight` | 1 |
| `--token-color-foreground-highlight-on-surface` | `--hds-foreground-color-highlight-on-surface` | 1 |
| `--token-color-foreground-primary` | `--hds-foreground-color-primary` | 49 |
| `--token-color-foreground-strong` | `--hds-foreground-color-strong` | 28 |
| `--token-color-foreground-success` | `--hds-foreground-color-success` | 7 |
| `--token-color-foreground-success-on-surface` | `--hds-foreground-color-success-on-surface` | 1 |
| `--token-color-foreground-warning` | `--hds-foreground-color-warning` | 2 |
| `--token-color-foreground-warning-on-surface` | `--hds-foreground-color-warning-on-surface` | 2 |
| `--token-color-hashicorp-brand` | `--hds-product-hashicorp-brand-color` | 1 |
| `--token-color-palette-alpha-200` | `--hds-core-color-alpha-200` | 4 |
| `--token-color-palette-alpha-300` | `--hds-core-color-alpha-300` | 1 |
| `--token-color-palette-blue-100` | `--hds-core-color-blue-100` | 2 |
| `--token-color-palette-blue-200` | `--hds-core-color-blue-200` | 7 |
| `--token-color-palette-blue-300` | `--hds-core-color-blue-300` | 12 |
| `--token-color-palette-blue-400` | `--hds-core-color-blue-400` | 17 |
| `--token-color-palette-blue-500` | `--hds-core-color-blue-500` | 2 |
| `--token-color-palette-green-300` | `--hds-core-color-green-300` | 1 |
| `--token-color-palette-green-400` | `--hds-core-color-green-400` | 1 |
| `--token-color-palette-neutral-100` | `--hds-core-color-neutral-100` | 3 |
| `--token-color-palette-neutral-200` | `--hds-core-color-neutral-200` | 4 |
| `--token-color-palette-neutral-300` | `--hds-core-color-neutral-300` | 4 |
| `--token-color-palette-neutral-400` | `--hds-core-color-neutral-400` | 4 |
| `--token-color-palette-neutral-500` | `--hds-core-color-neutral-500` | 9 |
| `--token-color-palette-neutral-600` | `--hds-core-color-neutral-600` | 7 |
| `--token-color-palette-neutral-700` | `--hds-core-color-neutral-700` | 16 |
| `--token-color-palette-purple-400` | `--hds-core-color-purple-400` | 4 |
| `--token-color-palette-red-300` | `--hds-core-color-red-300` | 2 |
| `--token-color-palette-red-400` | `--hds-core-color-red-400` | 5 |
| `--token-color-surface-action` | `--hds-surface-color-action` | 4 |
| `--token-color-surface-critical` | `--hds-surface-color-critical` | 6 |
| `--token-color-surface-faint` | `--hds-surface-color-faint` | 20 |
| `--token-color-surface-highlight` | `--hds-surface-color-highlight` | 2 |
| `--token-color-surface-interactive` | `--hds-surface-color-interactive` | 18 |
| `--token-color-surface-interactive-active` | `--hds-surface-color-interactive-active` | 16 |
| `--token-color-surface-interactive-disabled` | `--hds-surface-color-interactive-disabled` | 2 |
| `--token-color-surface-interactive-hover` | `--hds-surface-color-interactive-hover` | 7 |
| `--token-color-surface-primary` | `--hds-surface-color-primary` | 21 |
| `--token-color-surface-strong` | `--hds-surface-color-strong` | 10 |
| `--token-color-surface-success` | `--hds-surface-color-success` | 2 |
| `--token-color-surface-warning` | `--hds-surface-color-warning` | 3 |
| `--token-color-terraform-brand` | `--hds-product-terraform-brand-color` | 2 |
| `--token-color-waypoint-brand` | `--hds-product-waypoint-brand-color` | 2 |
| `--token-elevation-high-box-shadow` | `--hds-elevation-high-box-shadow` | 6 |
| `--token-elevation-higher-box-shadow` | `--hds-elevation-higher-box-shadow` | 2 |
| `--token-elevation-inset-box-shadow` | `--hds-elevation-inset-box-shadow` | 7 |
| `--token-elevation-low-box-shadow` | `--hds-elevation-low-box-shadow` | 11 |
| `--token-elevation-mid-box-shadow` | `--hds-elevation-mid-box-shadow` | 2 |
| `--token-elevation-overlay-box-shadow` | `--hds-elevation-overlay-box-shadow` | 1 |
| `--token-focus-ring-action-box-shadow` | `--hds-focus-ring-box-shadow-action` | 6 |
| `--token-focus-ring-critical-box-shadow` | `--hds-focus-ring-box-shadow-critical` | 1 |
| `--token-form-character-count-foreground-color` | `--hds-form-character-count-foreground-color` | 1 |
| `--token-form-character-count-typography-font-size` | `--hds-form-character-count-typography-font-size` | 1 |
| `--token-form-character-count-typography-line-height` | `--hds-form-character-count-typography-line-height` | 1 |
| `--token-form-checkbox-background-image-data-url` | `--hds-form-checkbox-background-image-data-url` | 2 |
| `--token-form-checkbox-background-image-data-url-disabled` | `--hds-form-checkbox-background-image-data-url-disabled` | 2 |
| `--token-form-checkbox-background-image-data-url-indeterminate` | `--hds-form-checkbox-background-image-data-url-indeterminate` | 1 |
| `--token-form-checkbox-background-image-data-url-indeterminate-disabled` | `--hds-form-checkbox-background-image-data-url-indeterminate-disabled` | 1 |
| `--token-form-checkbox-background-image-size` | `--hds-form-checkbox-background-image-size` | 4 |
| `--token-form-checkbox-border-radius` | `--hds-form-checkbox-border-radius` | 2 |
| `--token-form-checkbox-border-width` | `--hds-form-checkbox-border-width` | 2 |
| `--token-form-checkbox-size` | `--hds-form-checkbox-size` | 4 |
| `--token-form-control-base-border-color-default` | `--hds-form-control-base-border-color-default` | 16 |
| `--token-form-control-base-border-color-hover` | `--hds-form-control-base-border-color-hover` | 11 |
| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-placeholder-foreground-color` | 5 |
| `--token-form-control-base-foreground-value-color` | `--hds-form-control-base-foreground-color` | 9 |
| `--token-form-control-base-surface-color-default` | `--hds-form-control-base-surface-color-default` | 13 |
| `--token-form-control-base-surface-color-hover` | `--hds-form-control-base-surface-color-hover` | 3 |
| `--token-form-control-border-radius` | `--hds-form-control-border-radius` | 12 |
| `--token-form-control-border-width` | `--hds-form-control-border-width` | 18 |
| `--token-form-control-checked-border-color-default` | `--hds-form-control-checked-border-color-default` | 9 |
| `--token-form-control-checked-border-color-hover` | `--hds-form-control-checked-border-color-hover` | 4 |
| `--token-form-control-checked-surface-color-default` | `--hds-form-control-checked-surface-color-default` | 5 |
| `--token-form-control-disabled-border-color` | `--hds-form-control-disabled-border-color` | 13 |
| `--token-form-control-disabled-foreground-color` | `--hds-form-control-disabled-foreground-color` | 6 |
| `--token-form-control-disabled-surface-color` | `--hds-form-control-disabled-surface-color` | 13 |
| `--token-form-control-invalid-border-color-default` | `--hds-form-control-invalid-border-color-default` | 4 |
| `--token-form-control-invalid-border-color-hover` | `--hds-form-control-invalid-border-color-hover` | 4 |
| `--token-form-control-padding` | `--hds-form-control-padding` | 21 |
| `--token-form-control-readonly-border-color` | `--hds-form-control-readonly-border-color` | 2 |
| `--token-form-control-readonly-foreground-color` | `--hds-form-control-readonly-foreground-color` | 2 |
| `--token-form-control-readonly-surface-color` | `--hds-form-control-readonly-surface-color` | 2 |
| `--token-form-error-foreground-color` | `--hds-form-error-foreground-color` | 1 |
| `--token-form-error-icon-size` | `--hds-form-error-icon-size` | 2 |
| `--token-form-error-typography-font-size` | `--hds-form-error-typography-font-size` | 1 |
| `--token-form-error-typography-line-height` | `--hds-form-error-typography-line-height` | 1 |
| `--token-form-helper-text-foreground-color` | `--hds-form-helper-text-foreground-color` | 1 |
| `--token-form-helper-text-typography-font-size` | `--hds-form-helper-text-typography-font-size` | 1 |
| `--token-form-helper-text-typography-line-height` | `--hds-form-helper-text-typography-line-height` | 1 |
| `--token-form-indicator-optional-foreground-color` | `--hds-form-indicator-optional-foreground-color` | 1 |
| `--token-form-indicator-optional-typography-font-size` | `--hds-form-indicator-optional-typography-font-size` | 1 |
| `--token-form-indicator-optional-typography-line-height` | `--hds-form-indicator-optional-typography-line-height` | 1 |
| `--token-form-label-color` | `--hds-form-label-color` | 1 |
| `--token-form-label-foreground-color` | `--hds-form-label-foreground-color` | 1 |
| `--token-form-label-typography-font-size` | `--hds-form-label-typography-font-size` | 1 |
| `--token-form-label-typography-font-weight` | `--hds-form-label-typography-font-weight` | 1 |
| `--token-form-label-typography-line-height` | `--hds-form-label-typography-line-height` | 1 |
| `--token-form-legend-foreground-color` | `--hds-form-legend-foreground-color` | 1 |
| `--token-form-legend-typography-font-size` | `--hds-form-legend-typography-font-size` | 1 |
| `--token-form-legend-typography-font-weight` | `--hds-form-legend-typography-font-weight` | 1 |
| `--token-form-legend-typography-line-height` | `--hds-form-legend-typography-line-height` | 1 |
| `--token-form-radio-background-image-data-url` | `--hds-form-radio-background-image-data-url` | 1 |
| `--token-form-radio-background-image-data-url-disabled` | `--hds-form-radio-background-image-data-url-disabled` | 1 |
| `--token-form-radio-background-image-size` | `--hds-form-radio-background-image-size` | 2 |
| `--token-form-radio-border-width` | `--hds-form-radio-border-width` | 5 |
| `--token-form-radio-size` | `--hds-form-radio-size` | 2 |
| `--token-form-radiocard-border-radius` | `--hds-form-radiocard-border-radius` | 1 |
| `--token-form-radiocard-border-width` | `--hds-form-radiocard-border-width` | 3 |
| `--token-form-radiocard-content-padding` | `--hds-form-radiocard-content-padding` | 1 |
| `--token-form-radiocard-control-padding` | `--hds-form-radiocard-control-padding` | 1 |
| `--token-form-radiocard-group-gap` | `--hds-form-radiocard-group-gap` | 2 |
| `--token-form-radiocard-transition-duration` | `--hds-form-radiocard-transition-duration` | 1 |
| `--token-form-select-background-image-data-url` | `--hds-form-select-background-image-data-url` | 4 |
| `--token-form-select-background-image-data-url-disabled` | `--hds-form-select-background-image-data-url-disabled` | 3 |
| `--token-form-select-background-image-position-right-x` | `--hds-form-select-background-image-position-right-x` | 3 |
| `--token-form-select-background-image-position-top-y` | `--hds-form-select-background-image-position-top-y` | 2 |
| `--token-form-select-background-image-size` | `--hds-form-select-background-image-size` | 12 |
| `--token-form-text-input-background-image-data-url-date` | `--hds-form-text-input-background-image-data-url-date` | 1 |
| `--token-form-text-input-background-image-data-url-search` | `--hds-form-text-input-background-image-data-url-search` | 3 |
| `--token-form-text-input-background-image-data-url-search-cancel` | `--hds-form-text-input-background-image-data-url-search-cancel` | 5 |
| `--token-form-text-input-background-image-data-url-search-loading` | `--hds-form-text-input-background-image-data-url-search-loading` | 1 |
| `--token-form-text-input-background-image-data-url-time` | `--hds-form-text-input-background-image-data-url-time` | 1 |
| `--token-form-text-input-background-image-position-x` | `--hds-form-text-input-background-image-position-x` | 3 |
| `--token-form-text-input-background-image-size` | `--hds-form-text-input-background-image-size` | 21 |
| `--token-form-toggle-background-image-data-url` | `--hds-form-toggle-background-image-data-url` | 1 |
| `--token-form-toggle-background-image-data-url-disabled` | `--hds-form-toggle-background-image-data-url-disabled` | 1 |
| `--token-form-toggle-background-image-position-x` | `--hds-form-toggle-background-image-position-x` | 1 |
| `--token-form-toggle-background-image-size` | `--hds-form-toggle-background-image-size` | 2 |
| `--token-form-toggle-base-surface-color-default` | `--hds-form-toggle-base-surface-color-default` | 1 |
| `--token-form-toggle-height` | `--hds-form-toggle-height` | 3 |
| `--token-form-toggle-thumb-size` | `--hds-form-toggle-thumb-size` | 3 |
| `--token-form-toggle-transition-duration` | `--hds-form-toggle-transition-duration` | 2 |
| `--token-form-toggle-transition-timing-function` | `--hds-form-toggle-transition-timing-function` | 2 |
| `--token-form-toggle-width` | `--hds-form-toggle-width` | 2 |
| `--token-icon-tile-border-color-logo` | `--hds-icon-tile-border-color-logo` | 1 |
| `--token-icon-tile-border-color-overlay` | `--hds-icon-tile-border-color-overlay` | 1 |
| `--token-icon-tile-surface-color-overlay` | `--hds-icon-tile-surface-color-overlay` | 1 |
| `--token-pagination-child-spacing-horizontal` | `--hds-pagination-child-spacing-horizontal` | 4 |
| `--token-pagination-child-spacing-vertical` | `--hds-pagination-child-spacing-vertical` | 2 |
| `--token-pagination-nav-control-height` | `--hds-pagination-nav-control-height` | 2 |
| `--token-pagination-nav-control-icon-spacing` | `--hds-pagination-nav-control-icon-spacing` | 1 |
| `--token-pagination-nav-indicator-height` | `--hds-pagination-nav-indicator-height` | 1 |
| `--token-pagination-nav-indicator-spacing` | `--hds-pagination-nav-indicator-spacing` | 2 |
| `--token-surface-base-box-shadow` | `--hds-surface-base-box-shadow` | 1 |
| `--token-surface-high-box-shadow` | `--hds-surface-high-box-shadow` | 3 |
| `--token-surface-higher-box-shadow` | `--hds-surface-higher-box-shadow` | 2 |
| `--token-surface-mid-box-shadow` | `--hds-surface-mid-box-shadow` | 1 |
| `--token-surface-overlay-box-shadow` | `--hds-surface-overlay-box-shadow` | 1 |
| `--token-tabs-divider-height` | `--hds-tabs-divider-height` | 2 |
| `--token-tabs-indicator-height` | `--hds-tabs-indicator-height` | 3 |
| `--token-tabs-indicator-transition-duration` | `--hds-tabs-indicator-transition-duration` | 1 |
| `--token-tabs-indicator-transition-function` | `--hds-tabs-indicator-transition-timing-function` | 1 |
| `--token-tabs-tab-border-radius` | `--hds-tabs-tab-border-radius` | 1 |
| `--token-tabs-tab-gutter` | `--hds-tabs-tab-gutter` | 1 |
| `--token-tabs-tab-height-large` | `--hds-tabs-tab-height-large` | 1 |
| `--token-tabs-tab-height-medium` | `--hds-tabs-tab-height-medium` | 1 |
| `--token-tabs-tab-padding-horizontal-large` | `--hds-tabs-tab-padding-horizontal-large` | 1 |
| `--token-tabs-tab-padding-horizontal-medium` | `--hds-tabs-tab-padding-horizontal-medium` | 1 |
| `--token-tabs-tab-padding-vertical` | `--hds-tabs-tab-padding-vertical` | 1 |
| `--token-tooltip-border-radius` | `--hds-tooltip-border-radius` | 1 |
| `--token-tooltip-max-width` | `--hds-tooltip-max-width` | 3 |
| `--token-tooltip-padding-horizontal` | `--hds-tooltip-padding-horizontal` | 2 |
| `--token-tooltip-padding-vertical` | `--hds-tooltip-padding-vertical` | 1 |
| `--token-tooltip-transition-function` | `--hds-tooltip-transition-timing-function` | 1 |
| `--token-typography-body-100-font-family` | `--hds-typography-body-100-font-family` | 7 |
| `--token-typography-body-100-font-size` | `--hds-typography-body-100-font-size` | 5 |
| `--token-typography-body-100-line-height` | `--hds-typography-body-100-line-height` | 3 |
| `--token-typography-body-200-font-family` | `--hds-typography-body-200-font-family` | 8 |
| `--token-typography-body-200-font-size` | `--hds-typography-body-200-font-size` | 8 |
| `--token-typography-body-200-line-height` | `--hds-typography-body-200-line-height` | 6 |
| `--token-typography-body-300-font-family` | `--hds-typography-body-300-font-family` | 3 |
| `--token-typography-body-300-font-size` | `--hds-typography-body-300-font-size` | 3 |
| `--token-typography-body-300-line-height` | `--hds-typography-body-300-line-height` | 1 |
| `--token-typography-code-100-font-family` | `--hds-typography-code-100-font-family` | 2 |
| `--token-typography-code-200-font-family` | `--hds-typography-code-200-font-family` | 2 |
| `--token-typography-display-200-font-family` | `--hds-typography-display-200-font-family` | 1 |
| `--token-typography-display-200-font-size` | `--hds-typography-display-200-font-size` | 1 |
| `--token-typography-display-200-line-height` | `--hds-typography-display-200-line-height` | 1 |
| `--token-typography-font-stack-text` | `--hds-typography-font-stack-text` | 13 |
| `--token-typography-font-weight-medium` | `--hds-typography-font-weight-medium` | 6 |
| `--token-typography-font-weight-regular` | `--hds-typography-font-weight-regular` | 10 |
| `--token-typography-font-weight-semibold` | `--hds-typography-font-weight-semibold` | 4 |

## TODO — removed tokens with no successor

| Token | Location |
| --- | --- |
| `--token-app-header-logo-size` | packages/components/src/styles/components/app-header.scss:173 |
| `--token-app-header-logo-size` | packages/components/src/styles/components/app-header.scss:174 |
| `--token-app-side-nav-color-foreground-faint` | packages/components/src/styles/components/app-side-nav/content.scss:52 |
| `--token-app-side-nav-color-foreground-primary` | packages/components/src/styles/components/app-side-nav/content.scss:91 |
| `--token-app-side-nav-color-surface-interactive-hover` | packages/components/src/styles/components/app-side-nav/content.scss:110 |
| `--token-app-side-nav-color-foreground-strong` | packages/components/src/styles/components/app-side-nav/content.scss:116 |
| `--token-app-side-nav-color-foreground-primary` | packages/components/src/styles/components/app-side-nav/content.scss:168 |
| `--token-app-side-nav-color-foreground-primary` | packages/components/src/styles/components/app-side-nav/main.scss:73 |
| `--token-app-side-nav-color-surface-interactive-hover` | packages/components/src/styles/components/app-side-nav/toggle-button.scss:68 |
| `--token-app-side-nav-color-surface-interactive-hover` | packages/components/src/styles/components/app-side-nav/toggle-button.scss:73 |
| `--token-app-side-nav-color-surface-interactive-active` | packages/components/src/styles/components/app-side-nav/toggle-button.scss:79 |
| `--token-app-side-nav-color-surface-interactive-active` | packages/components/src/styles/components/app-side-nav/toggle-button.scss:84 |
| `--token-pagination-nav-control-padding-horizontal` | packages/components/src/styles/components/pagination.scss:94 |
| `--token-pagination-nav-control-focus-inset` | packages/components/src/styles/components/pagination.scss:101 |
| `--token-pagination-nav-control-focus-inset` | packages/components/src/styles/components/pagination.scss:102 |
| `--token-pagination-nav-control-focus-inset` | packages/components/src/styles/components/pagination.scss:103 |
| `--token-pagination-nav-control-focus-inset` | packages/components/src/styles/components/pagination.scss:104 |
| `--token-pagination-nav-control-padding-horizontal` | packages/components/src/styles/components/pagination.scss:172 |
| `--token-tabs-tab-focus-inset` | packages/components/src/styles/components/tabs.scss:71 |
| `--token-tabs-tab-focus-inset` | packages/components/src/styles/components/tabs.scss:72 |
| `--token-tabs-tab-focus-inset` | packages/components/src/styles/components/tabs.scss:73 |
| `--token-tabs-tab-focus-inset` | packages/components/src/styles/components/tabs.scss:74 |
| `--token-tooltip-focus-offset` | packages/components/src/styles/components/tooltip.scss:14 |
| `--token-tooltip-focus-offset` | packages/components/src/styles/components/tooltip.scss:15 |
| `--token-tooltip-focus-offset` | packages/components/src/styles/components/tooltip.scss:16 |
| `--token-tooltip-focus-offset` | packages/components/src/styles/components/tooltip.scss:17 |
| `--token-tooltip-color-foreground-primary` | packages/components/src/styles/components/tooltip.scss:53 |
| `--token-tooltip-color-surface-primary` | packages/components/src/styles/components/tooltip.scss:59 |
| `--token-tooltip-color-surface-primary` | packages/components/src/styles/components/tooltip.scss:90 |
| `--token-app-side-nav-color-foreground-strong` | packages/components/src/styles/mixins/_interactive-dark-theme.scss:31 |
| `--token-app-side-nav-color-foreground-strong` | packages/components/src/styles/mixins/_interactive-dark-theme.scss:50 |
| `--token-app-side-nav-color-surface-interactive-hover` | packages/components/src/styles/mixins/_interactive-dark-theme.scss:51 |
| `--token-app-side-nav-color-foreground-strong` | packages/components/src/styles/mixins/_interactive-dark-theme.scss:91 |
| `--token-app-side-nav-color-surface-interactive-active` | packages/components/src/styles/mixins/_interactive-dark-theme.scss:92 |

## Interpolated (manual review)

| Token | Location |
| --- | --- |
| `--token-badge-height-` | packages/components/src/styles/components/badge-count.scss:28 |
| `--token-badge-padding-vertical-` | packages/components/src/styles/components/badge-count.scss:30 |
| `--token-badge-count-padding-horizontal-` | packages/components/src/styles/components/badge-count.scss:32 |
| `--token-badge-typography-font-size-` | packages/components/src/styles/components/badge-count.scss:33 |
| `--token-badge-typography-line-height-` | packages/components/src/styles/components/badge-count.scss:34 |
| `--token-badge-height-` | packages/components/src/styles/components/badge-count.scss:35 |
| `--token-badge-foreground-color-` | packages/components/src/styles/components/badge-count.scss:45 |
| `--token-badge-foreground-color-` | packages/components/src/styles/components/badge-count.scss:49 |
| `--token-badge-surface-color-` | packages/components/src/styles/components/badge-count.scss:51 |
| `--token-badge-gap-` | packages/components/src/styles/components/badge.scss:39 |
| `--token-badge-height-` | packages/components/src/styles/components/badge.scss:40 |
| `--token-badge-padding-vertical-` | packages/components/src/styles/components/badge.scss:42 |
| `--token-badge-padding-horizontal-` | packages/components/src/styles/components/badge.scss:43 |
| `--token-badge-icon-size-` | packages/components/src/styles/components/badge.scss:46 |
| `--token-badge-icon-size-` | packages/components/src/styles/components/badge.scss:47 |
| `--token-badge-typography-font-size-` | packages/components/src/styles/components/badge.scss:51 |
| `--token-badge-typography-line-height-` | packages/components/src/styles/components/badge.scss:52 |
| `--token-badge-foreground-color-` | packages/components/src/styles/components/badge.scss:63 |
| `--token-badge-surface-color-` | packages/components/src/styles/components/badge.scss:68 |
| `--token-badge-foreground-color-` | packages/components/src/styles/components/badge.scss:72 |
| `--token-badge-surface-color-` | packages/components/src/styles/components/badge.scss:74 |
| `--token-color-` | packages/components/src/styles/components/icon-tile.scss:143 |
| `--token-color-` | packages/components/src/styles/components/icon-tile.scss:160 |
| `--token-color-` | packages/components/src/styles/components/icon-tile.scss:165 |
| `--token-color-` | packages/components/src/styles/components/icon-tile.scss:166 |
| `--token-focus-ring-` | packages/components/src/styles/mixins/_focus-ring.scss:17 |
| `--token-focus-ring-` | packages/components/src/styles/mixins/_focus-ring.scss:25 |
| `--token-focus-ring-` | packages/components/src/styles/mixins/_focus-ring.scss:63 |
| `--token-focus-ring-` | packages/components/src/styles/mixins/_focus-ring.scss:75 |
| `--token-focus-ring-` | packages/components/src/styles/mixins/_focus-ring.scss:117 |
| `--token-border-radius-` | website/docs/foundations/border/index.js:21 |
| `--token-elevation-` | website/docs/foundations/elevation/index.js:15 |
| `--token-surface-` | website/docs/foundations/elevation/index.js:18 |

