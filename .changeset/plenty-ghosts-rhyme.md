---
"@hashicorp/design-system-components": patch
---

- Updated CSS code of components to use flex `gap`
- Fixed an issue with `Hds::Sidenav::Link` that was generating an empty node

This will lead to a minimal visual impact on some edge cases of `Alert/Toast` (multiple description items) and `SideNav` (text + generic content)
