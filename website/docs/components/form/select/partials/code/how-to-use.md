## How to use this component

There are two ways to use the Select component:

- `Form::Select::Base` - the base component: just the `<select>` control.
- `Form::Select::Field` - the field parent component: the `<select>` control, with label, helper text, and error messaging (in a wrapping container).

We recommend using the Field component as it provides built-in accessibility functionality. Use the Base component if needing to achieve custom layouts or for special use cases not covered by the Field component.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::Select::Field

The basic invocation requires a `Label`. This creates: 

- a `<label>` element with a `for` attribute automatically associated with the select `ID` attribute.
- a `<select>` control with an automatically generated `ID` attribute, and the `Options` elements yielded as children.

```handlebars
<Hds::Form::Select::Field name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Selected option

Pass the native `selected` attribute to pre-select one of the options.

```handlebars
<Hds::Form::Select::Field name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other" selected>Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Grouped options

To group similar sets of options, use the `<optgroup>` tag within the `Options` container.

```handlebars
<Hds::Form::Select::Field name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <optgroup label="Most common">
      <option value="Kubernetes">Kubernetes</option>
      <option value="AWS">AWS</option>
    </optgroup>
    <optgroup label="Others">
      <option value="CloudWise" selected>CloudWise</option>
      <option value="SWA">SWA</option>
      <option value="Other">Other</option>
    </optgroup>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the select control, associating it with the automatically generated `ID` of the helper text element.

```handlebars
<Hds::Form::Select::Field name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Extra content in label and helper text

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

For example:

```handlebars
<Hds::Form::Select::Field name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication that the field is "required" or "optional".

```handlebars
<Hds::Form::Select::Field @isRequired={{true}} name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
<br />
<Hds::Form::Select::Field @isOptional={{true}} name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Validation

To indicate a field is invalid, declare that it’s invalid by using the `@isInvalid` argument and provide an error message using the `Error` contextual component.

```handlebars
<Hds::Form::Select::Field @isInvalid={{true}} name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
  <F.Error>Error: select one of the options.</F.Error>
</Hds::Form::Select::Field>
```

#### Custom control ID

If needing a custom ID for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

!!! Info

In this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.
!!!

```handlebars
<Hds::Form::Select::Field @id="my-control" name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

```handlebars
<Hds::Form::Select::Field @extraAriaDescribedBy="my-extra-element-ID" name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Native HTML attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the `<select>` element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control, or adding `multiple` and `size` attributes to it).

Similarly, you can pass HTML attributes to the `<option/optgroup>` elements.

```handlebars
<Hds::Form::Select::Field name="demo-infrastructure" multiple size="8" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <optgroup label="Most common">
      <option value="Kubernetes">Kubernetes</option>
      <option value="AWS">AWS</option>
      <option value="Azure" disabled>Azure</option>
    </optgroup>
    <optgroup label="Others">
      <option value="Alibaba" selected>Alibaba</option>
      <option value="CloudWise" selected>CloudWise</option>
      <option value="SWA">SWA</option>
      <option value="Other">Other</option>
    </optgroup>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Event handling

Because this component supports use of `...attributes`, you can use all the usual Ember techniques for event handling (e.g., `blur`, `change`), validation, etc.

```handlebars
<Hds::Form::Select::Field {{on "blur" this.yourOnBlurFunction}} name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Custom width

By default, the select control width is set to fill the parent container. 

Pass a custom width for the control using the `@width` argument.

```handlebars
<Hds::Form::Select::Field @width="200px" name="demo-target-infrastructure" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Form::Select::Base

The Base component is intended for rare cases where the Field component can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

!!! Warning

`Form::Select::Base` does not come with built-in accessibility functionality. It is the responsibility of the product team to ensure the implementation is conformant.
!!!

The Base component creates a `<select>` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Select::Base
  aria-label="Target infrastructure"
  @isRequired={{true}}
  name="demo-target-infrastructure"
  {{on "blur" this.yourOnBlurFunction}}
  as |S|
>
  <S.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </S.Options>
</Hds::Form::Select::Base>
```
