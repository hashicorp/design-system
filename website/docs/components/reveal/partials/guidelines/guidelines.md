## Usage

### When to use

- To hide additional information until it is relevant to users.

### When not to use

- To hide information critical to the user’s task.
- To contain complex or advanced content.

## Toggle text

- Ensure that the text clearly describes the content that will be revealed when the toggle is triggered.
- Keep the text short, clear, and concise. Avoid long sentences.
- Use action-oriented language, when possible, to convey that there is additional content to be shown, e.g., “Show more options”.

!!! Dont

Don’t use vague or unrelated text to describe the content.

![Reveal example with a form](/assets/components/reveal/toggle-text-dont.png =591x*)
!!!

!!! Do

Use meaningful text that relates to the content inside.

![Reveal example with a form](/assets/components/reveal/toggle-text-do.png =591x*)
!!!

## Content type

The Reveal component should be used for hiding and showing simple content. For complex content and advanced functionality, consider using an [Accordion](/components/accordion).

!!! Dont

![Reveal example with complex content](/assets/components/reveal/content-type-dont.png =725x*)
!!!

!!! Do

![Reveal example with simple content](/assets/components/reveal/content-type-do.png =604x*)
!!!

## Spacing

In cases where surrounding elements already have margin or padding added, you may want to reduce or remove the spacing entirely.

- When using the Reveal to contain information related to a single element within a group or section, we recommend leaving 8px between the Reveal and the element it relates to.

![Reveal example within a section](/assets/components/reveal/spacing-guidance-single-element.png =591x*)

- When used to show and hide information not directly associated with a single element but an entire section or group, we recommend leaving 24px between the Reveal and the section it relates to.

![Reveal example underneath a section](/assets/components/reveal/spacing-guidance-section.png =591x*)

- If you need to adjust the spacing, always ensure it is slightly tighter compared to the spacing between other elements and components in the group, section, or page.