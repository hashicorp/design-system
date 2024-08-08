---
"@hashicorp/design-system-components": minor
---

`AppFrame`:
- Modified sticky/fixed position to turn off when viewport height is under 480px in height
- Refactored styles to make `AppFrame` responsible for sticky/fixed layout of `SideNav` and `AppHeader`

`AppHeader`:
- Styled inoperable actions as disabled (which occurs when the `SideNav` is expanded in mobile view)

`SideNav`:
- Removed the `withAppHeader` option as it is no longer needed.
