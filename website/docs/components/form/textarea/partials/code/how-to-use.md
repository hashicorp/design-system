## How to use this component

There are two ways to use the Textarea component:

- `Form::Textarea::Base` - the base component: the `<Textarea>` Ember component.
- `Form::Textarea::Field` - the field parent component: the `<Textarea>` Ember component, with label, helper text and error messaging (in a wrapping container).

We recommend using the Field component because it provides built-in accessibility functionality. Use the Base component if needing to achieve custom layouts or have special use cases not covered by the Field component.


{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::Textarea::Field

The basic invocation requires a `Label`. This creates:

- a `<label>` element with a `for` attribute automatically associated with the textarea `ID` attribute.
- a `<textarea>` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Textarea::Field name="description" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

#### Textarea value

Pass a `@value` argument to pre-populate the textarea.

```handlebars
<Hds::Form::Textarea::Field @value="This is my description" name="description" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the textarea control, associating it with the automatically generated `ID` of the helper text element.

```handlebars
<Hds::Form::Textarea::Field @value="This is my description" name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

#### Extra content in label and helper text

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

```handlebars
<Hds::Form::Textarea::Field name="description" as |F|>
  <F.Label>Short description <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
</Hds::Form::Textarea::Field>
```

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is "required" or "optional".

```handlebars
<Hds::Form::Textarea::Field @isRequired={{true}} name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
<br />
<Hds::Form::Textarea::Field @isOptional={{true}} name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

#### Character count

If the user input needs to be limited to a certain number of characters, use `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements. This property does not restrict the users from entering characters over the limit. To define the maximum string length that the user can enter, set `maxlength` attribute on the associated input field.

```handlebars
<Hds::Form::Textarea::Field @value={{this.value1}} name="description" {{on "input" (fn this.updateValue "value1")}} as |F|>
  <F.Label>Short description</F.Label>
  <F.CharacterCount @maxLength={{200}}/>
</Hds::Form::Textarea::Field>
```

If the user input is required to have a certain number of characters, use `@minLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

```handlebars
<Hds::Form::Textarea::Field @value={{this.value2}} name="description" {{on "input" (fn this.updateValue "value2")}} as |F|>
  <F.Label>Short description</F.Label>
  <F.CharacterCount @minLength={{100}}/>
</Hds::Form::Textarea::Field>
```

When the user input needs to be in a certain range, use both `@minLength` and `@maxLength` on a `CharacterCount` contextual component to guide the user in meeting the length requirements.

```handlebars
<Hds::Form::Textarea::Field @value={{this.value3}} name="description" {{on "input" (fn this.updateValue "value3")}} as |F|>
  <F.Label>Short description</F.Label>
  <F.CharacterCount @minLength={{100}} @minLength={{200}}/>
</Hds::Form::Textarea::Field>
```

##### Custom message

For custom messages, you can use the following arguments to build a relevant message: `currentLength` (the current number of characters in the associated form control), `maxLength` (the maximum number of characters allowed in the associated form control), `minLength` (the minimum number of characters required in the associated form control), `remaining` (the difference between `maxLength` and `currentLength`), and `shortfall` (the difference between `currentLength` and `minLength`).

```handlebars
<Hds::Form::Textarea::Field @value={{this.value4}} name="description" {{on "input" (fn this.updateValue "value4")}} as |F|>
  <F.Label>Short description</F.Label>
  <F.CharacterCount @maxLength={{200}} as |CC|>
    {{CC.remaining}} characters remaining
  </F.CharacterCount>
</Hds::Form::Textarea::Field>
```

##### Validation based on length

You can raise an error based on the number of characters entered into a field using a custom validation function.

```handlebars
  <Hds::Form::Textarea::Field
    @value={{this.value5}}
    @isInvalid={{this.fieldIsInvalid}}
    name="description"
    {{on "input" (fn this.updateValue "value5")}}
    as |F|
  >
    <F.Label>Short description</F.Label>
    <F.CharacterCount @minLength={{this.minLength}} />
    {{#if this.fieldIsInvalid}}
      <F.Error>Length should be at least 100 characters</F.Error>
    {{/if}}
  </Hds::Form::Textarea::Field>
```

#### Validation

To indicate a field is invalid, use the `@isInvalid` argument and provide an error message using the `Error` contextual component.

```handlebars
<Hds::Form::Textarea::Field @value="A" @isInvalid={{true}} name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.Error>Error: the description text is too short.</F.Error>
</Hds::Form::Textarea::Field>
```

Add more than one error message using the more specific `Message` contextual component.

```handlebars
<Hds::Form::Textarea::Field @value="&lt;a&gt;" @isInvalid={{true}} name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.Error as |E|>
    <E.Message>Length should be at least 12 characters</E.Message>
    <E.Message>Can not contain HTML</E.Message>
    <E.Message>B</E.Message>
  </F.Error>
</Hds::Form::Textarea::Field>
```

#### Custom control ID

If needing a custom ID for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

!!! Info

In this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.
!!!

```handlebars
<Hds::Form::Textarea::Field @id="my-control" name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

```handlebars
<Hds::Form::Textarea::Field @extraAriaDescribedBy="my-extra-element-ID" name="description" as |F|>
  <F.Label>Short description</F.Label>
  <F.HelperText>Add a short description about the workspace you are creating.</F.HelperText>
</Hds::Form::Textarea::Field>
```

#### HTML native attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the `<textarea>` element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control, or adding `min`, `max`, `minlength`, `maxlength`, or `pattern` attributes to it).

```handlebars
<Hds::Form::Textarea::Field name="description" placeholder="Workspace description" minlength="4" maxlength="1024" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

#### Events handling

Because this component supports use of `...attributes`, you can use all the usual Ember techniques for event handling (e.g., `input`, `blur`, `change`), validation, etc.

```handlebars
<Hds::Form::Textarea::Field placeholder="Workspace description" name="description" {{on "blur" this.yourOnBlurFunction}} as |F|>
  <F.Label>Workspace description</F.Label>
</Hds::Form::Textarea::Field>
```

#### Custom width

By default, the textarea control width is set to fill the parent container.

Pass a custom width for the control using the `@width` argument.

```handlebars
<Hds::Form::Textarea::Field @width="200px" name="description" as |F|>
  <F.Label>Short description</F.Label>
</Hds::Form::Textarea::Field>
```

{{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

### Form::Textarea::Base

The Base component is intended for rare cases where the Field component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

`Form::Textarea::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The Base component creates a `<textarea>` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Textarea::Base
  @value="My workspace"
  aria-label="Short description"
  placeholder="Workspace description"
  @isRequired={{true}}
  name="description"
  {{on "blur" this.yourOnBlurFunction}}
/>
```
