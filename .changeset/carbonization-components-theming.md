---
"@hashicorp/design-system-components": minor
---

Added `HdsTheming` service for theming

Added `HdsIconRegistry` service for async icons loading

Added `@ibm/plex-[mono|sans]` packages as dependencies

Added `design-system-plex-fonts.scss` to the `packages/components` styles
Included subset of IBM Plex fonts to the `dist/public` folder of the addon

Added a `hds-apply-only-if-carbon` sass mixin to apply styles only for Carbon themes

<!-- START theming/theme-context -->
`ThemeContext` - Added headless component
<!-- END -->

<!-- START components/icon -->
`Icon` - Major structural changes to how icons are loaded
- Changed the way that icons are loaded (from SVG sprite to dynamic importing and generation at runtime)
- Added support for loading Carbon icons when the user is using a Carbon theme
<!-- END -->
