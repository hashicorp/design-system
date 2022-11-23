---
title: Breadcrumb
category: components
component: breadcrumb
section: component-api
---

The `Breadcrumb` component is composed by different parts, with their own APIs:

*   a main "container" (the breadcrumb itself)
*   an "item" sub-component (a single "crumb")
*   a "truncation" sub-component (a hidden list of "crumbs" that can be made visible via a toggle)

#### Breadcrumb

Here is the API for the main ("container") component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `itemsCanWrap` | boolean |  | This controls if the breadcrumb items can wrap in case they can't fit in the container width. |
| `didInsert` | function |  | This hook method is called when the component is inserted in the DOM. _Notice: internally we use the "did-insert" modifier from @ember/render-modifiers._ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. _Notice: by default an attribute_ |

#### Breadcrumb::Item

Here is the API for the "item" sub-component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` | string |  | The text to show as "crumb" for the item. |
| `icon` | string |  | Use this parameter to show an icon. Acceptable value: any Flight icon name. |
| `route/models/model/query` |  |  | These are the parameters that are passed down as arguments to the `<LinkTo>` component. |
| `current` | boolean |  | This controls if this is the last item in the breadcrumb (in which case it doesn't generate a link). |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Breadcrumb::Truncation

Here is the API for the "truncation" sub-component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `"yield"` |  |  | Elements passed as children of this sub-component are yielded to the content of the [Disclosure](../utilities/disclosure) component (used to show/hide the yielded breadcrumb items via a "toggle" button). |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |