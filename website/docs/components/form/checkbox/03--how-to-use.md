---
title: Form::Checkbox
category: components
group: form
component: checkbox
section: how-to-use
---

Note: depending on how you're going to process the user input upon submission (eg. server-side via form `POST` or client-side using JavaScript) you will need to provide a `name` attribute or a custom `ID` attribute to the field. Since the decision on how to process the input data is left to the consumers, in the examples provided we will omit these specific arguments, for sake of simplicity.

As mentioned above, there are different possible ways to use the `Form::Checkbox` component: using the "base" variant (essentially just the control itself), using the "field" variant (the control plus label, helper text and error), or using the "group" variant (a list of fields with legend, helper text and error).

The "field" and "group" ones are the one that likely you will want to use, because they provide – for free and out of the box – a lot of accessibility-related functionalities. The "base" one is to be used if and when you need to achieve custom layouts or have special use cases not covered by the other variants.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

#### Form::Checkbox::Field

The "field" variant of the checkbox component is to be used when there's a single choice to make for the user. If there are multiple related choices, the "group" variant should be used instead.

##### Basic use

The simplest way to invoke a "checkbox" field is using something like this:

```handlebars
<Hds::Form::Checkbox::Field as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation

This "field" component creates:

*   a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute
*   a `<input type="checkbox">` control with an automatically generated `ID` attribute

##### Input value

You can provide a value to the input passing to it a `@value` argument:

```handlebars
<Hds::Form::Checkbox::Field @value="enable" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation

##### Checked

You can set the checkbox to "checked" passing to it the standard HTML `checked` attribute:

```handlebars
<Hds::Form::Checkbox::Field @value="enable" checked as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation

##### Helper text

You can add extra information to the field using an "helper" text:

```handlebars
<Hds::Form::Checkbox::Field as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation With this option enabled you will receive an approximate cost estimation.

When the "helper" text is added, the component automatically adds an `aria-describedby` attribute to the input control, associating it with the automatically generated `ID` of the helper text element.

##### Extra content in label and helper text

The `Label` and `HelperText` contextual components used in the "field" are yielding their content: this means you can pass not just plain text, but also structured content. For example:

```handlebars
<Hds::Form::Checkbox::Field as |F|>
  <F.Label>Enable cost estimation <Hds::Badge @size="small" @text="Beta" @color="highlight" /></F.Label>
  <F.HelperText>See <Hds::Link::Inline @href="#">our pricing</Hds::Link::Inline> for more information.</F.HelperText>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation See our pricing for more information.

_Notice: If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in text (associated with the input through aria-describedby) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined._

##### Validation

Note: the validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we provide is the visual representation of an invalid state of the field at UI level. When and how to provide this visual feedback to the user is responsibility left to the developer.

To show the user that their input is not valid, you have to provide an error message (using the `Error` contextual component):

```handlebars
<Hds::Form::Checkbox::Field as |F|>
  <F.Label>I approve the changes.</F.Label>
  <F.Error>Error: it's necessary to explicitly approve the changes to continue.</F.Error>
</Hds::Form::Checkbox::Field>
```

Renders to:

I approve the changes. Error: it's necessary to explicitly approve the changes to continue.

_Notice: unlike for the `TextInput/Textarea/Select`, you don't need to pass a `@isInvalid` argument to the field, because the `checkbox` control doesn't have an "invalid" visual state._

##### Custom control ID

In case it's necessary to have custom ID for the control, instead of the one automatically generated by the component (eg. because it needs to be referenced in the code for other reasons), you just need to pass a `@id` argument to the "field":

```handlebars
<Hds::Form::Checkbox::Field @id="my-control" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Checkbox::Field>
```

_Notice: in this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated, only they will use the custom ID provided._

##### Extra "aria-describedby"

If you want to connect one or more extra elements describing the field to the control, it's possible to provide extra ID values to the `aria-describedby` attribute of the control, in addition to the ones automatically generated by the component, passing a `@extraAriaDescribedBy` argument to the "field":

```handlebars
<Hds::Form::Checkbox::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Checkbox::Field>
```

##### HTML native attributes

As explained above in the [Component API](#component-api) section, the input "field" supports the `...attributes` spreading of HTML attributes over the `<input type="checkbox">` element. This means you can use all the standard HTML attributes of the `<input type="checkbox">` element.

```handlebars
<Hds::Form::Checkbox::Field name="enable" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation

This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (eg. providing a `name` for the control)

##### Events handling

Thanks to the `...attributes` spreading over the `<input type="checkbox">` element, you can use as well all the usual Ember techniques for event handling, validation, etc.

```handlebars
<Hds::Form::Checkbox::Field {{on "change" myAction}} as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Checkbox::Field>
```

Renders to:

Enable cost estimation

You can use different events, depending on your context/need (eg. `input`, `change`).

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

#### Form::Checkbox::Group

The "group" variant of the checkbox component is to be used when there are multiple related choices to make for the user, or a single one that needs to be presented with an extra "legend". If there is a single choice with no need for an extra "legend", the "field" variant should be used instead.

##### Basic use

The simplest way to invoke a "checkbox" group is using something like this:

```handlebars
<Hds::Form::Checkbox::Group as |G|>
  <G.Legend>Valid datacenters</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Valid datacenters NYC1 DC1 NYC2 SF1

This "group" component creates:

*   a `<fieldset>` container
*   a `<legend>` element
*   a list of rendered `<Form::Checkbox::Fields>` components

##### Layout

You can choose between two different layout orientations, to better fit your spacing requirements:

```handlebars
<Hds::Form::Checkbox::Group @layout="horizontal" as |G|>
  <G.Legend>Valid datacenters</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Valid datacenters NYC1 DC1 NYC2 SF1

##### Helper text

You can add extra information to the group using an "helper" text:

```handlebars
<Hds::Form::Checkbox::Group @name="methods-demo1" as |G|>
  <G.Legend>Methods</G.Legend>
  <G.HelperText>All methods are applied by default unless specified.</G.HelperText>
  <G.Checkbox::Field checked as |F|>
    <F.Label>POST</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|>
    <F.Label>GET</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|>
    <F.Label>PUT</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Methods All methods are applied by default unless specified. POST GET PUT

When the "helper" text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID` of the helper text element.

##### Extra content in legend and helper text

The `Label` and `HelperText` contextual components used in the "field" are yielding their content: this means you can pass not just plain text, but also structured content. For example:

```handlebars
<Hds::Form::Checkbox::Group @name="methods-demo2" as |G|>
  <G.Legend>Methods <Hds::Badge @size="small" @text="Beta" @color="highlight" /></G.Legend>
  <G.HelperText>All methods are applied by default unless specified. See <Hds::Link::Inline @href="#">HTTP protocol</Hds::Link::Inline> for more details.</G.HelperText>
  <G.Checkbox::Field checked as |F|>
    <F.Label>POST</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|>
    <F.Label>GET</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|>
    <F.Label>PUT</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Methods All methods are applied by default unless specified. See HTTP protocol for more details. POST GET PUT

_Notice: If a link is used within a legend, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in text (associated with the input through aria-describedby) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined._

##### Required / Optional

It's possible to add a visual indication if a group is "required" or is "optional" using the `@isRequired` and `@isOptional` arguments:

```handlebars
<Hds::Form::Checkbox::Group @isRequired={{true}} @layout="horizontal" @name="methods-demo3" as |G|>
  <G.Legend>Methods</G.Legend>
  <G.HelperText>All methods are applied by default unless specified.</G.HelperText>
  <G.Checkbox::Field checked as |F|><F.Label>POST</F.Label></G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|><F.Label>GET</F.Label></G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|><F.Label>PUT</F.Label></G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
<br />
<Hds::Form::Checkbox::Group @isOptional={{true}} @layout="horizontal" @name="methods-demo4" as |G|>
  <G.Legend>Methods</G.Legend>
  <G.HelperText>All methods are applied by default unless specified.</G.HelperText>
  <G.Checkbox::Field checked as |F|><F.Label>POST</F.Label></G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|><F.Label>GET</F.Label></G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|><F.Label>PUT</F.Label></G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Methods All methods are applied by default unless specified. POST GET PUT  
Methods All methods are applied by default unless specified. POST GET PUT

_Notice: for complex forms we suggest to indicate **required** fields, since this is the most explicit and transparent method and ensures users don’t have to make assumptions. For shorter, simpler forms (ie. login/signup and feedback requests) we suggest to indicate **optional** fields._

##### Validation

Note: the validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we provide is the visual representation of an invalid state of the field at UI level. When and how to provide this visual feedback to the user is responsibility left to the developer.

To show the user that their input is not valid, you have to provide an error message (using the `Error` contextual component):

```handlebars
<Hds::Form::Checkbox::Group @layout="horizontal" as |G|>
  <G.Legend>Valid datacenters</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Checkbox::Field>
  <G.Error>Error: you need to choose at least one datacenter.</G.Error>
</Hds::Form::Checkbox::Group>
```

Renders to:

Valid datacenters NYC1 DC1 NYC2 SF1 Error: you need to choose at least one datacenter.

_Notice:_

*   _unlike for the `TextInput/Textarea/Select`, you don't need to pass a `@isInvalid` arguments to the fields, because the `checkbox` control doesn't have an "invalid" visual state_
*   _while technically is possible to provide multiple error messages (similar to the `TextInput/Textarea/Select` controls), in reality is very unlikely that you will need to (in case, please speak with the design system team)_

##### Name attribute

It's possible to provide a shared name between for the controls in in a group using the `@name` argument:

```handlebars
<Hds::Form::Checkbox::Group @layout="horizontal" @name="datacenter-group" as |G|>
  <G.Legend>Valid datacenters</G.Legend>
  <G.Checkbox::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|>
    <F.Label>DC1</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field checked as |F|>
    <F.Label>NYC2</F.Label>
  </G.Checkbox::Field>
  <G.Checkbox::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Valid datacenters NYC1 DC1 NYC2 SF1

_Notice: which one to use – single name vs distinct names for multiple checkboxes – depends on the context where these checkboxes are used. If you are not sure and want to know more see [this explanation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#handling_multiple_checkboxes)._

##### "Field" items

As explained above, a "group" of checkboxes is made of one or more "field" checkbox components (`Form::Checkbox::Field`). So all the arguments, attributes and modifiers that can be passed to the "field" component, can be passed to the same items in the "group" declaration. For example:

```handlebars
<Hds::Form::Checkbox::Group @layout="vertical" as |G|>
  <G.Legend>Valid datacenters</G.Legend>
  <G.Checkbox::Field name="datacenter1" @id="datacenter-NYC1" @value="NYC1" {{on "change" myAction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
  </G.Checkbox::Field>
  <G.Checkbox::Field name="datacenter2" @id="datacenter-DC1" checked @value="DC1" {{on "change" myAction}} as |F|>
    <F.Label>DC1</F.Label>
    <F.HelperText>CoreSite- K Street</F.HelperText>
  </G.Checkbox::Field>
  <G.Checkbox::Field name="datacenter3" @id="datacenter-NYC2" checked @value="NYC2" {{on "change" myAction}} as |F|>
    <F.Label>NYC2</F.Label>
    <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
  </G.Checkbox::Field>
  <G.Checkbox::Field name="datacenter4" @id="datacenter-SF1" @value="SF1" {{on "change" myAction}} as |F|>
    <F.Label>SF1</F.Label>
    <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Valid datacenters NYC1 CoreSite- 32 Avenue of the Americas DC1 CoreSite- K Street NYC2 H5 Data Center - 325 Hudson Street SF1 INAP - 650 Townsend Street

##### "Group" with single choice

There may be use cases in which you need to create a checkbox "group" that contains a single "field" element (eg. for design reasons, to show the "legend" in a similar position for other control's labels). In that case is acceptable to have a group with a single "field" element. For example:

```handlebars
<Hds::Form::Checkbox::Group as |G|>
  <G.Legend>Visibility</G.Legend>
  <G.Checkbox::Field name="private" @id="visibility-private" as |F|>
    <F.Label>Private</F.Label>
    <F.HelperText>Making a box private prevents users from accessing it unless given permission.</F.HelperText>
  </G.Checkbox::Field>
</Hds::Form::Checkbox::Group>
```

Renders to:

Visibility Private Making a box private prevents users from accessing it unless given permission. {{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

#### Form::Checkbox::Base

As mentioned above, the "base" element is intended **only** for those rare cases where the "field" or "group" variants can't be used, and a custom implementation needs to be done. For this reason we will not go too much in detail on how to use it: most of the explanations above apply also to the "base" variant of the component, and for further details refer to the [Component API](#component-api) section on this page, or speak with one of the design system team members.

Note: when the "base" checkbox is used, the developer is completely responsible for the correct implementation of the form control, including its accessibility conformance.

To give just an example, this could be an invocation of the "base" component you would use:

```handlebars
<Hds::Form::Checkbox::Base
  name="enable-cost-estimation"
  aria-label="Enable cost estimation"
  @value="enable"
  {{on "change" myAction}}
/>
```

Renders to:

This "base" component creates just the `<input type="checkbox">` control with an automatically generated `ID` attribute.