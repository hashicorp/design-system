---
"@hashicorp/design-system-tokens": major
---

Changed the focus-ring box-shadow token names from `focus-ring-[variant]-box-shadow` to `focus-ring-box-shadow-[variant]`. Updated also the helper generation script and downstream token consumers.

**Token**:

| Before | After |
| --- | --- |
| `--hds-focus-ring-action-box-shadow` | `--hds-focus-ring-box-shadow-action` |
| `--hds-focus-ring-critical-box-shadow` | `--hds-focus-ring-box-shadow-critical` |

**Helper CSS Class**:

| Before | After |
| --- | --- |
| `.hds-focus-ring-action-box-shadow` | `.hds-focus-ring-box-shadow-action` |
| `.hds-focus-ring-critical-box-shadow` | `.hds-focus-ring-box-shadow-critical` |
