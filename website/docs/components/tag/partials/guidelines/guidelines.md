## Usage

### When to use

Use tags to indicate an object’s categorization, i.e., for filtering.

### When not to use

- For static metadata, status, or to display a new feature, use [Badge](/components/badge).
- For collection enumeration or version number, use [BadgeCount](/components/badge-count).

### Layout

- The tag component can be used in several different layouts, but we commonly see them in a list or a group.
- Tags will fill the parent container and then wrap, as necessary.

#### List

![Layout list example](/assets/components/tag/tag-layout-list.png)

#### Group

![Layout group example](/assets/components/tag/tag-layout-group.png)

---

### Spacing

As a best practice, use a vertical spacing of 12px and horizontal spacing of 8px between tags.

![Spacing between tags](/assets/components/tag/tag-spacing.png)

---

### Leading vs. Trailing Icon


The leading dismiss icon allows mouse users to clear multiple tags quicker because they do not need to move their mouse, especially when tags have a more extended width.

!!! Do

![Example of a leading icon in the tag](/assets/components/tag/tag-leading_icon.png)


When the dismiss icon is trailing, the mouse user must adjust positioning to clear tags, which results in slower task completion.
!!!


!!! Dont

![Example of a trailing icon in the tag](/assets/components/tag/tag-trailing_icon.png)


When content within the tag is not user-generated, it should be concise and consistent with the category name.
!!!
