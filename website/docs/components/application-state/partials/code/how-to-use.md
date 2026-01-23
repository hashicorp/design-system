## How to use this component

This component intends to replace a few different simple error and empty/zero state components that exist across product UIs, while providing flexibility to adapt to additional application states. While we’re referring to these as "error state" and "empty state" this is just to help consumers relate to the components that have been replaced. Really, this component can be used to reflect any kind of application state message that is needed.

### As an empty state

[[code-snippets/application-state-empty]]

#### Empty state with header icon

[[code-snippets/application-state-empty-header]]

#### Empty state with a footer link

[[code-snippets/application-state-empty-footer]]

#### Empty state with yielded body block

[[code-snippets/application-state-empty-yield]]

#### Empty state with body text

[[code-snippets/application-state-empty-body]]

#### Empty state with center alignment

[[code-snippets/application-state-empty-center]]

#### Empty state with media

[[code-snippets/application-state-empty-media]]

### As an error state

To indicate that the message is an error state, add `@errorCode` to the `[A].Header` component invocation.

[[code-snippets/application-state-error]]

#### Error state with header icon

[[code-snippets/application-state-error-header]]

#### Error state with yielded body block

[[code-snippets/application-state-error-yield]]

#### Error state with center alignment

[[code-snippets/application-state-error-center]]

#### Error state with media

[[code-snippets/application-state-error-media]]

### Title tag

!!! Warning

**Accessibility alert**

The default `@titleTag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@titleTag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

The `@titleTag` argument changes the HTML element that wraps the `[A].Header` title content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if an Application State is used as an empty state below the main heading of a page, the value should be `"h2"`.

[[code-snippets/application-state-title]]