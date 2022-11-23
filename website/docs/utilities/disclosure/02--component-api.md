---
title: Disclosure
category: utilities
component: disclosure
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `<:toggle>` | named block |  | This is a named block where to pass the interactive element that works as "toggle" for the disclosure. |
| `[:toggle].onClickToggle` | event handler |  | Function that needs to be called by the interactive element to toggle the visibility of the content. |
| `[:toggle].isOpen` | tracked property |  | Hook into this tracked property if you need to access the state of \`isOpen\`. |
| `<:content>` | named block |  | This is a named block where to pass the actual content that is shown/hidden upon toggling. |
| `[:content].close` | function |  | Function that can be called to programmatically close the dropdown. |
| `onClose` | function |  | Callback function invoked when the dropdown is closed (if provided). |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |