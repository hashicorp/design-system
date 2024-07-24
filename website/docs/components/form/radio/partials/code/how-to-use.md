## How to use this component

There are three ways to use the Radio component:

- `Form::Radio::Base` - the base component: the `<input>` control
- `Form::Radio::Field` - the field component: the `<input>` control, with label, helper text, and error messaging (in a wrapping container)
- `Form::Radio::Group` - the group component: a `<legend>` (optional), a list of fields, and error messaging

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

### Form::Radio::Group

The basic invocation creates:

- a `<fieldset>` container.
- a `<legend>` element.
- a list of rendered `<Form::Radio::Field>` components.

The `@name` argument offers an easy way to provide the same name for all the Radio controls in a single place.

```handlebars
<Hds::Form::Radio::Group @name="datacenter" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.RadioField as |F|>
    <F.Label>NYC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>DC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>NYC2</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>SF1</F.Label>
  </G.RadioField>
</Hds::Form::Radio::Group>
```

#### Layout

To better fit your spacing requirements, choose between two different layout orientations: `vertical` or `horizontal`.

```handlebars
<Hds::Form::Radio::Group @name="datacenter-demo2" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.RadioField as |F|>
    <F.Label>NYC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>DC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>NYC2</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>SF1</F.Label>
  </G.RadioField>
</Hds::Form::Radio::Group>
```

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo3" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.RadioField as |F|>
    <F.Label>NYC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>DC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>NYC2</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>SF1</F.Label>
  </G.RadioField>
</Hds::Form::Radio::Group>
```

#### Extra content in legend and helper text

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Legend` and `HelperText` contextual components used in the Group yield their content. This means you can also pass structured content.

When helper text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID`.

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="method-demo1" as |G|>
  <G.Legend>Method <Hds::Badge @size="small" @text="Beta" @color="highlight" /></G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel. See <Hds::Link::Inline @href="#">HTTP protocol</Hds::Link::Inline> for more details.</G.HelperText>
  <G.RadioField as |F|>
    <F.Label>POST</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>GET</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>PUT</F.Label>
  </G.RadioField>
</Hds::Form::Radio::Group>
```

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is “required” or “optional”.

```handlebars
<Hds::Form::Radio::Group @isRequired={{true}} @layout="horizontal" @name="method-demo2" as |G|>
  <G.Legend>Method</G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
  <G.RadioField as |F|><F.Label>POST</F.Label></G.RadioField>
  <G.RadioField as |F|><F.Label>GET</F.Label></G.RadioField>
  <G.RadioField as |F|><F.Label>PUT</F.Label></G.RadioField>
</Hds::Form::Radio::Group>
<br />
<Hds::Form::Radio::Group @isOptional={{true}} @layout="horizontal" @name="method-demo3" as |G|>
  <G.Legend>Method</G.Legend>
  <G.HelperText>Choose which HTTP method to use for the communication channel.</G.HelperText>
  <G.RadioField as |F|><F.Label>POST</F.Label></G.RadioField>
  <G.RadioField as |F|><F.Label>GET</F.Label></G.RadioField>
  <G.RadioField as |F|><F.Label>PUT</F.Label></G.RadioField>
</Hds::Form::Radio::Group>
```

#### Validation

To indicate a field is invalid, provide an error message using the `Error` contextual component.

```handlebars
<Hds::Form::Radio::Group @layout="horizontal" @name="datacenter-demo4" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.RadioField as |F|>
    <F.Label>NYC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>DC1</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>NYC2</F.Label>
  </G.RadioField>
  <G.RadioField as |F|>
    <F.Label>SF1</F.Label>
  </G.RadioField>
  <G.Error>Error: you need to choose one datacenter.</G.Error>
</Hds::Form::Radio::Group>
```

#### Field items

A group of Radios is made of one or more `Form::Radio::Field` components. All the arguments, attributes, and modifiers that can be passed to `Form::Radio::Field` can be passed to the same items in the Group declaration.

```handlebars
<Hds::Form::Radio::Group @layout="vertical" @name="datacenter-demo5" as |G|>
  <G.Legend>Choose datacenter</G.Legend>
  <G.RadioField @id="datacenter-NYC1" checked @value="NYC1" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>CoreSite- 32 Avenue of the Americas</F.HelperText>
  </G.RadioField>
  <G.RadioField @id="datacenter-DC1" @value="DC1" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>DC1</F.Label>
    <F.HelperText>CoreSite- K Street</F.HelperText>
  </G.RadioField>
  <G.RadioField @id="datacenter-NYC2" @value="NYC2" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>NYC1</F.Label>
    <F.HelperText>H5 Data Center - 325 Hudson Street</F.HelperText>
  </G.RadioField>
  <G.RadioField @id="datacenter-SF1" @value="SF1" {{on "change" this.yourOnChangeFunction}} as |F|>
    <F.Label>SF1</F.Label>
    <F.HelperText>INAP - 650 Townsend Street</F.HelperText>
  </G.RadioField>
</Hds::Form::Radio::Group>
```

{{! ========================= }} {{! ===== BASE + FIELD ===== }} {{! ========================= }}

### Form::Radio::Field and Form::Radio::Base

The Base and Field components are intended for rare cases where the Group component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

`Form::Checkbox::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The basic invocation for a Field component creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- a `<input type="radio">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Radio::Field name="data-center-radio" @value="SF1" {{on "change" this.yourOnChangeFunction}} as |F|>
  <F.Label>SF1</F.Label>
</Hds::Form::Radio::Field>
```

The basic invocation for a Base component creates an `<input type="radio">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Radio::Base
  name="data-center-radio2"
  aria-label="San Francisco datacenter number 1"
  @value="SF1"
  {{on "change" this.yourOnChangeFunction}}
/>
```
