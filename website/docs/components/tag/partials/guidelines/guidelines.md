## Usage

### When to use

- To indicate an object’s categorization, e.g., for filtering.

### When not to use

- For static metadata, status, or to display a new feature, consider [Badge](/components/badge).
- For collection enumeration or version number, consider [Badge Count](/components/badge-count).

## Layout

The Tag component can be used in several different layouts, but we commonly see them in a list or a group. They will fill the parent container and then wrap, as necessary.

![Skeleton of an app with tags in a list below the heading.](/assets/components/tag/tag-layout-list.png =678x*)
<Doc::ImageCaption @text="Tag layout as a list"/>

![Skeleton of an app with tags in a group where they fill the container and wrap onto 4 rows.](/assets/components/tag/tag-layout-group.png =818x*)
<Doc::ImageCaption @text="Tag layout as a group"/>

## Spacing

As a best practice, use a vertical spacing of 12px and horizontal spacing of 8px between Tags.

![Spacing between tags](/assets/components/tag/tag-spacing.png =304x*)

## Leading vs. trailing icon

!!! Do

![](/assets/components/tag/tag-leading-icon.png =916x*)
The leading dismiss icon allows mouse users to clear multiple Tags quickly because they do not need to move their mouse.
!!!


!!! Dont

![](/assets/components/tag/tag-trailing-icon.png =916x*)
When the dismiss icon is trailing, the mouse user must adjust positioning of their mouse to clear the Tags, which results in slower task completion.
!!!

## Content

When content within the tag is not user-generated, it should be concise and consistent with the category name.

### Truncation

The text container of the tag has a max-width of 150px. The text will truncate if it goes beyond that limit. A tooltip will display the full text when the user hovers or focuses on the truncated text. The tooltip will be placed at the top by default, but this can be customized.

![](/assets/components/tag/tag-truncation-tooltip.png)

!!! Info

Changing the tooltip placement is only possible in the Ember component. In order to keep the Figma component simple, we are only showing one type of placement.

!!!