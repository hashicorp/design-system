---
title: Card
category: components
component: card
section: component-api
---

Here is the API for the component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `level` | enum |  | _Notice:_ |
| `levelHover` | enum |  | This controls the level of elevation on `:hover` |
| `levelActive` | enum |  | This controls the level of elevation on `:active` |
| `background` | enum | `neutral-primary` `neutral-secondary` | _Notice: later we may decide/need to add more colors, but for now we have found only these two use cases._ |
| `hasBorder` | boolean |  | This controls if the card has a visual "edge", an external border (technically is an extra 1px shadow on top of the other drop shadows). _Notice: the color of the border is pre-defined. If you need a custom border you have to wrap your content in an element and assign the border to it (in that case, remember to inherit the border radius)._ |
| `overflow` | enum | `hidden` `visible` |  |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. |