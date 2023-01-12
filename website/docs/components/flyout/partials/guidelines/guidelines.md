## Size

### Best practices

![Sizes of the Flyout](/assets/components/flyout/flyout-sizes.png)

- Use a Flyout size that best accounts for the complexity and detail of the content.
- The **medium** size accounts for the _majority_ of scenarios and is the default recommended size.

## Flyout header

The Flyout header features several properties to better communicate the purpose and content within the component.

### Title icon

- An icon paired with the title can help reinforce the purpose and function of the Flyout while also drawing the eye to the header and title area.
- The coummunication of the purpose of the Flyout should not rely solely on an icon, instead the title should be explicit and pragmatic while the icon provides visual support.

#### No title icon

#### Title icon

### Tagline

- A **tagline** helps the user maintain the context of the main page the Flyout was triggered from. Since a Flyout disables the main page content, adding a tagline can help the user understand the relationship between the Flyout and the main page.
- A **tagline** should directly reference the page, feature title, or object to reinforce the purpose of the Flyout.

#### Tagline

#### Tagline + icon

### Description

A header **description** provides additional detail information about the Flyout.

#### With description

#### With description + icon

!!! Warning

Even though adding a title icon and tagline can help the user better understand the content, both elements add visual weight which might not be suitable or necessary for all Flyouts.
!!!

## Body

The body of the Flyout supports any custom content, local components, or Helios components via an **instance swap property** (customInstance) in Figma. In code `yeild` is supported. 

#### With custom content

## Dismissal

The primary dismissal method for the Flyout is the dismiss action in the header. The Flyout does not support action buttons to "confirm" or "cancel" the Flyout which is contrary to the intended usage of the component.

Multiple dismissal options are available that can be customized in production with a callback (on `onClose`, or `onOpen`) function:

- Dismiss button in the header
- Clicking with a mouse outside of the Flyout on the main page
- Hitting the escape (`ESC`) key on a keyboard

![Flyout dismissal options](/assets/components/flyout/flyout-dismissal.png)

## Positioning and responsive sizing

A Flyout should slide out from the right side of the viewport on top of the main page content and occupy 100% of the viewport height.

- This is true regardless of whether there is a sidebar or navigational element that persists on the page.
- A Flyout should overlay all content and block/disable interaction on the main page.

!!! Info

We recommend pairing the Flyout with the overlay component which obscures the main page the Flyout sits on top of. However, these components are decoupled, if there’s a benefit to the user having more visibility of the main page while the Flyout is open, not pairing the overlay with the Flyout may be acceptable.
!!!

![Flyout position](/assets/components/flyout/flyout-position.png)

On smaller viewports, the Flyout should occupy 100% of the viewport width minus a 40px margin from the viewport edge.

- If the body content of the Flyout exceeds the maximum height of the viewport, a scroll will be introduced.
- The Flyout header is not included in the scrolling section, only the body content. The header should always be visible to help the user understand the Flyout content and how it relates to the main page.
- The Flyout should _not_ be resized manually, rather select the size that best accommodates the content.

![Flyout resizing](/assets/components/flyout/flyout-resizing)