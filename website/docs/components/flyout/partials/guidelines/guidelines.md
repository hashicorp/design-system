## Usage

### When to use

When displaying additional information, context, or details about an object or element present on the main page.

### When not to use

- When requesting the user for information or feedback, use a [Modal](/components/modal).
- When displaying overly complex information, consider moving the content to its own page.

A Flyout is best used in scenarios when there are more details about a specific item or object that benefit from being easily accessible in the same page context, but may not be suited for a separate page. This is a conscious decision to limit the recommended usage to reduce the confusion between the Flyout and Modal, which have very similar interaction patterns.

!!! Do

Use a Flyout for detail more detailed information about an object on the main page.

![Flyout with custom content](/assets/components/flyout/flyout-custom-content.png)
!!!

#### Flyout complexity

!!! Dont

Don’t use a flyout for overly complex nested content, like objects within a table or nested routes.

![Flyout with a table](/assets/components/flyout/flyout-with-complex-content.png)
!!!

#### Functions within a Flyout

Given that a Flyout is intended to provide more detail on a specific item, don’t use a Flyout in a functional capacity; e.g., performing a CRUD (create, read, update, delete) function or submitting form data.

This type of content is often too complex and is better organized in its own page.

!!! Dont

![Flyout with actions](/assets/components/flyout/flyout-with-form.png)
!!!

#### Code snippets and examples

While code snippets and terminal scripts are usually detailed, they are well suited content within a Flyout due to their contextual relevancy to the content on the page, while maybe not being complex enough to exist on their own page.

!!! Do

![Flyout with code snippet](/assets/components/flyout/flyout-with-code-snippet.png)
!!!

## Size

Medium

<Hds::Flyout id="size-medium-flyout" class="doc-flyout-demo" open as |F|>
  <F.Header>Medium Flyout</F.Header>
  <F.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Flyout content</p>
  </F.Body>
</Hds::Flyout>

Large

<Hds::Flyout @size="large" id="size-large-flyout" class="doc-flyout-demo" open as |F|>
  <F.Header>Large Flyout</F.Header>
  <F.Body>
    <p class="hds-typography-body-300 hds-foreground-primary">Flyout content</p>
  </F.Body>
</Hds::Flyout>

### Best practices

![Sizes of the Flyout](/assets/components/flyout/flyout-sizes.png)

- Use a Flyout size that best accounts for the complexity and detail of the content.
- The **medium** size accounts for the _majority_ of scenarios and is the default recommended size.

## Flyout header

The Flyout header features several properties to better communicate the purpose and content within the component.

### Title icon

**With title icon**

<Hds::Flyout::Header @icon="info" @onDismiss={{this.noop}}>Title</Hds::Flyout::Header>

**Without title icon**

<Hds::Flyout::Header @onDismiss={{this.noop}}>Title</Hds::Flyout::Header>

#### Usage

An icon paired with the title can help reinforce the purpose and function of the Flyout while also drawing the eye to the header and title area.

The purpose and function of the Flyout should not rely solely on an icon, instead the title should be explicit and pragmatic while the icon provides visual support.

### Tagline

**With tagline**

<Hds::Flyout::Header @tagline="Tagline" @onDismiss={{this.noop}}>Title</Hds::Flyout::Header>

**With tagline and icon**

<Hds::Flyout::Header @tagline="Tagline" @icon="info" @onDismiss={{this.noop}}>Title</Hds::Flyout::Header>

A **tagline** helps the user maintain the context of the main page the Flyout was triggered from. Since a Flyout disables and obscures the main page content, adding a tagline can help the user understand the relationship between the Flyout and the main page.

The **tagline** should directly reference the page, feature title, or object to reinforce the purpose of the Flyout.

!!! Warning

Even though adding a title icon and tagline can help the user better understand the content, both elements add visual weight which might not be suitable or necessary for all Flyouts.
!!!

### Description

A **description** provides additional information about the Flyout.

**With description**

<Hds::Flyout::Header @onDismiss={{this.noop}}>Title</Hds::Flyout::Header>
<Hds::Flyout::Description>Description</Hds::Flyout::Description>

**With description and icon**

<Hds::Flyout::Header @icon="info" @onDismiss={{this.noop}}>Title</Hds::Flyout::Header>
<Hds::Flyout::Description>Description</Hds::Flyout::Description>

## Flyout body

The body of the Flyout supports any custom content, local components, or Helios components via an **instance swap property** (customInstance) in Figma. In code, `yield` is supported.

## Dismissal

The primary dismissal method for the Flyout is the dismiss action in the header. The Flyout does not support action buttons to “confirm” or “cancel” the Flyout as the component is not intended to perform functions.

Multiple dismissal options are available that can be customized in production with a callback (on `onClose`, or `onOpen`) function:

- Dismiss button in the header
- Clicking with a mouse outside of the Flyout on the main page
- Hitting the escape (`ESC`) key on a keyboard

![Flyout dismissal actions](/assets/components/flyout/flyout-dismissal.png)

## Positioning and responsive sizing

A Flyout should slide out from the right side of the viewport on top of the main page content and occupy 100% of the viewport height.

- This is true regardless of whether there is a sidebar or navigational element that persists on the page.
- A Flyout should overlay all content and block/disable interaction on the main page.

![Flyout in a desktop viewport](/assets/components/flyout/flyout-sizing.png)

<!-- ![Flyout in a mobile viewport](/assets/components/flyout/flyout-sizing-mobile.png =300x*) -->

!!! Info

In Figma, the Flyout should be paired with the [overlay](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?node-id=22928%3A55862&t=ZUcWdRNwXAJddKsS-1) component which obscures the main page content the Flyout sits on top of. Using the Flyout without the overlay is currently not supported and helps to communicate visually the `inert` nature of the main page.
!!!

On smaller viewports, the Flyout should occupy 100% of the viewport width minus a 40px margin from the viewport edge.

- If the body content of the Flyout exceeds the maximum height of the viewport, a scroll will be introduced.
- The Flyout header is not included in the scrolling section, only the body content. The header should always be visible to help the user understand the Flyout content and how it relates to the main page.
- The Flyout should _not_ be resized manually, rather select the size that best accommodates the content.
