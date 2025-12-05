## How to use this component

The code editor is provided as both a `CodeEditor` component and as an `hds-code-editor` Ember [modifier](/components/code-editor?tab=code#ember-modifier). To use this component, you must either include the yielded `Title` component, provide an `@ariaLabel`, or specify an `@ariaLabelledBy`.

```handlebars
<Hds::CodeEditor @ariaLabel="Basic usage" />
```

### Ember modifier

An Ember modifier is available if your use case does not require a visible title, description, or any additional interactivity beyond editing code.

#### Modifier used on a `div`

```handlebars
<div {{hds-code-editor ariaLabel="Ember modifier usage"}} />
```

### Title and description

Optionally, you can pass a title and/or a description using the `[CE].Title` and `[CE].Description` components yielded by the Code Editor component.

```handlebars
<Hds::CodeEditor @value="Hello, world" as |CE|>
  <CE.Title>
    CodeEditor title
  </CE.Title>
  <CE.Description>
    CodeEditor description
  </CE.Description>
</Hds::CodeEditor>
```

### Title tag

!!! Warning

**Accessibility alert**

The default `@tag` is `"h2"`, however, the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

The `@tag` argument changes the HTML element that wraps the `[CE].Title` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a Code Editor is within a subsection of the page below a heading level 2, the value should be `"h3"`.

```handlebars
<div class="doc-code-editor-demo-heading">
  <Hds::Text::Display @tag="h2" @size="300">Learn to write functions in Go</Hds::Text::Display>
  <Hds::Text::Body @tag="p">Functions are a critical part of learning Go. They
    are reusable chunks of code that can perform tasks like convert an object to
    an array.</Hds::Text::Body>
</div>
<Hds::CodeEditor @language="go" @value={{this.goCode}} as |CE|>
  <CE.Title @tag="h3">
    convertObjectToArray.js
  </CE.Title>
</Hds::CodeEditor>
```

### Language

The `language` argument sets the syntax highlighting used. We support the following languages: `rego`, `ruby`, `sentinel`, `shell`, `go`, `hcl`, `javascript`, `json`, `markdown`, `sql`, and `yaml`. If you need additional languages, <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.

```handlebars
<Hds::CodeEditor @ariaLabel="language" @language="go" @value={{this.goCode}} />
```

### Linting

Set `isLintingEnabled` to `true` to enable linting within the editor. Linting is only available when `language` is set to `json`.

```handlebars
<Hds::CodeEditor
  @ariaLabel="linting"
  @isLintingEnabled={{true}}
  @language="json"
  @value={{this.badJsonCode}}
/>
```

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy Code Editor content to their computer clipboard. Use `copyButtonText` to provide a meaningful and unique label for the copy button.

```handlebars
<Hds::CodeEditor
  @ariaLabel="copy button"
  @hasCopyButton={{true}}
  @copyButtonText="Copy lorem ipsum code"
  @value={{this.loremIpsum}}
/>
```

### Full screen mode

Set `hasFullScreenButton` to `true` to display a button for users to toggle between a full screen view and normal placement within the page.

```handlebars
<Hds::CodeEditor
  @ariaLabel="full screen mode"
  @hasFullScreenButton={{true}}
  @value={{this.loremIpsum}}
/>
```

### Line wrapping

Set `hasLineWrapping` to `true` to enable line wrapping within the editor.

```handlebars
<Hds::CodeEditor
  @ariaLabel="line wrapping example"
  @hasLineWrapping={{true}}
  @value={{this.loremIpsum}}
/>
```

### Custom extensions

The Code Editor supports valid CodeMirror 6 [extensions](https://codemirror.net/docs/ref/#state.Extension) via the `@customExtensions` argument. This allows you to add custom keymaps, gutter markers, theme overrides, or advanced editor behavior.

#### Importing CodeMirror modules

!!! Warning

Do not install CodeMirror packages directly.
!!!

To prevent "multiple instance" errors where the application crashes, do not add CodeMirror packages (like `@codemirror/view` or `@codemirror/state`) to your application's package.json.

Instead, you must import the necessary modules from the HDS Components re-export. This guarantees that your extension uses the exact same instance of the library as the Code Editor component.

All standard CodeMirror utilities are available via: `@hashicorp/design-system-components/codemirror`

#### Usage example

Here is how to create a custom keymap extension using the re-exported modules.

```javacript
import Component from '@glimmer/component';
// ✅ Import from HDS, not from '@codemirror/view'
import { keymap } from '@hashicorp/design-system-components/codemirror';

// 1. Define your extension
const myKeymap = keymap.of([
  {
    key: 'Cntrl-Shift-h',
    run: (view) => {
      console.log('Hello World');
      return true;
    },
  },
]);

export default class MyComponent extends Component {
  // 2. Create an array of extensions
  myExtensions = [myKeymap];
}
```

The created extensions array can be passed to the editor through the `@customExtensions` argument.
