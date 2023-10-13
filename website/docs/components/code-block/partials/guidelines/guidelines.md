## Usage

### When to use

- When displaying code examples and longer snippets of code that benefit from syntax highlighting.

### When not to use

- As a full-blown code editor
- When displaying keys, tokens, or other generated values, use a [CopySnippet](/components/copy/snippet) instead.

## Rounded corners

The `isRounded` increases the portability of the CodeBlock to ensure that it can be used in different contexts. For example, a common use case of the CodeBlock is a "standalone" context, which can be part of a form, multi-step process, or as part of the normal layout flow.

**Insert image of rounded standalone example**

It may sometimes be necessary to use the CodeBlock in a more dense layout or as part of another component. In this circumstance, setting `isRounded` to false may ensure that the CodeBlock fits better alongside other elements, in a split view, or as part of a larger layout mechanism.

**Insert image of non rounded example**

## Metadata

Use metadata to provide descriptive information, instructions, or to label a CodeBlock. Metadata is optional, but can help to provide additional context about a specific block of code. Either a title, or a description can be used within metadata, we recommend treating them similarly to a [form label](/components/form/primitives#formlabel) and [helper text](/components/form/primitives#helpertext).

**Insert image of metadata**

## CopyButton

Use a CopyButton within the CodeBlock to make copying the snippet a single action. As the CopyButton is a nested Helios component, more details can be found in the [CopyButton guidelines](/components/copy/button).

**Insert image of the CopyButton**

### Line selection

If a user only needs to copy a portion of the CodeBlock, the relevant portion can be selected with a cursor and copied via the keyboard or mouse.

**Insert representative image of selection**

## Line numbers

Line numbers are enabled by default and can make longer code blocks and snippets easier to parse. This is especiaally true in the case of logs and long configuration files that may have a higher degree of complexity.

**Insert image of line numbers**

## Line highlighting

Line highlighting can be used to target specific lines or multiple lines within a block of code. This can be helpful when calling attention to a specific function, or as a means to highlight a change or alteration between multiple CodeBlocks.

!!! Info

In the Ember component, lines can be highlighted by passing a single line number, multiple line numbers, or a range of lines. For more examples refer to the [How to use](/?tab=code#highlightlines) documentation. 

Due to limitations in Figma, line highlighting (`highlightLines`) is a boolean property that displays a representative example of what a highlighted line will look like visually. This is not a property that can be controlled by the consumer, instead, intended highlighted lines should be communicated in the engineering handoff.
!!!

## Language

!!! Info

Out of the box the CodeBlock supports any language and syntax highlighting in Prism's [supported languages](https://prismjs.com/index.html#supported-languages). If you have need a language not supported by Prism, or want to implement custom syntax highlighting please reach out the HDS team.
!!!

## Theming and syntax highlighting

