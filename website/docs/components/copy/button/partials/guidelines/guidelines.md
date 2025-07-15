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

## Composition with other components

Since the CopyButton can target almost any associated DOM element, it can be composed with other Helios components to create and support more complex scenarios and use cases.

### With form inputs

When combining the CopyButton with form inputs:

- Use the [Fieldset](/components/form/primitives?tab=code#formfieldset) form primitive.
- Wrap the `Base` input control (generally a TextInput, MaskedInput, or Textarea) and CopyButton in a container. This is not supported by the component out of the box, but can accomplished using a custom layout wrapper.
- Use the `isIconOnly` variant of the CopyButton as there is a enough visual association using this layout method.

![Example container wrapping of a control and CopyButton](/assets/components/copy/copy-button-composition-input-wrapping.png)

This ensures that other form primitives (helper text, error, etc) will span the combined width of the input control and the CopyButton.

#### Single line inputs

A simple example composition of a CopyButton and [TextInput](/components/form/text-input) or [MaskedInput](/components/form/masked-input).

![Simple example composing a TextInput with the CopyButton](/assets/components/copy/copy-button-composition-single-line-input-simple.png)

A more complex composition with helper and error text.

![A more complex example composing a TextInput with the CopyButton](/assets/components/copy/copy-button-composition-single-line-input-complex.png)

#### Multi-line inputs

In the case of a multi-line input (e.g., a [Textarea](/components/form/textarea) or multi-line [MaskedInput](/components/form/masked-input)), align the CopyButton to the top of the control.

![Simple example composing a multiline Textarea with the CopyButton](/assets/components/copy/copy-button-composition-multi-line-input-simple.png)

![A more complex example composing a multiline Textarea with the CopyButton](/assets/components/copy/copy-button-composition-multi-line-input-complex.png)