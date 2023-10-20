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
    Used to control whether a copy button for copying the code/text content will be displayed.
  </C.Property>
  <C.Property @name="hasLineNumbers" @type="boolean" @default="true">
    Used to control display of line numbers.
  </C.Property>
  <C.Property @name="hasLineWrapping" @type="boolean" @type="false">
    Used to control line wrapping for lines of code. If true, lines of code will wrap to fit the available space. Otherwise, horizontal scrolling is enabled if lines overflow the available space.
  </C.Property>
  <C.Property @name="highlightLines" @type="string">
    Accepts a list or range of line-numbers to highlight. (Examples: "2, 4" | "6-10" )
  </C.Property>
  <C.Property @name="maxHeight" @type="string" @default="auto">
    Accepts any valid CSS unit. If height is shorter than `CodeBlock` content, vertical is enabled.
  </C.Property>
  <C.Property @name="isReadOnly" @type="string" @default="true">
    Determines whether users can edit the text content of the `CodeBlock`.
  </C.Property>
</Doc::ComponentApi>
