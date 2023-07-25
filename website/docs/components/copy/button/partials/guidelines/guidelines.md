## Usage

### When to use

- To copy large text blocks, such as code snippets, API keys, or Tokens. 

### When not to use

- To copy the text within the button, use a [Copy Snippet](/components/copy/snippet).

## Sizes

The `Copy::Button` comes in small and medium sizes. Use the size that best fits the hierarchy of the UI. 

<Doc::Layout @spacing="16px">
  <Hds::Copy::Button @text="Copy" @size="small" />
  <Hds::Copy::Button @text="Copy" @size="medium" />
</Doc::Layout>

## Placement 

Don’t place the `Copy::Button` in a disconnected area within the UI. It should be visually associated with specific content or context to prevent user confusion.

!!! Do

Keeping the `Copy::Button` near the content being copied enables users to recognize what they are copying to their clipboard.

![Example of the copy button component using proper placement] (/assets/components/copy/copy-button-placement-do.png)
!!!

!!! Dont

Placing the `Copy::Button` far away from the content being copied may make it challenging for users to recognize what they are copying to their clipboard.

![Example of the Copy Button component using improper placement] (/assets/components/copy/copy-button-placement-dont.png)
!!!

## Related

- [Copy Snippet](/components/copy/snippet)
- [Masked Input](/components/form/masked-input)
