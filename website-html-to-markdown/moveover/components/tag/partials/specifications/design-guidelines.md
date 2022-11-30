## When to use

- Use tags to indicate an object's categorization, i.e., for filtering.

## When not to use

- for static metadata, status, or to display a new feature, use [Badge](/components/badge/overview)
- For collection enumeration or version number, use [BadgeCount](/components/badge-count/overview)

---

## Anatomy

![Tag anatomy](/assets/components/tag/tag-anatomy.png)

#### Text

Required

#### Icon

Required for isDismissible

#### Container

Required

---

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

![Example of a leading icon in the tag](/assets/components/tag/tag-leading_icon.png)

The leading dismiss icon allows mouse users to clear multiple tags quicker, because they do not need to move their mouse, especially when tags have a more extended width.

<section>
  <Hds::Badge @text="Do" @color="success" @icon="check-circle-fill" @iconPosition="leading" />
</section>

![Example of a trailing icon in the tag](/assets/components/tag/tag-trailing_icon.png)

When the dismiss icon is trailing, the mouse user must adjust positioning to clear tags, which results in slower task completion.

<section>
  <Hds::Badge @text="Don't" @color="critical" @icon="x-circle-fill" @iconPosition="leading" />
</section>

---

## Content

When content within the tag is not user-generated, it should be concise and consistent with the category name.

---

## Accessibility

- A screen reader will read the tags from left to right, ie. "dismiss [text]"
- Link tags and dismissible tags must be standalone elements and should not be nested inside other interactive elements because they cannot be properly accessed by a screen reader.
