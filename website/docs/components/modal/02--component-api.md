---
title: Modal
category: components
component: modal
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `size` | enum | `small` `medium` `large` | Sets the width of the modal. |
| `color` | enum | `neutral` `warning` `critical` | Sets the color scheme for the modal header elements: icon, tagline and title. |
| `onOpen` | function |  | Callback function invoked when the modal is opened. |
| `onClose` | function |  | Callback function invoked when the modal is closed. |
| `isDismissDisabled` | boolean |  | Set this boolean to `true` if you want to prevent the modal from being closed (for instance, to avoid accidental data loss in an unsubmitted form). Make sure you communicate to users the reason why the modal is still open, and what they need to do to resolve the problem that is preventing the modal from being closed. |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |

#### Contextual components

The title, the content of the modal dialog, and the actions are passed into the modal as yielded components, using the `Header`, `Body`, `Footer` keys.

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `<[M].Header>` | yielded component |  | It is a container that yields its content as the title of the modal dialog. |
| `<[M].Body>` | yielded component |  | It is an unstyled, generic container that yields as the main content of the modal dialog. This container gets a scrollbar when the yielded content exceeds the available space. |
| `<[M].Footer>` | yielded component |  | It is a container that yields its content as the footer of the modal dialog. We recommend using it exclusively for actions using the [undefined](/components/button-set/01_overview/) component. If a tertiary action is presented, it will always be aligned at the end of the row. |