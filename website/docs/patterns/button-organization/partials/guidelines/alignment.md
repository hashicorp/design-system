## Alignment

Alignment refers to how buttons and actions are aligned relative to the container or page. When combined with different reading patterns and hierarchy, different alignment methods impact a function's readability, usability, and intended outcome.

!!! Info

When considering internationalization (i18n), **start** and **end** are suitable substitutes for **left** and **right** alignment to account for languages that are read right-to-left ([RTL](https://developer.mozilla.org/en-US/docs/Glossary/RTL)).

![Button alignment options](/assets/patterns/button-organization/alignment-methods.png)
!!!

### Left alignment

Actions are aligned to the left of the container or page. A common example of this alignment method is in [Modals](/components/modal) and page-level forms.

![Left alignment example](/assets/patterns/button-organization/using-left-alignment.png)

!!! Do

In most scenarios, align buttons to the **left side** of a container or page.

- This reinforces natural reading patterns and a conversational "dialog-like" messaging strategy.
- When combined with a consistent ordering method, the primary button is prioritized in the reading direction.
- When considering different contexts, opting for a single method helps to create consistency between constrained and unconstrained components and patterns.

![Button alignment reading pattern](/assets/patterns/button-organization/alignment-reading-pattern.png)
!!!

### Right alignment

Actions are aligned to the right of the container or page. This alignment method is commonly used for page-level functions or actions that create and manage elements within a page.

![Right alignment example](/assets/patterns/button-organization/using-right-alignment.png)

### Center alignment

Actions are aligned in the middle of the container or page. This alignment method is _not_ recommended in the majority of scenarios.

- Can cause buttons to needlessly fill the horizontal space of the container
- Can cause buttons to appear detached from the content they are paired with, especially if a user has increased zoom settings within their browser

!!! Dont

![Center alignment example](/assets/patterns/button-organization/using-center-alignment.png)
!!!

