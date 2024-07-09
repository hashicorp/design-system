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

## Sizes

The Accordion comes in three sizes: `small`, `medium`, and `large`. We recommend `medium` for most use cases, but use whichever size best fits your UI’s needs.

![Example of various Accordion sizes](/assets/components/accordion/accordion-size-range.png)

!!! Dont

The size is set at the Accordion (group) level; don’t mix different sizes of Accordion items. This is a Figma-only issue.

![Example of incorrectly combined Accordion sizes](/assets/components/accordion/accordion-size-Dont.png)
!!!

## Types

The Accordion offers two container types: `card` and `flush` to fit different use cases.

### Card

The `card` variant is the default and recommended type. It creates a visual separation between accordion sections and other UI elements, organizes blocks of content, and distinguishes between sections within `tabs`.

!!! Do

![Example of appropriate usage of the Accordion card variant](/assets/components/accordion/accordion-card-type-example.png)
!!!

### Flush

Use the `flush` variant where space is limited such as within a [Card](/components/card), [Flyout](/components/flyout), or sidebar.

!!! Do

![Example of recommended usage of the Flush variant](/assets/components/accordion/accordion-flush-example.png)
!!!

## Toggle

### Toggle type

The toggle accepts many different types of content, from text-based content to nested HDS components or custom content.

#### Text

![Example of toggle content](/assets/components/accordion/toggle-content-text.png =690x*)

#### Custom 

![Example of toggle content](/assets/components/accordion/toggle-content-custom.png =690x*)

### Interactive 

Use `containsInteractive` when nesting interactive content in the toggle. This lets users using assistive technology, access and interact with the nested element.

When using this property, it should be applied to all items. Avoid mixing with default toggles.

!!! Warning

Use this variant only when you need to put interactive elements such as a button or a link within the toggle area. Avoid placing complex elements that may compromise the usability and accessibility of the component.
!!!

![Example of toggle content](/assets/components/accordion/toggle-content-interactive.png =800x*)

### Static

The `isStatic` property removes the the ability to interact with the AccordionItem toggle, keeping it fixed in either an open or closed state based on the `isOpen` property. This is useful when you want to show important information in the Accordion that should always stay open or closed, making it stand out as different from the other items.

This example depicts the `isStatic` property being used to prevent interaction with a skipped step in a triggered Terraform run.

![Example of a Terraform run with a closed static AccordionItem](/assets/components/accordion/accordion-isStatic-example.png)

![Example of a Terraform run with an open static AccordionItem](/assets/components/accordion/accordion-isStatic-open-example.png)

## Content type

!!! Info

The content type property is only relevant within Figma and doesn’t exist as a property in the code.
!!!

The `content` supports any custom content, local components, or Helios components via an `instance swap` property (customInstance) in Figma. In code, `yield` is supported.

### Default

![Example of default content in accordion item](/assets/components/accordion/content-text.png =690x*)

### Custom

![Example of custom content in accordion item](/assets/components/accordion/content-custom.png =690x*)

## Nesting Accordions

!!! Info

Nesting Accordions is only supported [in code](/components/accordion?tab=code#complex-html-content), as Figma does not support nesting an instance inside itself. 

While you can work around this by detaching the HDS component and turning it into a local component, then inserting the local component within the linked HDS component, we do not recommend this approach. Doing so means your local Accordion component will not receive future updates.
!!!

Nesting Accordions can help organize complex content, but should be used in moderation, and is only recommended for the `flush` variant.

!!! Do

Use nested Accordions for up to two layers of related content. You can nest `flush` Accordions within each other or inside `card` type Accordions. 

![Example of a flush Accordion nested inside of a card within another flush Accordion](/assets/components/accordion/accordion-nesting-do.png)
!!!

!!! Dont

Avoid nesting `card` Accordions within each other to prevent excessive visual noise.

![Incorrect example of two card variants nested within each other](/assets/components/accordion/accordion-nesting-example-dont.png)
!!!

## Composition with other components

### Expand and collapse all accordions

By composing the Accordion with other HDS components, you can provide users with a way to expand and collapse all AccordionItems at once. Expanding all AccordionItems allows users to view and compare content easily, while collapsing provides a summary and reduces cognitive load.

We recommend using a `secondary` [Button](/components/button#secondary) above the Accordion, aligned to the right. A `tertiary` [Button](/components/button#tertiary) can be used if less prominence is needed. Use the small variant of the [Button](/components/button) for any size variant of the Accordion.

To ensure consistency across all products, use “Expand all” / “Collapse all” as the Button label and the `unfold-open` and `unfold-close` icons in the leading position.

![Secondary & tertiary button examples used for “Expand all” and “Collapse all” functionality](/assets/components/accordion/accordion-patterns-expand-collapse-all-labels.png)

Note that if an AccordionItem is static, the expand/collapse all feature will not affect its behavior.

!!! Dont 

Avoid using this feature if only one AccordionItem is visible.

![show example of terraform roles flyout design](/assets/components/accordion/accordion-patterns-collapse-all-dont.png)
!!!