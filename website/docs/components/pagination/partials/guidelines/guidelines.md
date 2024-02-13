## Usage

### When to use

- To break down large content into pages. Usually paired with tables, but works with other types of page content.

### When not to use

- As a navigation control for a flow or to pair with a stepper, i.e. for a guide, tutorial, or setup flow.
- As a controller to switch between multiple views. Use [Tabs](/components/tabs/) instead.

### Numbered vs Compact

Cursor and offset are the most common types of pagination. Currently, most HashiCorp products use cursor-based pagination.

Cursor-based pagination allows users to navigate to the next or previous set of records no matter where the user is located within the dataset (record 1 or 300). This type of pagination uses the latest record that has been delivered to the client from a database to determine the _relative_ location within the data set, rather than the exact page number.

Offset or page-based pagination divides a dataset into pages containing a default or user-determined number of records, and allows users navigate to any particular page. In most cases, the numbered pagination provides a better user experience. It allows users to jump between pages and always return to the first page or go to the last page without navigating through the pages manually.

![Numbered pagination example](/assets/components/pagination/pagination-offset-example.png)

_Supported by offset (page-based) pagination._

![Compact pagination example](/assets/components/pagination/pagination-cursor-example.png)

_Supported by offset and cursor based pagination_

!!! Warning 

We strongly suggest that you talk to your engineering team to see which pagination variant is right for your project.

!!!

### Truncation

In Numbered Pagination, when the number of pages exceeds seven the component will automatically truncate the number of visible pages. This can help reduce the cognitive load on the user and save space if there are many pages, but makes it impossible for the user to skip to a specific page if it is truncated.

!!! Info

The number of pages equals `total items / items per page`. E.g., if the total number of items is 120 and there are 10 items per page, the number of pages is 12.
!!!

- The first and last page will always be displayed (never be truncated).
- If the user is 

- Depending on what page the user is on, the truncated pages will vary. 



- What is truncation
- When does it occur
- When should you use it
- When should you avoid it

### Spacing

- When using the pagination bar, the container should be flush on the left & right with the content.
- When using the pagination, the component should be center aligned with the content it relates to.
- Make sure there’s enough distance and breathing room between the pagination and unrelated content (e.g. another section below it), so it’s clear what content the pagination is paired with.

When pairing the pagination or pagination bar with your content, we recommend leaving 16px of margin between the pagination and the content it relates to.

If your product uses a significantly higher or lower spacing scale, increase or decrease the spacing accordingly.

#### Paired with a Table

![Spacing for pagination paired with tables](/assets/components/pagination/pagination-spacing-tables.png)

#### Paired with other types of content

![Spacing for pagination paired with not contained content](/assets/components/pagination/pagination-spacing-not-contained.png)

### Pagination and filtering

While pagination can be beneficial for dividing up and displaying a large dataset into more manageable chunks, relying _solely_ on pagination and sorting to find a specific record or set of records results in a poor user experience. This is especially true in cursor-based pagination, where it may not be clear to the user where their relative position is within the dataset.

Instead, more effort should be put into [filtering](/patterns/filter-patterns) the data set to limit the number of returned results, with pagination used as an enhancement.