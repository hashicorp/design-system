## Component API

This component uses [prism.js](https://prismjs.com/) under the hood.

### CodeBlock

<Doc::ComponentApi as |C|>
  <C.Property @name="<[CB].Title>" @type="yielded component">
    `ContentBlock::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[CB].Description>" @type="yielded component">
    `ContentBlock::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="value" @type="string">
    The text/code content for the `CodeBlock`. The component encodes this argument before displaying it.
  </C.Property>
  <C.Property @name="language" @type="string" @values={{array "bash" "go" "hcl" "json" "log" "ruby" "shell-session" "yaml"}}>
    The coding language to use for syntax highlighting. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>.
  </C.Property>
  <C.Property @name="isStandalone" @type="boolean" @default="true">
    Applies rounded borders to the component. When used within another component or when the context requires it, you can turn it off.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    Used to control whether a copy button for copying the code/text content will be displayed.
  </C.Property>
  <C.Property @name="hasLineNumbers" @type="boolean" @default="true">
    Used to control display of line numbers. Note that due to technical limitations, if the `@value` changes dynamically the line numbers will fail to update.
  </C.Property>
  <C.Property @name="hasLineWrapping" @type="boolean" @default="false">
    Used to control line wrapping for lines of code. If `true`, lines of code will wrap to fit the available space. Otherwise, horizontal scrolling is enabled if lines overflow the available space.
  </C.Property>
  <C.Property @name="highlightLines" @type="string">
    Accepts a list or range of line numbers to highlight. (Examples: `2, 4`, `6-10` )
  </C.Property>
  <C.Property @name="maxHeight" @type="string" @default="auto">
    Accepts any valid CSS unit. If the `CodeBlock` content exceeds the maximum height a vertical scrollbar is enabled. This value applies to the code content only and does not include the header element (title and/or description).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

#### [CB].Title

The `CodeBlock::Title` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Content inherits its style. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### [CB].Description

The `CodeBlock::Description` component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Accepts complex content, such as logic/conditionals, HTML elements, other Ember components, etc. Content inherits its style. Styling is applied for simple HTML elements, such as `strong`, `em`, `a`, `code/pre`. Consumers will need to style other HTML tags if used as children
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
