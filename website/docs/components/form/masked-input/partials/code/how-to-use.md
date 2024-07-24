## How to use this component

There are two ways to use the Masked Input component:

- `Form::MaskedInput::Base` - the base component: the input control with a toggle button.
- `Form::MaskedInput::Field` - the field component: the input control with a toggle button, a label, helper text, and error messaging (in a wrapping container).

We recommend using the Field component as it provides built-in accessibility functionality. Use the Base component to achieve custom layouts or for special use cases not covered by the Field component.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::MaskedInput::Field

The basic invocation requires a `Label`. This creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- a `<input type="text">` or a `<textarea>` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::MaskedInput::Field name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### Input value

Pass a `@value` argument to pre-populate the input. By default, the content is visually obfuscated ("masked") and users can make it visible using the associated toggle button.

```handlebars
<Hds::Form::MaskedInput::Field 
  @value="036215df4996ca649928d8864b4df9e42cba0d6d" 
  name="team-token"
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

If you need to make the content visible by default or control the masking from outside the component, use the `@isContentMasked` argument.

```handlebars
<Hds::Form::MaskedInput::Field
  @isContentMasked={{false}}
  @value="036215df4996ca649928d8864b4df9e42cba0d6d"
  name="team-token"
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### Multiline

Set `@isMultiline` argument to `true` to render a `<textarea>`

```handlebars
<Hds::Form::MaskedInput::Field
  @isMultiline={{true}}
  @value="-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
/5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00
-----END RSA PRIVATE KEY-----"
  name="private-key"
  as |F|
>
  <F.Label>Private key</F.Label>
</Hds::Form::MaskedInput::Field>
```

!!! Info

**Important to know**

When the multiline input is masked, the browser converts newline characters to masked characters: this means that the multiline text will appear as a single long string of characters, even if it’s inside a `<textarea>` element.

When the text is not masked, the newline characters will be respected. This means it may occupy more lines than when it’s masked (see the example above).

Something to keep in mind when designing and implementing functionality that makes use of this component.

!!!

#### Copy button

To allow users to copy the input value to their clipboard, set the `@hasCopyButton` argument to `true`.

```handlebars
<Hds::Form::MaskedInput::Field
  @hasCopyButton={{true}}
  @value="036215df4996ca649928d8864b4df9e42cba0d6d"
  name="team-token"
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the input control, associating it with the automatically generated `ID` of the helper text element.

```handlebars
<Hds::Form::MaskedInput::Field
  @value="036215df4996ca649928d8864b4df9e42cba0d6d"
  name="team-token"
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.HelperText>The token must include permissions to manage workspaces and projects.</F.HelperText>
</Hds::Form::MaskedInput::Field>
```

#### Extra content in label and helper text

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

```handlebars
<Hds::Form::MaskedInput::Field name="team-token" as |F|>
  <F.Label>Terraform Cloud team token <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>The token must include <Hds::Link::Inline @href="#">permissions to manage workspaces and projects</Hds::Link::Inline>.</F.HelperText>
</Hds::Form::MaskedInput::Field>
```

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is "required" or "optional".

```handlebars
<Hds::Form::MaskedInput::Field @isRequired={{true}} name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.HelperText>The token must include permissions to manage workspaces and projects.</F.HelperText>
</Hds::Form::MaskedInput::Field>
<br />
<Hds::Form::MaskedInput::Field @isOptional={{true}} name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.HelperText>The token must include permissions to manage workspaces and projects.</F.HelperText>
</Hds::Form::MaskedInput::Field>
```

#### Character count

If the user input needs to be limited to a certain number of characters, use `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements. This property does not restrict the users from entering characters over the limit. To define the maximum string length that the user can enter, set `maxlength` attribute on the associated input field.

```handlebars
<Hds::Form::MaskedInput::Field
  @value={{this.value1}}
  name="team-token"
  {{on "input" (fn this.updateValue "value1")}} 
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.CharacterCount @maxLength={{40}}/>
</Hds::Form::MaskedInput::Field>
```

If the user input is required to have a certain number of characters, use `@minLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

```handlebars
<Hds::Form::MaskedInput::Field
  @value={{this.value2}}
  name="team-token" 
  {{on "input" (fn this.updateValue "value2")}} 
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.CharacterCount @minLength={{30}}/>
</Hds::Form::MaskedInput::Field>
```

When the user input needs to be in a certain range, use both `@minLength` and `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

```handlebars
<Hds::Form::MaskedInput::Field
  @value={{this.value3}}
  name="team-token"
  {{on "input" (fn this.updateValue "value3")}}
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.CharacterCount @minLength={{30}} @maxLength={{40}}/>
</Hds::Form::MaskedInput::Field>
```

##### Custom message

For custom messages, you can use the following arguments to build a relevant message: `currentLength` (the current number of characters in the associated form control), `maxLength` (the maximum number of characters allowed in the associated form control), `minLength` (the minimum number of characters required in the associated form control), `remaining` (the difference between `maxLength` and `currentLength`), and `shortfall` (the difference between `currentLength` and `minLength`).

```handlebars
<Hds::Form::MaskedInput::Field
  @value={{this.value4}}
  name="team-token"
  {{on "input" (fn this.updateValue "value4")}} 
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.CharacterCount @maxLength={{40}} as |CC|>
    {{CC.remaining}} characters remaining
  </F.CharacterCount>
</Hds::Form::MaskedInput::Field>
```

##### Validation based on length

You can raise an error based on the number of characters entered into a field using a custom validation function.

```handlebars
  <Hds::Form::MaskedInput::Field
    @value={{this.value5}}
    @isInvalid={{this.fieldIsInvalid}}
    name="team-token"
    {{on "input" (fn this.updateValue "value5")}}
    as |F|
  >
    <F.Label>Terraform Cloud team token</F.Label>
    <F.CharacterCount @minLength={{this.minLength}}/>
    {{#if this.fieldIsInvalid}}
      <F.Error>Length should be at least 40 characters</F.Error>
    {{/if}}
  </Hds::Form::MaskedInput::Field>
```

#### Validation

To indicate a field is invalid, use the `@isInvalid` argument and provide an error message using the `Error` contextual component.

```handlebars
<Hds::Form::MaskedInput::Field
  @isInvalid={{true}}
  name="team-token"
  @value="036215df4996ca649928d8864b4df9e42cba0d6d"
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.Error>The provided token is not valid</F.Error>
</Hds::Form::MaskedInput::Field>
```

Add more than one error message using the more specific `Message` contextual component.

```handlebars
<Hds::Form::MaskedInput::Field
  @isInvalid={{true}}
  name="team-token"
  @value="036215df4996c649928d8864b4"
  as |F|
>
  <F.Label>Terraform Cloud team token</F.Label>
  <F.Error as |E|>
    <E.Message>Length should be at least 40 characters</E.Message>
    <E.Message>Should not contain special characters or spaces</E.Message>
  </F.Error>
</Hds::Form::MaskedInput::Field>
```

#### Custom control ID

If needing a custom ID for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

!!! Info

In this case, all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.
!!!

```handlebars
<Hds::Form::MaskedInput::Field @id="tfc-token" name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

```handlebars
<Hds::Form::MaskedInput::Field @extraAriaDescribedBy="my-extra-element-ID" name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### HTML native attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the input control element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control, or adding `min`, `max`, `minlength`, `maxlength`, or `pattern` attributes to it).

```handlebars
<Hds::Form::MaskedInput::Field name="tfc-token" minlength="40" maxlength="40" name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### Events handling

This component supports the use of `...attributes`, which allows you to use all the usual Ember techniques for event handling (e.g., `input`, `blur`, `change`), validation, etc.

```handlebars
<Hds::Form::MaskedInput::Field name="team-token" {{on "blur" this.yourOnBlurFunction}} as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

#### Custom width

By default, the input control width is set to fill the parent container.

Pass a custom width for the control using the `@width` argument.

```handlebars
<Hds::Form::MaskedInput::Field @width="250px" name="team-token" as |F|>
  <F.Label>Terraform Cloud team token</F.Label>
</Hds::Form::MaskedInput::Field>
```

{{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

### Form::MaskedInput::Base

The Base component is intended for rare cases where the Field component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

`Form::MaskedInput::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The default invocation creates a `<input type="text">` or a `<textarea>` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::MaskedInput::Base
  @value="036215df4996ca649928d8864b4df9e42cba0d6d"
  aria-label="Terraform Cloud team token"
  name="team-token"
/>
```

When the `@isMultiline` argument is set to `true`, it creates a `<textarea>` control with an automatically generated `ID` attribute. You can also adjust the height of `<textarea>` either by using the `rows` attribute or by setting a custom `@height` value.

```handlebars
<Hds::Form::MaskedInput::Base
  @value="-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAKj34GkxFhD90vcNLYLInFEX6Ppy1tPf9Cnzj4p4WGeKLs1Pt8Qu
KUpRKfFLfRYC9AIKjbJTWit+CqvjWYzvQwECAwEAAQJAIJLixBy2qpFoS4DSmoEm
o3qGy0t6z09AIJtH+5OeRV1be+N4cDYJKffGzDa88vQENZiRm0GRq6a+HPGQMd2k
TQIhAKMSvzIBnni7ot/OSie2TmJLY4SwTQAevXysE2RbFDYdAiEBCUEaRQnMnbp7
9mxDXDf6AU0cN/RPBjb9qSHDcWZHGzUCIG2Es59z8ugGrDY+pxLQnwfotadxd+Uy
v/Ow5T0q5gIJAiEAyS4RaI9YG8EWx/2w0T67ZUVAw8eOMB6BIUg0Xcu+3okCIBOs
/5OiPgoTdSy7bcF9IGpSE8ZgGKzgYQVZeN97YE00
-----END RSA PRIVATE KEY-----"
  @isMultiline={{true}}
  rows="5"
  aria-label="Private key"
  name="team-token"
/>
```

!!! Info

**Important to know**

When the multiline input is masked, the browser converts newline characters to masked characters: this means that the multiline text will appear as a single long string of characters, even though it’s inside a `<textarea>` element.

Instead, when the text is not masked it will respect the newline characters: this means it may occupy more lines that when it’s masked (try the example above).

Something to keep in mind when designing and implementing functionality that requires this component.

!!!
