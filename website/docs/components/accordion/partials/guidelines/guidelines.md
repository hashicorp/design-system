## Usage

### When to use

- To show content as needed while keeping the UI organized and visually manageable.
- To hide long pieces of content with a similar structure.

### When not to use

- To hide basic non-critical information to users. Instead, consider using a [Reveal](/components/reveal).
- To allow users switch between different content within the same context. Instead, consider using [Tabs](/components/tabs).

### Accordion vs Reveal

While similar in functionality and interaction, the Accordion and Reveal are meant to be used in different scenarios and use cases.

#### When to use the Accordion

- You have multiple sections of content that can be expanded or collapsed.

- Each section of content has its own toggle content, giving users the ability to access specific sections.

- Users need to navigate through different sections of content and selectively expand or collapse sections

- There is a sequential or hierarchical relationship between the different sections.

#### When to use the Reveal

- You have a single piece of content that can be expanded to collapsed to reveal additional details or information.

- The content within the toggle is plain text.

- The content within the reveal is relatively short and simple.

- There is no need for multiple independent sections or hierarchical relationship between different sections.

### Usage examples

!!! Do

Use the Accordion when you need to display content in different sections that have a sequential or hierarchical relationship between them.

![Accordion with basic content](/assets/components/accordion/usage-do.png =770x*)
!!!

!!! Dont

Don’t use the Accordion when you need to display a single piece of content that can expand and collapse. Use the [Reveal](/components/reveal) instead.

![Accordion with basic content](/assets/components/accordion/usage-do-not.png =770x*)
!!!

!!! Do

Use the Accordion when the toggle or the content is relatively complex.

![Accordion with complex content](/assets/components/accordion/usage-do-complex.png =770x*)
!!!

## Toggle content

The toggle accepts many different types of content, from text-based content to nested HDS components or custom content.

![Example of toggle content](/assets/components/accordion/toggle-content-text.png =690x*)

### Generic content

![Example of toggle content](/assets/components/accordion/toggle-content-custom.png =690x*)

### Interactive content

Use `isInteractive` when nesting interactive content on the toggle. This lets users using assistive technology, access and interact with the nested element.

- Use this variant only when you need to put interactive elements such as a button or a link within the toggle area. Avoid placing complex elements that may compromise the usability and accessibility of the component.

- When using this property, it should be applied to all items. Avoid mixing with default containers.

![Example of toggle content](/assets/components/accordion/toggle-content-interactive.png =800x*)

## Content type

!!! Info

The content type property is only relevant within Figma and doesn’t exist as a property in the code.
!!!

The `content` supports any custom content, local components, or Helios components via an `instance swap` property (customInstance) in Figma. In code, `yield` is supported.

### Default

![Example of content in accordion item](/assets/components/accordion/content-text.png =690x*)

### Custom

![Example of content in accordion item](/assets/components/accordion/content-custom.png =690x*)

## Related

<!-- only include the 2 most similar/related components -->
- [Reveal](/components/reveal)
