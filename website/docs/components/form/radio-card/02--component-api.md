---
title: Form::RadioCard
category: components
group: form
component: radio-card
section: component-api
---

#### Form::RadioCard

Here is the API for the `RadioCard` component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `name` | string |  | The input control's name attribute |
| `value` | string |  | The input control's value attribute |
| `checked` | boolean |  | The input control's checked attribute |
| `disabled` | boolean |  | The input control's disabled attribute |
| `controlPosition` | enum | `bottom` `left` | Sets the position of the form control in relation to the card content. |
| `alignment` | enum | `left` `center` | Sets the alignment of the card content. |
| `layout` | string | `fluid` `fixed` | _Notice: by default the card will expand to fit the parent container. When used in a group the cards will equally share the width to fit the available space. If the_ |
| `maxWidth` | string |  | When used with a `fluid` layout, this parameter will determine the number of cards shown per row (for example `25%` will result in 4 cards). When used with a `fixed` layout, this parameter will preserve the width of the card and wrap cards on multiple rows if necessary. |
| `extraAriaDescribedBy` | string |  | An extra ID attribute to be added to the `aria-describedby` HTML attribute. _Notice: by default the_ |
| `...attributes` |  |  | `...attributes` spreading is supported on this component. _Notice: the attributes will be applied to the_ _Some examples of HTML attributes that you will likely use:_ |

##### Contextual components

`Icon`, `Label`, `Badge`, `Description`, and `Generic` content are passed to the `RadioCard` as contextual components in this order, regardless of the declaration order.

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `<[R].Icon>` |  |  | It yields an icon inside the card container. For details about its API check the [undefined](https://flight-hashicorp.vercel.app/engineering) component. |
| `<[R].Label>` | yielded component |  | It is a container that yields its content emphasized inside the card. |
| `<[R].Badge>` |  |  | It is a badge inside the card container. For details about its API check the [undefined](/components/badge/01_overview/) component. |
| `<[R].Description>` | yielded component |  | It is a container that yields its content inside the card. The content can be a simple string or a more complex/structured one, in which case it inherits the text style. |
| `<[R].Generic>` | yielded component |  | It is a container that yields its content inside the card. The content does not inherit any styles and can be customized as desired. |

#### Form::RadioCard::Group

Here is the API for the "group" component:

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `controlPosition` | enum | `bottom` `left` | Sets the position of the form control in relation to the card content. |
| `alignment` | enum | `left` `center` | Sets the alignment of the card content. |
| `name` | string |  | Sets the `name` attribute for each form control within the group. |
| `isRequired` | boolean |  | Appends a `Required` indicator next to the legend text and sets the `required` attribute on the controls when user input is required. |
| `layout` | string | `fluid` `fixed` | _Notice: by default the cards will expand to fit the parent container and will equally share the width to fit the available space. If the_ |

##### Contextual components

Legend, helper text, radio card, and error content are passed to the group as yielded components, using the `Legend`, `HelperText`, `RadioCard`, `Error` keys.

_Notice: the group of elements is automatically wrapped in a `<fieldset>` element._

| Name | Type | Value | Notes |
| --- | --- | --- | --- |
| `<[G].Legend>` | yielded component |  | It is an (optional) container that yields its content inside the `<legend>` element. The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [undefined](/components/form/base-elements/01_overview/) component. |
| `<[G].HelperText>` | yielded component |  | It is a container that yields its content inside the "helper text" block (at group level). The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [undefined](/components/form/base-elements/01_overview/) component. _Notice: the_ |
| `<[G].RadioCard>` | yielded component |  | It is used to yield one or more cards inside the group. For details about its API check the `RadioCard` component above. |
| `<[G].Error>` | yielded component |  | It is a container that yields its content inside the "error" block (at group level). The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [undefined](/components/form/base-elements/01_overview/) component. _Notice: the_ |