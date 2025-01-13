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
  <C.Property @name="value" @type="string">
    The text/code content for the Code Editor.
  </C.Property>
  <C.Property @name="language" @type="string" @values={{array "json" "sql" "go" "hcl"}}>
    The coding language to use for syntax highlighting. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    Used to control whether a copy button for copying the code/text content will be displayed.
  </C.Property>
  <C.Property @name="hasFullScreenButton" @type="boolean" @default="false">
    Used to control whether a toggle button for toggling full-screen mode will be displayed.
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [CE].Title

The `CodeEditor::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Content inherits its style. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children.
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
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Content inherits its style. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
