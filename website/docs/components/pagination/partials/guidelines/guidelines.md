## Usage

### When to use

- To break down large content into pages. Usually paired with tables, but works with other types of page content.

### When not to use

- As a navigation control for a flow or to pair with a stepper, i.e. for a guide, tutorial, setup flow.
- As a controller to switch between multiple views. Use [Tabs](/components/tabs/) instead.

### Numbered vs Compact

In most cases, the numbered pagination provides a greater user experience. It allows users to jump between pages and always return to the first page or go to the last page without navigating through the pages manually.

If your product only has cursor pagination, it won't be able to support the numbered variant. Only applications with offset pagination can implement the numbered pagination variant.

!!! Warning 

We strongly recommend talking to your engineering team before using a specific variant. Learn more about [offset and cursor pagination] (https://ignaciochiazzo.medium.com/paginating-requests-in-apis-d4883d4c1c4c)

!!!

### Spacing

- When using the pagination bar, the container should be flush on the left & right with the content.
- When using the pagination, the component should be center aligned with the content it relates to.
- Make sure there's enough distance and breathing room between the pagination and not related content (e.g. another section below it), so it's clear what content the pagination is paired with.

When pairing the pagination or pagination bar with tables, we recommend:
- 12px or 16px between the pagination or pagination bar and the content it relates to.

![Spacing for pagination paired with tables](/assets/components/pagination/pagination-spacing-tables.png)

When pairing with not contained content (e.g. cards, lists), we recommend:
- At least 16px for consistency. If your product uses a scale where the spacing between elements tends to be higher or lower, or the paginated content looks optically loose or tight to the component, increase or decrease the spacing accordingly.

![Spacing for pagination paired with not contained content](/assets/components/pagination/pagination-spacing-not-contained.png)