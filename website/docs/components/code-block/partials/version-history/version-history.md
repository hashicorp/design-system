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
