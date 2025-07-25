## How to use this component

There are two ways to use the Toggle component which is based on the HTML checkbox input:

- `Form::Toggle::Base` - the base component: the `<input>` control
- `Form::Toggle::Field` - the field component: the `<input>` control, with label, helper text, and error messaging (in a wrapping container)

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

### Form::Toggle::Group

Use `Form::Toggle::Group` when there are multiple related options to choose from, or a single one that needs to be presented with an extra `Legend`. If there’s a single choice and no need for an extra `Legend`, use `Form::Toggle::Field`.

It’s unlikely you’ll need to use `Form::Toggle::Group`, instead consider using [`Form::Checkbox::Group`](/components/form/checkbox). 

#### Group with single choice

There may be use cases in which you need to create a Toggle group that contains a single field element (e.g., to show the `Legend` in a similar position for other control’s labels). 

```handlebars
<Hds::Form::Toggle::Group as |G|>
  <G.Legend>Visibility</G.Legend>
  <G.ToggleField name="demo-private" @id="visibility-private" as |F|>
    <F.Label>Private</F.Label>
    <F.HelperText>Making a box private prevents users from accessing it unless given permission.</F.HelperText>
  </G.ToggleField>
</Hds::Form::Toggle::Group>
```

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

### Form::Toggle::Field

Use `Form::Toggle::Field` when the user has a single choice to make. If there are multiple related choices, use `Form::Toggle::Group`.

The basic invocation creates:

- a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute.
- a `<input type="checkbox">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Toggle::Field name="demo-cost-estimate" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

#### Input value

Pass a `@value` argument.

```handlebars
<Hds::Form::Toggle::Field @value="enable" name="demo-cost-estimate" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

#### Checked

Pass the standard HTML `checked` attribute to set the Toggle to “checked”.

```handlebars
<Hds::Form::Toggle::Field @value="enable" name="demo-cost-estimate" checked as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

#### Extra content in label and helper text

!!! Info

**Accessibility consideration**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

When helper text is added, the component automatically adds an `aria-describedby` attribute to the `fieldset`, associating it with the automatically generated `ID`.

```handlebars
<Hds::Form::Toggle::Field name="demo-cost-estimate" as |F|>
  <F.Label>Enable cost estimation <Hds::Badge @size="small" @text="Beta" @color="highlight" /></F.Label>
  <F.HelperText>See <Hds::Link::Inline @href="#">our pricing</Hds::Link::Inline> for more information.</F.HelperText>
</Hds::Form::Toggle::Field>
```

#### Required vs. optional

Use the `@isRequired` and `@isOptional` arguments to add a visual indication next to the legend text that the field is "required" or "optional".

Note: While the Toggle component is already normally required by the nature of its use for on/off selection, there may be rare instances in which a Toggle is turned off by default but requires the user to interact with it before submitting a form. For example, for accepting terms and conditions.

```handlebars
<Hds::Form as |FORM|>
  <FORM.Section>
    <Hds::Form::Toggle::Group @isRequired={{true}} as |G|>
      <G.Legend>Visibility</G.Legend>
      <G.ToggleField name="demo-private" @id="visibility-private" as |F|>
        <F.Label>Private</F.Label>
      </G.ToggleField>
    </Hds::Form::Toggle::Group>

    <Hds::Form::Toggle::Group @isOptional={{true}} as |G|>
      <G.Legend>Visibility</G.Legend>
      <G.ToggleField name="demo-private" @id="visibility-private" as |F|>
        <F.Label>Private</F.Label>
      </G.ToggleField>
    </Hds::Form::Toggle::Group>
  </FORM.Section>
</Hds::Form>
```

#### Validation

To indicate a field is invalid, provide an error message using the `Error` contextual component.

Unlike the `TextInput/Textarea/Select` components, you don’t need to pass an `@isInvalid` argument, because the Toggle doesn’t have an “invalid” visual state.

```handlebars
<Hds::Form::Toggle::Field name="demo-approve-change" as |F|>
  <F.Label>I approve the changes.</F.Label>
  <F.Error>Error: it is necessary to explicitly approve the changes to continue.</F.Error>
</Hds::Form::Toggle::Field>
```

#### Custom control ID

If needing a custom ID for the control instead of the one automatically generated by the component, pass the `@id` argument to the field.

In this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated and will use the custom ID provided.

```handlebars
<Hds::Form::Toggle::Field @id="my-control" name="demo-cost-estimate" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```

#### Additional `aria-describedby`

Pass an `@extraAriaDescribedBy` argument to the field to connect one or more extra elements describing the field to the control. This provides extra ID values to the `aria-describedby` attribute of the control, in addition to those automatically generated by the component.

```handlebars
<Hds::Form::Toggle::Field @extraAriaDescribedBy="my-extra-element-ID" name="demo-cost-estimate" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```

#### HTML native attributes

This component supports use of `...attributes`. This means you can use all the standard HTML attributes of the `<input type="checkbox">` element. This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (e.g., providing a `name` for the control).

```handlebars
<Hds::Form::Toggle::Field name="demo-cost-estimate" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

#### Events handling

Because this component supports use of `...attributes`, you can use all the usual Ember techniques for event handling (e.g., `input`, `change`), validation, etc. 

```handlebars
<Hds::Form::Toggle::Field name="demo-cost-estimate" {{on "change" this.yourOnChangeFunction}} as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

{{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

### Form::Toggle::Base

The Base element is intended for rare cases where the Field or Group components can’t be used and a custom implementation is needed. Most of the details for the Field component also apply to the Base component, but see the [Component API](#component-api) for more details.

This Base component creates the `<input type="checkbox">` control with an automatically generated `ID` attribute.

```handlebars
<Hds::Form::Toggle::Base
  name="demo-cost-estimate"
  aria-label="Enable cost estimation"
  @value="enable"
  {{on "change" this.yourOnChangeFunction}}
/>
```
