## How to use this component

The code editor is provided as both a `CodeEditor` component and as an `hds-code-editor` Ember [modifier](/components/code-editor?tab=code#ember-modifier). To use this component, you must either include the yielded `Title` component, provide an `@ariaLabel`, or specify an `@ariaLabelledBy`.

[[code-snippets/code-editor-basic]]

### Ember modifier

An Ember modifier is available if your use case does not require a visible title, description, or any additional interactivity beyond editing code.

#### Modifier used on a `div`

[[code-snippets/code-editor-modifier]]

### Title and description

Optionally, you can pass a title and/or a description using the `[CE].Title` and `[CE].Description` components yielded by the Code Editor component.

[[code-snippets/code-editor-title-desc]]

### Title tag

!!! Warning

**Accessibility alert**

The default `@tag` is `"h2"`, however, the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

The `@tag` argument changes the HTML element that wraps the `[CE].Title` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a Code Editor is within a subsection of the page below a heading level 2, the value should be `"h3"`.

[[code-snippets/code-editor-tag]]

### Language

The `language` argument sets the syntax highlighting used. We support the following languages: `rego`, `ruby`, `sentinel`, `shell`, `go`, `hcl`, `javascript`, `json`, `markdown`, `sql`, and `yaml`. If you need additional languages, <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.

[[code-snippets/code-editor-language]]

### Linting

Set `isLintingEnabled` to `true` to enable linting within the editor. Linting is only available when `language` is set to `json`.

[[code-snippets/code-editor-lint]]

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy Code Editor content to their computer clipboard. Use `copyButtonText` to provide a meaningful and unique label for the copy button.

[[code-snippets/code-editor-copy-button]]

### Full screen mode

Set `hasFullScreenButton` to `true` to display a button for users to toggle between a full screen view and normal placement within the page.

[[code-snippets/code-editor-full-screen]]

### Line wrapping

Set `hasLineWrapping` to `true` to enable line wrapping within the editor.

[[code-snippets/code-editor-line-wrap]]

### Custom extensions

The Code Editor supports valid [CodeMirror 6 extensions](https://codemirror.net/docs/ref/#state.Extension) via the `@customExtensions` argument. This allows you to add custom keymaps, gutter markers, theme overrides, or advanced editor behavior.

#### Importing CodeMirror modules

!!! Warning

Do not install CodeMirror packages directly.
!!!

To prevent "multiple instance" errors where the application crashes, do not add CodeMirror packages (like `@codemirror/view` or `@codemirror/state`) to your application's package.json.

Instead, you must import the necessary modules from the HDS Components re-export. This guarantees that your extension uses the exact same instance of the library as the Code Editor component.

All standard CodeMirror utilities are available via: `@hashicorp/design-system-components/codemirror`

#### Usage example

Here is how to create a custom keymap extension using the re-exported modules. The created extensions array can be passed to the editor through the `@customExtensions` argument.

[[code-snippets/code-editor-extension]]
