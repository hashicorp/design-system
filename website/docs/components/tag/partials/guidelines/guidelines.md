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

!!! Info

Tooltip placement can only be customized in the Ember component. For simplicity, the Figma component only includes top placement.

!!!

Tags can display about 20 characters maximum before the text becomes automatically truncated. When truncated, the full text will display in a [Tooltip](/components/tooltip) that appears when the user hovers or focuses the Tag. This Tooltip displays above the Tag by default; however, the placement can be customized.

![](/assets/components/tag/tag-truncation-tooltip.png)