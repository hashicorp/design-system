---
"@hashicorp/design-system-components": minor
---

`AppFrame`:
- Modified sticky/fixed position to turn off when viewport height is under 480px in height
- Refactored styles to make `AppFrame` responsible for sticky/fixed layout of `SideNav` and `AppHeader`

`SideNav`:
- Render overlay above the `AppHeader` blocking interactivity (overlay appears in mobile responsive view when SideNav is expanded)
- Removed need for `withAppHeader` option when used together with AppHeader
