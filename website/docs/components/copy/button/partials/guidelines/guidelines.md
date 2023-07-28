## Usage

### When to use

- To copy plain text, large code snippets, and input values.
- When needing separation between the text-to-copy and the copy interaction.

### When not to use

- To copy short code snippets, such as URLs, tokens, IDs, use a [Copy Snippet](/components/copy/snippet).

## Sizes

The Copy Button comes in small and medium sizes. Use the size that best fits the hierarchy of the UI. 

<Doc::Layout @spacing="16px">
  <Hds::Copy::Button @text="Copy" @size="small" />
  <Hds::Copy::Button @text="Copy" @size="medium" />
</Doc::Layout>

## Placement 

Place the Copy Button as close to the content being copied as possible. Avoid too much visual separation between the content and the button to ensure users understand what will be copied to the clipboard.

!!! Dont

Placing the Copy Button far away from the content being copied may make it challenging for users to recognize what they are copying to their clipboard.

![Example of the Copy Button component using improper placement](/assets/components/copy/copy-button-placement-dont.png)
!!!

!!! Do

Placing a Copy Button close to the content explicitly communicates what is being copied.

![Example of the copy button component using proper placement](/assets/components/copy/copy-button-placement-do.png)
!!!

## Related

- [Copy Snippet](/components/copy/snippet)
- [Masked Input](/components/form/masked-input)
