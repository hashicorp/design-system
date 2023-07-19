## Usage

### When to use

- Use the `CopyButton` to conveniently copy large text blocks, such as code snippets, API keys, or Tokens. 
- Don't use the `CopyButton` to copy the text within the button container, instead use a `CopySnippet`

### When not to use

- Don’t place the `CopyButton` in a disconnected location. It should be visually associated with specific content or context to prevent confusion.

## Sizes

The `CopyButton` default size is medium, but you can choose a different size that best suits your UI. For example, avoid using a medium-sized `CopyButton` in a small code block where it looks out of place. Ensure that the size of the `CopyButton` aligns well with the surrounding elements. 

## Content

Keep the text short, around 25 characters. Provide enough context to be helpful, avoiding complete sentences.

## Placement 

Don’t place the `CopyButton` in a disconnected area within the UI. It should be visually associated with specific content or context to prevent user confusion.

!!! Do

Keeping the `CopyButton` in conjunction with the content being copied enables users to easily recognize what they are copying to their clipboard.

![Example of the copy button component using proper placement] (/assets/components/copy/copy-button-placement-do.png =875x*)

!!!

!!! Dont

Not placing the `CopyButton` in conjunction with the content being copied may make it challenging for users to recognize what they are copying to their clipboard.

![Example of the copy button component not using proper placement] (/assets/components/copy/copy-button-placement-dont.png =875x*)

!!!

## Related

- [Copy Snippet](/components/copy/snippet)
- [Button](/components/button)
