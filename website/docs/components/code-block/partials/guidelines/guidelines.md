## Usage

### When to use

- When displaying code examples and longer snippets of code that benefit from syntax highlighting.

### When not to use

- As a full-blown code editor.
- As an embedded terminal or terminal emulator.

### When to use a Code Block vs. a Copy Snippet

There is some overlap in the copying functionality of the [Copy Snippet](/components/copy/snippet) and the Code Block. Which to use generally comes down to the complexity of the code/value displayed within the component, and whether the user benefits from seeing the larger context of the code example.

**Use a Code Block:**

- If viewing or displaying code is the primary purpose, and copying the code is secondary.
- If the example consists of a command, e.g., a `curl` and `bash` script. These are oftentimes on a single line, but consist of multiple commands and functions.

**Use a Copy Snippet:**

- If copying the code is the primary purpose, and viewing the code is secondary.
- If allowing the user to copy an API key or other **single** value or string.
- If seeing the value in a larger context of where it's expected to be pasted into isn’t necessary.

## Standalone

The `isStandalone` property increases the portability of the Code Block to ensure that it can be used in different contexts. For example, a common use case of the Code Block is in a "standalone" context, which can be part of a form, multi-step process, and is generally a part of the normal layout flow.

![Code Block with rounded corners in a standalone context](/assets/components/code-block/code-block-rounded-standalone.png)

Sometimes it may be necessary to use the Code Block in a more dense layout or nested within another component. In this circumstance, setting `isStandalone` to false ensures that the Code Block fits alongside other elements, in a split view, or as part of a larger layout mechanism.

![Code Block in a block context](/assets/components/code-block/code-block-block-level.png)

## Header

Use a `title` and/or `description` in the header to provide additional information, instructions, or to label a Code Block. Both of these properties are optional, but including them can help to provide additional context about a specific block of code.

![Example metadata in the Code Block](/assets/components/code-block/code-block-metadata.png)

### When not to use a header

There can be an overlap between content that you may choose to include in the header as a `title` or `description`, and content that is part of the normal layout flow in a headline or paragraph. If it is necessary to elevate this content in the hierarchy of the page, we recommend including it in the normal layout flow, rather than as a `title` or `description` within the Code Block.

![An example showcasing the Code Block paired with content in the natural flow](/assets/components/code-block/code-block-dont-use-metadata.png)

## CopyButton

Use a CopyButton within the Code Block to make copying the snippet a single action. More details can be found in the [CopyButton guidelines](/components/copy/button).

![An example of the Copy Button within the Code Block](/assets/components/code-block/code-block-copy-button.png)

### Line selection

If a user needs to copy only a portion of the Code Block, the relevant portion can be selected with a cursor and copied via the keyboard or mouse.

![Selecting a single line in the Code Block](/assets/components/code-block/code-block-line-selection.png)

## Line numbers

Line numbers are displayed by default and can make longer blocks of code and snippets easier to parse. This is especially true in the case of logs and long configuration files that may have a higher degree of complexity.

![Example of line numbers within the Code Block](/assets/components/code-block/code-block-line-numbers.png)

!!! Info

In the Figma component, the code examples have the appropriate number of lines by default but must be manually hidden or shown to match the length of custom snippets.
!!!

## Line highlighting

Use line highlighting to target and call attention to specific lines or multiple lines within a block of code.

![Example of line highlighting in the Code Block](/assets/components/code-block/code-block-line-highlighting.png)

!!! Info

In the Ember component, lines can be highlighted by passing a single line number, multiple line numbers, or a range of lines. For more examples, refer to the [How to use](/?tab=code#highlightlines) documentation.

In the Figma component, line highlighting (`highlightLines`) is a boolean property that displays a _representative_ example of what a highlighted line will look like visually and is not a property that can be controlled by the consumer. Instead, lines that are intended to be highlighted should be communicated in the engineering handoff or annotated in the design file.
!!!

## Language

Language determines how syntax highlighting is applied and formatted within the block but is handled a bit differently between the Ember and Figma components.

The **Ember** component uses [Prism.js](https://prismjs.com/index.html) to handle syntax highlighting and comes with a pre-defined set of languages.

In **Figma** we provide a handful of example languages that are intended to be _representative_ of the end result in production. Syntax highlighting in Figma is a non-trivial process and requires the manual application of color styles to each "type" of code. Despite this, creating a custom code snippet with the Code Block is supported by typing/pasting into the text layer, but syntax highlighting will not be automatically applied.

### Applying syntax highlighting

If you wish to create custom examples using the Code Block, we publish all of the relevant syntax highlighting variables in the [HDS Components v2.0](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=67166-37020&t=gWdKy44MzTP4cTRo-1) library. However, due to the number of languages supported by the component, the color styles use a generic naming schema (e.g., cyan, red, purple) to remain as agnostic as possible when being applied to different languages.

For more details around syntax visit the [specifications](?tab=specifications).
