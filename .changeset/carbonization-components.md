---
"@hashicorp/design-system-components": minor
---

Added `HdsTheming` service for theming
Added `HdsIconRegistry` service for async icons loading

Added `@ibm/plex-[mono|sans]` packages as dependencies

Added `design-system-plex-fonts.scss` to the `packages/components` styles
Included subset of IBM Plex fonts to the `dist/public` folder of the addon

<!-- START theming/theme-context -->
`ThemeContext` - Added headless component
<!-- END -->

<!-- START components/icon -->
`Icon`
- Changed the way that icons are loaded (from SVG sprite to dynamic importing and generation at runtime)
- Added support for loading Carbon icons when the user is using a Carbon theme
<!-- END -->
