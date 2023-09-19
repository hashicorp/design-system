---
"@hashicorp/design-system-components": minor
---

`Copy::Snippet` - Fixed the way in which “width/full-width” is applied to the component + Internal update to the “truncation” implementation.
- the component is not full-width anymore by default (the width now fits the content); use `@isFullWidth={{true}}` to have a full-width layout
- the internal class name `hds-copy-snippet__text--truncated` has been changed to `hds-copy-snippet--is-truncated` (and moved)

_Consumers should review the pages where this component is used to make sure its width matches the intended visual designs (in case, use the `@isFullWidth` argument to control its full-width). In case they're using the `hds-copy-snippet__text--truncated` class name, they should also update their code to adapt to the new implementation._
