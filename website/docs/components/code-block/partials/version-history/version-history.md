## 4.24.1

Fixed a11y issue with its `CopyButton` by adding `copySuccessMessageText` parameter to an aria-live region to announce to screen readers when content has been copied


## 4.20.0

Updated signature to use `WithBoundArgs` instead of `ComponentLike` for contextual components to resolve linting issues

Added height toggle control, which is present when a `maxHeight` is set and code content height exceeds the `maxHeight` value

Fixed issues with line numbers when line wrapping is present and when the number of lines changes dynamically; line highlighting when the Code Block is hidden from view initially such as when used inside a Tabs component; and line highlighting when hasLineNumbers is false.

Added arguments `@ariaLabel`, `@ariaLabelledBy`, and `@ariaDescribedBy`. Added screen-reader only copy for highlighted lines.

## 4.19.0

Updated focus ring colors in interactive elements to fix a11y color contrast issues

## 4.18.1

Added `onCopy` argument which accepts a callback function that will be invoked when the "copy" action succeeds.

## 4.17.1

Added `@copyButtonText` argument to `CodeBlock` and `@text` argument to the `CodeBlock::CopyButton` subcomponent to customize the `aria-label` of the Copy Button. The default label is still "Copy".

## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.13.0

Added `@lineNumberStart` option to set custom starting number for line numbering

Decoupled the display of line numbers from `@highlightLines`

## 4.12.0

Changed textarea `scrollbar-width` to `thin` to reduce overlap with copy button.

## 4.10.0

Added `@tag` argument to `CodeBlock::Title`
