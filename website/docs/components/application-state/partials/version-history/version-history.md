## 5.0.0

Replaced the default opinionated `margin: 0 auto;` rule from the component's root element with a new `@isAutoCentered` argument (which defaults to `true`, to preserve the existing centering behavior). This delegates the horizontal alignment control to the consumers, allowing them to disable it when needed.


## 4.22.0

Translated template strings


## 4.10.0

Updated the type of the `@titleTag` argument to only accept `"div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`. If using another value, update the argument to the appropriate heading level. For example, if an Application State is used as an empty state below the main heading of a page, the value should be `"h2"`.

## 4.8.0

Added new `@align` argument for aligning content (`left` (default) and `center`)

Added new yielded `Media` child component to support illustrations

Visual updates related to text colors, spacing and alignment

The header now supports an optional `@titleTag` argument that can override the default title element (`div`)

The footer now yields also `Button` and `Dropdown` components to be used as actions

The visual separator has been removed to modernize the component’s visual look
