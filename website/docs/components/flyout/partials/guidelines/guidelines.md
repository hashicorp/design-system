## Usage

### When to use

- When displaying additional information, context, or details that extend or enhance an object or element on the main page.
- To present functions that are secondary to the main page or user flow.
- To preview content without navigating or routing to a new page.

### When not to use

- When requesting information or feedback from the user through a form. Instead, use a [Modal](/components/modal) or consider moving the content to its own page.
- When displaying overly complex information, consider moving the content to its own page.

### Flyout vs Modal

While similar in functionality and interaction, the Flyout and [Modal](/components/modal) are meant to be used in different scenarios and to express different types of content. There is a fair amount of overlap in their usage but they differ in complexity, status and messaging, speed and regularity, and experience hierarchy.

#### Complexity

A Flyout is useful for more complex content, given the space it occupies in the viewport, while Modals are useful for less complex content that can be interacted with quickly.

!!! Info

**Note:** Complexity of content is relative, use your own judgment to determine if the content or function is overly complex and consider moving it to its own page.
!!!

#### Status and messaging

Flyouts are useful when displaying detailed content that relates to the page, while Modals are useful for messaging status, e.g., confirming a destructive action or warning about the effects of a change.

#### Speed and regularity

Modals are better suited for quick interactions that occur infrequently, while Flyouts, due to their support for more complex content, can occupy more of the users’ time and be recalled more frequently.

#### Experience hierarchy

While each of these components is triggered by a user action, where they exist in the flow is fundamentally different:

- A Modal blocks the user from progressing further in the main flow (Fig 1.0), forcing them to take action or make a decision.
- A Flyout extends or "branches" off from the main flow to add detail and highlight secondary features and functions (Fig 1.1).
- Rather than blocking the user from continuing in the main flow, a Flyout enhances and adds detail to the flow to aid in the completion of a function.

**Fig. 1.0:** Hierarchy representation of a Modal blocking the user progression through a flow.

![Modal Hierarchy in the user flow](/assets/components/flyout/flyout-vs-modal-01.png)

**Fig. 1.1:** Hierarchy representation of the Flyout relative to the user flow.

![Flyout hierarchy in the user flow](/assets/components/flyout/flyout-vs-modal-02.png)

### Usage examples

#### Preview content

Previewing read-only content is an ideal use case for a Flyout as it keeps the user in the context of the current flow while detailing additional secondary information.

!!! Do

Use a Flyout as a detailed preview of an object on the main page.

![Flyout with preview content](/assets/components/flyout/flyout-custom-content.png)
!!!

#### Code snippets and examples

While code snippets and terminal scripts are usually detailed, they are well suited content within a Flyout due to their contextual relevancy to the content on the page, while maybe not being complex enough to exist on their own page.

!!! Do

![Flyout with code snippet](/assets/components/flyout/flyout-with-code-snippet.png)
!!!

#### Forms

Don't use a form in a Flyout, whether the function is creating an object, or updating an existing one. This type of content is often complex and more appropriate on its own page, or in the case of a simple form, within a [Modal](/components/modal).

!!! Dont

![Form within a Flyout](/assets/components/flyout/form-in-flyout.png)
!!!

## Size

The available sizes are medium (default) and large.

![A medium (480px wide) and large (720px wide) Flyout side by side.](/assets/components/flyout/flyout-sizes.png)

### Best practices

- Use a Flyout size that best accounts for the complexity and detail of the content.
- The **medium** size accounts for the _majority_ of scenarios and is the default recommended size.

## Flyout header

The Flyout header features several properties to better communicate the purpose and content within the component.

### Title icon

**With title icon**

![Flyout header title with icon and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-icon-and-title.jpg)

**Without title icon**

![Flyout header title only and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-title-only.jpg)

#### Usage

An icon paired with the title can help reinforce the purpose and function of the Flyout while also drawing the eye to the header and title area.

The purpose and function of the Flyout should not rely solely on an icon, instead the title should be explicit and pragmatic while the icon provides visual support.

### Tagline

**With tagline**

![Flyout header tagline, title, and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-tagline-and-title.jpg)

**With tagline and icon**

![Flyout header title icon, tagline, title, and dismiss button](/assets/components/dialog-primitives/dialog-primitives-header-tagline-and-icon-and-title.jpg)

A **tagline** helps the user maintain the context of the main page the Flyout was triggered from. Since a Flyout disables and obscures the main page content, adding a tagline can help the user understand the relationship between the Flyout and the main page.

The **tagline** should directly reference the page, feature title, or object to reinforce the purpose of the Flyout.

!!! Warning

Even though adding a title icon and tagline can help the user better understand the content, both elements add visual weight which might not be suitable or necessary for all Flyouts.
!!!

### Description

A **description** provides additional information about the Flyout.

**With description**

![Flyout header title and dismiss button with description](/assets/components/dialog-primitives/dialog-primitives-header-title-only-and-description.jpg)

**With description and icon**

![Flyout header title and dismiss button with description](/assets/components/dialog-primitives/dialog-primitives-header-icon-and-title-and-description.jpg)

## Flyout body

The body of the Flyout supports any generic content, local components, or Helios components via an instance swap property (`genericInstance`) in Figma. In code, `yield` is supported.

## Flyout footer

The Flyout footer is a persistent content area at the bottom of the Flyout, and supports additional descriptive content, links, actions, and any other generic content or Helios components.

The Ember and Figma components account for the footer in slightly different ways, though both can achieve the same results:

- The Ember component is a generic container that yields elements passed to it.
- The Figma component consists of a variant for the number of actions, as well as support for generic content via an instance swap property.

!!! Info

The footer is **optional** and should be used sparingly as it increases the complexity of the Flyout.
!!!

**With one action**

![Flyout footer with one action](/assets/components/dialog-primitives/dialog-primitives-footer-actions-one.png)

**With two actions**

![Flyout footer with two actions](/assets/components/dialog-primitives/dialog-primitives-footer-actions-two.png)

For more guidance and details around organizing buttons and actions, refer to the [Button organization](/patterns/button-organization) pattern documentation.

### Actions

A Flyout supports actions within the footer allowing for basic functions to be performed. This usage should be limited to performing secondary functions that are related to the main page to help the user maintain context in the primary flow. Some examples of this are:

- Batch updating and creating relationships between one or more objects
- Linking to external resources using a link that appears as a button

!!! Do

Use a Flyout for actions like batch selection that are secondary to the main page.

![Simple actions within a Flyout](/assets/components/flyout/flyout-simple-actions.png)
!!!

!!! Do

Use a Flyout for simple declarative content like text and links that enhance the main page.

![Complex footer example](/assets/components/flyout/flyout-complex-footer.png)
!!!

!!! Dont

Don't use a Flyout for editing or creating objects. These are generally considered primary functions and should be handled on their own page or within a Modal in simple scenarios.

![Complex actions within a Flyout](/assets/components/flyout/flyout-complex-actions.png)
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

In Figma, the Flyout should be paired with the [Overlay](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=67216-32335&t=gWdKy44MzTP4cTRo-1) component which obscures the main page content the Flyout sits on top of. Using the Flyout without the overlay is currently not supported and helps to communicate visually the `inert` nature of the main page.

We publish a [[Template] Flyout](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?node-id=67212-27152&t=gWdKy44MzTP4cTRo-1) component coupling these two components together that can be imported into your design file and detached.
!!!

On smaller viewports, the Flyout should occupy 100% of the viewport width minus half the size of the minimized SideNav width from the viewport edge.

- If the body content of the Flyout exceeds the maximum height of the viewport, a scroll will be introduced.
- The Flyout header is not included in the scrolling section, only the body content. The header should always be visible to help the user understand the Flyout content and how it relates to the main page.
- The Flyout should _not_ be resized manually, rather select the size that best accommodates the content.
