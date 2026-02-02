## How to use this component

The most basic invocation requires the `type` argument to be passed, along with the `title` and/or `description` content. By default, a `neutral` Alert is generated.

[[code-snippets/alert-basic]]

### Type

A different type of Alert can be invoked using the `type` argument.

[[code-snippets/alert-types]]

### Title and description

Optionally, you can pass only `title` or only `description`.

[[code-snippets/alert-title-desc]]

### Tag

!!! Warning 

**Accessibility alert**

The default `@tag` is `"div"` because the correct value is dependent on the individual page. We strongly encourage consumers to update the `@tag` to the appropriate heading tag to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.
!!!

The `@tag` argument changes the HTML element that wraps the title content of `[A].Title`. When organizing the content on a webpage, the heading levels should reflect the structure of the page. For example, if an Alert appears directly below the main heading of the page, it should be `"h2"`.

[[code-snippets/alert-title-tag]]

### Color

The available color values are `neutral` (the default), `highlight`, `success`, `warning`, and `critical`. Setting a color value will also determine the default icon used in the Alert, although it is customizable. 

The color value will also determine some accessibility features of the component, so this should be taken into consideration when choosing which Alert `color` value to use.


If the alert is being used in an informational or promotional way, `neutral` or `highlight` colors should be chosen. 

The other color values map to accessibility-related roles, and will ensure that essential information is presented to the user with assistive technology in a timely manner. 

[[code-snippets/alert-color]]

### Icons

A different icon can be used in the Alert using the `icon` argument. This accepts any [icon](/icons/library) name.

[[code-snippets/alert-icon]]

If you need to hide the icon, pass `false` to the `icon` argument. This is only an option on page and inline Alerts as compact Alerts require an icon.

[[code-snippets/alert-no-icon]]

### Dismissal

To enable dismissibility, pass a callback function to the `onDismiss` argument. This will add a dismiss button to the Alert. When that button is clicked, the callback function will be executed. 

Given the variety of use cases and contexts in which alerts are used across products, application teams will need to implement the callback function.

[[code-snippets/alert-dismissal]]

### Actions

Actions can be passed to the component using one of the suggested `Button` or `LinkStandalone` contextual components.

[[code-snippets/alert-actions]]

### Structured content

When needed, the `Description` contextual component can contain logic, rich HTML, or structured content.

[[code-snippets/alert-complex-content]]

You can pass more than one `D.Description` contextual component to have multiple description lines.

[[code-snippets/alert-multiple-desc]]

### Generic content

Use the `Generic` contextual component to insert custom content. Generic content will appear after the title, description, and actions. Application teams will need to implement spacing, layout, and styling for generic content.

[[code-snippets/alert-generic]]
