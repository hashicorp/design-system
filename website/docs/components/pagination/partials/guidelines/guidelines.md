## Usage

### When to use

- To break down large content into pages. Usually paired with tables, but works with other types of page content.

### When not to use

- As a navigation control for a flow or to pair with a stepper, i.e. for a guide, tutorial, or setup flow.
- As a controller to switch between multiple views. Use [Tabs](/components/tabs/) instead.

## Numbered vs Compact

Cursor and offset are the most common types of pagination. Currently, most HashiCorp products use cursor-based pagination.

Cursor-based pagination allows users to navigate to the next or previous set of records no matter where the user is located within the dataset (record 1 or 300). This type of pagination uses the latest record that has been delivered to the client from a database to determine the _relative_ location within the data set, rather than the exact page number.

Offset or page-based pagination divides a dataset into pages containing a default or user-determined number of records, and allows users navigate to any particular page. In most cases, the numbered pagination provides a better user experience. It allows users to jump between pages and always return to the first page or go to the last page without navigating through the pages manually.

![Supported by offset (page-based) pagination.](/assets/components/pagination/pagination-offset-example.png)
<Doc::ImageCaption @text="Supported by offset (page-based) pagination."/>

![Supported by offset and cursor based pagination.](/assets/components/pagination/pagination-cursor-example.png)
<Doc::ImageCaption @text="Supported by offset and cursor based pagination."/>

!!! Warning 

We strongly suggest that you talk to your engineering team to see which pagination variant is right for your project.

!!!

## Truncation

By default, in Numbered Pagination, the number of visible pages will be truncated when the total number of pages exceeds seven. What pages are truncated depends on the current page the user is on, with a few notable constants:

- The first and last page will always be displayed (never be truncated).
- The previous page and next page compared to the current page will always be displayed (unless the current page is the first or last page).
- A maximum of seven pages or truncated pages will always be displayed.

!!! Info

The number of pages equals `total items / items per page`, e.g., if the total number of items is 120 and there are 10 items per page, the number of pages is 12. However, this can be variable depending on the `PageSize` and can determine whether the number of pages extends beyond the threshold of truncation.
!!!

### Current page examples

These examples showcase where truncation will occur depending on what page the user is on; at the start, middle, or end of Pagination.

![Current page at the start of Pagination](/assets/components/pagination/pagination-truncation-start.png)

![Current page in the middle of Pagination](/assets/components/pagination/pagination-truncation-middle.png)

![Current page at the end of Pagination](/assets/components/pagination/pagination-truncation-end.png)

### When to use truncation

Truncation can help to reduce the cognitive load on the user by only displaying immediately relevant pages to navigate between; those directly surrounding the current page, and the first/last page.

While not intended to be used as a solution for a responsive layout, truncation can help to save space if there are many pages.

### When not to use truncation

Truncation can have a negative impact on the user experience if navigating to a specific page is required, or if seeing all of the pages at once benefits the user.

## Spacing

- When using the pagination bar, the container should be flush on the left & right with the content.
- When using the pagination, the component should be center aligned with the content it relates to.
- Make sure there’s enough distance and breathing room between the pagination and unrelated content (e.g. another section below it), so it’s clear what content the pagination is paired with.

When pairing the pagination or pagination bar with your content, we recommend leaving 16px of margin between the pagination and the content it relates to.

If your product uses a significantly higher or lower spacing scale, increase or decrease the spacing accordingly.

![Pagination paired with a Table](/assets/components/pagination/pagination-spacing-tables.png)
<Doc::ImageCaption @text="Pagination paired with a Table"/>

![Pagination paired with other types of content](/assets/components/pagination/pagination-spacing-not-contained.png)
<Doc::ImageCaption @text="Pagination paired with other types of content"/>

## Pagination and filtering

While pagination can be beneficial for dividing up and displaying a large dataset into more manageable chunks, relying _solely_ on pagination and sorting to find a specific record or set of records results in a poor user experience. This is especially true in cursor-based pagination, where it may not be clear to the user where their relative position is within the dataset.

Instead, more effort should be put into [filtering](/patterns/filter-patterns) the data set to limit the number of returned results, with pagination used as an enhancement.