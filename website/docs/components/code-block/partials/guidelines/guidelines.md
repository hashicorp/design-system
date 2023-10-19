## Usage

### When to use

- When displaying code examples and longer snippets of code that benefit from syntax highlighting.

### When not to use

- As a full-blown code editor
- When displaying keys, tokens, or other generated values, use a [CopySnippet](/components/copy/snippet) instead.

## Inline

The `isInline` property increases the portability of the CodeBlock to ensure that it can be used in different contexts. For example, a common use case of the CodeBlock is in a "standalone" context, which can be part of a form, multi-step process, and is generally a part of the normal layout flow.

![Code Block with rounded corners in a standalone context](/assets/components/code-block/code-block-rounded-standalone.png)

Sometimes it may be necessary to use the CodeBlock in a more dense layout or nested within another component. In this circumstance, setting `isInline` to true ensures that the CodeBlock fits alongside other elements, in a split view, or as part of a larger layout mechanism.

![Code Block in a block context](/assets/components/code-block/code-block-block-level.png)

## Header

Use a `title` or `description` in the Header to provide additional information, instructions, or to label a CodeBlock. Both of these properties are optional, but including them can help to provide additional context about a specific block of code.

![Example metadata in the Code Block](/assets/components/code-block/code-block-metadata.png)

### When not to use a Header

There can be an overlap between content that you may choose to include in the Header as a `title` or `description`, and content that is part of the normal layout flow in a headline or paragraph. If it is necessary to elevate this content in the hiearchy of the page, we recommend including it in the normal layout flow, rather than as a `title` or `description` within the Code Block.

![An example showcasing the Code Block paired with content in the nautral flow](/assets/components/code-block/code-block-dont-use-metadata.png)

## CopyButton

Use a CopyButton within the CodeBlock to make copying the snippet a single action. More details can be found in the [CopyButton guidelines](/components/copy/button).

![An example of the Copy Button within the Code Block](/assets/components/code-block/code-block-copy-button.png)

### Line selection

If a user needs to copy only a portion of the CodeBlock, the relevant portion can be selected with a cursor and copied via the keyboard or mouse.

![Selecting a single line in the Code Block](/assets/components/code-block/code-block-line-selection.png)

## Line numbers

Line numbers are displayed by default and can make longer blocks of code and snippets easier to parse. This is especially true in the case of logs and long configuration files that may have a higher degree of complexity.

![Example of line numbers within the Code Block](/assets/components/code-block/code-block-line-numbers.png)

!!! Info

In the Figma component, the code examples have the appropriate number of lines by default, but must be manually hidden or shown to match the length of custom snippets.
!!!

## Line highlighting

Use line highlighting to target and call attention to specific lines or multiple lines within a block of code.

![Example of line highlighting in the Code Block](/assets/components/code-block/code-block-line-highlighting.png)

!!! Info

In the Ember component, lines can be highlighted by passing a single line number, multiple line numbers, or a range of lines. For more examples refer to the [How to use](/?tab=code#highlightlines) documentation. 

In the Figma component, line highlighting (`highlightLines`) is a boolean property that displays a _representative_ example of what a highlighted line will look like visually and is not a property that can be controlled by the consumer. Instead, lines that are intended to be highlighted should be communicated in the engineering handoff or annotated in the design file.
!!!

## Language

Language deteremines how syntax highlighting is applied and formatted within the block, but is handled a bit differently between the Ember and Figma components. 

The **Ember** component uses [Prism.js](https://prismjs.com/index.html) to handle syntax highlighting and supports close to [300 different languages and syntaxes](https://prismjs.com/index.html#supported-languages). The manner in which the syntax highlighting is applied is dependent on the value passed to the component.

In **Figma** we provide a handful of example languages which are intended to be _representative_ of the end result in production. Syntax highlighting in Figma is a non-trivial process and requires the manual application of color styles to each "type" of code. Despite this, creating a custom code snippet with the Code Block is supported by typing/pasting into the text layer, but syntax highlighting will not be automatically applied.

### Applying syntax highlighting

If you wish to create custom examples using the Code Block, we publish all of the relevant syntax highlighting styles in the HDS [Foundations](https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/HDS-Product---Foundations?type=design&node-id=2130%3A2&mode=design&t=Pfj7CheLS6cR0hKa-1) library. However, due to the number languages supported by the component, the color styles use a generic naming schema (e.g., cyan, red, purple) to remain as agnostic as possible when being applied to different languages.

!!! Info

Working directly with an engineering partner can reveal exactly how a snippet will render in the component and should be the first course of action when creating custom snippets. Understanding Prism's [token hierarchy](https://prismjs.com/tokens.html) can also be helpful when creating examples.

If you have questions or need assistance creating custom examples, don’t hesitate to reach out the the HDS team for [support](/about/support).
!!!

To aid in understanding how the highlighting theme is applied via Prism's tokens, we've provided a high-level, non-exhaustive list of token names and how they might be applied depending on the syntax.

| Color | Usage |
|-------|-------|
| Cyan | Property, url, or operator |
| Blue | Function, builtins |
| Orange | Strings, characters |
| Purple | Booleans, numbers |
| Green | Keywords, class names, saving the world |
| Red | Important items |
| White | Default color within the code block, also used for punctuation (`<`, `{ }`, `=`, etc) |
| Gray | Used for comments across languages |
