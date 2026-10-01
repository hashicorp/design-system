!!! Insight

For more details about theming in HDS/Carbon, how it works, and how it could be used in your application, see [Carbonization/From Helios to Carbon](carbonization/introduction) and [Foundations/Theming](foundations/theming).

!!!

## How to use this component

`ThemeContext` is a headless component that can be used to apply a theme or mode to a section of your UI independently from the global theme applied to the page, by passing one of the following predefined values to the required `@context` argument:

- `default` - to apply the "classic" HDS theme
- `light`/`dark`/`system` - to apply an IBM Carbon theme
- `cds-g0`/`cds-g10`/`cds-g90`/`cds-g100` - to apply a specific IBM Carbon color mode

Refer to the [Component API](#component-api) for details about the visual treatment applied by each value.

[[code-snippets/basic-example execute=false]]

### Requirements

`ThemeContext` works by overriding the design tokens declared for a theme/mode, so it has an effect only if your application imports the "themed" CSS/Sass files provided by HDS. For details about how to import them, see [Getting started/For engineers](/getting-started/for-engineers#import-component-styles) and [Foundations/Theming](/foundations/theming?tab=code).

The file that you import also determines which `@context` values are supported:

| Themed tokens file | Supported `@context` values |
|---|---|
| `themed-tokens/with-css-selectors` | `system`, `light`, `dark` |
| `themed-tokens/with-css-selectors--migration` | `default`, `system`, `light`, `dark` |
| `themed-tokens/with-css-selectors--advanced` | all of the above, plus `cds-g0`, `cds-g10`, `cds-g90`, `cds-g100` |

### Theme selection

Use a theme value when a section should keep a specific theme, regardless of the application's global theme.

[[code-snippets/theme-selection]]

### Mode selection

Use a mode value when you need to select a specific IBM Carbon color mode within a section. It is a very unlikely use case, but we document it anyway for completeness.

[[code-snippets/mode-selection]]

!!! Information

As noted in the [Requirements](#requirements) above, the mode values are supported only if your application imports the `themed-tokens/with-css-selectors--advanced` CSS/Sass file.

For more information about the relationship between themes and modes, see [Foundations/Theming](foundations/theming).

!!!

### Use cases

Use `ThemeContext` when part of an application must remain visually consistent while the user changes the global theme (usually an application header and/or footer, or a banner):

[[code-snippets/real-scenario]]


### Limitations

Internally, the component applies the same CSS class names that the `hdsTheming` service applies to the DOM `:root` element of the page (the `<html>` tag), but scoped to a nested DOM container. Because CSS custom properties are inherited, the ones declared on that container override those declared at `:root` level, so the design tokens used inside the container resolve to the values of the theme/mode passed as `@context`.

However, a few components rely on the `hdsTheming` service to render differently depending on the global theme, which is applied at application/page level, so they don't respond to the `@context` applied locally.

This is most noticeable with `Icon`: the icons inside the context always follow the global theme (Flight icons if the global theme is the "classic" HDS one, and IBM Carbon icons if it's the "carbonized" one), regardless of what `@context` is provided.

In practice, this is rarely a problem: `ThemeContext` is meant to be used in applications that have adopted the "carbonized" tokens and styles, not to mix the "classic" and "carbonized" visual languages in the same page.
