Note: depending on how you're going to process the user input upon submission (eg. server-side via form `POST` or client-side using JavaScript) you will need to provide a `name` attribute or a custom `ID` attribute to the field. Since the decision on how to process the input data is left to the consumers, in the examples provided we will omit these specific arguments, for sake of simplicity.

As mentioned above, there are different possible ways to use the `Form::Toggle` component: using the "base" variant (essentially just the control itself), using the "field" variant (the control plus label, helper text and error), or using the "group" variant (a list of fields with legend, helper text and error).

The "field" and "group" ones are the one that likely you will want to use, because they provide – for free and out of the box – a lot of accessibility-related functionalities. The "base" one is to be used if and when you need to achieve custom layouts or have special use cases not covered by the other variants.

{{! ================= }} {{! ===== FIELD ===== }} {{! ================= }}

#### Form::Toggle::Field

The "field" variant of the toggle component is to be used when there's a single choice to make for the user. If there are multiple related choices, the "group" variant should be used instead.

##### Basic use

The simplest way to invoke a "toggle" field is using something like this:

```handlebars
<Hds::Form::Toggle::Field as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation

This "field" component creates:

*   a `<label>` element with a `for` attribute automatically associated with the input `ID` attribute
*   a `<input type="checkbox">` control with an automatically generated `ID` attribute

##### Input value

You can provide a value to the input passing to it a `@value` argument:

```handlebars
<Hds::Form::Toggle::Field @value="enable" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation

##### Checked

You can set the toggle to "checked" passing to it the standard HTML `checked` attribute:

```handlebars
<Hds::Form::Toggle::Field @value="enable" checked as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation

##### Helper text

You can add extra information to the field using an "helper" text:

```handlebars
<Hds::Form::Toggle::Field as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation With this option enabled you will receive an approximate cost estimation.

When the "helper" text is added, the component automatically adds an `aria-describedby` attribute to the input control, associating it with the automatically generated `ID` of the helper text element.

##### Extra content in label and helper text

The `Label` and `HelperText` contextual components used in the "field" are yielding their content: this means you can pass not just plain text, but also structured content. For example:

```handlebars
<Hds::Form::Toggle::Field as |F|>
  <F.Label>Enable cost estimation <Hds::Badge @size="small" @text="Beta" @color="highlight" /></F.Label>
  <F.HelperText>See <Hds::Link::Inline @href="#">our pricing</Hds::Link::Inline> for more information.</F.HelperText>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation See our pricing for more information.

_Notice: If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. Interactive elements in text (associated with the input through aria-describedby) will not be read out as interactive elements to users with screen readers; only the text itself will be read. As such, it is recommended to have a screen reader-only message that informs the user that some help text includes link, and additional keyboard exploration may be required. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined._

##### Validation

Note: the validation of the form fields is entirely delegated to the "consumer" of the HDS components. What we provide is the visual representation of an invalid state of the field at UI level. When and how to provide this visual feedback to the user is responsibility left to the developer.

To show the user that their input is not valid, you have to provide an error message (using the `Error` contextual component):

```handlebars
<Hds::Form::Toggle::Field as |F|>
  <F.Label>I approve the changes.</F.Label>
  <F.Error>Error: it's necessary to explicitly approve the changes to continue.</F.Error>
</Hds::Form::Toggle::Field>
```

Renders to:

I approve the changes. Error: it's necessary to explicitly approve the changes to continue.

_Notice: unlike for the `TextInput/Textarea/Select`, you don't need to pass a `@isInvalid` argument to the field, because the `toggle` control doesn't have an "invalid" visual state._

##### Custom control ID

In case it's necessary to have custom ID for the control, instead of the one automatically generated by the component (eg. because it needs to be referenced in the code for other reasons), you just need to pass a `@id` argument to the "field":

```handlebars
<Hds::Form::Toggle::Field @id="my-control" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```

_Notice: in this case all the internal references (`id/for/aria-describedby`) between the different parts of the field are still automatically generated, only they will use the custom ID provided._

##### Extra "aria-describedby"

If you want to connect one or more extra elements describing the field to the control, it's possible to provide extra ID values to the `aria-describedby` attribute of the control, in addition to the ones automatically generated by the component, passing a `@extraAriaDescribedBy` argument to the "field":

```handlebars
<Hds::Form::Toggle::Field @extraAriaDescribedBy="my-extra-element-ID" as |F|>
  <F.Label>Enable cost estimation</F.Label>
  <F.HelperText>With this option enabled you will receive an approximate cost estimation.</F.HelperText>
</Hds::Form::Toggle::Field>
```

##### HTML native attributes

As explained above in the [Component API](#component-api) section, the input "field" supports the `...attributes` spreading of HTML attributes over the `<input type="checkbox">` element. This means you can use all the standard HTML attributes of the `<input type="checkbox">` element.

```handlebars
<Hds::Form::Toggle::Field name="enable" as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation

This can be useful in case you want to add specific native behaviors to the field, that are not exposed directly by the component (eg. providing a `name` for the control)

##### Events handling

Thanks to the `...attributes` spreading over the `<input type="checkbox">` element, you can use as well all the usual Ember techniques for event handling, validation, etc.

```handlebars
<Hds::Form::Toggle::Field {{on "change" this.yourOnChangeFunction}} as |F|>
  <F.Label>Enable cost estimation</F.Label>
</Hds::Form::Toggle::Field>
```

Renders to:

Enable cost estimation

You can use different events, depending on your context/need (eg. `input`, `change`).

{{! ================= }} {{! ===== GROUP ===== }} {{! ================= }}

#### Form::Toggle::Group

The "group" variant of the toggle component is to be used when there are multiple related choices to make for the user, or a single one that needs to be presented with an extra "legend". If there is a single choice with no need for an extra "legend", the "field" variant should be used instead.

It's unlikely that you will ever need to use a "group" of toggle fields (from a design/UX perspective in this case is better to use a group of checkboxes). For this reason we will not explain in detail how to use the "group" variant (apart from the case of a toggle "group" with single choice). Please refer to the documentation for the [`Form::Toggle::Group`](/components/form/checkbox/) documentation for more details, or speak with the design system team for guidance on what to do in this specific case.

##### "Group" with single choice

There may be use cases in which you need to create a toggle "group" that contains a single "field" element (eg. for design reasons, to show the "legend" in a similar position for other control's labels). In that case is acceptable to have a group with a single "field" element. For example:

```handlebars
<Hds::Form::Toggle::Group as |G|>
  <G.Legend>Visibility</G.Legend>
  <G.Toggle::Field name="private" @id="visibility-private" as |F|>
    <F.Label>Private</F.Label>
    <F.HelperText>Making a box private prevents users from accessing it unless given permission.</F.HelperText>
  </G.Toggle::Field>
</Hds::Form::Toggle::Group>
```

Renders to:

Visibility Private Making a box private prevents users from accessing it unless given permission. {{! ================= }} {{! ===== BASE ===== }} {{! ================= }}

#### Form::Toggle::Base

As mentioned above, the "base" element is intended **only** for those rare cases where the "field" or "group" variants can't be used, and a custom implementation needs to be done. For this reason we will not go too much in detail on how to use it: most of the explanations above apply also to the "base" variant of the component, and for further details refer to the [Component API](#component-api) section on this page, or speak with one of the design system team members.

Note: when the "base" toggle is used, the developer is completely responsible for the correct implementation of the form control, including its accessibility conformance.

To give just an example, this could be an invocation of the "base" component you would use:

```handlebars
<Hds::Form::Toggle::Base
  name="enable-cost-estimation"
  aria-label="Enable cost estimation"
  @value="enable"
  {{on "change" this.yourOnChangeFunction}}
/>
```

Renders to:

This "base" component creates just the `<input type="checkbox">` control with an automatically generated `ID` attribute.