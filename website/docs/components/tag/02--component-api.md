---
title: Tag
category: components
component: tag
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` | string |  | The text of the tag; or link text when the _@route_ or _@href_ are set. _If no text value is defined an error will be thrown._ |
| `href` |  |  | This is the URL parameter that is passed down to the `<a>` element. |
| `isHrefExternal` | boolean |  | This controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it. |
| `route/models/model/query/current-when/replace` |  |  | These are the parameters that are passed down as arguments to the `<LinkTo>` / `<LinkToExternal>` components. |
| `isRouteExternal` | boolean |  | This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route. |
| `color` | enum | `primary` `secondary` | Sets the color of a link and it is allowed only when _@route_ or _@href_ are set. |
| `onDismiss` | function |  | The tag can be dismissed by the user. When a function is passed, the "dismiss" button is displayed. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |