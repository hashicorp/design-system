## Spacing

### Contained

When the content area consists of a contained component (e.g., table, card, etc), we recommend:

- 24px above tabs
- 0px between the tabs and the content area
- Top & right border-radius of the content area be set to 0
- The content area should be flush on the left & right with the tabs

![Tabs contained spacing example](/assets/components/tabs/tabs-spacing-contained.png)

### Nested

!!! Warning

We don’t recommend using a nested tab structure, but if you must, don’t go beyond 2 levels of nesting. If finding that you need to go beyond 2 levels of nesting, consider using another navigation pattern or re-evaluating the information architecture of your product.
!!!

When nesting tabs, regardless of if your content area consists of contained or non-contained components; we recommend:

- 24px above each Tabs instance
- 16px between each Tabs instance and its corresponding content area
- Top & right border-radius of the content area be set to 0, if contained
- Each content area should be left indented by 16px

![Tabs nested spacing example](/assets/components/tabs/tabs-spacing-nested.png)

### Not contained

When the content area does not consist of a contained component (ie. text block, form, etc), we recommend:

- 24px above Tabs
- 16px between the Tabs and the content area
- The content area should be flush on the left & right with the Tabs, if only one level of tabs. If nested levels, see "Nested".

![Tabs not contained spacing example](/assets/components/tabs/tabs-spacing-not-contained.png)