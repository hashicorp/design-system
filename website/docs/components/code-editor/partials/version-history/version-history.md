## 5.2.0

Fixed issue with font-family and font-size targeting so styles will correctly apply to nested element containing code content


## 5.1.0

Added a new `@customExtensions` argument which allows consumers to provide their own custom CodeMirror extensions.


## 4.23.0

Added a `cspNonce` argument which passes a value of the same name to the `hds-code-editor` modifier. `cspNonce` is used to add a nonce value to the style tag


## 4.22.0

Translated template strings


Fixed the type of the CodeEditor signature to indicate that the `[CE].Title` and `[CE].Description` have bound arguments.


## 4.19.0

Updated focus ring colors in interactive elements to fix a11y color contrast issues

## 4.18.2

Added the value and `EditorView` instance as arguments for the `onLint` callback. Added the `EditorView` instance as an argument to the `onInput` callback.

## 4.18.1

Add `@extraKeys` argument which supports custom keybinding

Add `cspNonce` argument and automate nonce detection

Added `@isLintingEnabled` and `@onLint` arguments that are passed to the `hds-code-editor` modifier

Add language syntax highlighting support for Markdown

Attached `EditorView` instance to the editor element (`.hds-code-editor__editor`)

## 4.17.1

Added `@copyButtonText` argument to customize the `aria-label` of the Copy Button. The default label is still "Copy".

Added language syntax highlighting support for JavaScript and Rego

Added `@hasLineWrapping` argument that is passed to the `hds-code-editor` modifier

Added missing `@lezer/highlight` dependency

Fixed import path for `HdsCodeEditorModifierSignature`

## 4.16.0

Added new CodeMirror 6 supported code editor component

