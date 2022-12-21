
## Anatomy

![Tag anatomy](/assets/components/tag/tag-anatomy.png)

| Element          | Usage                                           |
|------------------|-------------------------------------------------|
| Text             | Required                       |
| Icon             | Required for isDismissible |
| Container        | Required                |


## Layout

- The Tag component can be seen in several different layouts, but we commonly see them in a list or a gorup.
- Tags will fill the parent container and then wrap, as necessary

### List

![Layout list example](/assets/components/tag/tag-layout-list.png)

### Group

![Layout group example](/assets/components/tag/tag-layout-group.png)

---

## Spacing

As a best practice, we recommend a vertical spacing of 12px and horiztonal spacing of 8px between tags.

![Spacing between tags](/assets/components/tag/tag-spacing.png)

---

## Leading vs. Trailing Icon


The leading dismiss icon allows mouse users to clear multiple tags quicker, because they do not need to move their mouse, especially when tags have a more extended width.

!!! Do

![Example of a leading icon in the tag](/assets/components/tag/tag-leading_icon.png)


When the dismiss icon is trailing, the mouse user must adjust positioning to clear tags, which results in slower task completion.
!!!


!!! Dont

![Example of a trailing icon in the tag](/assets/components/tag/tag-trailing_icon.png)


When content within the tag is not user-generated, it should be concise and consistent with the category name.
!!!
