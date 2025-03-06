## Component API

This component uses [CodeMirror 6](https://codemirror.net/) under the hood.

### CodeEditor

<Doc::ComponentApi as |C|>
  <C.Property @name="<[CE].Title>" @type="yielded component">
    `ContentBlock::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[CE].Description>" @type="yielded component">
    `ContentBlock::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[CE].Generic>" @type="yielded component">
    `ContentBlock::Generic` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="ariaLabel" @type="string">
    Accepts a localized string. The `ariaLabel` value is applied to the code editor input element.
  </C.Property>
  <C.Property @name="ariaLabelledBy" @type="string">
    Accepts a localized string. The `ariaLabelledBy` value is applied to the code editor input element.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    Used to control whether a copy button for copying the code/text content will be displayed.
  </C.Property>
  <C.Property @name="copyButtonText" @type="string" @default="'Copy'">
    Override this value to provide a meaningful `aria-label` for the [`Copy::Button`](/components/copy/button) component.
  </C.Property>
  <C.Property @name="hasFullScreenButton" @type="boolean" @default="false">
    Used to control whether a toggle button for toggling full-screen mode will be displayed.
  </C.Property>
  <C.Property @name="hasLineWrapping" @type="boolean" @default="false">
    Enables line wrapping within the editor.
  </C.Property>
  <C.Property @name="isLintingEnabled" @type="boolean" @default="false">
    Enables linting of content on initial render and when the content changes. Only enabled when `language` is set to `json`. If you need linting for additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.
  </C.Property>
  <C.Property @name="isStandalone" @type="boolean" @default="true">
    Applies rounded borders to the component. When used within another component or when the context requires it, you can turn it off.
  </C.Property>
  <C.Property @name="language" @type="string" @values={{array "go" "hcl" "javascript" "json" "rego" "ruby" "sentinel" "shell" "sql" "yaml"}}>
    The coding language to use for syntax highlighting. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.
  </C.Property>
  <C.Property @name="value" @type="string">
    The text/code content for the Code Editor.
  </C.Property>
  <C.Property @name="onBlur" @type="function">
    Callback function invoked when focus is removed from the editor.
  </C.Property>
  <C.Property @name="onInput" @type="function">
    Callback function invoked when the editor receives an input event.
  </C.Property>
  <C.Property @name="onLint" @type="function">
    Callback function invoked when the editor completes linting if linting is enabled. The function receives an array of diagnostic objects with error message, postition, and severity.
  </C.Property>
  <C.Property @name="onSetup" @type="function">
    Callback function invoked when the editor completes setup.
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [CE].Title

The `CodeEditor::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children.
  </C.Property>
    <C.Property @name="tag" @type="enum" @values={{array "p" "h1" "h2" "h3" "h4" "h5" "h6"}} @default="h2">
    The HTML tag that wraps the content of the "title" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [CE].Description

The `CodeEditor::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Supports embedding content such as logic/conditionals, inline HTML elements, and other Ember components. However, since the content is always rendered within a `p` tag, it must adhere to semantic HTML rules, avoiding block-level elements. Consumers should ensure proper styling to maintain consistent rendering when using custom inline child elements.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [CE].Generic

A generic container, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the "header content" block, after the "title" and "description".
    <br/>The content can be a simple string or a more complex/structured one.
    <br/>`Hds::Button` components inherit styles from the editor theme.
  </C.Property>
</Doc::ComponentApi>