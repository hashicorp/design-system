---
title: Dropdown
category: components
component: dropdown
section: component-api
---

The `Dropdown` component is composed of different child components, each with their own APIs:

*   the dropdown component (parent to the child components)
*   Toggle components to open/close the dropdown
    
    *   ToggleButton
    *   ToggleIcon
*   And finally, list item components, to build the dropdown's list items
    
    *   Description
    *   Generic
    *   Interactive
    *   Separator
    *   Title

_Notice: to make the invocation more intuitive for developers, all the sub-components are named yields, so the yielded name is a simplified version of the full component name (eg. `Hds::ListItem::Interactive` becomes just `Interactive`). See below how they are invoked as yielded components._

#### Dropdown

Here is the API for the main ("container") component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `listPosition` | string | `left` `right` |  |
| `width` | string |  | _Notice: by default the dropdown list has a_ |
| `close` | function |  | Function that can be called to programmatically close the dropdown. _Notice: if this function is invoked using an_ |
| `onClose` | function |  | Callback function invoked when the dropdown is closed (if provided). |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Toggle::Button

Here is the API for the "button-like" toggle component (yielded in a hash under the key `ToggleButton`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` required | string |  | The text of the toggle button. _If no text value is defined an error will be thrown._ |
| `color` | enum | `primary` `secondary` |  |
| `size` | enum | `medium` `small` |  |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Toggle::Icon

Here is the API for the icon-only toggle component (yielded as `ToggleIcon`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` required | string |  | The value of _aria-label_ for the toggle icon. _If no text value is defined an error will be thrown._ |
| `icon` | string |  | Acceptable value: any Flight icon name. |
| `hasChevron` | boolean |  | Per design, `false` is only acceptable when the "more-horizontal" icon is used; as such, it is set to `true` by default. |
| `imageSrc` | string |  |  |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### ListItem::CopyItem

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `copyItemTitle` | string |  |  |
| `text` required | string |  | The text to be copied. _If no text value is defined an error will be thrown._ |

#### ListItem::Description

Here is the API for the "description" list item component (yielded in a hash under the key `Description`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` required | string |  | The text to be used for the description. _If no text value is defined an error will be thrown._ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### ListItem::Generic

Here is the API for the "generic" list item component (yielded in a hash under the key `Generic`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `"yield"` |  |  | Elements passed as children of this sub-component are yielded inside the list item. 🚨 _Notice: when using the "generic" list item the developer is completely responsible for any element yielded, including the accessibility of that element, as well as the layout of the content (we provide only the horizontal padding for consistency with the other items)._ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### ListItem::Interactive

Here is the API for the "interactive" list item component (yielded in a hash under the key `Interactive`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` required | string |  | The text to be used in the item. _If no text value is defined an error will be thrown._ |
| `color` | enum | `action` `critical` | Acceptabe values: |
| `icon` | string |  | Acceptable value: any Flight icon name. |
| `isLoading` | boolean |  | This controls if the item is in "loading" state. _Notice: when in this state, the item is not actually interactive, but you can pass the other expected arguments for the item (they're simply ignored)._ |
| `href` |  |  | This is the URL parameter that is passed down to the `<a>` element. |
| `isHrefExternal` | boolean |  | This controls if the `<a>` link is external and so for security reasons we need to add the `target="_blank"` and `rel="noopener noreferrer"` attributes to it. |
| `route/models/model/query/current-when/replace` |  |  | These are the parameters that are passed down as arguments to the `<LinkTo/LinkToExternal>` component. |
| `isRouteExternal` | boolean |  | This controls if the "LinkTo" is external to the Ember engine ([more details here](https://ember-engines.com/docs/link-to-external)) in which case it will use a `<LinkToExternal>` instead of a simple `<LinkTo>` for the @route. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. 🚨 |

#### ListItem::Separator

Here is the API for the "separator" list item component (yielded in a hash under the key `Separator`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### ListItem::Title

Here is the API for the "description" list item component (yielded in a hash under the key `Title`):

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `text` required | string |  | The text to be used for the title. _If no text value is defined an error will be thrown._ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |