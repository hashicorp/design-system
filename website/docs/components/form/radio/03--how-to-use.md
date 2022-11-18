---
title: Form::Radio
category: components
group: form
component: radio
section: how-to-use
---

Note: depending on how you're going to process the user input upon submission (eg. server-side via form `POST` or client-side using JavaScript) you will need to provide a `name` attribute or a custom `ID` attribute to the field. Since the decision on how to process the input data is left to the consumers, in the examples provided we will omit these specific arguments, for sake of simplicity.

As mentioned above, there are different possible ways to use the `Form::Radio` component: using the "base" variant (essentially just the control itself), using the "field" variant (the control plus label, helper text and error), or using the "group" variant (a list of fields with legend, helper text and error).

In reality, the "group" one is the one that likely you will want to use, because of the nature of the "radio" control (always used in a list of options). The "base" and "field" ones are to be used if and when you need to achieve custom layouts or have special use cases not covered by the other variants.

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

#### Form::Radio::Group

##### Basic use

The simplest way to invoke a "radio" group is using something like this:

```handlebars
<Hds::Form::Radio::Group @name="datacenter-demo1" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```

Renders to:

Choose datacenter NYC1 DC1 NYC2 SF1

This "group" component creates:

*   a `<fieldset>` container
*   a `<legend>` element
*   a list of rendered `<Form::Radio::Fields>` components (with `ID`, `for` and `aria-describedby` attributes automatically generated and correcly linked one with the other).

The `@name` argument offers an easy way to provide the same name for all the radio controls in a single place.

##### Layout

You can choose between two different layout orientations, to better fit your spacing requirements:

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo2" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```

Renders to:

Choose datacenter NYC1 DC1 NYC2 SF1

##### Helper text

You can add extra information to the group using an "helper" text:

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo3" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.HelperText>Select which datacenter to use for the initial setup.</G.HelperText>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```

Renders to:

Choose datacenter Select which datacenter to use for the initial setup. NYC1 DC1 NYC2 SF1

When the "helper" text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID` of the helper text element.

##### Extra content in legend and helper text

The `Label` and `HelperText` contextual components used in the "field" are yielding their content: this means you can pass not just plain text, but also structured content. For example:

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="method-demo1" as |G|>
  <G.Legend>Method <Hds::Badge @size="small" @text="Beta" @color="highlight" /></G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel. See <Hds::Link::Inline @href="#">HTTP protocol</Hds::Link::Inline> for more details.</G.HelperText>
  <G.Radio::Field as |F|>
    <F.Label>POST</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>GET</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>PUT</F.Label>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```

Renders to:

Method Choose which HTTP method to use for the communication channel. See HTTP protocol for more details. POST GET PUT

_Notice: If a link is used within a legend, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in text (associated with the input through aria-describedby) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined._

##### Required / Optional

It's possible to add a visual indication if a group is "required" or is "optional" using the `@isRequired` and `@isOptional` arguments:

```handlebars
<Hds::Form::Radio::Group @isRequired={{true}} @layout="horizontal" @name="method-demo2" as |G|>
  <G.Legend>Method</G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
  <G.Radio::Field as |F|><F.Label>POST</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>GET</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>PUT</F.Label></G.Radio::Field>
</Hds::Form::Radio::Group>
<br />
<Hds::Form::Radio::Group @isOptional={{true}} @layout="horizontal" @name="method-demo3" as |G|>
  <G.Legend>Method</G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
  <G.Radio::Field as |F|><F.Label>POST</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>GET</F.Label></G.Radio::Field>
  <G.Radio::Field as |F|><F.Label>PUT</F.Label></G.Radio::Field>
</Hds::Form::Radio::Group>
```

Renders to:

Methods Choose which HTTP method to use for the communication channel. POST GET PUT  
Methods Choose which HTTP method to use for the communication channel. POST GET PUT

_Notice: for complex forms we suggest to indicate **required** fields, since this is the most explicit and transparent method and ensures users don’t have to make assumptions. For shorter, simpler forms (ie. login/signup and feedback requests) we suggest to indicate **optional** fields._

##### Validation

Notice: the validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we provide is the visual representation of an invalid state of the field at UI level. When and how to provide this visual feedback to the user is responsibility left to the developer.

To show the user that their input is not valid, you have to provide an error message (using the `Error` contextual component):

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo4" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field as |F|>
    <F.Label>NYC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>DC1</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>NYC2</F.Label>
  </G.Radio::Field>
  <G.Radio::Field as |F|>
    <F.Label>SF1</F.Label>
  </G.Radio::Field>
  <G.Error>Error: you need to choose at least one datacenter.</G.Error>
</Hds::Form::Radio::Group>
```

Renders to:

Choose datacenter NYC1 DC1 NYC2 SF1 Error: you need to choose at least one datacenter.

_Notice:_

*   _unlike for the `TextInput/Textarea/Select`, you don't need to pass a `@isInvalid` arguments to the fields, because the `radio` control doesn't have an "invalid" visual state_
*   _while technically is possible to provide multiple error messages (similar to the `TextInput/Textarea/Select` controls), in reality is very unlikely that you will need to (in case, please speak with the design system team)_

##### "Field" items

As explained above, a "group" of radios is made of one or more "field" radio components (`Form::Radio::Field`). So all the arguments, attributes and modifiers that can be passed to the "field" component, can be passed to the same items in the "group" declaration. For example:

```handlebars
<Hds::Form::Radio::Group @layout="vertical" @name="datacenter-demo5" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field @id="datacenter-NYC1" checked @value="NYC1" {{on "change" myAction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-DC1" @value="DC1" {{on "change" myAction}} as |F|>
    <F.Label>DC1</F.Label>
    <F.HelperText>CoreSite- K Street</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-NYC2" @value="NYC2" {{on "change" myAction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-SF1" @value="SF1" {{on "change" myAction}} as |F|>
    <F.Label>SF1</F.Label>
    <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```

Renders to:

Choose datacenter NYC1 CoreSite- 32 Avenue of the Americas DC1 CoreSite- K Street NYC1 H5 Data Center - 325 Hudson Street SF1 INAP - 650 Townsend Street {{! ========================= }} {{! ===== BASE + FIELD ===== }} {{! ========================= }}

#### Form::Radio::Base / Form::Radio::Field

As mentioned above, the "base" and "field" variants are intended **only** for those rare cases where the "group" variant can't be used, and a custom implementation needs to be done. For this reason we will not go too much in detail on how to use them: for further details refer to the [Component API](#component-api) section on this page, or speak with one of the design system team members.

Notice: when the "base" radio is used, the developer is completely responsible for the correct implementation of the form control, including its accessibility conformance.

To give just an example, this could be an invocation of the "base" component you would use:

```handlebars
<Hds::Form::Radio::Base
  name="data-center"
  aria-label="San Francisco datacenter number 1"
  @value="SF1"
  {{on "change" myAction}}
/>
```

Renders to:

This "base" component creates just the `<input type="radio">` control with an automatically generated `ID` attribute.

Similarly, this could be an invocation of the "field" component:

```handlebars
<Hds::Form::Radio::Field name="data-center" @value="SF1" {{on "change" myAction}} as |F|>
  <F.Label>SF1</F.Label>
</Hds::Form::Radio::Field>
```

Renders to:

SF1

This "field" component creates:

*   a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute
*   a `<input type="radio">` control with an automatically generated `ID` attribute