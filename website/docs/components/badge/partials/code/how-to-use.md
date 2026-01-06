## How to use this component

The most basic invocation requires the `@text` argument to be passed, resulting in a medium neutral Badge.

[[demo: code-snippets/badge-basic]]

### Color

The `@color` argument can be used to change the color.

[[demo: code-snippets/badge-color]]

### Type

Use the `@type` argument to invoke different Badge types. The options are `filled`, `inverted`, `outlined`.

[[demo: code-snippets/badge-type]]

### Size

A different size of Badge can be invoked using the `@size` argument.

[[demo: code-snippets/badge-size]]

### Icon

Use the `@icon` argument to pass in the any icon name. Icons always display in the leading (left) position.

[[demo: code-snippets/badge-icon]]

#### isIconOnly

To display an icon without text set the `@isIconOnly` argument to `true`. Defining `@text` is still necessary to conform with accessibility standards but won’t be displayed visually.

[[demo: code-snippets/badge-icon-only]]
