## Component API

This component uses [CodeMirror](https://codemirror.net) under the hood.

### CodeEditor

<Doc::ComponentApi as |C|>
  <C.Property @name="<[CE].Title>" @type="yielded component">
    `ContentBlock::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[CE].Description>" @type="yielded component">
    `ContentBlock::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="value" @type="string">
    The text/code content for the `CodeEditor`.
  </C.Property>
  <C.Property @name="language" @type="string" @values={{array "go" "javascript" "json" "sql"}}>
    The coding language to use for syntax highlighting. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    Used to control whether a copy button for copying the code/text content will be displayed.
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [CB].Title

The `CodeEditor::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Content inherits its style. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children.
  </C.Property>
    <C.Property @name="tag" @type="enum" @values={{array "p" "h1" "h2" "h3" "h4" "h5" "h6"}} @default="p">
    The HTML tag that wraps the content of the "title" block.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [CB].Description

The `CodeEditort::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Content inherits its style. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
