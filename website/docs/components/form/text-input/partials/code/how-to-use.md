## How to use this component

!!! Info

**Examples have been simplified**

We omit the `name` and `ID` attributes in the examples since processing of the data is the responsibility of the product teams.
!!!

There are two ways to use the Text Input component:

- `Form::TextInput::Base` - the base component: just the `<input>` control.
- `Form::TextInput::Field` - the field component: the `<input>` control, with label, helper text, and error messaging (in a wrapping container).

We recommend using the Field component as it provides built-in accessibility functionality. Use the Base component if needing to achieve custom layouts or for special use cases not covered by the Field component.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::TextInput::Field

The basic invocation requires a `Label`. This creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- a `<input type="text">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::TextInput::Field as |F|>
  <F.Label>Cluster name</F.Label>
</Hds::Form::TextInput::Field>
```

#### Input value

Pass a `@value` argument to pre-populate the input.

```handlebars
<Hds::Form::TextInput::Field @value="my-cluster-1234" as |F|>
  <F.Label>Cluster name</F.Label>
</Hds::Form::TextInput::Field>
```

#### Type

Pass a `@type` argument to change the type of input.

!!! Info

`@type="number"` is not supported as it causes [accessibility and usability problems](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/). If you are looking for additional validation or to display a numeric keypad on devices with dynamic keypads we recommend using `inputmode="numeric" pattern="[0-9]*"`. For the list of supported types, see [Component API](#component-api).

!!!

```handlebars
<Hds::Form::TextInput::Field @type="email" @value="janedoe@email.com" as |F|>
  <F.Label>Email</F.Label>
</Hds::Form::TextInput::Field>
<br />
<Hds::Form::TextInput::Field @type="date" as |F|>
  <F.Label>Date of birth</F.Label>
</Hds::Form::TextInput::Field>
```

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the input control, associating it with the automatically generated `ID` of the helper text element.

```handlebars
<Hds::Form::TextInput::Field @value="036140285924" as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```

#### Extra content in label and helper text

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

```handlebars
<Hds::Form::TextInput::Field as |F|>
  <F.Label>AWS Account ID <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
</Hds::Form::TextInput::Field>
```

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is "required" or "optional".

```handlebars
<Hds::Form::TextInput::Field @isRequired={{true}} as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
<br />
<Hds::Form::TextInput::Field @isOptional={{true}} as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```

#### Character count

If the user input needs to be limited to a certain number of characters, use `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements. This property does not restrict the users from entering characters over the limit. To define the maximum string length that the user can enter, set `maxlength` attribute on the associated input field.

```handlebars
<Hds::Form::TextInput::Field  @value={{this.value1}} {{on "input" (fn this.updateValue "value1")}} as |F|>
  <F.Label>Cluster name</F.Label>
  <F.CharacterCount @maxLength={{30}}/>
</Hds::Form::TextInput::Field>
```

If the user input is required to have a certain number of characters, use `@minLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

```handlebars
<Hds::Form::TextInput::Field  @value={{this.value2}} {{on "input" (fn this.updateValue "value2")}} as |F|>
  <F.Label>Cluster name</F.Label>
  <F.CharacterCount @minLength={{20}}/>
</Hds::Form::TextInput::Field>
```

When the user input needs to be in a certain range, use both `@minLength` and `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

```handlebars
<Hds::Form::TextInput::Field  @value={{this.value3}} {{on "input" (fn this.updateValue "value3")}} as |F|>
  <F.Label>Cluster name</F.Label>
  <F.CharacterCount @minLength={{20}} @maxLength={{30}}/>
</Hds::Form::TextInput::Field>
```

##### Custom message

For custom messages, you can use the following arguments to build a relevant message: `currentLength` (the current number of characters in the associated form control), `maxLength` (the maximum number of characters allowed in the associated form control), `minLength` (the minimum number of characters required in the associated form control), `remaining` (the difference between `maxLength` and `currentLength`), and `shortfall` (the difference between `currentLength` and `minLength`).

```handlebars
<Hds::Form::TextInput::Field  @value={{this.value4}} {{on "input" (fn this.updateValue "value4")}} as |F|>
  <F.Label>Cluster name</F.Label>
  <F.CharacterCount @maxLength={{30}} as |CC|>
    {{CC.remaining}} characters remaining
  </F.CharacterCount>
</Hds::Form::TextInput::Field>
```

##### Validation based on length

You can raise an error based on the number of characters entered into a field using a custom validation function.

```handlebars
  <Hds::Form::TextInput::Field
    @value={{this.value5}}
    @isInvalid={{this.fieldIsInvalid}}
    {{on "input" (fn this.updateValue "value5")}}
    as |F|
  >
    <F.Label>Cluster name</F.Label>
    <F.CharacterCount @minLength={{this.minLength}} />
    {{#if this.fieldIsInvalid}}
      <F.Error>Length should be at least 30 characters</F.Error>
    {{/if}}
  </Hds::Form::TextInput::Field>
```

#### Validation

To indicate a field is invalid, declare that it’s invalid by using the `@isInvalid` argument and provide an error message using the `Error` contextual component.

```handlebars
<Hds::Form::TextInput::Field @type="email" @value="jane.doe@.com" @isInvalid={{true}} as |F|>
  <F.Label>Email</F.Label>
  <F.Error>The provided email is not valid.</F.Error>
</Hds::Form::TextInput::Field>
```

Add more than one error message using the more specific `Message` contextual component.

```handlebars
<Hds::Form::TextInput::Field @type="password" @value="1234" @isInvalid={{true}} as |F|>
  <F.Label>Password</F.Label>
  <F.Error as |E|>
    <E.Message>Length should be at least 12 characters</E.Message>
    <E.Message>Must contain at least a special character</E.Message>
  </F.Error>
</Hds::Form::TextInput::Field>
```

#### Custom control ID

If needing a custom ID for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

!!! Info

In this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.
!!!

```handlebars
<Hds::Form::TextInput::Field @id="my-control" as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

```handlebars
<Hds::Form::TextInput::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>AWS Account ID</F.Label>
  <F.HelperText>Copy this ID to your AWS Resource Access Manager to initiate the resource share.</F.HelperText>
</Hds::Form::TextInput::Field>
```

#### HTML native attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the `<input>` element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control, or adding `min`, `max`, `minlength`, `maxlength`, or `pattern` attributes to it).

```handlebars
<Hds::Form::TextInput::Field @type="password" name="user-password" placeholder="Insert your password here" minlength="4" maxlength="64" as |F|>
  <F.Label>Password</F.Label>
</Hds::Form::TextInput::Field>
```

#### Events handling

Because this component supports use of `...attributes`, you can use all the usual Ember techniques for event handling (e.g., `input`, `blur`, `change`), validation, etc.

```handlebars
<Hds::Form::TextInput::Field @type="email" placeholder="eg. name.surname@email.com" {{on "blur" this.yourOnBlurFunction}} as |F|>
  <F.Label>Email</F.Label>
</Hds::Form::TextInput::Field>
```

#### Custom width

By default, the input control width is set to fill the parent container, with the exception of "date" and "time" input types.

Pass a custom width for the control using the `@width` argument.

```handlebars
<Hds::Form::TextInput::Field @type="search" placeholder="Search clusters" @width="200px" as |F|>
  <F.Label>Filter the list:</F.Label>
</Hds::Form::TextInput::Field>
```

#### Password

By default, password fields render with a button allowing users to toggle between visible and obfuscated input content.

```handlebars
<Hds::Form::TextInput::Field @type="password" @value="1234567890" as |F|>
  <F.Label>Password</F.Label>
</Hds::Form::TextInput::Field>
```

You can remove the visibility toggle button by setting `@hasVisibilityToggle` to `false`.

```handlebars
<Hds::Form::TextInput::Field @hasVisibilityToggle={{false}} @type="password" @value="1234567890" as |F|>
  <F.Label>Password</F.Label>
</Hds::Form::TextInput::Field>
```


{{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

### Form::TextInput::Base

The Base component is intended for rare cases where the Field component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

`Form::TextInput::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

A basic invocation requires a `@type` argument to be passed. This creates a `<input type="text">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::TextInput::Base
  @type="email"
  @value="janedoe@email.com"
  aria-label="User email"
  placeholder="eg. name.surname@email.com"
  @isRequired={{true}}
  {{on "blur" this.yourOnBlurFunction}}
/>
```
