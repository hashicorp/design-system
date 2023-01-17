While the alignment, order, and grouping of buttons and actions might seem trivial, the impact on users is immediate and often occurs in experiences of high important and interruption.

These guidelines aren't meant to be prescriptive in every scenario, however, our recommendations are backed up by research and analysis to best serve the user in a consistent manner and understand the impact on the user experience from a holistic perspective.

!!! Info

These guidelines aren't relevant for every component or pattern, but are rather aimed at those that perform specific functions; i.e. a modal, forms, and page-level actions.
!!!

## Constrained vs. unconstrained

**Constrained** refers to a component or pattern that is wrapped within a container element, while **unconstrained** refers generally to components that exist at the page level.

- **Constrained**
    - Dialogs and modals
    - Toolbars
    - Alerts
    - Banners
- **Unconstrained**
    - General page content
    - In-page forms
    - The "window" in a general sense

This differentiation is important because the expectations from the user are different for each concept. A constrained component or pattern will often be used in an interstitial or circumstantial experience; i.e. an experience that is triggered by either the user or the application illiciting a quick, progressive action.

Unconstrained is generally represented by a more static experience that isn't triggered by a user action and is often tied to a navigational element.

**Insert some supporting images here**

## Layout and reading patterns

When users read content, the pattern their eyes follow generally adheres to one or more reading pattern. By identifying and familiarizing ourselves these patterns we can better understand how the layout within our application, pattern, or component impacts comprehension and interpretation of the content.

The three most common reading patterns are:

- the Gutenberg diagram
- Z-shaped pattern
- F-shaped pattern

### Gutenberg diagram

The Gutenberg diagram refers to a pattern the eyes follow when moving or scanning through **evenly distributed, homogenous content.** This pattern is most relevant in text-heavy scenarios like novels and newspapers/

![Visual example of a Gutenberg diagram](/assets/patterns/button-alignment/gutenberg-diagram.png)

#### Characteristics

- The users eyes progress through the content on an **axis of orientation** which moves further away from the start edge on each line or break in the content
- Content that falls into the weak fallow area recieves less attention
- This pattern indicates that important content and elements should be placed upon the **reading gravity path**
- This pattern is most prevalent in content with little to no typographic hierarchy (i.e. long-form paragraphs)
- This pattern is considered "in harmony" with natural reading direction and gravity.

### Z-shaped pattern

A Z-shaped pattern refers to a pattern that follows the shape of the letter Z:

1. The readers eyes start in the top left and move horizontally to the right
2. Upon reaching the end (or terminal) of the line, the eyes move diagonally to the next line.
3. The readers eyes end in the bottom right of the content

![Visual example of a Z-shaped pattern](/assets/patterns/button-alignment/z-shaped-pattern.png)

#### Characteristics

- There are _technically_ no fallow areas (areas that recieve less attention or lack comprehension) as in the Gutenberg pattern, though this is not always the case in practice.
- This type of pattern is most prevalent in in task-based functions or sequences of elements; i.e. a form and series of onboarding steps.
- This pattern assumes that users read through _all_ of the content sequentially.

### F-shaped pattern

An F-shaped pattern like it's name, loosely follows the shape of the letter F, first identified through eye-tracking and heatmap studies by the [Neilsen/Norman Group](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/).

![Visual example of an F-shaped pattern](/assets/patterns/button-alignment/f-shaped-pattern.png)

**We probably can't use this image directly on our webiste :(**

![An example of eye tracking and heatmaps from the NN/group](/assets/patterns/button-alignment/f-shaped-pattern-nn-group.jpeg)

#### Characteristics

The F-shaped pattern is a prominent example of how users scan through content, and how most users don't read content completely.

- Information at the top will generally be read more and have increased comprehension than information further down the page.
    - This is anecdotally true for all reading and layout patterns, but is best captured through heatmaps.
- Information of lesser importance should be concise, potentially bulletted, and aligned to the left hand side of the page, pattern, or component.
- This layout assumes users generally only scan content, rather than reading word-for-word.

### Reading patterns in practice

All three of these reading patterns are relevant and useful when observed in isolation, however, the reality of how users read, consume, and comprehend content is likely a combination of multiple reading patterns that change and overlap depending on the context. With that in mind, keeping these patterns top of mind and how they are relevant to different types of UX content will help to produce the best experience.


