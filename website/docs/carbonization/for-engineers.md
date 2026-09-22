---
title: Carbonization for engineers
navigation:
  order: 103
  label: Carbonization for engineers
---

## Lorem ipsum dolor

[Content placeholder]

### Migrating to the "carbonized" HDS

Version 7.0 of the design system, which includes the "carbonized" HDS foundations and components, represent a major upgrade for the previous versions, in particular in relation to the HDS design tokens.

Adopting this version is a gradual process that product teams work through at their own pace. At a high level it involves three steps:

- **Bumping HDS dependencies**: upgrading to HDS 7.0 or later, which introduces the new token structure and theming support
- **Migrating design tokens**: updating token references throughout the codebase to the new naming convention (e.g. `--token-*` becomes `--hds-*`).
    - The HDS team can run an automated migration against your codebase to handle the bulk of this
- **Adding a theme switcher**: implementing a theme switcher to let users switch between themes at runtime

Before starting, we recommend reaching out to the Design Systems Team to plan the migration and get guidance on the right approach for your application. See [Foundations/Theming](/foundations/theming?tab=code) for more details.