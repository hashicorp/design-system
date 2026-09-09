---
"@hashicorp/design-system-components": minor
---

Added `HdsTheming` service for theming
Added `HdsIconRegistry` service for async icons loading

<!-- START theming/theme-context -->
`ThemeContext` - Added headless component
<!-- END -->

<!-- START components/icon -->
`Icon` - Made significant changes to icon loading and available icons to support Carbon themes
- Changed the way that icons are loaded (from SVG sprite to dynamic importing and generation at runtime)
- Added support for loading Carbon icons when the user is using a Carbon theme
- The full SVG sprite is no longer injected into the consuming application
- Consumers can safely remove the `flightIconsSpriteLazyEmbed` setting in their `config/environment.js` file.
<!-- END -->
