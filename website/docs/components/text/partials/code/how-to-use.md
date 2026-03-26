!!! Info

There is no `Text` component in Figma, but an equivalent set of [typographic Figma styles](https://www.figma.com/design/uX4OEaJQdWfzULADchjAeN/HDS-Foundations-v2.0?node-id=1262-9192&t=z7hDCKFFuGUMDRYe-1).

!!!

The `Text` component is a **code-only** component used to apply specific predefined HDS typographic styles to a block of text or content.

## How to use this component

The `Text` component is available in three different variants with a one-to-one association between the namespace (eg. `::Display`) and the [corresponding style in Figma](https://www.figma.com/design/uX4OEaJQdWfzULADchjAeN/HDS-Foundations-v2.0?node-id=1262-9192&t=z7hDCKFFuGUMDRYe-1).

[[code-snippets/text-basic]]

When no `@tag` argument is provided, the text element is rendered as a `<span>` by default.

### HTML tag

To specify which HTML tag to use to render the element, use the `@tag` argument:

[[code-snippets/text-tag]]

!!! Warning

**Accessibility alert**

While by default the component renders a `<span>`, we invite consumers to:

- consider which semantic HTML tag is the correct one for the context in which the text is used
- always set a `@tag` value accordingly, to make the semantic choice explicit
!!!

### Size

To specify which size to apply to the text, use the `@size` argument:

[[code-snippets/text-size]]

Different style variants support different sizes: refer to the [Component API](#component-api) section for details.

### Weight

!!! Critical

**Important**

Different typographic styles support only [a limited set of font weights](/foundations/typography?tab=code#style-and-weight).
Refer to the [Component API](#component-api) section to see what the allowed combinations are for the different styles.

!!!

To apply a specific font weight to the text, use the `@weight` argument:

[[code-snippets/text-weight]]

### Alignment

To specify a text alignment, use the `@align` argument:

[[code-snippets/text-align]]

### Color

It is possible to apply a specific **foreground** color to the text (from a predefined list) using the `@color` argument:

[[code-snippets/text-color]]

For the list of possible foreground colors supported, refer to the [Component API](#component-api) section for details.

It’s also possible to provide a CSS color as string (in this case the color will be applied as inline style). The string can be a CSS `var()` that uses one of the [predefined color tokens](/foundations/colors?tab=palette):

[[code-snippets/text-color-var]]

Or it can be one of the standard CSS color formats (hex, rgb, rgba, hsl, etc.):

[[code-snippets/text-color-custom]]

!!! Warning 

**Consumer responsibility**

We don’t validate the CSS color string to ensure that the value used is correct.
!!!

### Structured content

Since the component is not prescriptive on the tags that can be used to render the text, it can be used to apply a typographic style not only to plain text but also to structured content:

[[code-snippets/text-structured-content]]

In some cases, you may want to apply a typographic style to an entire block of content. While technically possible, this isn’t always desirable or appropriate. Be mindful of the underlying HTML structure. Semantic markup supports accessibility and helps maintain clean, readable code for developers now and in the future: 

[[code-snippets/text-structured-content-block]]
