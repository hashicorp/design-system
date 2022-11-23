---
title: Tabs
category: components
component: tabs
section: component-api
---

The `Tabs` component is composed of different parts, with their own APIs:

*   a `Tabs` main “container”
*   multiple `Tab` sub-components (individual Tabs)
*   multiple `Panel` sub-components (individual Panels corresponding to each Tab)

#### Tabs

Here is the API for the main (“container”) component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `onClickTab` | function |  |  |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Tabs::Tab

Here is the API for the “Tab” component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `count` | string |  | Displays an optional "count" indicator in the tab. Accepts the text value that should go in the [BadgeCount](/components/badge-count). |
| `icon` |  |  | Displays an optional icon in the tab. Accepts the name of the [FlightIcon](https://flight-hashicorp.vercel.app/). |
| `isSelected` | boolean |  | Sets a custom initial tab to display when the page is loaded. (The first tab is selected on page load by default.) |
| `"yield"` |  |  | Elements passed as children of this component are yielded inside a `<button>` element. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Tabs::Panel

Here is the API for the “Panel” component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `"yield"` |  |  | Elements passed as children of this component are yielded inside a `<section>` element. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |