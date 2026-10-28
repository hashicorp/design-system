---
title: Carbonization for engineers
navigation:
  order: 103
  label: Carbonization for engineers
---

## What has changed in code

The "carbonization" of the Helios Design System (HDS) introduces support for IBM Carbon's visual language via theming. These changes are available starting with [version `7.0` of the components package](/whats-new/release-notes#700) and [version `6.0` of the tokens package](/whats-new/release-notes?tab=design%20tokens#600-1).

This is essentially a visual update: HDS components are still written in Ember, and their APIs and interaction behavior remain the same. There's no need to replace HDS components with Carbon Web Components or migrate to React to adopt the new appearance.

There are, however, changes to the foundations and infrastructure that your application consumes that you should be aware of:

- **Theming:** Foundations and components respond to the [selected theme](/foundations/theming). Applications can support the "classic" HDS appearance alongside Carbon "light" and "dark" themes during migration, then use only Carbon themes once fully migrated.
- **Design tokens:** Tokens have been renamed and reorganized. Themed token bundles are [provided as CSS/Sass files](/getting-started/for-engineers#tokens) to be consumed in your application.
- **Icons:** Icons now load individually and asynchronously. [`Hds::Icon`](/components/icon?tab=carbon%20theme) automatically selects a Carbon glyph when a Carbon theme is active and an equivalent is available.

The token changes are breaking changes, which is why the packages have new major versions even though component APIs remain stable.

If you're using an earlier version, your application continues to work as before. Use the version switcher in the top left of the application header to consult the documentation for your version. The guidance below applies when you're upgrading to, or already using, the "carbonized" versions.

## Migrating to the carbonized HDS

Version 7.0 of the design system, which includes the "carbonized" HDS foundations and components, represents a major upgrade from the previous versions, in particular in relation to the HDS design tokens.

At a high level, adopting this version involves three main steps:

- **Bumping HDS dependencies**: upgrading to HDS 7.0 or later, which introduces the new token structure and theming support.
- **Migrating design tokens**: updating token references throughout the codebase to the new naming convention, including the prefix (`--token-*` becomes `--hds-*`) and changes to the structure of some token names.
- **Adding a theme selector**: implementing a [theme selection pattern](/patterns/theme-selection) to let users switch between themes at runtime.

Before starting, we recommend reaching out to the Design Systems Team to get guidance on the right approach for your application and to plan and coordinate the migration (the HDS team can run an automated migration against your codebase to handle the bulk of this). See [Foundations/Theming](/foundations/theming?tab=code) for more details.

## Developing and testing in multiple themes

After migration, two practices become part of day-to-day development: use theme-responsive tokens for custom UI elements, and test changes in every theme your application supports. A page that looks correct in a light theme isn't necessarily correct in a dark theme.

### Use theme-responsive color tokens

HDS components already consume themed tokens and respond to theme changes. When it comes to building custom UI elements or styling the content around those components, you need to use [semantic color tokens](/foundations/colors?tab=palette#semantic-tokens): they express what a color is for, rather than a specific palette value, and their values adapt to the selected theme.

[Core palette colors](/foundations/colors?tab=palette#core-palette) instead have fixed values that don't change with the theme. For this reason, core colors should be used **only** when an appropriate semantic token isn't available. Hardcoded colors have the same limitation.

If you're unsure which tokens fit a custom use case, [contact us](/about/support) rather than creating theme-specific overrides as workarounds.

### Testing in multiple themes

Once theming is enabled in your application, make sure the UI looks correct in every supported theme before releasing a new feature or updating an existing one. This includes both IBM Carbon `light` and `dark` themes, as well as the "classic" `default` HDS theme (during migration, if any end-user cohorts are still using it).

Look for fixed text and background colors, inline styles, and overrides of HDS component styles. Check foreground and background colors together: changing one without the other can introduce contrast issues. Also review illustrations, logos, charts, and third-party components that don't consume HDS tokens.

Coordinate with your designers and code reviewers to make sure they check the affected UI in both light and dark themes before release.
