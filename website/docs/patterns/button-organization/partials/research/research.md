!!! Info

This content is largely focused around the research and decision-making process for button alignment. For detailed specifications regarding implementation, visit the [guidelines](/patterns/button-organization?tab=guidelines).
!!!

## Constrained vs. unconstrained

The term **constrained** refers to a component or pattern that is wrapped within a container element, while **unconstrained** refers to components that exist at the page level.

- **Constrained**
    - Dialogs and modals
    - Toolbars
    - Alerts
    - Banners
- **Unconstrained**
    - General page content
    - In-page forms
    - The "window" in a general sense

This differentiation is important because the expectations from the user are different in each context. A constrained component or pattern will often be used in an interstitial or circumstantial experience; i.e. an experience that is triggered by the user or the application and elicits a quick, progressive action.

Unconstrained generally refers to a more "static" experience that isn’t triggered by a user action. This is often tied to a page-level function or a navigational element.

## Layout and reading patterns

When users read content, the pattern their eyes follow generally adheres to one or more reading patterns. By identifying and familiarizing ourselves with these patterns we can better understand how the layout within our application, pattern, or component impacts comprehension and interpretation of the content.

The three most common reading patterns are:

- the Gutenberg diagram
- Z-shaped pattern
- F-shaped pattern

### Gutenberg diagram

The Gutenberg diagram refers to a pattern the eyes follow when moving or scanning through **evenly distributed, homogenous content.** This pattern is most relevant in text-heavy scenarios like novels and newspapers, but is relevant in a UX context depending on the complexity of the content.

![Visual example of a Gutenberg diagram](/assets/patterns/button-organization/gutenberg-diagram.png)

#### Characteristics

- The users eyes progress through the content on an **axis of orientation** which moves further away from the start edge on each line or break in the content
- Content falls into strong and weak _fallow areas_ where it receives less attention and lacks comprehension compared to content along the axis of orientation
- This pattern indicates that important content and elements should be placed upon the **reading gravity path**
- This pattern is most prevalent in content with little to no typographic hierarchy (i.e. long-form paragraphs)
- This pattern is considered "in harmony" with natural reading direction

### Z-shaped pattern

A Z-shaped pattern refers to a pattern that follows the shape of the letter Z:

1. The user’s eyes start in the top left and move horizontally to the right
2. Upon reaching the end (or terminal) of the line, the eyes move diagonally to the next line
3. The reader’s eyes end at the bottom right of the content

![Visual example of a Z-shaped pattern](/assets/patterns/button-organization/z-shaped-pattern.png)

#### Characteristics

- There are _technically_ no fallow areas as in the Gutenberg pattern, though this is not always the case in practice.
- This type of pattern is most prevalent in task-based functions or sequences of elements; i.e. a form or series of onboarding steps.
- This pattern assumes that users read through _all_ of the content sequentially.

### F-shaped pattern

An F-shaped pattern loosely follows the shape of the letter F, first identified through eye-tracking and heatmap studies by the [Nielsen/Norman Group](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/).

![An example of eye tracking and heat maps from the NN/group](/assets/patterns/button-organization/f-shaped-pattern-nn-group.png)

#### Characteristics

The F-shaped pattern is a prominent example of how users scan through content and how most users don’t read content completely.

- Information at the top will generally have increased comprehension compared to information further down the page.
    - This is anecdotally true for all reading and layout patterns, but is best captured in a heatmap analysis.
- Information of lesser importance should be concise, potentially organized in bullet points, and aligned to the left hand side of the page, pattern, or component.
- This layout assumes users only scan content, rather than reading word-for-word.

### Reading patterns in practice

All three of these reading patterns are relevant and useful when observed in isolation, however, the reality of how users read, consume, and comprehend content is likely a combination of multiple reading patterns that change and overlap depending on the context. With that in mind, understanding these patterns and how they are relevant to different types of UX content will help to produce the best experience.

## Key concepts

- No particular layout or reading pattern is perfect, users will generally shift between different patterns depending on the content.
- Adherence to specific reading pattern **is not** an excuse for lack of hierarchy within a layout.
    - Introducing hierarchical focal points using typography and color in tandem with reading patterns is often the most effective method to communicate the purpose and function of a layout, pattern, or component.
- There is a fair amount of overlap between each pattern.