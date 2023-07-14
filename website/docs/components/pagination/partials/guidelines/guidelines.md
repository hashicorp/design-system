## Usage

### When to use

- To break down large content into pages. Usually paired with tables, but works with other types of page content.

### When not to use

- As a navigation control for a flow or to pair with a stepper, i.e. for a guide, tutorial, or setup flow.
- As a controller to switch between multiple views. Use [Tabs](/components/tabs/) instead.

### Numbered vs Compact

Cursor and offset are the most common types of pagination. Currently, most HashiCorp products use cursor-based navigation.

Cursor navigation allows users to navigate to the next or previous set of records no matter where the user is located within the dataset (record 1 or 300). With this type of pagination, the system doesn’t know which page the current page is and can’t show page numbers (1, 2, 3, etc…). If your product supports it, you should use compact pagination.

Offset or page-based pagination allows you to divide datasets into pages, letting users navigate to any particular page. If your product supports it, you can use either numbered or compact pagination. In most cases, the numbered pagination provides a better user experience. It allows users to jump between pages and always return to the first page or go to the last page without navigating through the pages manually.

![Numbered pagination example](/assets/components/pagination/pagination-offset-example.png =836x*)
- Supported by offset (page-based) pagination.

![Compact pagination example](/assets/components/pagination/pagination-cursor-example.png =836x*)
- Supported by offset and cursor based pagination.

!!! Warning 

We strongly suggest that you talk to your engineering team to see which pagination variant is right for your project.

!!!

### Spacing

- When using the pagination bar, the container should be flush on the left & right with the content.
- When using the pagination, the component should be center aligned with the content it relates to.
- Make sure there’s enough distance and breathing room between the pagination and unrelated content (e.g. another section below it), so it’s clear what content the pagination is paired with.

When pairing the pagination or pagination bar with your content, we recommend leaving 16px of margin between the pagination and the content it relates to.

If your product uses a significantly higher or lower spacing scale, increase or decrease the spacing accordingly.

#### Spacing examples

![Spacing for pagination paired with tables](/assets/components/pagination/pagination-spacing-tables.png)

---

![Spacing for pagination paired with not contained content](/assets/components/pagination/pagination-spacing-not-contained.png)