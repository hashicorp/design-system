## Usage

### When to use

- Use the `CopySnippet` component when you want users to be able to copy code snippets or text, such as URLs, tokens, or IDs.
- Use when users need to extract and use specific information like API keys, configuration settings, or unique identifiers.

### When not to use

- Avoid using a `CopySnippet` component to copy content outside its container.
- Don't use a `CopySnippet` in a code block. Instead, use a [Copy Button](/components/copy/button).

### Effective Usage

- Use the `CopySnippet` component for meaningful content that needs to be copied, avoiding trivial or readily available text. Examples include error messages and lengthy code snippets that don't require a full copy.

!!! Dont

![Example of the copy button component not using proper placement] (/assets/components/copy/copy-snippet-usage-example.png =875x*)

!!!

- There's no limit to the number of `CopySnippet` components on a page, but maintain a balance to avoid overwhelming the user or cluttering the interface.
- Use the `CopySnippet` judiciously for crucial information that users frequently need. This keeps the copied content relevant and valuable without causing confusion or clutter.

## Table Usage
There are a few reasons why using a `CopySnippet` component in a table may not be ideal:

1. **Complexity and Readability**: Tables often contain organized data with multiple rows and columns. If the content within each cell is long or complicated, like code snippets or lengthy text, using the `CopySnippet` component may reduce readability and make it harder to understand the copied content within the table format.

2. **Interference with Table Functionality**: Tables often have interactive features like sorting, filtering, or editing. Adding the `CopySnippet` component within the table cells might interfere with these functionalities, making it challenging for users to interact with the table or perform table-specific actions.

3. **Limited Space and Visual Clutter**: Placing the `CopySnippet` component within each table cell can take up additional space and create visual clutter, making navigating and understanding the table harder.


!!! Dont


![Example of the copy snippet component in a table] (/assets/components/copy/copy-snippet-overuse.png =875x*)

!!!

## Truncation

The `CopySnippet` truncates its content based on the width of its parent container. This ensures that the text fits well within the available space, preventing overflow. 

!!! Do

Proper usage of truncation in the `CopySnippet`

![Example of the copy snippet component using truncation] (/assets/components/copy/copy-snippet-do.png =275x*)

!!!

!!! Dont

Not using proper truncation, but wrapping to a multi-line. 

![Example of the separator component used improperly, causing clutter and disrupting content flow."](/assets/components/copy/copy-snippet-dont.png =275x*)

!!!

## Related

- [Copy Button](/components/copy/button)
- [Button](/components/button)