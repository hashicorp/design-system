---
"@hashicorp/design-system-tokens": major
---

Changed the "semantic" color token namespace from `color-[semantic]` to `[semantic]-color`. Updated also build scripts and downstream token consumers.

| Before | After |
| --- | --- |
| `--hds-color-border-primary` | `--hds-border-color-primary` |
| `--hds-color-border-faint` | `--hds-border-color-faint` |
| `--hds-color-border-strong` | `--hds-border-color-strong` |
| `--hds-color-border-action` | `--hds-border-color-action` |
| `--hds-color-border-highlight` | `--hds-border-color-highlight` |
| `--hds-color-border-success` | `--hds-border-color-success` |
| `--hds-color-border-warning` | `--hds-border-color-warning` |
| `--hds-color-border-critical` | `--hds-border-color-critical` |
| `--hds-color-focus-action-internal` | `--hds-focus-color-action-internal` |
| `--hds-color-focus-action-external` | `--hds-focus-color-action-external` |
| `--hds-color-focus-critical-internal` | `--hds-focus-color-critical-internal` |
| `--hds-color-focus-critical-external` | `--hds-focus-color-critical-external` |
| `--hds-color-foreground-strong` | `--hds-foreground-color-strong` |
| `--hds-color-foreground-primary` | `--hds-foreground-color-primary` |
| `--hds-color-foreground-faint` | `--hds-foreground-color-faint` |
| `--hds-color-foreground-high-contrast` | `--hds-foreground-color-high-contrast` |
| `--hds-color-foreground-disabled` | `--hds-foreground-color-disabled` |
| `--hds-color-foreground-action` | `--hds-foreground-color-action` |
| `--hds-color-foreground-action-hover` | `--hds-foreground-color-action-hover` |
| `--hds-color-foreground-action-active` | `--hds-foreground-color-action-active` |
| `--hds-color-foreground-highlight` | `--hds-foreground-color-highlight` |
| `--hds-color-foreground-highlight-on-surface` | `--hds-foreground-color-highlight-on-surface` |
| `--hds-color-foreground-highlight-high-contrast` | `--hds-foreground-color-highlight-high-contrast` |
| `--hds-color-foreground-success` | `--hds-foreground-color-success` |
| `--hds-color-foreground-success-on-surface` | `--hds-foreground-color-success-on-surface` |
| `--hds-color-foreground-success-high-contrast` | `--hds-foreground-color-success-high-contrast` |
| `--hds-color-foreground-warning` | `--hds-foreground-color-warning` |
| `--hds-color-foreground-warning-on-surface` | `--hds-foreground-color-warning-on-surface` |
| `--hds-color-foreground-warning-high-contrast` | `--hds-foreground-color-warning-high-contrast` |
| `--hds-color-foreground-critical` | `--hds-foreground-color-critical` |
| `--hds-color-foreground-critical-on-surface` | `--hds-foreground-color-critical-on-surface` |
| `--hds-color-foreground-critical-high-contrast` | `--hds-foreground-color-critical-high-contrast` |
| `--hds-color-page-primary` | `--hds-page-color-primary` |
| `--hds-color-page-faint` | `--hds-page-color-faint` |
| `--hds-color-surface-primary` | `--hds-surface-color-primary` |
| `--hds-color-surface-faint` | `--hds-surface-color-faint` |
| `--hds-color-surface-strong` | `--hds-surface-color-strong` |
| `--hds-color-surface-high-contrast` | `--hds-surface-color-high-contrast` |
| `--hds-color-surface-interactive` | `--hds-surface-color-interactive` |
| `--hds-color-surface-interactive-hover` | `--hds-surface-color-interactive-hover` |
| `--hds-color-surface-interactive-active` | `--hds-surface-color-interactive-active` |
| `--hds-color-surface-interactive-disabled` | `--hds-surface-color-interactive-disabled` |
| `--hds-color-surface-action` | `--hds-surface-color-action` |
| `--hds-color-surface-highlight` | `--hds-surface-color-highlight` |
| `--hds-color-surface-success` | `--hds-surface-color-success` |
| `--hds-color-surface-warning` | `--hds-surface-color-warning` |
| `--hds-color-surface-critical` | `--hds-surface-color-critical` |
