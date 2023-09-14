---
"@hashicorp/design-system-components": minor
---

`Copy::Snippet` - Fixed the way in which “width/full-width” is applied to the component + Internal update to the “truncation” implementation.
- the component is not full-width by default (the width now fits the content); use `@isFullWidth={{true}}` to have a full-width layout
- the internal class name `hds-copy-snippet__text--truncated` has been changed to `hds-copy-snippet--is-truncated` (and moved)
