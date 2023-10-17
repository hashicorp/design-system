## Usage

### When to use

- When displaying code examples and longer snippets of code that benefit from syntax highlighting.

### When not to use

- As a full-blown code editor
- When displaying keys, tokens, or other generated values, use a [CopySnippet](/components/copy/snippet) instead.

## Rounded corners

The `isRounded` increases the portability of the CodeBlock to ensure that it can be used in different contexts. For example, a common use case of the CodeBlock is a "standalone" context, which can be part of a form, multi-step process, or as part of the normal layout flow.

![Code Block with rounded corners in a standalone context](/assets/components/code-block/code-block-rounded-standalone.png)

It may sometimes be necessary to use the CodeBlock in a more dense layout or as part of another component. In this circumstance, setting `isRounded` to false may ensure that the CodeBlock fits better alongside other elements, in a split view, or as part of a larger layout mechanism.

![Code Block in a block context](/assets/components/code-block/code-block-block-level.png)

## Metadata

Use metadata to provide descriptive information, instructions, or to label a CodeBlock. Metadata is optional, but including a title or description can help to provide additional context about a specific block of code. We recommend treating these elements similarly semantically to a [form label](/components/form/primitives#formlabel) and [helper text](/components/form/primitives#helpertext).

![Example metadata in the Code Block](/assets/components/code-block/code-block-metadata.png)

## CopyButton

Use a CopyButton within the CodeBlock to make copying the snippet a single action. As the CopyButton is a nested Helios component, more details can be found in the [CopyButton guidelines](/components/copy/button).

### Line selection

If a user only needs to copy a portion of the CodeBlock, the relevant portion can be selected with a cursor and copied via the keyboard or mouse.

![Selecting a single line in the Code Block](/assets/components/code-block/code-block-line-selection.png)

## Line numbers

Line numbers are displayed by default and can make longer blocks of code and snippets easier to parse. This is especially true in the case of logs and long configuration files that may have a higher degree of complexity.

!!! Info

In the Figma component, the code examples have the appropriate number of lines by default, but must be manually hidden or displayed to match the length of custom snippets.
!!!

## Line highlighting

Line highlighting can be used to target specific lines or multiple lines within a block of code, and can be helpful when calling attention to a specific function or element.

![Example of line highlighting in the Code Block](/assets/components/code-block/code-block-line-highlighting.png)

!!! Info

In the Ember component, lines can be highlighted by passing a single line number, multiple line numbers, or a range of lines. For more examples refer to the [How to use](/?tab=code#highlightlines) documentation. 

Due to limitations in Figma, line highlighting (`highlightLines`) is a boolean property that displays a representative example of what a highlighted line will look like visually. This is not a property that can be controlled by the consumer, instead, intended highlighted lines should be communicated in the engineering handoff.
!!!

## Language

Language deteremines how syntax highlighting is applied and formatted within the block, but is handled a bit differently between the Ember and Figma components. 

The **Ember** component uses [Prism.js](https://prismjs.com/index.html) to handle syntax highlighting and supports close to [300 different languages and syntaxes](https://prismjs.com/index.html#supported-languages). The manner in which the syntax highlighting is applied is dependent on the defined language.

In **Figma** we provide a handful of example languages which are intended to be _representative_ of the end result in production. Syntax highlighting in Figma is a non-trivial process and requires the manual application of color styles to each "type" of code. Inputing a custom code snippet into the Code Block is supported, but syntax highlighting will not be automatically applied.

!!! Info

If you wish to create custom code examples when using the Code Block, we publish all of the relevant syntax highlighting styles in the HDS [Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?type=design&node-id=2130%3A2&mode=design&t=Pfj7CheLS6cR0hKa-1) library. However, due to the number languages supported by the component, the color styles make use of a generic naming schema to remain as agnostic as possible when being applied to different languages. 

If necessary for your project, it can be helpful to understand Prism's [token hierarchy](https://prismjs.com/tokens.html), but don’t hesitate to reach out the the HDS team for [support](/about/support).
!!!



