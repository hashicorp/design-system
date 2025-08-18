## 4.22.1

Changed media query styles for frame header and sidebar containers to use level 3 vs level 4 CSS syntax


## 4.10.0

Modified sticky/fixed position to turn off when viewport height is under 480px in height.

Refactored styles to make `AppFrame` responsible for sticky/fixed layout of `SideNav`.

Added `id` with default value of "hds-main" to `AppFrame::Main` which the `SideNav` `a11yRefocusSkipTo` argument points to.
