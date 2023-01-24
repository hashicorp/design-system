A Flyout is used to show and hide additional information and content that is related to the main page without navigating or routing to a new page.

## Usage

### When to use

When displaying additional information, context, or details about an object or element present on the main page.

### When not to use

- When requesting the user for information or feedback, use a [Modal](/components/modal).
- When displaying overly complex information, consider moving the content to its own page.

A Flyout is best used in scenarios when there are more details about a specific item or object that benefit from being easily accessible in the same page context, but may not be suited for a separate page. This is a conscious decision to limit the recommended usage to reduce the confusion between the Flyout and Modal, which have very similar interaction patterns.

!!! Do

Use a Flyout for detail more detailed information about an object on the main page.

![Flyout with custom content](/assets/components/flyout/flyout-custom-content.png)
!!!

#### Flyout complexity

!!! Dont

Don't use a flyout for overly complex nested content, like objects with a table or nested routing solutions.

![Flyout with a table](/assets/components/flyout/flyout-with-complex-content.png)
!!!

#### Functions within a Flyout

Given that a Flyout is intended to be informational provide more detail on a specific item, don't use a Flyout in a functional capacity; e.g., performing a CRUD (create, read, update, delete) function or submitting form data.

This type of content is often too complex and is better organized in it's own page.

!!! Dont

![Flyout with actions](/assets/components/flyout/flyout-with-form.png)
!!!

#### Code snippets and examples

While code snippets and terminal scripts are usually detailed, they are well suited content within a Flyout due to their contextual relevancy to the content on the page, while maybe not being complex enough to exist on their own page.

!!! Do

![Flyout with code snippet](/assets/components/flyout/flyout-with-code-snippet.png)
!!!