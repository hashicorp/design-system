## Usage

### When to use

- To allow users to create and edit code with the support of syntax highlighting, change history, and keyboard navigation.

### When not to use

- To display static blocks of code.
- As an embedded terminal or terminal emulator.

## Header

Use a `title` and/or `description` in the header to provide additional information, instructions, or to label a Code Editor. Both of these components are optional, but including them can help to provide additional context about the code being edited.

![Example metadata in the Code Block](/assets/components/code-block/code-block-metadata.png)

### When not to use a header

There can be an overlap between content that you may choose to include in the header as a `title` or `description`, and content that is part of the normal layout flow in a headline or paragraph. If it is necessary to elevate this content in the hierarchy of the page, we recommend including it in the normal layout flow, rather than as a `title` or `description` within the Code Editor.

![An example showcasing the Code Block paired with content in the natural flow](/assets/components/code-block/code-block-dont-use-metadata.png)

## CopyButton

Use a CopyButton within the Code Editor to make copying the snippet a single action. More details can be found in the [CopyButton guidelines](/components/copy/button).

![An example of the Copy Button within the Code Block](/assets/components/code-block/code-block-copy-button.png)

## ExpandButton

Use an ExpandButton within the Code Editor to allow users to toggle between the full-screen and default versions of the editor.

## Language

Language determines how syntax highlighting is applied and formatted within the editor but is handled a bit differently between the Ember and Figma components.

The **Ember** component uses [CodeMirror](https://codemirror.net/) to handle syntax highlighting and comes with a pre-defined set of languages.

In **Figma** we provide a handful of example languages that are intended to be _representative_ of the end result in production. Syntax highlighting in Figma is a non-trivial process and requires the manual application of color styles to each "type" of code. Despite this, creating a custom code snippet with the Code Block is supported by typing/pasting into the text layer, but syntax highlighting will not be automatically applied.
