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

