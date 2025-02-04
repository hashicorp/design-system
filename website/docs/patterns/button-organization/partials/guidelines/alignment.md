## Alignment

Alignment refers to how buttons and actions are aligned relative to the container or page. When combined with different reading patterns and hierarchy, different alignment methods impact a function's readability, usability, and intended outcome.

!!! Info

When considering internationalization (i18n), **start** and **end** are suitable substitutes for **left** and **right** alignment to account for languages that are read right-to-left ([RTL](https://developer.mozilla.org/en-US/docs/Glossary/RTL)).

![](/assets/patterns/button-organization/alignment-methods.png)
!!!

### Left alignment

In most scenarios, align buttons to the **left side** of a container or page. The primary button should be leftmost, followed by secondary, then tertiary.

- This reinforces natural reading patterns and a conversational "dialog-like" messaging strategy.
- When combined with a consistent ordering method, the primary button is prioritized in the reading direction.
- When considering different contexts, opting for a single method helps to create consistency between constrained and unconstrained components and patterns.

A common example of this alignment method is in [Modals](/components/modal) and page-level forms.

!!! Do

Align buttons to the left side of the container.

![Modal with buttons in the footer aligned to the left. The reading order goes from left to right, top to bottom.](/assets/patterns/button-organization/alignment-reading-pattern-comparison.png)

!!!

### Right alignment

In the case of page-level functions or actions that manage elements within the page, align buttons to the right of the page. The primary button should be the farthest right, then secondary, then tertiary.

![Peering connections heading with a "Create connection" button right aligned to the container. A table of peering connections below.](/assets/patterns/button-organization/using-right-alignment.png)

### Center alignment

This alignment method is _not_ recommended in the majority of scenarios.

- Can cause buttons to needlessly fill the horizontal space of the container
- Can cause buttons to appear detached from the content they are paired with, especially if a user has increased zoom settings within their browser

!!! Dont

![Align buttons in the center of a form container.](/assets/patterns/button-organization/using-center-alignment.png)
!!!

