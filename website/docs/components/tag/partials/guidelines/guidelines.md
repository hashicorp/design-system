## Usage

### When to use

- To indicate an object’s categorization, e.g., for filtering.

### When not to use

- For static metadata, status, or to display a new feature, consider [Badge](/components/badge).
- For collection enumeration or version number, consider [Badge Count](/components/badge-count).

## Layout

- The Tag component can be used in several different layouts, but we commonly see them in a list or a group.
- Tags will fill the parent container and then wrap, as necessary.

![Tag layout as a list](/assets/components/tag/tag-layout-list.png =678x*)
<Doc::ImageCaption @text="Tag layout as a list"/>

![Tag layout as a group](/assets/components/tag/tag-layout-group.png =818x*)
<Doc::ImageCaption @text="Tag layout as a group"/>

## Spacing

As a best practice, use a vertical spacing of 12px and horizontal spacing of 8px between Tags.

![Spacing between tags](/assets/components/tag/tag-spacing.png =304x*)

## Leading vs. trailing icon

!!! Do

![Example of a leading icon in the tag](/assets/components/tag/tag-leading-icon.png =916x*)
The leading dismiss icon allows mouse users to clear multiple Tags quickly because they do not need to move their mouse.
!!!


!!! Dont

![Example of a trailing icon in the tag](/assets/components/tag/tag-trailing-icon.png =916x*)
When the dismiss icon is trailing, the mouse user must adjust positioning of their mouse to clear the Tags, which results in slower task completion.
!!!

## Content

When content within the tag is not user-generated, it should be concise and consistent with the category name.
