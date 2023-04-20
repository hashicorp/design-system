## Usage

### When to use

- When displaying additional information, context, or details about an object or element present on the main page.
- To enhance or extend the content or functionality within a user flow through non-blocking means.

### When not to use

- When requesting information or feedback from the user, use a [Modal](/components/modal).
- When displaying overly complex information, consider moving the content to its own page.

A Flyout is best used in scenarios when there are more details about a specific item or object that benefit from being easily accessible in the same page context, but may not be suited for a separate page. This is a conscious decision to limit the recommended usage to reduce the confusion between the Flyout and Modal, which have very similar interaction patterns.

!!! Do

Use a Flyout for detail more detailed information about an object on the main page.

![Flyout with custom content](/assets/components/flyout/flyout-custom-content.png)
!!!

#### Code snippets and examples

While code snippets and terminal scripts are usually detailed, they are well suited content within a Flyout due to their contextual relevancy to the content on the page, while maybe not being complex enough to exist on their own page.

!!! Do

![Flyout with code snippet](/assets/components/flyout/flyout-with-code-snippet.png)
!!!

#### Forms

Refrain from using a form or form elements in a Flyout, this type of content often complex and is more appropriate in its own page.

!!! Dont

![Form within a Flyout](/assets/components/flyout/form-in-flyout.png)
!!!

#### Actions

While a Flyout can support actions within the footer, it's not recommended to use the Flyout for most functional scenarios; e.g., editing user settings, batch editing, etc. These functions are better performed at the page level or within a Modal if simple enough.

!!! Dont

Actions within a modal image goes here.
!!!

### Flyout vs Modal

While similar in functionality and interaction, the Flyout and [Modal](/components/modal) are meant to be used in different scenarios and to express different types of content. There is a fair amount of overlap in their usage but they differentiate in these ways:

#### Complexity

A Flyout is useful for more complex content given the space it occupies in the viewport, while Modals are useful for less complex content that can be interacted with relatively quickly.

!!! Info

**Note:** Complexity of content is relative, use your own judgement to determine if the content or function is overly complex and consider moving it to its own page.
!!!

#### Status and messaging

Flyouts are useful when displaying detail content that relates to the page, while Modals are useful for messaging status; e.g., confirming a destructive action or warning about the effects of a change.

#### Speed and regularity

Modals are better suited for quick interactions that occur infrequently, while Flyouts, due to their support for more complex content, can occupy more of the users time and be recalled more frequently.

#### Experience hierarchy

While each of these components is triggered by a user action, where they exist in the flow is fundamentally different:

- A Modal blocks the user from progressing further in a feature (Fig 1.0), forcing them to take action or make a decision.
- A Flyout extends or "branches" off from the main flow to add detail and highlight secondary features and functions (Fig 1.1).
- Rather than blocking the user from continuing down a certain path, a Flyout enhances and adds detail to the primary path to aid in the completion of a function.

**Fig. 1.0:** Hierarchy representation of a Modal blocking the user progression through a flow.

![Modal Hierarchy in the user flow](/assets/components/flyout/flyout-vs-modal-01.png)

**Fig. 1.1:** Hierarchy representation of the Flyout relative to the user flow.

![Flyout hierarchy in the user flow](/assets/components/flyout/flyout-vs-modal-02.png)

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

## Flyout footer

The Flyout footer is a persistent content area at the bottom of the Flyout, and supports additional descriptive content, links, actions, and any other custom content or Helios components. 

The Ember and Figma components account for the footer in slightly different ways, though both can achieve the same results:

- The Ember component is a generic container that yields elements passed to it.
- The Figma component consists of a variant for the number of actions, as well as a `slot` for custom content.

!!! Info

The footer is **optional** and should be used sparingly as it increases the complexity of the Flyout.
!!!

<Hds::Flyout::Footer>
  <Hds::ButtonSet>
    <Hds::Button @color="primary" @text="Primary" />
    <Hds::Button @color="secondary" @text="Secondary" />
  </Hds::ButtonSet>
</Hds::Flyout::Footer>

!!! Do

While the footer supports any custom elements, we recommend limiting it's use to simple declarative content like text and links.

![Complex footer example](/assets/components/flyout/flyout-complex-footer.png)
!!!

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

!!! Info

In Figma, the Flyout should be paired with the [overlay](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?node-id=22928%3A55862&t=ZUcWdRNwXAJddKsS-1) component which obscures the main page content the Flyout sits on top of. Using the Flyout without the overlay is currently not supported and helps to communicate visually the `inert` nature of the main page.
!!!

On smaller viewports, the Flyout should occupy 100% of the viewport width minus a 40px margin from the viewport edge.

- If the body content of the Flyout exceeds the maximum height of the viewport, a scroll will be introduced.
- The Flyout header is not included in the scrolling section, only the body content. The header should always be visible to help the user understand the Flyout content and how it relates to the main page.
- The Flyout should _not_ be resized manually, rather select the size that best accommodates the content.
