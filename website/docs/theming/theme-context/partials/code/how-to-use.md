## How to use this component

`ThemeContext` is a headless component that can be used to apply a theme or mode to a section of your UI independently from the global theme applied to the page, by passing one of the following predefined values to the required `@context` argument:

- `default`/`light`/`dark`/`system` - to apply a complete theme
- `cds-g0`/`cds-g10`/`cds-g90`/`cds-g100` - to apply a specific IBM Carbon color scale

Refer to the [Component API](#component-api) for details about the visual treatment applied by each value.

[[code-snippets/basic-example execute=false]]

!!! Insight

For more details about theming in HDS/Carbon, how it works, and how it could be used in your application, see [Carbonization/From Helios to Carbon](carbonization/introduction) and [Foundations/Theming](foundations/theming).

!!!

### Theme selection

Use a theme value when a section should keep a specific theme, regardless of the application's global theme.

[[code-snippets/theme-selection]]

### Mode selection

Use a mode value when you need to select a specific IBM Carbon color scale within a section.

[[code-snippets/mode-selection]]

It is a very unlikely use case, but we document it anyway for completeness.

!!! Insight

For more information about the relationship between themes and modes, see [Foundations/Theming](foundations/theming).

!!!

### Use cases

Use `ThemeContext` when part of an application must remain visually consistent while the user changes the global theme (usually an application header and/or footer, or a banner):

[[code-snippets/real-scenario]]
