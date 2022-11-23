---
title: Button
category: components
component: button
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `size` | enum | `small` `medium` `large` |  |
| `color` | enum | `primary` `secondary` `tertiary` `critical` |  |
| `text` required | string |  | The text of the button or value of _aria-label_ if _isIconOnly_ is set to _true_. _If no text value is defined an error will be thrown._ |
| `icon` | string |  | Use this parameter to show an icon. Acceptable value: any Flight icon name. **🚨 IMPORTANT a11y note:** `tertiary` buttons have transparent backgrounds, and interactive elements must communicate interactivity with more than just color. Therefore, a leading or trailing icon is required when using the `tertiary` color. [WCAG 2.1 Criterion 1.4.1: Use of Color (Level A)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=141#use-of-color) |
| `iconPosition` | enum | `leading` `trailing` |  |
| `isIconOnly` | boolean |  | This indicates if the button will only contain an icon. _Notice: an internal check is in place to ensure that accessible text is still applied to the component._ |
| `isFullWidth` | boolean |  | This indicates that a button should take up the full width of the parent container. |
| `href` |  |  | This is the URL parameter that is passed down to the `<a>` element. |
| `isHrefExternal` | boolean |  | This controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it. |
| `route/models/model/query/current-when/replace` |  |  | These are the parameters that are passed down as arguments to the `<LinkTo/LinkToExternal>` component. |
| `isRouteExternal` | boolean |  | This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |