## Implementing theming

HDS provides several pre-built sets of themed tokens so each application can import only the visual language or languages it needs.

Each set of themed tokens declares its design tokens under `hds-theme-*`/`hds-mode-*` CSS selectors, one for each theme/mode it supports. Then, applying a theme is as simple as adding the corresponding class name to the `<html>` element of the page. This is what a dedicated [`hdsTheming` service](#hdstheming-service) does under the hood.

It's also possible to apply local overrides of the global theme, scoping them to only a portion of the page using the [`ThemeContext`](#themecontext) component. This works by applying the same `hds-theme-*`/`hds-mode-*` classes to a DOM container, affecting how its content is themed.

### Themed tokens

The design tokens package, `@hashicorp/design-system-tokens`, provides three pre-built CSS/Sass bundles of themed tokens, each aimed at a different stage of carbonization.

| File                          | Themes supported                               | Carbon modes                                      |
| ------------------------------ | ------------------------------------- | -------------------------------------------- |
| `with-css-selectors`            | `system`, `light`, `dark`             | `cds-g0`, `cds-g100`                         |
| `with-css-selectors--migration` | `default`, `system`, `light`, `dark`  | `cds-g0`, `cds-g100`                         |
| `with-css-selectors--advanced`  | `default`, `system`, `light`, `dark`  | `cds-g0`, `cds-g10`, `cds-g90`, `cds-g100`   |

- `with-css-selectors` (the "final" file) is what most applications should use once fully carbonized: it supports the `system`/`light`/`dark` themes.
- `with-css-selectors--migration` additionally exposes the `default` theme, so the "classic" and "carbonized" visual languages can co-exist in the same application during an incremental migration.
- `with-css-selectors--advanced` exposes all [four IBM Carbon modes](https://carbondesignsystem.com/elements/themes/overview/), in case an application wants to customize the modes used for a light or dark theme.

For complex use cases, the package also provides a Sass bundle with mixins that lets you combine multiple themes or modes in a single application. If your application requires this approach, [contact the Design System Team](/about/support) for assistance and guidance on implementation.

### Theming utilities

In addition to themed tokens, we provide a service, a component, and a Sass mixin to programmatically apply theming to an application.

#### `hdsTheming` service

Under the hood, theming is controlled by an `hdsTheming` Ember service, provided by the `@hashicorp/design-system-components` package. Calling its `setTheme` method swaps the `hds-theme-*`/`hds-mode-*` class names on the `<html>` element, so the whole page reacts to the change.

For more details about this service, how to use it, and its APIs, see the [Theming service](/theming/hds-theming).

#### `ThemeContext` component

`Hds::ThemeContext` is a headless component that can be used to apply a theme or mode to the content rendered inside it, regardless of the theme applied to the rest of the page.

For more details about this component, how to use it, and its APIs, see the [`ThemeContext` component](/theming/theme-context).

#### `hds-apply-only-if-carbon` Sass mixin

Use the `hds-apply-only-if-carbon` Sass mixin **only for temporary migration overrides** when Carbon styles must override classic styles and standard design tokens or component styles are insufficient.

To apply this mixin:

1. Import the `styles/mixins/carbonization` file from the `@hashicorp/design-system-components` package.
2. Wrap the styles that should only apply when the `light`, `dark`, or `system` Carbon theme is active.

## How to adopt theming in your application

!!! Callout

If you're upgrading to version `7.0` and/or adopting theming in your application, [contact the Design System Team](/about/support) for guidance and support. The team may be able to complete some important migration steps for you.

!!!

### Not yet migrated

Applications can continue to use the "classic" token styles until they are ready to begin the migration.

Applications can still upgrade to version `7.0` or later of the design system, (for example to receive bug fixes for HDS components). However, [version `7.0`](whats-new/release-notes#700) introduced systematic design token renaming, and some refactoring is required. [Contact the Design System Team](/about/support) for guidance and help automating this refactoring.

### Migrating

If an application intends to migrate to the "carbonized" look and feel in their UI, the product team should [speak with the Design System Team](/about/support) to coordinate the initial effort.

However, for general knowledge, this is what the migration steps would look like.

#### Dependencies

In your `package.json`, update the HDS dependencies to the minimum theme-supported versions:

[[code-snippets/migration-dependencies-bump-hds]]

Add the [IBM Plex typefaces](https://carbondesignsystem.com/elements/typography/overview/#typeface:-ibm-plex) used by the Carbonized theme:

[[code-snippets/migration-dependencies-add-plex-fonts]]

#### Sass/CSS imports

You now have to update your application to use the "carbonized" files. For these examples, we will use the Sass files, but equivalent files are available in CSS as well. For details about how to configure your app to consume these CSS or Sass files from the HDS packages, see [Getting started for engineers](/getting-started/for-engineers#import-component-styles).

First of all you have to use the "migration" file that provides both the "classic" and the "carbonized" HDS tokens, with different values depending on the theme/mode:

[[code-snippets/migration-scss-tokens-migration]]

Then, import the shared styles for the HDS components (that consume these tokens):
[[code-snippets/migration-scss-components-common]]

Finally, import the `@font-face` declarations for the IBM Plex fonts:

[[code-snippets/migration-scss-plex-fonts]]

If your application serves fonts from a path other than `/assets` (e.g. `/app/assets`) configure the import using the `$hds-ibm-plex-fonts-assets-path` Sass variable:

[[code-snippets/migration-scss-plex-fonts-advanced]]

#### Design tokens migration

The HDS `7.0` release introduced a corresponding `6.0` release of the design tokens package. As part of the carbonization work, we renamed and reorganized the [design tokens](/foundations/tokens) to follow a new naming convention.

Some changes are mechanical, such as changing the `--token-*` prefix to `--hds-*`. Others change the structure of the name, for example, `--token-color-border-primary` becomes `--hds-border-color-primary`.

Token references throughout the consumer codebase therefore need to be updated to use the new names, including references in CSS/Scss files, Handlebars templates, and JavaScript/TypeScript code.

The HDS team can run an automated migration against your codebase using a validated map of the old and new token names. The process reports the files and references it changes, and identifies any removed, dynamic, or otherwise unmapped tokens for manual review. [Contact the Design System Team](/about/support) to coordinate this phase of the migration.

#### Icon loading

In HDS version `7.0`, icons are no longer delivered through a single SVG sprite injected into the application.

If your application sets the `flightIconsSpriteLazyEmbed` option in `config/environment.js`, this can now be removed.

#### Theme switching

Implementing theming in your application requires adding a [theme switcher](/patterns/theme-selection). As mentioned previously, the [`hdsTheming` service](/theming/hds-theming) allows control of the selected theme at the page-level.

The theme switcher needs to pass the user's selection to the `setTheme` method, so that the service can apply the corresponding theme classes and token values. During the migration, the imported "migration" token file supports both the `default` theme, which preserves the "classic" HDS appearance, and the "carbonized" `system`, `light`, and `dark` themes, which mimic the IBM Carbon visual languages.

The following is a minimal example of how a theme switcher can invoke `setTheme`:

[[code-snippets/migration-hds-theming-set-theme execute=false]]

To retain the selection between visits, persist and restore it early in the application lifecycle to avoid a flash of content rendered with the wrong theme.

For more details about how to set and persist a theme in an application, see the [Theming service](/theming/hds-theming) documentation.

For guidance around the switcher's user interface and behavior, see the [Theme selection pattern](/patterns/theme-selection).

Also, some areas of the application may need to force a specific theme. In that case, the [`ThemeContext`](/theming/theme-context) component can be used to scope a theme to a portion of the page. For example, an application can wrap its `AppHeader` in a `ThemeContext` and select the `dark` context when a "carbonized" theme is active, while using `default` for the "classic" theme:

[[code-snippets/migration-theme-context-app-header execute=false]]

### Fully migrated

Once the application has been fully migrated, the tokens file `with-css-selectors` should be used:

[[code-snippets/migration-scss-tokens-final]]

This file provides only the "carbonized" themes: `system`, `light`, and `dark`. The `default` theme is no longer needed.

If you need to customize which modes are used for the light and dark themes, use the `with-css-selectors--advanced` tokens file.

Everything else can remain the same. Continue using the [`hdsTheming` service](#hdstheming-service) to apply a theme to the page, and the [`ThemeContext` component](/theming/theme-context) to apply a theme to a specific portion of it.
