!!! Insight

For more details about theming in HDS/Carbon, how it works, and how it could be used in your application, see [Carbonization/From Helios to Carbon](/carbonization/introduction) and [Foundations/Theming](/foundations/theming).

!!!

## How to use this service

The `hdsTheming` service is used to apply one of the HDS themes to the pages of an Ember application.

It works by conditionally applying the `.hds-theme-*` and `.hds-mode-*` classes on the `<html>` element (the DOM `:root`) depending on the theme selected.

It doesn't persist the user's choice, though, so it's left to consumers to implement this [consumer-side logic](#persisting-the-users-choice).

### Themed tokens

The service relies on one of the [themed tokens files](/foundations/theming#themed-tokens) being imported first. Which themes and modes it can apply depends on the file imported by your application. For details, see [Foundations/Theming](/foundations/theming?tab=code#themed-tokens).

For example, this is the structure of the CSS file for the "migration" set of tokens:

[[code-snippets/tokens-selectors-example]]

When a theme class, e.g. `.hds-theme-dark`, is applied to a DOM element, that element and its descendants use the union of the "dark" values and the "shared" values for the [HDS tokens](/foundations/tokens).

### Setting a theme

To set a theme, inject the service and invoke the `setTheme` function with one of the supported theme values: `default`, `system`, `light`, or `dark`.

[[code-snippets/hds-theming-usage execute=false]]

Calling `setTheme` updates the classes on the `<html>` element. For example, applying the `dark` theme adds `.hds-theme-dark` and its mapped mode class, `.hds-mode-cds-g100`, by default.

To remove all HDS theming classes from the page, and with it restore the "classic" HDS visual appearance, pass `undefined` as the `theme` argument.

#### Advanced mode options

By default, the `light` theme maps to `cds-g0` and the `dark` theme maps to `cds-g100`. For advanced use cases, you can change this mapping by passing `lightTheme` and `darkTheme` options:

[[code-snippets/hds-theming-advanced-options execute=false]]

These options are relevant only when your application imports the `with-css-selectors--advanced` themed tokens file. The standard `with-css-selectors` and `with-css-selectors--migration` files don't include the additional `cds-g10` and `cds-g90` modes. See [Foundations/Theming](/foundations/theming) for details.

The `system` theme is handled in CSS through the `prefers-color-scheme` media query, so these options apply only when setting the `light` or `dark` themes directly.

#### Responding to theme changes

Use the `onSetTheme` callback to run application-specific logic after the theme is applied, such as logging, analytics, or [persistence of the user's selection](#persisting-the-users-choice).

[[code-snippets/hds-theming-on-set-theme-generic execute=false]]

### Getting theming states

The service exposes reactive properties you can use in components, templates, or other services.

The `isCarbonThemeEnabled` property returns `true` when the active theme is `system`, `light`, or `dark`. You can use it to branch application logic when the carbonized visual language is active:

[[code-snippets/hds-theming-is-carbon-theme-enabled execute=false]]

The `currentTheme`/`currentMode` properties return the currently applied theme/mode.

The `currentLightTheme`/`currentDarkTheme` properties return the current mode mappings for the `light` and `dark` themes.

Because these values are reactive, templates and getters that consume them update when `setTheme` changes the current theme or mode.

### Persisting the user's choice


The `hdsTheming` service applies a theme to a page but doesn't persist the user's choice.

For this reason, it's left to consumers to:

- store the user's preference in the application, for example, in `localStorage` or in the user's profile.
- invoke `setTheme` as early as possible in the application lifecycle, to avoid a flash of content rendered with the wrong theme.

The following examples show one basic way to handle this logic, but the exact implementation will depend on your application's infrastructure, configuration, lifecycle, user interface, etc.

When the application starts, read the stored preference and apply it as early as possible:

[[code-snippets/hds-theming-restore-user-preference execute=false]]

When the user selects a theme, pass it to `setTheme` and store the selected value:

[[code-snippets/hds-theming-on-set-theme-persistence execute=false]]

This will likely be invoked inside an action/function associated with a "theme switcher" in the UI:

[[code-snippets/hds-theming-on-click-theme-switcher execute=false]]

For details on designing and implementing a "theme switcher" for your application, according to the HDS specifications and guidance, see [Patterns/ThemeSwitcher](/patterns/theme-switcher-pattern).
