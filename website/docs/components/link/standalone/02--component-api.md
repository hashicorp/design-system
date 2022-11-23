---
title: Link::Standalone
category: components
group: link
component: standalone
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `size` | enum | `small` `medium` `large` |  |
| `color` | enum | `primary` `secondary` |  |
| `text` required | string |  | The text of the link. _If no text value is defined an error will be thrown._ |
| `icon` required | string |  | Use this parameter to show an icon. Acceptable value: any Flight icon name. **🚨 IMPORTANT:** the `icon` is required to make the component accessible. |
| `iconPosition` | enum | `leading` `trailing` |  |
| `href` |  |  | This is the URL parameter that is passed down to the `<a>` element. |
| `isHrefExternal` | boolean |  | This controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it. |
| `route/models/model/query/current-when/replace` |  |  | These are the parameters that are passed down as arguments to the `<LinkTo/LinkToExternal>` component. |
| `isRouteExternal` | boolean |  | This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |