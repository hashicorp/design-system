## How to use this component

To use this component, you must either include the yielded `Title` component, provide an `@ariaLabel`, or specify an `@ariaLabelledBy`.

The basic invocation requires a `@value` argument. The component encodes this argument before displaying it.

!!! Warning

**Code alert**

If the `\n` escape sequence is used in the `@value` string in Handlebars, it will not be automatically converted to a newline, as it can have unexpected side effects.
!!!

[[code-snippets/code-block-basic]]

### Title and description

Optionally, you can pass a title and/or a description.

[[code-snippets/code-block-title-desc]]

### Title tag

The `@tag` argument changes the HTML element that wraps the `[CB].Title` content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if a CodeBlock is within a subsection of the page below a heading level 2, the value should be `"h3"`. 

!!! Warning

**Accessibility alert**

The default `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

[[code-snippets/code-block-tag]]

### Language

The `language` argument sets the syntax highlighting used. We only support the following languages: `bash`, `go`, `hcl`, `json`, `log`, `ruby`, `shell-session`, and `yaml`. If you need additional languages <LinkTo class="doc-link-generic" @route="show" @model="about/support">contact the Design Systems Team</LinkTo>

[[code-snippets/code-block-language]]

### Copy button

Set `hasCopyButton` to `true` to display a button for users to copy `CodeBlock` content to their computer clipboard. Use `copyButtonText` to provide a meaningful and unique label for the copy button. Set `onCopy` to a callback function that is invoked when the "copy" action succeeds.

[[code-snippets/code-block-copy-button]]

### Line numbers

Line numbers are displayed by default. Set `hasLineNumbers` to `false` to hide them.

[[code-snippets/code-block-no-line-numbers]]

!!! Warning

**Code alert**

Due to technical limitations, if the `@value` changes dynamically the line numbers will fail to update.
!!!

### Line wrapping

By default, long lines of code will overflow the `CodeBlock` container requiring users to scroll to view the full content. Setting `hasLineWrapping` to `true` will wrap long lines of code instead.

[[code-snippets/code-block-line-wrap]]

### Highlight lines

Highlight either individual code lines or a range of code lines. (Examples: `2, 4`, `6-10`)

[[code-snippets/code-block-highlight]]

### Limit height

Code content uses `auto` height by default but you can opt to set a `maxHeight` value to save space. If the content height exceeds the set max height, vertical scrolling is enabled to view the overflowing content and a toggle button is displayed to expand the height and show the Code Block content in its entirety.

[[code-snippets/code-block-max-height]]
