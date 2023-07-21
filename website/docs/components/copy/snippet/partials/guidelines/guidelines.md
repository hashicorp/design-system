## Usage

### When to use

- Use the `Copy::Snippet` component to allow users to copy code snippets or text, such as URLs, tokens, or IDs.
- Use when users need to extract and use specific information like API keys, configuration settings, or unique identifiers.

### When not to use

- Avoid using a `Copy::Snippet` component to copy content outside its container.
- Don’t use a `Copy::Snippet` in a code block. Instead, use a [Copy Button](/components/copy/button).

### Effective Usage

- There’s no limit to the number of `Copy::Snippet` components on a page, but maintain a balance to avoid overwhelming the user or cluttering the interface.
- Use the `Copy::Snippet` judiciously for crucial information that users frequently need. This keeps the copied content relevant and valuable without causing confusion or clutter.

!!! Dont

Use the `Copy::Snippet` component for meaningful content that requires copying, while avoiding trivial or readily available text. Examples of suitable content include lengthy code snippets that don’t need to be copied in their entirety and easily accessible text that users can manually copy at their discretion.

![Example of the copy snippet component not using proper usage] (/assets/components/copy/copy-snippet-usage-example.png =675x*)

![Example of the copy snippet component not using proper usage] (/assets/components/copy/copy-snippet-usage-example-2.png =675x*)
!!!

## Table Usage
There are a few reasons why using a `Copy::Snippet` component in a table may not be ideal:

1. **Complexity and Readability**: Tables often contain organized data with multiple rows and columns. If the content within each cell is long or complicated, such as code snippets or lengthy text, using the `Copy::Snippet` component may reduce readability and make it harder to understand the copied content within the table format.

2. **Interference with Table Functionality**: Tables often have interactive features like sorting, filtering, or editing. Adding the `Copy::Snippet` component within the table cells might interfere with these functionalities, making it challenging for users to interact with the table or perform table-specific actions.

3. **Limited Space and Visual Clutter**: Placing the `Copy::Snippet` component within each table cell can take up additional space and create visual clutter, making navigating and understanding the table harder.


!!! Dont


![Example of the copy snippet component in a table] (/assets/components/copy/copy-snippet-overuse.png =875x*)

!!!

## Truncation

Truncation of the `Copy::Snippet` is optional and can be used as needed. When correctly applied, the `Copy::Snippet` shortens its content to fit within its parent container's width. Ensuring that the text stays within the container and only overflows if short.

!!! Do

Proper usage of truncation in the `Copy::Snippet`

![Example of the copy snippet component using truncation] (/assets/components/copy/copy-snippet-do.png =275x*)

!!!

!!! Dont

Not using proper truncation, but wrapping to a multi-line. 

![Example of the separator component used improperly, causing clutter and disrupting content flow."](/assets/components/copy/copy-snippet-dont.png =275x*)

!!!

## Related

- [Copy Button](/components/copy/button)
- [Button](/components/button)