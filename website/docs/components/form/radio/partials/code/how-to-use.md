## How to use this component

!!! Info

Depending on how you’re processing the user input upon submission (eg. server-side via form `POST` or client-side using JavaScript) you will need to provide a `name` attribute or a custom `ID` attribute to the field. Since the decision on how to process the input data is left to the consumers, we omit these specific arguments in the examples, for sake of simplicity.
!!!

There are different possible ways to use the `Form::Radio` component: using the "base" variant (essentially just the control itself), using the "field" variant (the control plus label, helper text and error), or using the "group" variant (a list of fields with legend, helper text and error).

The "group" one is the one that likely you will want to use, because of the nature of the "radio" control (always used in a list of options). The "base" and "field" ones are to be used if and when you need to achieve custom layouts or have special use cases not covered by the other variant.

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

### Form::Radio::Group

The basic invocation creates:

- a `<fieldset>` container
- a `<legend>` element
- a list of rendered `<Form::Radio::Field>` components

The `@name` argument offers an easy way to provide the same name for all the radio controls in a single place.

```handlebars
<Hds::Form::Radio::Group @name="datacenter" as |G|>
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

#### Layout

You can choose between two different layout orientations, to better fit your spacing requirements.

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

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID` of the helper text element.

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

#### Extra content in legend and helper text

The `Legend` and `HelperText` contextual components used in the "group" yield their content: meaning you can pass not just plain text, but also structured content.

!!! Warning

If a link is used within a legend, helper text, or error text, it will not be presented as a link to a user with a screen reader; only the text content is read out. We recommend not using links, but if you need to do so sparingly and include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

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

#### Required / Optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that a choice is "required" or "optional".

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

#### Validation

If an input is not valid, provide the user with an error message using the `Error` contextual component.

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
  <G.Error>Error: you need to choose one datacenter.</G.Error>
</Hds::Form::Radio::Group>
```

#### "Field" items

A "group" of radios is made of one or more "field" radio components (`Form::Radio::Field`). So all the arguments, attributes and modifiers that can be passed to the "field" component, can be passed to the same items in the "group" declaration.

```handlebars
<Hds::Form::Radio::Group @layout="vertical" @name="datacenter-demo5" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.Radio::Field @id="datacenter-NYC1" checked @value="NYC1" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-DC1" @value="DC1" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>DC1</F.Label>
    <F.HelperText>CoreSite- K Street</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-NYC2" @value="NYC2" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
  </G.Radio::Field>
  <G.Radio::Field @id="datacenter-SF1" @value="SF1" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>SF1</F.Label>
    <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
  </G.Radio::Field>
</Hds::Form::Radio::Group>
```

{{! ========================= }} {{! ===== BASE + FIELD ===== }} {{! ========================= }}

### Form::Radio::Field and Form::Radio::Base

The "base" and "field" variants are intended for rare cases where the "group" variant can’t be used and a custom implementation is needed. Most of the details for the "field" variant also apply to the "base" variant, but see the [Component API](#component-api) for more details.

!!! Warning

`Form::Radio::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The basic invocation or a "field" component creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute
- a `<input type="radio">` control with an automatically generated `ID` attribute

```handlebars
<Hds::Form::Radio::Field name="data-center" @value="SF1" {{on "change" this.yourOnChangeFunction}} as |F|>
  <F.Label>SF1</F.Label>
</Hds::Form::Radio::Field>
```

The invocation of a "basic" component creates an `<input type="radio">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Radio::Base
  name="data-center"
  aria-label="San Francisco datacenter number 1"
  @value="SF1"
  {{on "change" this.yourOnChangeFunction}}
/>
```
