## Usage

### When to use

- When providing an interactive environment for users to write and edit code.
- When syntax highlighting and code formatting are essential for the user experience.

### When not to use

- As a simple display for static code snippets.
- As an embedded terminal or terminal emulator.

### When to use a Code Editor vs. a Code Block

There is some overlap in the functionality of the Code Editor and the Code Block. Which to use generally comes down to the need for interactivity and user input.

**Use a Code Editor:**

- If editing or writing code is the primary purpose.

**Use a Code Block:**

- If viewing or displaying code is the primary purpose, and editing is not needed.
- If providing an example which consists of static code snippets or commands.

## Header

Use a `title` and/or `description` in the header to provide additional information, instructions, or to label a Code Editor. Both of these yielded subcomponents are optional, but including them can help to provide additional context about a specific block of code.

![Example metadata in the Code Editor](/assets/components/code-editor/code-editor-metadata.png)

### When not to use a header

There can be an overlap between content that you may choose to include in the header as a `title` or `description`, and content that is part of the normal layout flow in a headline or paragraph. If it is necessary to elevate this content in the hierarchy of the page, we recommend including it in the normal layout flow, rather than as a `title` or `description` within the Code Editor.

![An example showcasing the Code Editor paired with content in the natural flow](/assets/components/code-editor/code-editor-dont-use-metadata.png)


