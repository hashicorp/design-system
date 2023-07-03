## Usage

### When to use

- To show content as needed while keeping the UI organized and visually manageable.
- To hide long pieces of content with a similar structure.

### When not to use

- To hide basic non-critical information to users. Instead, consider using a [Reveal](/components/reveal).
- To allow users switch between different content within the same context. Instead, consider using [Tabs](/components/tabs).

## Toggle content

The toggle accepts many different types of content, from text-based content to nested HDS components or custom content.

![Example of toggle content](/assets/components/accordion/toggle-content-text.png =690x*)

### Generic content

![Example of toggle content](/assets/components/accordion/toggle-content-custom.png =690x*)

### Interactive content

Use `isInteractive` when nesting interactive content on the toggle.

![Example of toggle content](/assets/components/accordion/toggle-content-interactive.png =690x*)

## Content type

!!! Info

The content type property is only relevant within Figma and doesn’t exist as a property within the code.
!!!

The `content` supports any custom content, local components, or Helios components via an `instance swap` property (customInstance) in Figma. In code, `yield` is supported.

### Default

![Example of content in accordion item](/assets/components/accordion/content-text.png =800x*)

### Custom

![Example of content in accordion item](/assets/components/accordion/content-custom.png =800x*)

## isOpen

The Accordion supports displaying one of the items by default on page load. In code, all accordion items are collapsed by default.

![Example of content in accordion item](/assets/components/accordion/accordion-item-open.png =800x*)

## Related

<!-- only include the 2 most similar/related components -->
- [Reveal](/components/reveal)
