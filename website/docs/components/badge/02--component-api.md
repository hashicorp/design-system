---
title: Badge
category: components
component: badge
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `size` | enum | `small` `medium` `large` |  |
| `type` | enum | `filled` `inverted` `outlined` |  |
| `color` | enum | `neutral` `neutral-dark-mode` `highlight` `critical` `success` `warning` |  |
| `text` | string |  | The text of the badge or value of the _screen-reader only_ element if _isIconOnly_ is set to _true_. _If no text value is defined an error will be thrown._ |
| `icon` | string |  | Use this parameter to show an icon. Acceptable value: any Flight icon name. |
| `isIconOnly` | boolean |  | This indicates if the button will only contain an icon. _Notice: an internal check is in place to ensure that accessible text is still applied to the component._ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |