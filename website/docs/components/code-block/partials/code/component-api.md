## Component API

This component uses [prism.js](https://prismjs.com/) under the hood.

<Doc::ComponentApi as |C|>
  <C.Property @name="value" @type="string">
    The text/code content for the CodeBlock.
  </C.Property>
  <C.Property @name="language" @type="string" @default="javascript">
    The coding language to use for syntax highlighting.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    If true, displays a copy button for copying the text/code content.
  </C.Property>
  <C.Property @name="lineNumbers" @type="boolean" @default="false">
    Displays line numbers for each line of code if set to true.
  </C.Property>
  <C.Property @name="lineWrapping" @type="boolean" @type="false">
    If true, lines of code will wrap to fit the available space. Otherwise horizontal scrolling is enabled.
  </C.Property>
  <C.Property @name="highlight" @type="string">
    Accepts a list or range of line-numbers to highlight. (Examples: "2, 4" | "6-10" )
  </C.Property>
  <C.Property @name="maxHeight" @type="string" @default="auto">
    Accepts any valid CSS unit. If height is shorter than `CodeBlock` content, vertical is enabled.
  </C.Property>
  <C.Property @name="readOnly" @type="string" @default="true">
    If false, users can edit the text content of the `CodeBlock`.
  </C.Property>
</Doc::ComponentApi>
