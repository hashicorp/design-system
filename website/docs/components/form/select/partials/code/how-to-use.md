!!! Info

Depending on how you’re going to process the user input upon submission (eg. server-side via form `POST` or client-side using JavaScript) you will need to provide a `name` attribute or a custom `ID` attribute to the field. Since the decision on how to process the input data is left to the consumers, in the examples provided we will omit these specific arguments, for sake of simplicity.
!!!

There are two possible ways to use the `Form::Select` component: using the "base" variant (essentially just the control itself) or using the "field" variant (the control plus label, helper text and error).

The "field" variant is used most commonly, because it provides, for free and out of the box, accessibility enhancements. The "base" variant can be used if you need to achieve custom layouts or have special use cases not covered by the "field" variant.

### Form::Select::Field

#### Basic use

```handlebars
<Hds::Form::Select::Field as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

This "field" component creates:

- a `<label>` element with a `for` attribute automatically associated with the select `ID` attribute
- a `<select>` control with an automatically generated `ID` attribute, and the `Options` elements yielded as children.

#### Selected option

You can pre-select one of the options passing to it the native `selected` attribute:

```handlebars
<Hds::Form::Select::Field as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other" selected>Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Grouped options

Since the `Options` container yields the content to the `<select>` element, it’s possible to use the `<optgroup>` tag within it, to group similar sets of options:

```handlebars
<Hds::Form::Select::Field as |F|>
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

You can add extra information to the field using an "helper" text:

```handlebars
<Hds::Form::Select::Field @value="036140285924" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

When the "helper" text is added, the component automatically adds an `aria-describedby` attribute to the select control, associating it with the automatically generated `ID` of the helper text element.

#### Extra content in label and helper text

The `Label` and `HelperText` contextual components used in the "field" yield their content; you can pass not just plain text, but also structured content. 

For example:

```handlebars
<Hds::Form::Select::Field as |F|>
  <F.Label>Target infrastructure <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in text (associated with the select through aria-describedby) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined.
!!!

#### Required / Optional

It’s possible to add a visual indication if a field is "required" or "optional" using the `@isRequired` and `@isOptional` arguments:

```handlebars
<Hds::Form::Select::Field @isRequired={{true}} as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
<br />
<Hds::Form::Select::Field @isOptional={{true}} as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

!!! Info

For complex forms indicate **required** fields, since this is the most explicit and transparent method and ensures users don’t have to make assumptions. For shorter, simpler forms (ie. login/signup and feedback requests) indicate **optional** fields.
!!!

#### Validation

!!! Info

The validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we provide is the visual representation of an invalid state of the field at UI level. When and how to provide this visual feedback to the user is responsibility left to the developer.
!!!

To show the user that their input is invalid, declare that the field is "invalid" (using the `@isInvalid`) argument and provide an error message (using the `Error` contextual component):

```handlebars
<Hds::Form::Select::Field @isInvalid={{true}} as |F|>
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

In cases where it’s necessary to have custom id attribute for the control, instead of the one automatically generated by the component (e.g., because it needs to be referenced somewhere else in the code), pass a `@id` argument to the "field":

```handlebars
<Hds::Form::Select::Field @id="my-control" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

!!! Info

In this case all internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated, but will use the custom ID provided.
!!!

#### Extra "aria-describedby"

If you want to connect one or more extra elements describing the field to the control, it’s possible to provide extra ID values to the `aria-describedby` attribute of the control, in addition to the ones automatically generated by the component, passing a `@extraAriaDescribedBy` argument to the "field":

```handlebars
<Hds::Form::Select::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Native HTML attributes

As explained in the [Component API](#component-api) section, the select "field" supports the `...attributes` spreading of HTML attributes over the `<select>` element. This means you can use all the standard HTML attributes of the `<select>` element.

Similarly, you can pass HTML attributes to the `<option/optgroup>` elements.

```handlebars
<Hds::Form::Select::Field name="infrastructure" multiple size="8" as |F|>
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

This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (eg. providing a `name` for the control, or adding `multiple` and `size` attributes to it)

#### Event handling

Thanks to the `...attributes` spreading over the `<select>` element, you can use as well all the usual Ember techniques for event handling, validation, etc.

```handlebars
<Hds::Form::Select::Field {{on "blur" this.yourOnBlurFunction}} as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value=""></option>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

You can use different events, depending on your context/need (eg. `blur`, `change`).

#### Custom width

By default the select control width is set to fill the parent container. It’s possible to pass a custom width for the control using the `@width` argument:

```handlebars
<Hds::Form::Select::Field @width="200px" as |F|>
  <F.Label>Target infrastructure</F.Label>
  <F.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </F.Options>
</Hds::Form::Select::Field>
```

#### Form::Select::Base

The "base" element is intended **only** for those rare cases where the "field" variant can’t be used and a custom implementation is needed. For this reason we will not go into to much detail on how to use it: most of the explanations above apply also to the "base" variant of the component. For further details refer to the [Component API](#component-api) section on this page, or speak with one of the Design Systems Team members.

!!! Info

When the "base" select is used, the developer is responsible for the correct implementation of the form control, including its accessibility conformance.
!!!

As an example, this is an invocation of the "base" component you could use:

```handlebars
<Hds::Form::Select::Base aria-label="Target infrastructure" @isRequired={{true}} {{on "blur" this.yourOnBlurFunction}} as |S|>
  <S.Options>
    <option value="Kubernetes">Kubernetes</option>
    <option value="Other">Other</option>
  </S.Options>
</Hds::Form::Select::Base>
```

This "base" component creates just the `<select>` control with an automatically generated `ID` attribute.