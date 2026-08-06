---
"@hashicorp/design-system-tokens": major
---

Renamed design tokens to align with the approved nomenclature.

- Changed the prefix for all CSS and Sass tokens from `token` to `hds`.
- Changed the "core" color token namespace from `color-palette` to `core-color`.
- Changed the "semantic" color token namespace from `color-[semantic]` to `[semantic]-color`.
- Changed the "product" color token namespace from `color-<product>` to `product-<product>-…-color`.
- Changed the "focus-ring" box-shadow token names from `focus-ring-[variant]-box-shadow` to `focus-ring-box-shadow-[variant]`.
- Changed "component-level" tokens' names to follow more closely new nomenclature

Updated alias and group references to match the new structure. Updated build and post-processing scripts accordingly.

Added new design tokens for components, according to needs in the carbonization process, and in some cases removed existing design tokens when not needed anymore (or replaced by other tokens).

---

Renamed tokens:

| Token / Before | Token / After |
| --- | --- |
| `--token-app-header-height` | `--hds-app-header-height` |
| `--token-app-side-nav-body-list-item-border-radius` | `--hds-app-side-nav-body-list-item-border-radius` |
| `--token-app-side-nav-body-list-item-height` | `--hds-app-side-nav-body-list-item-height` |
| `--token-app-side-nav-body-list-item-padding-horizontal` | `--hds-app-side-nav-body-list-item-padding-horizontal` |
| `--token-app-side-nav-body-list-item-padding-vertical` | `--hds-app-side-nav-body-list-item-padding-vertical` |
| `--token-app-side-nav-body-list-margin-vertical` | `--hds-app-side-nav-body-list-margin-vertical` |
| `--token-app-side-nav-toggle-button-border-radius` | `--hds-app-side-nav-toggle-button-border-radius` |
| `--token-app-side-nav-wrapper-border-color` | `--hds-app-side-nav-wrapper-border-color` |
| `--token-app-side-nav-wrapper-border-width` | `--hds-app-side-nav-wrapper-border-width` |
| `--token-app-side-nav-wrapper-padding-horizontal` | `--hds-app-side-nav-wrapper-padding-horizontal` |
| `--token-app-side-nav-wrapper-padding-horizontal-minimized` | `--hds-app-side-nav-wrapper-padding-horizontal-minimized` |
| `--token-app-side-nav-wrapper-padding-vertical` | `--hds-app-side-nav-wrapper-padding-vertical` |
| `--token-app-side-nav-wrapper-padding-vertical-minimized` | `--hds-app-side-nav-wrapper-padding-vertical-minimized` |
| `--token-badge-border-radius` | `--hds-badge-border-radius` |
| `--token-badge-count-padding-horizontal-large` | `--hds-badge-count-padding-horizontal-large` |
| `--token-badge-count-padding-horizontal-medium` | `--hds-badge-count-padding-horizontal-medium` |
| `--token-badge-count-padding-horizontal-small` | `--hds-badge-count-padding-horizontal-small` |
| `--token-badge-foreground-color-critical-filled` | `--hds-badge-foreground-color-critical-filled` |
| `--token-badge-foreground-color-critical-inverted` | `--hds-badge-foreground-color-critical-inverted` |
| `--token-badge-foreground-color-critical-outlined` | `--hds-badge-foreground-color-critical-outlined` |
| `--token-badge-foreground-color-highlight-filled` | `--hds-badge-foreground-color-highlight-filled` |
| `--token-badge-foreground-color-highlight-inverted` | `--hds-badge-foreground-color-highlight-inverted` |
| `--token-badge-foreground-color-highlight-outlined` | `--hds-badge-foreground-color-highlight-outlined` |
| `--token-badge-foreground-color-neutral-dark-mode-filled` | `--hds-badge-foreground-color-neutral-dark-mode-filled` |
| `--token-badge-foreground-color-neutral-dark-mode-inverted` | `--hds-badge-foreground-color-neutral-dark-mode-inverted` |
| `--token-badge-foreground-color-neutral-dark-mode-outlined` | `--hds-badge-foreground-color-neutral-dark-mode-outlined` |
| `--token-badge-foreground-color-neutral-filled` | `--hds-badge-foreground-color-neutral-filled` |
| `--token-badge-foreground-color-neutral-inverted` | `--hds-badge-foreground-color-neutral-inverted` |
| `--token-badge-foreground-color-neutral-outlined` | `--hds-badge-foreground-color-neutral-outlined` |
| `--token-badge-foreground-color-success-filled` | `--hds-badge-foreground-color-success-filled` |
| `--token-badge-foreground-color-success-inverted` | `--hds-badge-foreground-color-success-inverted` |
| `--token-badge-foreground-color-success-outlined` | `--hds-badge-foreground-color-success-outlined` |
| `--token-badge-foreground-color-warning-filled` | `--hds-badge-foreground-color-warning-filled` |
| `--token-badge-foreground-color-warning-inverted` | `--hds-badge-foreground-color-warning-inverted` |
| `--token-badge-foreground-color-warning-outlined` | `--hds-badge-foreground-color-warning-outlined` |
| `--token-badge-gap-large` | `--hds-badge-gap-large` |
| `--token-badge-gap-medium` | `--hds-badge-gap-medium` |
| `--token-badge-gap-small` | `--hds-badge-gap-small` |
| `--token-badge-height-large` | `--hds-badge-height-large` |
| `--token-badge-height-medium` | `--hds-badge-height-medium` |
| `--token-badge-height-small` | `--hds-badge-height-small` |
| `--token-badge-icon-size-large` | `--hds-badge-icon-size-large` |
| `--token-badge-icon-size-medium` | `--hds-badge-icon-size-medium` |
| `--token-badge-icon-size-small` | `--hds-badge-icon-size-small` |
| `--token-badge-padding-horizontal-large` | `--hds-badge-padding-horizontal-large` |
| `--token-badge-padding-horizontal-medium` | `--hds-badge-padding-horizontal-medium` |
| `--token-badge-padding-horizontal-small` | `--hds-badge-padding-horizontal-small` |
| `--token-badge-padding-vertical-large` | `--hds-badge-padding-vertical-large` |
| `--token-badge-padding-vertical-medium` | `--hds-badge-padding-vertical-medium` |
| `--token-badge-padding-vertical-small` | `--hds-badge-padding-vertical-small` |
| `--token-badge-surface-color-critical-filled` | `--hds-badge-surface-color-critical-filled` |
| `--token-badge-surface-color-critical-inverted` | `--hds-badge-surface-color-critical-inverted` |
| `--token-badge-surface-color-highlight-filled` | `--hds-badge-surface-color-highlight-filled` |
| `--token-badge-surface-color-highlight-inverted` | `--hds-badge-surface-color-highlight-inverted` |
| `--token-badge-surface-color-neutral-dark-mode-filled` | `--hds-badge-surface-color-neutral-dark-mode-filled` |
| `--token-badge-surface-color-neutral-dark-mode-inverted` | `--hds-badge-surface-color-neutral-dark-mode-inverted` |
| `--token-badge-surface-color-neutral-dark-mode-outlined` | `--hds-badge-surface-color-neutral-dark-mode-outlined` |
| `--token-badge-surface-color-neutral-filled` | `--hds-badge-surface-color-neutral-filled` |
| `--token-badge-surface-color-neutral-inverted` | `--hds-badge-surface-color-neutral-inverted` |
| `--token-badge-surface-color-neutral-outlined` | `--hds-badge-surface-color-neutral-outlined` |
| `--token-badge-surface-color-success-filled` | `--hds-badge-surface-color-success-filled` |
| `--token-badge-surface-color-success-inverted` | `--hds-badge-surface-color-success-inverted` |
| `--token-badge-surface-color-warning-filled` | `--hds-badge-surface-color-warning-filled` |
| `--token-badge-surface-color-warning-inverted` | `--hds-badge-surface-color-warning-inverted` |
| `--token-badge-typography-font-size-large` | `--hds-badge-typography-font-size-large` |
| `--token-badge-typography-font-size-medium` | `--hds-badge-typography-font-size-medium` |
| `--token-badge-typography-font-size-small` | `--hds-badge-typography-font-size-small` |
| `--token-badge-typography-line-height-large` | `--hds-badge-typography-line-height-large` |
| `--token-badge-typography-line-height-medium` | `--hds-badge-typography-line-height-medium` |
| `--token-badge-typography-line-height-small` | `--hds-badge-typography-line-height-small` |
| `--token-border-radius-large` | `--hds-border-radius-large` |
| `--token-border-radius-medium` | `--hds-border-radius-medium` |
| `--token-border-radius-small` | `--hds-border-radius-small` |
| `--token-border-radius-x-small` | `--hds-border-radius-x-small` |
| `--token-css-color-transform-direction` | `--hds-css-color-transform-direction` |
| `--token-elevation-high-box-shadow` | `--hds-elevation-high-box-shadow` |
| `--token-elevation-higher-box-shadow` | `--hds-elevation-higher-box-shadow` |
| `--token-elevation-inset-box-shadow` | `--hds-elevation-inset-box-shadow` |
| `--token-elevation-low-box-shadow` | `--hds-elevation-low-box-shadow` |
| `--token-elevation-mid-box-shadow` | `--hds-elevation-mid-box-shadow` |
| `--token-elevation-overlay-box-shadow` | `--hds-elevation-overlay-box-shadow` |
| `--token-form-character-count-foreground-color` | `--hds-form-character-count-foreground-color` |
| `--token-form-character-count-typography-font-size` | `--hds-form-character-count-typography-font-size` |
| `--token-form-character-count-typography-line-height` | `--hds-form-character-count-typography-line-height` |
| `--token-form-checkbox-background-image-data-url` | `--hds-form-checkbox-background-image-data-url` |
| `--token-form-checkbox-background-image-data-url-disabled` | `--hds-form-checkbox-background-image-data-url-disabled` |
| `--token-form-checkbox-background-image-data-url-indeterminate` | `--hds-form-checkbox-background-image-data-url-indeterminate` |
| `--token-form-checkbox-background-image-data-url-indeterminate-disabled` | `--hds-form-checkbox-background-image-data-url-indeterminate-disabled` |
| `--token-form-checkbox-background-image-size` | `--hds-form-checkbox-background-image-size` |
| `--token-form-checkbox-border-radius` | `--hds-form-checkbox-border-radius` |
| `--token-form-checkbox-border-width` | `--hds-form-checkbox-border-width` |
| `--token-form-checkbox-size` | `--hds-form-checkbox-size` |
| `--token-form-control-base-border-color-default` | `--hds-form-control-base-border-color-default` |
| `--token-form-control-base-border-color-hover` | `--hds-form-control-base-border-color-hover` |
| `--token-form-control-base-surface-color-default` | `--hds-form-control-base-surface-color-default` |
| `--token-form-control-base-surface-color-hover` | `--hds-form-control-base-surface-color-hover` |
| `--token-form-control-border-radius` | `--hds-form-control-border-radius` |
| `--token-form-control-border-width` | `--hds-form-control-border-width` |
| `--token-form-control-checked-border-color-default` | `--hds-form-control-checked-border-color-default` |
| `--token-form-control-checked-border-color-hover` | `--hds-form-control-checked-border-color-hover` |
| `--token-form-control-checked-foreground-color` | `--hds-form-control-checked-foreground-color` |
| `--token-form-control-checked-surface-color-default` | `--hds-form-control-checked-surface-color-default` |
| `--token-form-control-checked-surface-color-hover` | `--hds-form-control-checked-surface-color-hover` |
| `--token-form-control-disabled-border-color` | `--hds-form-control-disabled-border-color` |
| `--token-form-control-disabled-foreground-color` | `--hds-form-control-disabled-foreground-color` |
| `--token-form-control-disabled-surface-color` | `--hds-form-control-disabled-surface-color` |
| `--token-form-control-invalid-border-color-default` | `--hds-form-control-invalid-border-color-default` |
| `--token-form-control-invalid-border-color-hover` | `--hds-form-control-invalid-border-color-hover` |
| `--token-form-control-padding` | `--hds-form-control-padding` |
| `--token-form-control-readonly-border-color` | `--hds-form-control-readonly-border-color` |
| `--token-form-control-readonly-foreground-color` | `--hds-form-control-readonly-foreground-color` |
| `--token-form-control-readonly-surface-color` | `--hds-form-control-readonly-surface-color` |
| `--token-form-error-color` | `--hds-form-error-color` |
| `--token-form-error-foreground-color` | `--hds-form-error-foreground-color` |
| `--token-form-error-icon-size` | `--hds-form-error-icon-size` |
| `--token-form-error-typography-font-size` | `--hds-form-error-typography-font-size` |
| `--token-form-error-typography-line-height` | `--hds-form-error-typography-line-height` |
| `--token-form-helper-text-color` | `--hds-form-helper-text-color` |
| `--token-form-helper-text-foreground-color` | `--hds-form-helper-text-foreground-color` |
| `--token-form-helper-text-typography-font-size` | `--hds-form-helper-text-typography-font-size` |
| `--token-form-helper-text-typography-line-height` | `--hds-form-helper-text-typography-line-height` |
| `--token-form-indicator-optional-color` | `--hds-form-indicator-optional-color` |
| `--token-form-indicator-optional-foreground-color` | `--hds-form-indicator-optional-foreground-color` |
| `--token-form-indicator-optional-typography-font-size` | `--hds-form-indicator-optional-typography-font-size` |
| `--token-form-indicator-optional-typography-line-height` | `--hds-form-indicator-optional-typography-line-height` |
| `--token-form-label-color` | `--hds-form-label-color` |
| `--token-form-label-foreground-color` | `--hds-form-label-foreground-color` |
| `--token-form-label-typography-font-size` | `--hds-form-label-typography-font-size` |
| `--token-form-label-typography-font-weight` | `--hds-form-label-typography-font-weight` |
| `--token-form-label-typography-line-height` | `--hds-form-label-typography-line-height` |
| `--token-form-legend-color` | `--hds-form-legend-color` |
| `--token-form-legend-foreground-color` | `--hds-form-legend-foreground-color` |
| `--token-form-legend-typography-font-size` | `--hds-form-legend-typography-font-size` |
| `--token-form-legend-typography-font-weight` | `--hds-form-legend-typography-font-weight` |
| `--token-form-legend-typography-line-height` | `--hds-form-legend-typography-line-height` |
| `--token-form-radio-background-image-data-url` | `--hds-form-radio-background-image-data-url` |
| `--token-form-radio-background-image-data-url-disabled` | `--hds-form-radio-background-image-data-url-disabled` |
| `--token-form-radio-background-image-size` | `--hds-form-radio-background-image-size` |
| `--token-form-radio-border-width` | `--hds-form-radio-border-width` |
| `--token-form-radio-size` | `--hds-form-radio-size` |
| `--token-form-radiocard-border-radius` | `--hds-form-radiocard-border-radius` |
| `--token-form-radiocard-border-width` | `--hds-form-radiocard-border-width` |
| `--token-form-radiocard-content-padding` | `--hds-form-radiocard-content-padding` |
| `--token-form-radiocard-control-padding` | `--hds-form-radiocard-control-padding` |
| `--token-form-radiocard-group-gap` | `--hds-form-radiocard-group-gap` |
| `--token-form-radiocard-transition-duration` | `--hds-form-radiocard-transition-duration` |
| `--token-form-select-background-image-data-url` | `--hds-form-select-background-image-data-url` |
| `--token-form-select-background-image-data-url-disabled` | `--hds-form-select-background-image-data-url-disabled` |
| `--token-form-select-background-image-position-right-x` | `--hds-form-select-background-image-position-right-x` |
| `--token-form-select-background-image-position-top-y` | `--hds-form-select-background-image-position-top-y` |
| `--token-form-select-background-image-size` | `--hds-form-select-background-image-size` |
| `--token-form-text-input-background-image-data-url-date` | `--hds-form-text-input-background-image-data-url-date` |
| `--token-form-text-input-background-image-data-url-search` | `--hds-form-text-input-background-image-data-url-search` |
| `--token-form-text-input-background-image-data-url-search-cancel` | `--hds-form-text-input-background-image-data-url-search-cancel` |
| `--token-form-text-input-background-image-data-url-search-loading` | `--hds-form-text-input-background-image-data-url-search-loading` |
| `--token-form-text-input-background-image-data-url-time` | `--hds-form-text-input-background-image-data-url-time` |
| `--token-form-text-input-background-image-position-x` | `--hds-form-text-input-background-image-position-x` |
| `--token-form-text-input-background-image-size` | `--hds-form-text-input-background-image-size` |
| `--token-form-toggle-background-image-data-url` | `--hds-form-toggle-background-image-data-url` |
| `--token-form-toggle-background-image-data-url-disabled` | `--hds-form-toggle-background-image-data-url-disabled` |
| `--token-form-toggle-background-image-position-x` | `--hds-form-toggle-background-image-position-x` |
| `--token-form-toggle-background-image-size` | `--hds-form-toggle-background-image-size` |
| `--token-form-toggle-base-surface-color-default` | `--hds-form-toggle-base-surface-color-default` |
| `--token-form-toggle-border-radius` | `--hds-form-toggle-border-radius` |
| `--token-form-toggle-border-width` | `--hds-form-toggle-border-width` |
| `--token-form-toggle-height` | `--hds-form-toggle-height` |
| `--token-form-toggle-thumb-size` | `--hds-form-toggle-thumb-size` |
| `--token-form-toggle-transition-duration` | `--hds-form-toggle-transition-duration` |
| `--token-form-toggle-transition-timing-function` | `--hds-form-toggle-transition-timing-function` |
| `--token-form-toggle-width` | `--hds-form-toggle-width` |
| `--token-icon-tile-border-color-logo` | `--hds-icon-tile-border-color-logo` |
| `--token-icon-tile-border-color-overlay` | `--hds-icon-tile-border-color-overlay` |
| `--token-icon-tile-surface-color-overlay` | `--hds-icon-tile-surface-color-overlay` |
| `--token-pagination-child-spacing-horizontal` | `--hds-pagination-child-spacing-horizontal` |
| `--token-pagination-child-spacing-vertical` | `--hds-pagination-child-spacing-vertical` |
| `--token-pagination-nav-control-height` | `--hds-pagination-nav-control-height` |
| `--token-pagination-nav-control-icon-spacing` | `--hds-pagination-nav-control-icon-spacing` |
| `--token-pagination-nav-indicator-height` | `--hds-pagination-nav-indicator-height` |
| `--token-pagination-nav-indicator-spacing` | `--hds-pagination-nav-indicator-spacing` |
| `--token-surface-base-box-shadow` | `--hds-surface-base-box-shadow` |
| `--token-surface-high-box-shadow` | `--hds-surface-high-box-shadow` |
| `--token-surface-higher-box-shadow` | `--hds-surface-higher-box-shadow` |
| `--token-surface-inset-box-shadow` | `--hds-surface-inset-box-shadow` |
| `--token-surface-low-box-shadow` | `--hds-surface-low-box-shadow` |
| `--token-surface-mid-box-shadow` | `--hds-surface-mid-box-shadow` |
| `--token-surface-overlay-box-shadow` | `--hds-surface-overlay-box-shadow` |
| `--token-tabs-divider-height` | `--hds-tabs-divider-height` |
| `--token-tabs-indicator-height` | `--hds-tabs-indicator-height` |
| `--token-tabs-indicator-transition-duration` | `--hds-tabs-indicator-transition-duration` |
| `--token-tabs-tab-border-radius` | `--hds-tabs-tab-border-radius` |
| `--token-tabs-tab-gutter` | `--hds-tabs-tab-gutter` |
| `--token-tabs-tab-height-large` | `--hds-tabs-tab-height-large` |
| `--token-tabs-tab-height-medium` | `--hds-tabs-tab-height-medium` |
| `--token-tabs-tab-padding-horizontal-large` | `--hds-tabs-tab-padding-horizontal-large` |
| `--token-tabs-tab-padding-horizontal-medium` | `--hds-tabs-tab-padding-horizontal-medium` |
| `--token-tabs-tab-padding-vertical` | `--hds-tabs-tab-padding-vertical` |
| `--token-tooltip-border-radius` | `--hds-tooltip-border-radius` |
| `--token-tooltip-max-width` | `--hds-tooltip-max-width` |
| `--token-tooltip-padding-horizontal` | `--hds-tooltip-padding-horizontal` |
| `--token-tooltip-padding-vertical` | `--hds-tooltip-padding-vertical` |
| `--token-typography-body-100-font-family` | `--hds-typography-body-100-font-family` |
| `--token-typography-body-100-font-size` | `--hds-typography-body-100-font-size` |
| `--token-typography-body-100-line-height` | `--hds-typography-body-100-line-height` |
| `--token-typography-body-200-font-family` | `--hds-typography-body-200-font-family` |
| `--token-typography-body-200-font-size` | `--hds-typography-body-200-font-size` |
| `--token-typography-body-200-line-height` | `--hds-typography-body-200-line-height` |
| `--token-typography-body-300-font-family` | `--hds-typography-body-300-font-family` |
| `--token-typography-body-300-font-size` | `--hds-typography-body-300-font-size` |
| `--token-typography-body-300-line-height` | `--hds-typography-body-300-line-height` |
| `--token-typography-code-100-font-family` | `--hds-typography-code-100-font-family` |
| `--token-typography-code-100-font-size` | `--hds-typography-code-100-font-size` |
| `--token-typography-code-100-line-height` | `--hds-typography-code-100-line-height` |
| `--token-typography-code-200-font-family` | `--hds-typography-code-200-font-family` |
| `--token-typography-code-200-font-size` | `--hds-typography-code-200-font-size` |
| `--token-typography-code-200-line-height` | `--hds-typography-code-200-line-height` |
| `--token-typography-code-300-font-family` | `--hds-typography-code-300-font-family` |
| `--token-typography-code-300-font-size` | `--hds-typography-code-300-font-size` |
| `--token-typography-code-300-line-height` | `--hds-typography-code-300-line-height` |
| `--token-typography-display-100-font-family` | `--hds-typography-display-100-font-family` |
| `--token-typography-display-100-font-size` | `--hds-typography-display-100-font-size` |
| `--token-typography-display-100-line-height` | `--hds-typography-display-100-line-height` |
| `--token-typography-display-200-font-family` | `--hds-typography-display-200-font-family` |
| `--token-typography-display-200-font-size` | `--hds-typography-display-200-font-size` |
| `--token-typography-display-200-letter-spacing` | `--hds-typography-display-200-letter-spacing` |
| `--token-typography-display-200-line-height` | `--hds-typography-display-200-line-height` |
| `--token-typography-display-300-font-family` | `--hds-typography-display-300-font-family` |
| `--token-typography-display-300-font-size` | `--hds-typography-display-300-font-size` |
| `--token-typography-display-300-letter-spacing` | `--hds-typography-display-300-letter-spacing` |
| `--token-typography-display-300-line-height` | `--hds-typography-display-300-line-height` |
| `--token-typography-display-400-font-family` | `--hds-typography-display-400-font-family` |
| `--token-typography-display-400-font-size` | `--hds-typography-display-400-font-size` |
| `--token-typography-display-400-line-height` | `--hds-typography-display-400-line-height` |
| `--token-typography-display-500-font-family` | `--hds-typography-display-500-font-family` |
| `--token-typography-display-500-font-size` | `--hds-typography-display-500-font-size` |
| `--token-typography-display-500-line-height` | `--hds-typography-display-500-line-height` |
| `--token-typography-font-stack-code` | `--hds-typography-font-stack-code` |
| `--token-typography-font-stack-display` | `--hds-typography-font-stack-display` |
| `--token-typography-font-stack-text` | `--hds-typography-font-stack-text` |
| `--token-typography-font-weight-bold` | `--hds-typography-font-weight-bold` |
| `--token-typography-font-weight-medium` | `--hds-typography-font-weight-medium` |
| `--token-typography-font-weight-regular` | `--hds-typography-font-weight-regular` |
| `--token-typography-font-weight-semibold` | `--hds-typography-font-weight-semibold` |
| `--token-color-palette-alpha-100` | `--hds-core-color-alpha-100` |
| `--token-color-palette-alpha-200` | `--hds-core-color-alpha-200` |
| `--token-color-palette-alpha-300` | `--hds-core-color-alpha-300` |
| `--token-color-palette-amber-100` | `--hds-core-color-amber-100` |
| `--token-color-palette-amber-200` | `--hds-core-color-amber-200` |
| `--token-color-palette-amber-300` | `--hds-core-color-amber-300` |
| `--token-color-palette-amber-400` | `--hds-core-color-amber-400` |
| `--token-color-palette-amber-50` | `--hds-core-color-amber-50` |
| `--token-color-palette-amber-500` | `--hds-core-color-amber-500` |
| `--token-color-palette-blue-100` | `--hds-core-color-blue-100` |
| `--token-color-palette-blue-200` | `--hds-core-color-blue-200` |
| `--token-color-palette-blue-300` | `--hds-core-color-blue-300` |
| `--token-color-palette-blue-400` | `--hds-core-color-blue-400` |
| `--token-color-palette-blue-50` | `--hds-core-color-blue-50` |
| `--token-color-palette-blue-500` | `--hds-core-color-blue-500` |
| `--token-color-palette-green-100` | `--hds-core-color-green-100` |
| `--token-color-palette-green-200` | `--hds-core-color-green-200` |
| `--token-color-palette-green-300` | `--hds-core-color-green-300` |
| `--token-color-palette-green-400` | `--hds-core-color-green-400` |
| `--token-color-palette-green-50` | `--hds-core-color-green-50` |
| `--token-color-palette-green-500` | `--hds-core-color-green-500` |
| `--token-color-palette-neutral-0` | `--hds-core-color-neutral-0` |
| `--token-color-palette-neutral-100` | `--hds-core-color-neutral-100` |
| `--token-color-palette-neutral-200` | `--hds-core-color-neutral-200` |
| `--token-color-palette-neutral-300` | `--hds-core-color-neutral-300` |
| `--token-color-palette-neutral-400` | `--hds-core-color-neutral-400` |
| `--token-color-palette-neutral-50` | `--hds-core-color-neutral-50` |
| `--token-color-palette-neutral-500` | `--hds-core-color-neutral-500` |
| `--token-color-palette-neutral-600` | `--hds-core-color-neutral-600` |
| `--token-color-palette-neutral-700` | `--hds-core-color-neutral-700` |
| `--token-color-palette-purple-100` | `--hds-core-color-purple-100` |
| `--token-color-palette-purple-200` | `--hds-core-color-purple-200` |
| `--token-color-palette-purple-300` | `--hds-core-color-purple-300` |
| `--token-color-palette-purple-400` | `--hds-core-color-purple-400` |
| `--token-color-palette-purple-50` | `--hds-core-color-purple-50` |
| `--token-color-palette-purple-500` | `--hds-core-color-purple-500` |
| `--token-color-palette-red-100` | `--hds-core-color-red-100` |
| `--token-color-palette-red-200` | `--hds-core-color-red-200` |
| `--token-color-palette-red-300` | `--hds-core-color-red-300` |
| `--token-color-palette-red-400` | `--hds-core-color-red-400` |
| `--token-color-palette-red-50` | `--hds-core-color-red-50` |
| `--token-color-palette-red-500` | `--hds-core-color-red-500` |
| `--token-color-boundary-border` | `--hds-product-boundary-border-color` |
| `--token-color-boundary-brand` | `--hds-product-boundary-brand-color` |
| `--token-color-boundary-foreground` | `--hds-product-boundary-foreground-color` |
| `--token-color-boundary-gradient-faint-start` | `--hds-product-boundary-gradient-color-faint-start` |
| `--token-color-boundary-gradient-faint-stop` | `--hds-product-boundary-gradient-color-faint-stop` |
| `--token-color-boundary-gradient-primary-start` | `--hds-product-boundary-gradient-color-primary-start` |
| `--token-color-boundary-gradient-primary-stop` | `--hds-product-boundary-gradient-color-primary-stop` |
| `--token-color-boundary-surface` | `--hds-product-boundary-surface-color` |
| `--token-color-consul-border` | `--hds-product-consul-border-color` |
| `--token-color-consul-brand` | `--hds-product-consul-brand-color` |
| `--token-color-consul-foreground` | `--hds-product-consul-foreground-color` |
| `--token-color-consul-gradient-faint-start` | `--hds-product-consul-gradient-color-faint-start` |
| `--token-color-consul-gradient-faint-stop` | `--hds-product-consul-gradient-color-faint-stop` |
| `--token-color-consul-gradient-primary-start` | `--hds-product-consul-gradient-color-primary-start` |
| `--token-color-consul-gradient-primary-stop` | `--hds-product-consul-gradient-color-primary-stop` |
| `--token-color-consul-surface` | `--hds-product-consul-surface-color` |
| `--token-color-hashicorp-brand` | `--hds-product-hashicorp-brand-color` |
| `--token-color-hcp-brand` | `--hds-product-hcp-brand-color` |
| `--token-color-nomad-border` | `--hds-product-nomad-border-color` |
| `--token-color-nomad-brand` | `--hds-product-nomad-brand-color` |
| `--token-color-nomad-foreground` | `--hds-product-nomad-foreground-color` |
| `--token-color-nomad-gradient-faint-start` | `--hds-product-nomad-gradient-color-faint-start` |
| `--token-color-nomad-gradient-faint-stop` | `--hds-product-nomad-gradient-color-faint-stop` |
| `--token-color-nomad-gradient-primary-start` | `--hds-product-nomad-gradient-color-primary-start` |
| `--token-color-nomad-gradient-primary-stop` | `--hds-product-nomad-gradient-color-primary-stop` |
| `--token-color-nomad-surface` | `--hds-product-nomad-surface-color` |
| `--token-color-packer-border` | `--hds-product-packer-border-color` |
| `--token-color-packer-brand` | `--hds-product-packer-brand-color` |
| `--token-color-packer-foreground` | `--hds-product-packer-foreground-color` |
| `--token-color-packer-gradient-faint-start` | `--hds-product-packer-gradient-color-faint-start` |
| `--token-color-packer-gradient-faint-stop` | `--hds-product-packer-gradient-color-faint-stop` |
| `--token-color-packer-gradient-primary-start` | `--hds-product-packer-gradient-color-primary-start` |
| `--token-color-packer-gradient-primary-stop` | `--hds-product-packer-gradient-color-primary-stop` |
| `--token-color-packer-surface` | `--hds-product-packer-surface-color` |
| `--token-color-terraform-border` | `--hds-product-terraform-border-color` |
| `--token-color-terraform-brand` | `--hds-product-terraform-brand-color` |
| `--token-color-terraform-brand-on-dark` | `--hds-product-terraform-brand-color-on-dark` |
| `--token-color-terraform-foreground` | `--hds-product-terraform-foreground-color` |
| `--token-color-terraform-gradient-faint-start` | `--hds-product-terraform-gradient-color-faint-start` |
| `--token-color-terraform-gradient-faint-stop` | `--hds-product-terraform-gradient-color-faint-stop` |
| `--token-color-terraform-gradient-primary-start` | `--hds-product-terraform-gradient-color-primary-start` |
| `--token-color-terraform-gradient-primary-stop` | `--hds-product-terraform-gradient-color-primary-stop` |
| `--token-color-terraform-surface` | `--hds-product-terraform-surface-color` |
| `--token-color-vagrant-border` | `--hds-product-vagrant-border-color` |
| `--token-color-vagrant-brand` | `--hds-product-vagrant-brand-color` |
| `--token-color-vagrant-foreground` | `--hds-product-vagrant-foreground-color` |
| `--token-color-vagrant-gradient-faint-start` | `--hds-product-vagrant-gradient-color-faint-start` |
| `--token-color-vagrant-gradient-faint-stop` | `--hds-product-vagrant-gradient-color-faint-stop` |
| `--token-color-vagrant-gradient-primary-start` | `--hds-product-vagrant-gradient-color-primary-start` |
| `--token-color-vagrant-gradient-primary-stop` | `--hds-product-vagrant-gradient-color-primary-stop` |
| `--token-color-vagrant-surface` | `--hds-product-vagrant-surface-color` |
| `--token-color-vault-border` | `--hds-product-vault-border-color` |
| `--token-color-vault-brand` | `--hds-product-vault-brand-color` |
| `--token-color-vault-brand-alt` | `--hds-product-vault-brand-color-alt` |
| `--token-color-vault-foreground` | `--hds-product-vault-foreground-color` |
| `--token-color-vault-gradient-faint-start` | `--hds-product-vault-gradient-color-faint-start` |
| `--token-color-vault-gradient-faint-stop` | `--hds-product-vault-gradient-color-faint-stop` |
| `--token-color-vault-gradient-primary-start` | `--hds-product-vault-gradient-color-primary-start` |
| `--token-color-vault-gradient-primary-stop` | `--hds-product-vault-gradient-color-primary-stop` |
| `--token-color-vault-radar-border` | `--hds-product-vault-radar-border-color` |
| `--token-color-vault-radar-brand` | `--hds-product-vault-radar-brand-color` |
| `--token-color-vault-radar-brand-alt` | `--hds-product-vault-radar-brand-color-alt` |
| `--token-color-vault-radar-foreground` | `--hds-product-vault-radar-foreground-color` |
| `--token-color-vault-radar-gradient-faint-start` | `--hds-product-vault-radar-gradient-color-faint-start` |
| `--token-color-vault-radar-gradient-faint-stop` | `--hds-product-vault-radar-gradient-color-faint-stop` |
| `--token-color-vault-radar-gradient-primary-start` | `--hds-product-vault-radar-gradient-color-primary-start` |
| `--token-color-vault-radar-gradient-primary-stop` | `--hds-product-vault-radar-gradient-color-primary-stop` |
| `--token-color-vault-radar-surface` | `--hds-product-vault-radar-surface-color` |
| `--token-color-vault-secrets-border` | `--hds-product-vault-secrets-border-color` |
| `--token-color-vault-secrets-brand` | `--hds-product-vault-secrets-brand-color` |
| `--token-color-vault-secrets-brand-alt` | `--hds-product-vault-secrets-brand-color-alt` |
| `--token-color-vault-secrets-foreground` | `--hds-product-vault-secrets-foreground-color` |
| `--token-color-vault-secrets-gradient-faint-start` | `--hds-product-vault-secrets-gradient-color-faint-start` |
| `--token-color-vault-secrets-gradient-faint-stop` | `--hds-product-vault-secrets-gradient-color-faint-stop` |
| `--token-color-vault-secrets-gradient-primary-start` | `--hds-product-vault-secrets-gradient-color-primary-start` |
| `--token-color-vault-secrets-gradient-primary-stop` | `--hds-product-vault-secrets-gradient-color-primary-stop` |
| `--token-color-vault-secrets-surface` | `--hds-product-vault-secrets-surface-color` |
| `--token-color-vault-surface` | `--hds-product-vault-surface-color` |
| `--token-color-waypoint-border` | `--hds-product-waypoint-border-color` |
| `--token-color-waypoint-brand` | `--hds-product-waypoint-brand-color` |
| `--token-color-waypoint-foreground` | `--hds-product-waypoint-foreground-color` |
| `--token-color-waypoint-gradient-faint-start` | `--hds-product-waypoint-gradient-color-faint-start` |
| `--token-color-waypoint-gradient-faint-stop` | `--hds-product-waypoint-gradient-color-faint-stop` |
| `--token-color-waypoint-gradient-primary-start` | `--hds-product-waypoint-gradient-color-primary-start` |
| `--token-color-waypoint-gradient-primary-stop` | `--hds-product-waypoint-gradient-color-primary-stop` |
| `--token-color-waypoint-surface` | `--hds-product-waypoint-surface-color` |
| `--token-color-border-action` | `--hds-border-color-action` |
| `--token-color-border-critical` | `--hds-border-color-critical` |
| `--token-color-border-faint` | `--hds-border-color-faint` |
| `--token-color-border-highlight` | `--hds-border-color-highlight` |
| `--token-color-border-primary` | `--hds-border-color-primary` |
| `--token-color-border-strong` | `--hds-border-color-strong` |
| `--token-color-border-success` | `--hds-border-color-success` |
| `--token-color-border-warning` | `--hds-border-color-warning` |
| `--token-color-focus-action-external` | `--hds-focus-color-action-external` |
| `--token-color-focus-action-internal` | `--hds-focus-color-action-internal` |
| `--token-color-focus-critical-external` | `--hds-focus-color-critical-external` |
| `--token-color-focus-critical-internal` | `--hds-focus-color-critical-internal` |
| `--token-color-foreground-action` | `--hds-foreground-color-action` |
| `--token-color-foreground-action-active` | `--hds-foreground-color-action-active` |
| `--token-color-foreground-action-hover` | `--hds-foreground-color-action-hover` |
| `--token-color-foreground-critical` | `--hds-foreground-color-critical` |
| `--token-color-foreground-critical-high-contrast` | `--hds-foreground-color-critical-high-contrast` |
| `--token-color-foreground-critical-on-surface` | `--hds-foreground-color-critical-on-surface` |
| `--token-color-foreground-disabled` | `--hds-foreground-color-disabled` |
| `--token-color-foreground-faint` | `--hds-foreground-color-faint` |
| `--token-color-foreground-high-contrast` | `--hds-foreground-color-high-contrast` |
| `--token-color-foreground-highlight` | `--hds-foreground-color-highlight` |
| `--token-color-foreground-highlight-high-contrast` | `--hds-foreground-color-highlight-high-contrast` |
| `--token-color-foreground-highlight-on-surface` | `--hds-foreground-color-highlight-on-surface` |
| `--token-color-foreground-primary` | `--hds-foreground-color-primary` |
| `--token-color-foreground-strong` | `--hds-foreground-color-strong` |
| `--token-color-foreground-success` | `--hds-foreground-color-success` |
| `--token-color-foreground-success-high-contrast` | `--hds-foreground-color-success-high-contrast` |
| `--token-color-foreground-success-on-surface` | `--hds-foreground-color-success-on-surface` |
| `--token-color-foreground-warning` | `--hds-foreground-color-warning` |
| `--token-color-foreground-warning-high-contrast` | `--hds-foreground-color-warning-high-contrast` |
| `--token-color-foreground-warning-on-surface` | `--hds-foreground-color-warning-on-surface` |
| `--token-color-page-faint` | `--hds-page-color-faint` |
| `--token-color-page-primary` | `--hds-page-color-primary` |
| `--token-color-surface-action` | `--hds-surface-color-action` |
| `--token-color-surface-critical` | `--hds-surface-color-critical` |
| `--token-color-surface-faint` | `--hds-surface-color-faint` |
| `--token-color-surface-highlight` | `--hds-surface-color-highlight` |
| `--token-color-surface-interactive` | `--hds-surface-color-interactive` |
| `--token-color-surface-interactive-active` | `--hds-surface-color-interactive-active` |
| `--token-color-surface-interactive-disabled` | `--hds-surface-color-interactive-disabled` |
| `--token-color-surface-interactive-hover` | `--hds-surface-color-interactive-hover` |
| `--token-color-surface-primary` | `--hds-surface-color-primary` |
| `--token-color-surface-strong` | `--hds-surface-color-strong` |
| `--token-color-surface-success` | `--hds-surface-color-success` |
| `--token-color-surface-warning` | `--hds-surface-color-warning` |
| `--token-focus-ring-action-box-shadow` | `--hds-focus-ring-box-shadow-action` |
| `--token-focus-ring-critical-box-shadow` | `--hds-focus-ring-box-shadow-critical` |
| `--token-tabs-indicator-transition-function` | `--hds-tabs-indicator-transition-timing-function` |
| `--token-tooltip-transition-function` | `--hds-tooltip-transition-timing-function` |
| `--token-app-header-home-link-size` | `--hds-app-header-home-link-logo-size` |
| `--token-app-side-nav-body-list-item-content-spacing-horizontal` | `--hds-app-side-nav-body-list-item-padding-horizontal` |
| `--token-app-side-nav-body-list-item-spacing-vertical` | `--hds-app-side-nav-body-list-margin-vertical` |
| `--token-app-side-nav-color-surface-primary` | `--hds-app-side-nav-wrapper-surface-color` |
| `--token-form-control-base-foreground-placeholder-color` | `--hds-form-control-base-placeholder-foreground-color` |
| `--token-form-control-base-foreground-value-color` | `--hds-form-control-base-foreground-color` |

---

Added tokens:

| Token |
| --- |
| `--hds-accordion-card-gap-large` |
| `--hds-accordion-card-gap-medium` |
| `--hds-accordion-card-gap-small` |
| `--hds-accordion-item-border-color` |
| `--hds-accordion-item-content-padding-bottom-large` |
| `--hds-accordion-item-content-padding-bottom-medium` |
| `--hds-accordion-item-content-padding-bottom-small` |
| `--hds-accordion-item-content-padding-left-large` |
| `--hds-accordion-item-content-padding-left-medium` |
| `--hds-accordion-item-content-padding-left-small` |
| `--hds-accordion-item-content-padding-right-large` |
| `--hds-accordion-item-content-padding-right-medium` |
| `--hds-accordion-item-content-padding-right-small` |
| `--hds-accordion-item-content-padding-top-large` |
| `--hds-accordion-item-content-padding-top-medium` |
| `--hds-accordion-item-content-padding-top-small` |
| `--hds-accordion-item-toggle-gap-large` |
| `--hds-accordion-item-toggle-gap-medium` |
| `--hds-accordion-item-toggle-gap-small` |
| `--hds-accordion-item-toggle-icon-size-large` |
| `--hds-accordion-item-toggle-icon-size-medium` |
| `--hds-accordion-item-toggle-icon-size-small` |
| `--hds-accordion-item-toggle-icon-transform-rotate` |
| `--hds-accordion-item-toggle-icon-transition-duration` |
| `--hds-accordion-item-toggle-icon-transition-timing-function` |
| `--hds-accordion-item-toggle-padding-bottom-large` |
| `--hds-accordion-item-toggle-padding-bottom-medium` |
| `--hds-accordion-item-toggle-padding-bottom-small` |
| `--hds-accordion-item-toggle-padding-left-large` |
| `--hds-accordion-item-toggle-padding-left-medium` |
| `--hds-accordion-item-toggle-padding-left-small` |
| `--hds-accordion-item-toggle-padding-right-large` |
| `--hds-accordion-item-toggle-padding-right-medium` |
| `--hds-accordion-item-toggle-padding-right-small` |
| `--hds-accordion-item-toggle-padding-top-large` |
| `--hds-accordion-item-toggle-padding-top-medium` |
| `--hds-accordion-item-toggle-padding-top-small` |
| `--hds-alert-actions-margin-top` |
| `--hds-alert-border-color-critical` |
| `--hds-alert-border-color-highlight` |
| `--hds-alert-border-color-neutral` |
| `--hds-alert-border-color-success` |
| `--hds-alert-border-color-warning` |
| `--hds-alert-content-gap` |
| `--hds-alert-dismiss-margin-left` |
| `--hds-alert-icon-color-critical` |
| `--hds-alert-icon-color-highlight` |
| `--hds-alert-icon-color-neutral` |
| `--hds-alert-icon-color-success` |
| `--hds-alert-icon-color-warning` |
| `--hds-alert-icon-margin-right` |
| `--hds-alert-inline-border-left-color-critical` |
| `--hds-alert-inline-border-left-color-highlight` |
| `--hds-alert-inline-border-left-color-neutral` |
| `--hds-alert-inline-border-left-color-success` |
| `--hds-alert-inline-border-left-color-warning` |
| `--hds-alert-inline-border-left-width` |
| `--hds-alert-inline-padding-horizontal` |
| `--hds-alert-inline-padding-vertical` |
| `--hds-alert-page-padding-horizontal` |
| `--hds-alert-page-padding-vertical` |
| `--hds-alert-surface-color-critical` |
| `--hds-alert-surface-color-highlight` |
| `--hds-alert-surface-color-neutral` |
| `--hds-alert-surface-color-success` |
| `--hds-alert-surface-color-warning` |
| `--hds-alert-title-foreground-color-critical` |
| `--hds-alert-title-foreground-color-highlight` |
| `--hds-alert-title-foreground-color-neutral` |
| `--hds-alert-title-foreground-color-success` |
| `--hds-alert-title-foreground-color-warning` |
| `--hds-alert-typography-line-height` |
| `--hds-app-footer-link-focus-outline-color` |
| `--hds-app-footer-link-focus-outline-width` |
| `--hds-app-header-actions-gap` |
| `--hds-app-header-border-color` |
| `--hds-app-header-button-border-color-active` |
| `--hds-app-header-button-border-color-default` |
| `--hds-app-header-button-focus-ring-color-action-external` |
| `--hds-app-header-button-focus-ring-color-action-internal` |
| `--hds-app-header-button-foreground-color-default` |
| `--hds-app-header-button-foreground-color-disabled` |
| `--hds-app-header-button-foreground-color-hover` |
| `--hds-app-header-button-surface-color-active` |
| `--hds-app-header-button-surface-color-default` |
| `--hds-app-header-button-surface-color-disabled` |
| `--hds-app-header-button-surface-color-hover` |
| `--hds-app-header-foreground-color` |
| `--hds-app-header-home-link-foreground-color` |
| `--hds-app-header-home-link-padding` |
| `--hds-app-header-padding-bottom` |
| `--hds-app-header-padding-left` |
| `--hds-app-header-padding-right` |
| `--hds-app-header-padding-top` |
| `--hds-app-header-surface-color` |
| `--hds-app-side-nav-body-list-item-content-gap` |
| `--hds-app-side-nav-body-list-item-foreground-color-default` |
| `--hds-app-side-nav-body-list-item-foreground-color-hover` |
| `--hds-app-side-nav-body-list-item-foreground-color-selected` |
| `--hds-app-side-nav-body-list-item-indicator-border-radius` |
| `--hds-app-side-nav-body-list-item-indicator-surface-color` |
| `--hds-app-side-nav-body-list-item-margin-top` |
| `--hds-app-side-nav-body-list-item-surface-color-active` |
| `--hds-app-side-nav-body-list-item-surface-color-hover` |
| `--hds-app-side-nav-body-list-item-surface-color-selected` |
| `--hds-app-side-nav-body-list-item-typography-font-weight` |
| `--hds-app-side-nav-body-list-title-foreground-color` |
| `--hds-app-side-nav-body-list-title-padding-horizontal` |
| `--hds-app-side-nav-body-list-title-padding-vertical` |
| `--hds-border-radius-rounded` |
| `--hds-breadcrumb-divider-color` |
| `--hds-breadcrumb-link-foreground-color-active` |
| `--hds-breadcrumb-link-foreground-color-default` |
| `--hds-breadcrumb-link-foreground-color-hover` |
| `--hds-breadcrumb-truncation-content-box-shadow` |
| `--hds-breadcrumb-truncation-toggle-border-color-active` |
| `--hds-breadcrumb-truncation-toggle-border-color-hover` |
| `--hds-breadcrumb-truncation-toggle-foreground-color-active` |
| `--hds-breadcrumb-truncation-toggle-foreground-color-default` |
| `--hds-breadcrumb-truncation-toggle-foreground-color-hover` |
| `--hds-breadcrumb-truncation-toggle-surface-color-active` |
| `--hds-breadcrumb-truncation-toggle-surface-color-default` |
| `--hds-breadcrumb-truncation-toggle-surface-color-hover` |
| `--hds-breadcrumb-typography-font-size` |
| `--hds-breadcrumb-typography-line-height` |
| `--hds-button-border-color-critical-active` |
| `--hds-button-border-color-critical-default` |
| `--hds-button-border-color-critical-hover` |
| `--hds-button-border-color-disabled` |
| `--hds-button-border-color-primary-active` |
| `--hds-button-border-color-primary-default` |
| `--hds-button-border-color-primary-hover` |
| `--hds-button-border-color-secondary-active` |
| `--hds-button-border-color-secondary-default` |
| `--hds-button-border-color-secondary-hover` |
| `--hds-button-border-color-secondary-muted-active` |
| `--hds-button-border-color-secondary-muted-default` |
| `--hds-button-border-color-secondary-muted-hover` |
| `--hds-button-border-color-tertiary-active` |
| `--hds-button-border-color-tertiary-default` |
| `--hds-button-border-color-tertiary-disabled` |
| `--hds-button-border-color-tertiary-hover` |
| `--hds-button-border-radius` |
| `--hds-button-border-width` |
| `--hds-button-foreground-color-critical-active` |
| `--hds-button-foreground-color-critical-default` |
| `--hds-button-foreground-color-critical-focus` |
| `--hds-button-foreground-color-critical-hover` |
| `--hds-button-foreground-color-disabled` |
| `--hds-button-foreground-color-primary-active` |
| `--hds-button-foreground-color-primary-default` |
| `--hds-button-foreground-color-primary-focus` |
| `--hds-button-foreground-color-primary-hover` |
| `--hds-button-foreground-color-secondary-active` |
| `--hds-button-foreground-color-secondary-default` |
| `--hds-button-foreground-color-secondary-focus` |
| `--hds-button-foreground-color-secondary-hover` |
| `--hds-button-foreground-color-secondary-muted-active` |
| `--hds-button-foreground-color-secondary-muted-default` |
| `--hds-button-foreground-color-secondary-muted-focus` |
| `--hds-button-foreground-color-secondary-muted-hover` |
| `--hds-button-foreground-color-tertiary-active` |
| `--hds-button-foreground-color-tertiary-default` |
| `--hds-button-foreground-color-tertiary-disabled` |
| `--hds-button-foreground-color-tertiary-focus` |
| `--hds-button-foreground-color-tertiary-hover` |
| `--hds-button-gap` |
| `--hds-button-height-large` |
| `--hds-button-height-medium` |
| `--hds-button-height-small` |
| `--hds-button-icon-size-large` |
| `--hds-button-icon-size-medium` |
| `--hds-button-icon-size-small` |
| `--hds-button-padding-horizontal-large` |
| `--hds-button-padding-horizontal-medium` |
| `--hds-button-padding-horizontal-small` |
| `--hds-button-padding-vertical-large` |
| `--hds-button-padding-vertical-medium` |
| `--hds-button-padding-vertical-small` |
| `--hds-button-surface-color-critical-active` |
| `--hds-button-surface-color-critical-default` |
| `--hds-button-surface-color-critical-focus` |
| `--hds-button-surface-color-critical-hover` |
| `--hds-button-surface-color-disabled` |
| `--hds-button-surface-color-primary-active` |
| `--hds-button-surface-color-primary-default` |
| `--hds-button-surface-color-primary-focus` |
| `--hds-button-surface-color-primary-hover` |
| `--hds-button-surface-color-secondary-active` |
| `--hds-button-surface-color-secondary-default` |
| `--hds-button-surface-color-secondary-focus` |
| `--hds-button-surface-color-secondary-hover` |
| `--hds-button-surface-color-secondary-muted-active` |
| `--hds-button-surface-color-secondary-muted-default` |
| `--hds-button-surface-color-secondary-muted-focus` |
| `--hds-button-surface-color-secondary-muted-hover` |
| `--hds-button-surface-color-tertiary-active` |
| `--hds-button-surface-color-tertiary-default` |
| `--hds-button-surface-color-tertiary-focus` |
| `--hds-button-surface-color-tertiary-hover` |
| `--hds-button-typography-font-size-large` |
| `--hds-button-typography-font-size-medium` |
| `--hds-button-typography-font-size-small` |
| `--hds-button-typography-line-height-large` |
| `--hds-button-typography-line-height-medium` |
| `--hds-button-typography-line-height-small` |
| `--hds-card-surface-color-primary` |
| `--hds-card-surface-color-secondary` |
| `--hds-code-block-border-color-primary` |
| `--hds-code-block-border-color-strong` |
| `--hds-code-block-button-surface-color-active` |
| `--hds-code-block-button-surface-color-default` |
| `--hds-code-block-button-surface-color-hover` |
| `--hds-code-block-focus-ring-color-action-external` |
| `--hds-code-block-focus-ring-color-action-internal` |
| `--hds-code-block-foreground-color-action` |
| `--hds-code-block-foreground-color-faint` |
| `--hds-code-block-foreground-color-primary` |
| `--hds-code-block-foreground-color-selection` |
| `--hds-code-block-line-highlight-border-color` |
| `--hds-code-block-line-highlight-surface-color` |
| `--hds-code-block-surface-color-faint` |
| `--hds-code-block-surface-color-primary` |
| `--hds-code-block-surface-color-primary-with-alpha` |
| `--hds-code-block-surface-color-selection` |
| `--hds-code-block-syntax-highlight-color-blue` |
| `--hds-code-block-syntax-highlight-color-cyan` |
| `--hds-code-block-syntax-highlight-color-green` |
| `--hds-code-block-syntax-highlight-color-orange` |
| `--hds-code-block-syntax-highlight-color-purple` |
| `--hds-code-block-syntax-highlight-color-red` |
| `--hds-code-block-syntax-highlight-color-white` |
| `--hds-code-block-syntax-highlight-color-yellow` |
| `--hds-code-block-typography-font-size` |
| `--hds-copy-button-foreground-color` |
| `--hds-copy-button-icon-color-active` |
| `--hds-copy-button-icon-color-default` |
| `--hds-copy-button-icon-color-focus` |
| `--hds-copy-button-icon-color-hover` |
| `--hds-copy-button-surface-color-active` |
| `--hds-copy-button-surface-color-default` |
| `--hds-copy-button-surface-color-hover` |
| `--hds-dialog-primitive-border-color` |
| `--hds-dialog-primitive-header-tagline-typography-font-size` |
| `--hds-dialog-primitive-header-tagline-typography-line-height` |
| `--hds-dialog-primitive-header-title-typography-font-weight` |
| `--hds-dialog-primitive-padding-horizontal` |
| `--hds-dialog-primitive-padding-vertical` |
| `--hds-dismiss-button-border-color-active` |
| `--hds-dismiss-button-foreground-color-active` |
| `--hds-dismiss-button-foreground-color-default` |
| `--hds-dismiss-button-icon-size` |
| `--hds-dismiss-button-size` |
| `--hds-dismiss-button-surface-color-active` |
| `--hds-dismiss-button-surface-color-hover` |
| `--hds-dropdown-box-shadow` |
| `--hds-dropdown-list-item-foreground-color-action-active` |
| `--hds-dropdown-list-item-foreground-color-action-default` |
| `--hds-dropdown-list-item-foreground-color-action-focus` |
| `--hds-dropdown-list-item-foreground-color-action-hover` |
| `--hds-dropdown-list-item-foreground-color-critical-active` |
| `--hds-dropdown-list-item-foreground-color-critical-default` |
| `--hds-dropdown-list-item-foreground-color-critical-focus` |
| `--hds-dropdown-list-item-foreground-color-critical-hover` |
| `--hds-dropdown-list-item-surface-color-action-active` |
| `--hds-dropdown-list-item-surface-color-action-default` |
| `--hds-dropdown-list-item-surface-color-action-focus` |
| `--hds-dropdown-list-item-surface-color-action-hover` |
| `--hds-dropdown-list-item-surface-color-critical-active` |
| `--hds-dropdown-list-item-surface-color-critical-default` |
| `--hds-dropdown-list-item-surface-color-critical-focus` |
| `--hds-dropdown-list-item-surface-color-critical-hover` |
| `--hds-dropdown-separator-border-color` |
| `--hds-dropdown-toggle-button-gap` |
| `--hds-dropdown-toggle-button-padding-right-medium` |
| `--hds-dropdown-toggle-button-padding-right-small` |
| `--hds-dropdown-toggle-icon-gap` |
| `--hds-dropdown-toggle-icon-padding` |
| `--hds-focus-ring-width-external` |
| `--hds-focus-ring-width-internal` |
| `--hds-form-radiocard-border-color-default` |
| `--hds-form-radiocard-border-color-default-checked` |
| `--hds-form-radiocard-border-color-focus` |
| `--hds-link-inline-icon-margin-horizontal` |
| `--hds-link-inline-outline-color` |
| `--hds-link-inline-outline-width` |
| `--hds-link-standalone-gap` |
| `--hds-link-standalone-icon-size-large` |
| `--hds-link-standalone-icon-size-medium` |
| `--hds-link-standalone-icon-size-small` |
| `--hds-link-standalone-padding-vertical` |
| `--hds-link-standalone-typography-font-size-large` |
| `--hds-link-standalone-typography-font-size-medium` |
| `--hds-link-standalone-typography-font-size-small` |
| `--hds-link-standalone-typography-line-height-large` |
| `--hds-link-standalone-typography-line-height-medium` |
| `--hds-link-standalone-typography-line-height-small` |
| `--hds-modal-header-border-color-critical` |
| `--hds-modal-header-border-color-warning` |
| `--hds-modal-header-foreground-color-critical` |
| `--hds-modal-header-foreground-color-warning` |
| `--hds-modal-header-surface-color-critical` |
| `--hds-modal-header-surface-color-warning` |
| `--hds-modal-header-tagline-color-critical` |
| `--hds-modal-header-tagline-color-warning` |
| `--hds-pagination-bar-border-color` |
| `--hds-pagination-bar-surface-color` |
| `--hds-pagination-info-typography-font-size` |
| `--hds-pagination-nav-control-foreground-color-active` |
| `--hds-pagination-nav-control-foreground-color-default` |
| `--hds-pagination-nav-control-foreground-color-hover` |
| `--hds-pagination-nav-control-typography-font-size` |
| `--hds-pagination-nav-control-typography-font-weight-active` |
| `--hds-pagination-nav-surface-color-hover` |
| `--hds-pagination-size-selector-typography-font-size` |
| `--hds-reveal-foreground-color-active` |
| `--hds-reveal-foreground-color-default` |
| `--hds-reveal-foreground-color-hover` |
| `--hds-reveal-surface-color-active` |
| `--hds-reveal-surface-color-focus` |
| `--hds-reveal-surface-color-hover` |
| `--hds-rich-tooltip-bubble-arrow-size` |
| `--hds-rich-tooltip-bubble-border-color` |
| `--hds-rich-tooltip-bubble-border-radius` |
| `--hds-rich-tooltip-bubble-max-width` |
| `--hds-rich-tooltip-toggle-foreground-color-active` |
| `--hds-rich-tooltip-toggle-foreground-color-default` |
| `--hds-rich-tooltip-toggle-foreground-color-hover` |
| `--hds-rich-tooltip-toggle-gap-horizontal` |
| `--hds-rich-tooltip-toggle-icon-size` |
| `--hds-surface-color-high-contrast` |
| `--hds-tabs-tab-border-color-default` |
| `--hds-tabs-tab-border-color-hover` |
| `--hds-tabs-tab-foreground-color-default` |
| `--hds-tabs-tab-foreground-color-hover` |
| `--hds-tabs-tab-selected-border-color-default` |
| `--hds-tabs-tab-selected-border-color-hover` |
| `--hds-tabs-tab-selected-foreground-color-default` |
| `--hds-tabs-tab-selected-foreground-color-hover` |
| `--hds-tag-border-radius` |
| `--hds-tag-dismissible-max-width` |
| `--hds-tag-dismissible-padding-left` |
| `--hds-tag-dismissible-padding-right` |
| `--hds-tag-link-border-color-primary` |
| `--hds-tag-link-border-color-secondary` |
| `--hds-tag-link-foreground-color-primary-active` |
| `--hds-tag-link-foreground-color-primary-default` |
| `--hds-tag-link-foreground-color-primary-hover` |
| `--hds-tag-link-foreground-color-secondary-default` |
| `--hds-tag-link-icon-color-primary` |
| `--hds-tag-link-icon-color-secondary` |
| `--hds-tag-link-surface-color-primary-active` |
| `--hds-tag-link-surface-color-primary-default` |
| `--hds-tag-link-surface-color-primary-hover` |
| `--hds-tag-link-surface-color-secondary-active` |
| `--hds-tag-link-surface-color-secondary-default` |
| `--hds-tag-link-surface-color-secondary-hover` |
| `--hds-tag-max-width` |
| `--hds-tag-padding-bottom` |
| `--hds-tag-padding-left` |
| `--hds-tag-padding-right` |
| `--hds-tag-padding-top` |
| `--hds-tag-static-border-color` |
| `--hds-tag-static-foreground-color-default` |
| `--hds-tag-static-icon-color` |
| `--hds-tag-static-surface-color-active` |
| `--hds-tag-static-surface-color-default` |
| `--hds-tag-static-surface-color-hover` |
| `--hds-tag-typography-font-size` |
| `--hds-tag-typography-font-weight` |
| `--hds-tag-typography-line-height` |
| `--hds-tooltip-caret-clip-path` |
| `--hds-tooltip-caret-height` |
| `--hds-tooltip-caret-width` |
| `--hds-typography-display-100-letter-spacing` |
| `--hds-typography-display-400-letter-spacing` |
| `--hds-typography-display-500-letter-spacing` |

---

Removed tokens:

| Token |
| --- |
| `--token-app-header-logo-size` |
| `--token-app-side-nav-color-foreground-faint` |
| `--token-app-side-nav-color-foreground-primary` |
| `--token-app-side-nav-color-foreground-strong` |
| `--token-app-side-nav-color-surface-interactive-active` |
| `--token-app-side-nav-color-surface-interactive-hover` |
| `--token-app-side-nav-header-actions-spacing` |
| `--token-app-side-nav-header-home-link-logo-size` |
| `--token-app-side-nav-header-home-link-logo-size-minimized` |
| `--token-app-side-nav-header-home-link-padding` |
| `--token-pagination-nav-control-focus-inset` |
| `--token-pagination-nav-control-padding-horizontal` |
| `--token-tabs-tab-focus-inset` |
| `--token-tooltip-color-foreground-primary` |
| `--token-tooltip-color-surface-primary` |
| `--token-tooltip-focus-offset` |

---

CSS helper classes for the focus ring have been renamed to follow the same naming convention:

Renamed tokens:

| CSS Class / Before | CSS Class / After |
| --- | --- |
| `.hds-focus-ring-action-box-shadow` |	`.hds-focus-ring-box-shadow-action` |
| `.hds-focus-ring-critical-box-shadow`	| `.hds-focus-ring-box-shadow-critical` |

---
