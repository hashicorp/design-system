## Typography


### Title

The title should always use the same styling of  `Body 200 Semibold` with `Foreground / Primary`, regardless of the orientation or value style.

![](/assets/patterns/description-list-patterns/description-list-heading.png)

### Value

Values have two visual style options: standard or callout. 

#### Standard

Use `Body 200 Regular` with `Foreground / Strong` for values when the title and value are of equal importance.

![](/assets/patterns/description-list-patterns/description-list-value-standard.png)

#### Callout

Use `Display 300 Bold` or `Display 400 Bold` (depending on existing content hierarchy) with `Foreground / Strong` when the value should be emphasized over the title. The callout style is often used for numerical content, like resources or financial data. 

The callout style should only be used in the vertical orientation.

![](/assets/patterns/description-list-patterns/description-list-value-callout.png)

!!! Dont

Don't mix and match visual styles. Ensure visual consistency is maintained by choosing one style in a given description list.

![A card with five columns of titles and values. The last column using the callout style while the rest using the standard style.](/assets/patterns/description-list-patterns/description-list-dont-mix-match-styles.png)

!!!

### Alignment

We recommend left-aligning content to maintain the natural reading flow.

![A description list with three columns contained in a card sitting above a table. Each list items is aligned to the left while the values in the table in the last column are right aligned.](/assets/patterns/description-list-patterns/description-list-alignment-left.png)
 
## Orientation

A list item can be oriented either vertically (stacked) or horizontally (side by side). Use one orientation per description list.

### Vertical

Use vertical orientation for designs similar to metadata cards or summary card experiences. With this orientation, the value in the list item can be styled either using the standard or the callout style.

#### Spacing between the title and value

Use an 8px gap between the title and value. 

While text is most common, other elements (like `Badge` , `CopySnippet`, links, etc) may also be used for the value. We recommend one element per value to keep things simple and related to the title.

![Two rows of five columns with description list items. First row using the standard style while the second row using the callout style.](/assets/patterns/description-list-patterns/description-list-vertical-spacing-heading-value.png)

In instances where the value may require additional rows for context, use a 4px gap. When selecting a text style and color, consider the visual hierarchy of the overall description list.

![Two rows of one column with description list items. Each description list item has a title and a value with two rows of information. First row uses the standard style while the second row uses the callout style.](/assets/patterns/description-list-patterns/description-list-vertical-value-multiple-lines.png)

#### Spacing between list items

When using the standard value style, use a grid with 24px gaps both vertically and horizontally. When placed inside a visible container, we recommend spacing the list items evenly. 

![Two rows with five columns. The first row has each column filled, while the second row has one. The gaps vertically and horizontally shows 24px gaps.](/assets/patterns/description-list-patterns/description-list-vertical-grid-gaps.png)

When using the callout value style, use a grid with 24px vertical gaps and 48px horizontal gaps. When placed inside a visible container, we recommend spacing the list items evenly.

![Two rows with three columns. The gaps vertically show 24px and horizontally shows 48px.](/assets/patterns/description-list-patterns/description-list-vertical-callout-grid-gaps.png)

#### Wrapping

If content is too condensed, wrap list items to a new row.

!!! Do

Wrap content to ensure readability of each list item.

![Two rows with five columns. The first row has each column filled, while the second row has one. Information fits comfortably in each column](/assets/patterns/description-list-patterns/description-list-vertical-do-grid.png)

!!!

!!! Dont

Avoid forcing list items into a single row, as this can make the items harder to read.

![One row with seven columns. The information in each column wraps inconsistently and has varied heights](/assets/patterns/description-list-patterns/description-list-vertical-dont-grid.png)

!!!

### Horizontal

Horizontal orientation should only be used with the standard value styling. Using two sizes in the horizontal orientation throws off the visual balance of the content in a description list.

#### Spacing

Use 16px gaps between the title and value and each row. 

While text is most common, other elements (like `Badge` , `CopySnippet`, links, etc) may also be used for the value. We recommend one element per value to keep things simple and related to the title.

![Five rows of information showing a vertical gap between the title and value of 16px and between each row as 16px.](/assets/patterns/description-list-patterns/description-list-horizontal-standard-grid-gaps.png)

In instances where the value may require additional rows for context, use a 4px gap. When selecting a text style and color, consider the visual hierarchy of the overall description list.

![The gap between the title and value is 16px. The value has two rows and a 4px gap between each row.](/assets/patterns/description-list-patterns/description-list-horizontal-value-multiple-rows.png)

##### Exceptions

On occasion, the recommended gap size may not be suitable for the layout. For example, when a description list is used as a legend. In this case, a 4px gap could be appropriate as the content is more closely related than in a standard description list.

![Highlighting list items in a horizontal orientation stacked vertically on top of each other with a 4px gap between each other.](/assets/patterns/description-list-patterns/description-list-logical-gap.png)

In horizontal orientations, use your best judgment to adjust the gaps between list items for optimal UI hierarchy.

#### Column width

When the list item is oriented horizontally and the content length of the title and value is fairly similar, we recommend using equal column widths (50%) to fill the available space.

![A card titled "Cluster details" with a description list below it. Each list item has its title and value's width at 50% of the cards space.](/assets/patterns/description-list-patterns/description-list-horizontal-fill-example.png)

If the content length of the value is considerably longer than the title, we recommend that the title column width be equal to the longest title content, while the value uses the rest of the available space.

![The description list is the primary detail on the page. The header is fixed in each row, while the value's content takes up the remaining space on the page.](/assets/patterns/description-list-patterns/description-list-horizontal-fixed-width-example.png)