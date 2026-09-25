## How theming works in HDS

Theming is the mechanism that lets an application switch between different visual appearances at runtime, for example between a light and a dark theme.

In HDS, theming was introduced in version 7.0 as part of the "carbonization" project, aimed at migrating the HDS foundations and components from their original Helios visual language to the [IBM Carbon visual language](https://www.ibm.com/design/language/). See [From Helios to Carbon](/carbonization/introduction) for more details about this process.

We expect product teams to "carbonize" their applications at their own pace. This means that some applications will continue using the "classic" HDS visual language for some time, while others will start migrating and will need both visual languages to co-exist in the same application, and once fully migrated they will use only the "carbonized" HDS.

This means that two visual languages need to be supported in HDS, at the same time:

- **"classic" HDS** – the original, light-only visual language (doesn't have theming)
- **"carbonized" HDS** – the IBM Carbon visual language applied to HDS, with support for both light and dark variants (more precisely, multiple color modes; see [Themes and modes](#themes-and-modes) below).

To support all of these scenarios, HDS provides several pre-built sets of themed tokens, so each application can import only the visual language(s) it needs. See [Themed tokens files](#themed-tokens-files) below.

Each set of themed tokens declares its design tokens under `hds-theme-*`/`hds-mode-*` CSS selectors, one for each theme/mode it supports. Applying a theme, then, is simply a matter of adding the corresponding class name to the `<html>` element of the page: this is what a dedicated [`hdsTheming` service](#hdstheming-service) does under the hood.

It's also possible to apply local overrides of the global theme, scoping them to only a portion of the page, using the [`ThemeContext`](#themecontext) component. The way in which it works is by applying the same `hds-theme-*`/`hds-mode-*` classes to a DOM container, affecting how its content is themed.

### Themes and modes

We distinguish between two related concepts:

- a **theme** is what an application exposes to its users: `default` (the "classic" HDS), `system`, `light`, or `dark`.
- a **mode** is the underlying IBM Carbon mode that provides the token values for a theme: `cds-g0` or `cds-g10` for light themes, `cds-g90` or `cds-g100` for dark themes.

The `system` theme follows the user's operating system preference via the `prefers-color-scheme` media query. This is handled entirely in CSS, so an application doesn't need to listen for changes.

Which themes and modes are available to an application depends on the themed tokens file it imports.

### Themed tokens

The design tokens package, `@hashicorp/design-system-tokens`, provides three pre-built CSS/Sass bundles of themed tokens, each aimed at a different stage of the "carbonization" journey described above:

| File                          | Themes                               | Modes                                      |
| ------------------------------ | ------------------------------------- | -------------------------------------------- |
| `with-css-selectors`            | `system`, `light`, `dark`             | `cds-g0`, `cds-g100`                         |
| `with-css-selectors--migration` | `default`, `system`, `light`, `dark`  | `cds-g0`, `cds-g100`                         |
| `with-css-selectors--advanced`  | `system`, `light`, `dark`             | `cds-g0`, `cds-g10`, `cds-g90`, `cds-g100`   |

- `with-css-selectors` (the "final" file) is what most applications should use once fully carbonized: it supports the `system`/`light`/`dark` themes.
- `with-css-selectors--migration` additionally exposes the `default` theme, so the "classic" and "carbonized" visual languages can co-exist in the same application during an incremental migration.
- `with-css-selectors--advanced` exposes all [four IBM Carbon modes](https://carbondesignsystem.com/elements/themes/overview/), in case an application needs to let users pick a specific mode rather than just a theme.

For complex use cases, the package also provides a Sass bundle with mixins that lets you combine multiple themes or modes in a single application. If your application requires this approach, [contact the Design System Team](/about/support) for assistance and guidance on implementation.

### Theming utilities

Besides the themed tokens, HDS provides a service and a component to apply theming programmatically to an application, or to a portion of it.

#### `hdsTheming` service

Under the hood, theming is controlled by an `hdsTheming` Ember service, provided by the `@hashicorp/design-system-components` package. Calling its `setTheme` method swaps the `hds-theme-*`/`hds-mode-*` class names on the `<html>` element, so the whole page reacts to the change.

For more details about this service, how to use it, and it APIs, see the [Theming service](/theming/hds-theming).

#### `ThemeContext` component

`Hds::ThemeContext` is a headless component that can be used to apply a theme or mode to the content rendered inside it, independently from the theme applied to the rest of the page.

For more details about this component, how to use it, and it APIs, see the [`ThemeContext` component](/theming/theme-context).

#### `hds-apply-only-if-carbon` Sass mixin

During migration, when classic and Carbon styles need to coexist, you can use the `hds-apply-only-if-carbon` Sass mixin for special cases where a Carbon style needs to override a classic style.

Import in your application's Sass entry point the `styles/mixins/carbonization` file from the `@hashicorp/design-system-components` package, and then include the mixin around the styles that should only apply when the `light`, `dark`, or `system` Carbon theme is active.

_Note: this special mixin should be used sparingly, only during migration and only for very specific overrides that cannot be handled through themed design tokens or the standard component styles._

## How to adopt theming in your application

Adopting theming is part of the broader process of ["carbonization"](/carbonization/introduction) of an an application. This process is typically gradual, because it requires updating the visual language of an existing application. Before you begin, [contact the Design System Team](/about/support) to plan the migration and get guidance on the appropriate themed tokens file.

The migration of existing applications  usually progresses through three stages.

### Not yet migrated

Applications can continue to use the "classic" token styles until they are ready to begin the migration.

Applications can still upgrade to version `7.0` or later of the design system, (for example to receive bug fixes for HDS components). However, version `7.0` introduced systematic design token renaming, and some refactoring is required. [Contact the Design System Team](/about/support) for guidance and help automating this refactoring.

### Migrating

If an application intends to migrate to the "carbonized" look&feel of their UI, the product team should [speak with the Design System Team](/about/support) to coordinate the initial effort.

However, for general knowledge, this is what the migration steps would look like.

#### Dependencies

In your `package.json` update the HDS dependencies to the minimum versions that support theming:

[[code-snippets/migration-dependencies-bump-hds]]

Carbonized themes use the [IBM Plex typefaces](https://carbondesignsystem.com/elements/typography/overview/#typeface:-ibm-plex), so you have to add their corresponding packages as well:

[[code-snippets/migration-dependencies-add-plex-fonts]]

#### Sass/Css imports

You now have to update your application to use the "carbonized" files. For these examples, we will use the Sass files, but equivalent files are available in CSS as well. For details about how to configure your app to consume these CSS or Sass files from the HDS packages, see [Getting started for engineers](/getting-started/for-engineers#import-component-styles).

First of all you have to use the "migration" file that provides both the "classic" and the "carbonized" HDS tokens, with different values depending on the theme/mode:

[[code-snippets/migration-scss-tokens-migration]]

Then you have to import the shared styles for the HDS components (that consume these tokens):
[[code-snippets/migration-scss-components-common]]

Finally, you have to import the import the `@font-face` declarations for the IBM Plex fonts:

[[code-snippets/migration-scss-plex-fonts]]

If your application serves fonts from a path other than `/assets` (e.g. `/app/assets`) configure the import using the `$hds-ibm-plex-fonts-assets-path` Sass variable:

[[code-snippets/migration-scss-plex-fonts-advanced]]

#### Design tokens migration

The HDS 7.0 release introduced a corresponding 6.0 release of the design tokens package. As part of the carbonization work, we renamed and reorganized the [design tokens](/foundations/tokens) to follow a new naming convention.

Some changes are mechanical, such as changing the `--token-*` prefix to `--hds-*`. Others change the structure of the name, for example, `--token-color-border-primary` becomes `--hds-border-color-primary`.

Token references throughout the consumer codebase therefore need to be updated to use the new names, including references in CSS/Scss files, Handlebars templates, and JavaScript/TypeScript code.

The HDS team can run an automated migration against your codebase using a validated map of the old and new token names. The process reports the files and references it changes, and identifies any removed, dynamic, or otherwise unmapped tokens for manual review. [Contact the Design System Team](/about/support) to coordinate this phase of the migration.

#### Icon loading

In HDS v7, icons are no longer delivered through a single SVG sprite injected into the application.

If your application sets the `flightIconsSpriteLazyEmbed` option in `config/environment.js`, this can now be removed.

#### Theme switching

Implementing theming in your application requires adding a theme switcher. As mentioned above, the [`hdsTheming` service](/theming/hds-theming) allows to control at page-level the selected HDS theme.

The theme switcher needs to pass the user's selection to the `setTheme` method, so that the service can apply the corresponding theme classes and token values. During the migration, the imported "migration" token file supports both the `default` theme, which preserves the "classic" HDS appearance, and the "carbonized" `system`, `light`, and `dark` themes, which mimic the IBM Carbon visual languages.

The following is a minimal example of how a theme switcher can invoke `setTheme`:

[[code-snippets/migration-hds-theming-set-theme execute=false]]

To retain the selection between visits, you should persist it and restore it early in the application lifecycle to avoid a flash of content rendered with the wrong theme.

For more details about how to set and persist a theme in an application, see the [Theming service](/theming/hds-theming) documentation.

For guidance around the switcher's user interface and behavior, see [Patterns/Theme selection](/patterns/theme-selection).

Also, some areas of the application may need to force a specific theme. In that case, the [`ThemeContext`](/theming/theme-context) component can be used to scope a theme to a portion of the page. For example, an application can wrap its `AppHeader` in a `ThemeContext` and select the `dark` context when a "carbonized" theme is active, while using `default` for the "classic" theme:

[[code-snippets/migration-theme-context-app-header execute=false]]

### Fully migrated

Once the application has been fully migrated, the tokens file `with-css-selectors` should be used:

[[code-snippets/migration-scss-tokens-final]]

This file provides only the "carbonized" themes: `system`, `light`, and `dark`. The `default` theme is no longer needed.

Everything else can remain the same. Continue using the [`hdsTheming` service](#hdstheming-service) to apply a theme to the page, and the [`ThemeContext` component](/theming/theme-context) to apply a theme to a specific portion of it.
