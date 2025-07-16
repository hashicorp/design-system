## Typography

### Heading

Use `Body 200 Semibold` with `Foreground / Primary` for headings.

![](/assets/patterns/description-list-patterns/description-list-heading.png)

### Value

#### Standard

Use `Body 200 Regular` with `Foreground / Strong` for values. This style is used when the heading and value are of equal importance.

![](/assets/patterns/description-list-patterns/description-list-value-standard.png)

#### Callout

This style is used to emphasize values over headings. It is often used for numerical content, like resources or money. Use `Display 300 / 400 Bold` (depending on content hierarchy) with `Foreground / Strong`. This should only be used for vertical orientation description lists.

![](/assets/patterns/description-list-patterns/description-list-value-callout.png)

!!! Dont

Mix and match visual styles. Ensure visual consistency is maintained by choosing one style in a given space.

![A card with five columns of headings and values. The last column using the callout style while the rest using the standard style.](/assets/patterns/description-list-patterns/description-list-dont-mix-match-styles.png)

!!!

### Alignment

We recommend that content is left aligned, even if the values are related to other content on the page. This maintains the natural reading flow of the content.

![A description list with three columns contained in a card sitting above a table. Each list items is aligned to the left while the values in the table in the last columnn are right aligned.](/assets/patterns/description-list-patterns/description-list-alignment-left.png)
 
## Orientation

A description list can be oriented either vertically or horizontally.

### Vertical

Use vertical orientation for designs similar to metacards or summary card experiences. With this orientation, the value in the description list can be styled either using the standard or the callout style.

#### Spacing between the heading and value

Use an 8px gap in between the heading and value. Components can be used in place of the value, but only one component per description list item is allowed.

![Two rows of five columns with description list items. First row using the standard style while the second row using the callout style.](/assets/patterns/description-list-patterns/description-list-vertical-spacing-heading-value.png)

In rare instances where the value slot requires additional rows for context, the gap is 4px. The content within the value slot can have multiple rows. Consider the visual hierarchy of the overall grouping during implementation.

![Two rows of one column with description list items. Each description list item has a heading and a value with two rows of information. First row uses the standard style while the second row uses the callout style.](/assets/patterns/description-list-patterns/description-list-vertical-value-multiple-lines.png)

#### Spacing between list items

When using the standard value style, use a grid with 24px gaps both vertically and horizontally. Each list item’s width should be set to fill for even visual spacing.

![Two rows with five columns. The first row has each column filled, while the second row has one. The gaps vertically and horizontally shows 24px gaps.](/assets/patterns/description-list-patterns/description-list-vertical-grid-gaps.png)

When using the callout value style, use a grid with 24px vertical gaps and 48px horizontal gaps. Set each list item’s width to fill for even visual spacing.

![Two rows with three columns. The gaps vertically show 24px and horizontally shows 48px.](/assets/patterns/description-list-patterns/description-list-vertical-callout-grid-gaps.png)

#### Wrapping

If content is too condensed, wrap content to a new row.

!!! Do

Wrap content to ensure legibility of each list item.

![Two rows with five columns. The first row has each column filled, while the second row has one. Information fits comfortably in each column](/assets/patterns/description-list-patterns/description-list-vertical-do-grid.png)

!!!

!!! Dont

Force list items into a single row, instead consider arranging items into uniform rows. This practice promotes visual consistency and enhances readability.

![One row with seven columns. The information in each column wraps inconsistently and has varied heights](/assets/patterns/description-list-patterns/description-list-vertical-dont-grid.png)

!!!

### Horizontal

Horizontal orientation should only be used with the standard styling of headings and values. Using two sizes in the horizontal orientation throws off the visual balance of the content in a description list.

#### Spacing

Use 16px gaps between the heading and value and each row pairing. Components can be used in place of the value, but only one component should be used per description list item.

![Five rows of information showing a vertical gap between the heading and value of 16px and between each row as 16px.](/assets/patterns/description-list-patterns/description-list-horizontal-standard-grid-gaps.png)

In rare instances where the value slot requires additional rows for context, use a 4px gap. The content within the value slot can have multiple rows. Consider the visual hierarchy of the overall grouping during implementation.

![The gap between the heading and value is 16px. The value has two rows and a 4px gap between each row.](/assets/patterns/description-list-patterns/description-list-horizontal-value-multiple-rows.png)

##### Exceptions
There may be occasions when the standard gap between items in a description list needs to be adjusted. For example, a description list used as a legend requires a 4px row gap instead of the standard 16px, as the values are closely related.

![Highlighting list items in a horizontal orientation stacked vertically on top of each other with a 4px gap between each other.](/assets/patterns/description-list-patterns/description-list-logical-gap.png)

In horizontal orientations, use your best judgment to adjust the gaps between list items for optimal UI representation.

#### Column width
When the description list is oriented horizontally, content length will vary. If the heading and value’s content length is fairly similar, then the width of both the heading and value should be set to fill (50%) of the available space. This often happens when a description list is placed within a card.

![A card titled "Cluster details" with a description list below it. Each list item has its heading and value's width at 50% of the cards space.](/assets/patterns/description-list-patterns/description-list-horizontal-fill-example.png)

If the values’ content is much longer than the heading, set the heading’s width to fixed (equal to the longest content length within the column), while the value is set to fill (100% of the remaining space). This often happens when a description list is placed alone on the page as the primary content.

![The description list is the primary detail on the page. The header is fixed in each row, while the value's content takes up the remaining space on the page.](/assets/patterns/description-list-patterns/description-list-horizontal-fixed-width-example.png)