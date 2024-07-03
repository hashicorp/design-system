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

Use `containsInteractive` when nesting interactive content in the toggle. This lets users using assistive technology, access and interact with the nested element.

When using this property, it should be applied to all items. Avoid mixing with default toggles.

!!! Warning

Use this variant only when you need to put interactive elements such as a button or a link within the toggle area. Avoid placing complex elements that may compromise the usability and accessibility of the component.
!!!

![Example of toggle content](/assets/components/accordion/toggle-content-interactive.png =800x*)

## Sizes

Our accordion comes in three sizes: `small`, `medium`, and `large`. We recommend using `medium`, but use whichever size best fits your UI’s needs.

![Image here of different sizes - only card variant](/assets/components/accordion/accordion-size-range.png)

!!! Dont

The size is set at the Accordion (group) level, so accordionItem sizes are not interchangeable.

![Image here of DONT change sizes - only card variant](/assets/components/accordion/accordion-size-Dont.png)
!!!

## Types

Our accordion has two container types: `card` and `flush`.

### Card

The `card` variant is the default and recommended type, creating visual separation between accordion sections and other UI elements. It helps organize content blocks and distinguish between sections within tabs. Unlike `Cards`/`Tiles` or `Tables`, the `card` variant groups multiple expandable sections for flexible content management.

!!! Do

![image of DO example for the card variant](/assets/components/accordion/accordion-card-type-example.png)
!!!

### Flush

Use the flush variant for tight spaces. For example, use it within other containers like cards and flyouts, or in sidebars where space is limited.

!!! Do

![image of DO example for the Flush variant](/assets/components/accordion/accordion-flush-example.png)
!!!

### Static AccordionItems

The `isStatic` property allows an accordion item to be opened or closed by default, but not toggleable between its set `isOpen` property. This is useful when needing to represent a piece of information that is relevant to your accordion content, but highlighting the `isStatic` version as the exception within the group.

An example of this would be the following:

![terraform example of a run being triggered with a step that is skipped - use UI helper to show the skipped step as “skipped.”](/assets/components/accordion/accordion-isStatic-example.png)

## AccordionItem

## Content type

!!! Info

The content type property is only relevant within Figma and doesn’t exist as a property in the code.
!!!

The `content` supports any custom content, local components, or Helios components via an `instance swap` property (customInstance) in Figma. In code, `yield` is supported.

### Default

![Example of content in accordion item](/assets/components/accordion/content-text.png =690x*)

### Custom

![Example of content in accordion item](/assets/components/accordion/content-custom.png =690x*)

### Nesting Accordions

!!! Info

Nesting is only available in code. Figma does not support nesting an instance inside itself. You can detach the HDS component and turn it into a local component, then insert the local component within the HDS component. We strongly advise against this as it means your local Accordion component will not receive future component updates. [Link to Code example]
!!!

Nesting accordions can help organize complex content but should be used in moderation. This feature is only recommended for the `flush` variant.

!!! Do

Use nested accordions for up to two layers of related content. You can nest flush accordions within each other or inside card accordions. 

![Image example, card and flush and flush and flush](/assets/components/accordion/accordion-nesting-example.png)
!!!

!!! Dont

Avoid nesting card accordions within each other to prevent excessive visual noise.

![Show images of two card variants nested in each other](/assets/components/accordion/accordion-nesting-example-dont.png)
!!!

## Composition with other components

### Expand and collapse all accordions

By using composition with other HDS components, you can provide users with a way to expand and collapse all AccordionItems at once. Expanding all AccordionItems allows users to view and compare content easily, while collapsing provides a summary and reduces cognitive load.

We recommend using a secondary Button above the Accordion, aligned to the right. A tertiary button can be used if less prominence is needed.

To ensure consistency across all products, use “Expand all” / “Collapse all” as the Button label and the unfold-open and unfold-close icons in the leading position.

![show image of the secondary & tertiary buttons each with expand all and collapse all](/assets/components/accordion/accordion-patterns-expand-collapse-all-labels.png)

Note that if an AccordionItem is static, the expand/collapse all feature will not affect its behavior.

!!! Dont 

Avoid using this feature if only one AccordionItem is visible.

![show example of terraform roles flyout design](/assets/components/accordion/accordion-patterns-collapse-all-dont.png)
!!!