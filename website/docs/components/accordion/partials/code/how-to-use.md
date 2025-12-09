## How to use this component

The `Accordion` component is used to wrap and group one or more `Accordion::Item` child components. The Accordion items consist of “toggle” and “content” named blocks containing plain text or HTML content.

### Size

A different size of Accordion can be invoked using the `@size` argument.

[[demo: code-snippets/accordion-size.hbs]]

### Type

Use the `@type` argument to render a `flush` Accordion.

[[demo: code-snippets/accordion-type.hbs]]

### Complex HTML content

With an Alert component in the toggle block and an HTML table in the content block.

[[demo: code-snippets/accordion-html-content.hbs]]

With a link in the toggle block and a form in the content.

[[demo: code-snippets/accordion-contains-interactive.hbs]]

With an Accordion in the content block.

[[demo: code-snippets/accordion-nested.hbs]]

### Expand and collapse all

The `@forceState` argument enables you to implement expand/collapse all functionality by programmatically controlling the states of all items within a group. The `@forceState` argument may also be used at item level if further granularity is required.

[[demo: code-snippets/accordion-expand-all.hbs]]

### Persist Item state

The `@forceState` argument can be used to programmatically control individual Accordion Items. For example, use `@onClickToggle` to respond to the user’s click, save the open/close state, then use `@forceState` to persist the state if the screen refreshes.

[[demo: code-snippets/accordion-persist-state.hbs]]

### Accessible name

The `ariaLabel` value is applied to the HTML button which controls visibility of the content block. The text does not display in the UI. The default value is "Toggle display" but you can set a custom value useful for translated text for example.

[[demo: code-snippets/accordion-a11y-name.hbs]]

### Title tag

!!! Warning 

**Accessibility alert**

The default `@titleTag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@titleTag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

The `@titleTag` argument changes the HTML element that wraps the title block of each `Accordion::Item`. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if an Accordion is within a subsection of the page below a heading level 2, the value should be `"h3"`.

[[demo: code-snippets/accordion-title-tag.hbs]]

### Open

Set `isOpen` to `true` on an `Accordion::Item` to display its associated content on page load instead of initially hiding it.

[[demo: code-snippets/accordion-open.hbs]]

### Static

Set `isStatic` to `true` on an `Accordion::Item` to remove the ability to interact with the toggle.

[[demo: code-snippets/accordion-static.hbs]]

### Contains interactive

By default, the `containsInteractive` property of the `Accordion::Item` is set to `false`, meaning that the entire `Accordion::Item` toggle block can be clicked to hide and show the associated content. If set to `true`, only the chevron button of the `Accordion::Item` is clickable vs. the entire block. This allows you to add other interactive content inside the toggle block if desired.

[[demo: code-snippets/accordion-contains-interactive-2.hbs]]
