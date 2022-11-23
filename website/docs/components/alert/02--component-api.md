---
title: Alert
category: components
component: alert
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `type` required | enum | `page` `inline` `compact` | Sets the type of alert. |
| `color` | enum | `neutral` `highlight` `success` `warning` `critical` | Sets the color scheme for `background`, `border`, `title`, and `description`, which **cannot** be overridden. `color` results in a default `icon`, which **can** be overridden. |
| `icon` | string / false |  | Override the default `icon` name, which is determined by the `color` argument. [Flight](https://flight-hashicorp.vercel.app/) icon name or pass `false` for no icon. |
| `onDismiss` | function |  | The alert can be dismissed by the user. When a function is passed, the "dismiss" button is displayed. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Contextual components

Title, description, actions and generic content are passed into the alert as yielded components, using the `Title`, `Description`, `Button`, `Link::Standalone`, `Generic` keys.

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `<[A].Title>` | yielded component |  | It is a container that yields its content inside the `"title"` block (the content inherits its style). It accepts `...attributes` spreading. |
| `<[A].Description>` | yielded component |  | It is a container that yields its content inside the `"description"` block (the content inherits its style). It accepts `...attributes` spreading. It can be used to pass content more complex than a simple string (eg. logic/conditionals, HTML elements, other Ember components, etc.) inside the "description" block. _Notice: for a few simple HTML elements (like_ |
| `<[A].Button>` | yielded component |  | It is a yielded `HDS::Button` component, so it exposes exactly [the same API of the](/components/button/01_overview/) , apart from the `@size` argument that is pre-defined to be `small`, and the `@color` argument that accepts only `secondary` or `tertiary`. |
| `<[A].Link::Standalone>` | yielded component |  | It is a yielded `HDS::Link::Standalone` component, so it exposes exactly [the same API of the](/components/link/standalone/01_overview/) , apart from the `@size` argument that is pre-defined to be `small`. |
| `<[A].Generic>` | yielded component |  | It is a very simple component that yields its content. _Notice: generic the content will appear at the bottom, after title, description and actions, and the developer will need to take care of spacing, layout and styling of the custom content in this case._ 🚨 |

For more details about how to invoke these contextual components see the sections ["How to use > Description"](#how-to-use-description), ["How to use > Actions"](#how-to-use-actions) and ["How to use > Generic content"](#how-to-use-generic) below.