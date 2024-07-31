---
"@hashicorp/design-system-components": minor
---

`AppFrame` - Made changes including:
- Added `isHeaderFixed` option to control whether AppHeader is fixed/sticky
- Refactored styles to make `AppFrame` responsible for sticky/fixed layout of `SideNav` and `AppHeader`

`SideNav` - Made changes icluding:
- Render overlay above the `AppHeader` blocking interactivity (overlay appears in mobile responsive view when SideNav is expanded)
- Removed need for `withAppHeader` option when used together with AppHeader
