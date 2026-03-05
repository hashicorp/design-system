The DialogPrimitive contains the building blocks used to construct dialog-based components and consists of:

- `DialogPrimitive::Wrapper` is the structure that contains and arranges all other dialog primitives.
- `DialogPrimitive::Header` contains the title, dismiss button, and optionally a visually supportive icon and tagline.
- `DialogPrimitive::Description` contains optional descriptive information about the dialog.
- `DialogPrimitive::Body` is a generic container that houses the main content or message of the dialog.
- `DialogPrimitive::Footer` contains buttons to act on the content in the body container or link to additional resources.

The DialogPrimitive Wrapper is built on the HTML `<dialog>` element, and therefore supports the same [JavaScript API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).

## How to use this component

The `DialogPrimitive` serves as the foundation for dialog derived components like the [Modal](/components/modal) and [Flyout](/components/flyout). Unlike other HDS primitives, we recommended using `DialogPrimitive` components directly when you need to create a dialog with a custom layout. This is particularly useful for constructing non-modal dialogs that integrate into a page layout, rather than floating above it.

### Basic dialog using DialogPrimitive components

[[code-snippets/dialog-primitive-basic]]

### Header title tag

The `@titleTag` argument changes the HTML element that wraps the `DialogPrimitive::Header` tagline and "title" content. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if the `DialogPrimitive` is used as a Split Window, the value should be `"h2"`. 

!!! Warning

**Accessibility alert**

The default `@titleTag` value is `"div"` as the correct heading level (`h1–`h6) is dependent on the context in which it is used within a page. We strongly encourage consumers to set the appropriate `@titleTag` value to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

[[code-snippets/dialog-primitive-title-tag]]
