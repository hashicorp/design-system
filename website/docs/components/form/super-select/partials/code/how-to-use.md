## How to use this component

Super Select is a custom select-like component aiming to overcome some limitations of the HTML `<select>` element.
It is based on the popular Ember [PowerSelect](https://ember-power-select.com/) add-on.

We provide two main components with similar APIs, `SuperSelect::Single` and `SuperSelect::Multiple`.

**There are two ways to use each of the Super Select component types:**

1. `Form::SuperSelect::Single::Base` or `Form::SuperSelect::Multiple::Base`—the base component with just the Super Select control.
2. `Form::SuperSelect::Single::Field` or `Form::SuperSelect::Multiple::Field`—the field parent component which includes the Super Select control, label, helper text, and error messaging (in a wrapping container).

We recommend using the Field component as it provides built-in accessibility functionality. Use the Base component for custom layouts or special use cases not covered by the Field component.

### Field components

#### Basic invocations including search

##### SuperSelect::Single::Field

Use `SuperSelect::Single` if you want users to only select a single option.

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  as |F|
>
  <F.Label>This is the label</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Single::Field>
```

##### SuperSelect::Multiple::Field

Use `SuperSelect::Multiple` to enable users to select multiple options.

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  as |F|
>
  <F.Label>This is the label</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Multiple::Field>
```

#### Selected option

Pre-select one or more of the options.

##### Single only

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @selected={{this.SELECTED}}
  as |F|
>
  <F.Label>Label</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Single::Field>
```

##### One or more

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @selected={{this.SELECTED}}
  as |F|
>
  <F.Label>This is the label</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Multiple::Field>
```

#### Placeholder

Placeholder text can be added to provide additional helpful context. However this information should not be necessary for users to complete a task.

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @placeholder="Your state"
  as |F|
>
  <F.Label>Select your state of residence</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Single::Field>
```

#### Grouped options

To group similar sets of options, pass a nested data structure specifying the `groupName` and associated `options`.

**Nested data structure example:**

```javascript
[
  { groupName: 'Most common', options: ['Kubernetes', 'AWS'] },
  { groupName: 'Others', options: ['CloudWise', 'SWA', 'Other'] },
]
```

**Component invocation:**

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{this.noop}}
  @options={{this.GROUPED_OPTIONS}}
  @selected={{this.SELECTED_GROUPED_OPTIONS}}
  as |F|
>
  <F.Label>Grouped options</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Multiple::Field>
```

#### With rich content in options

##### Rich content in SuperSelect::Single

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @selected={{this.SELECTED_CLUSTER_SIZE_OPTION}}
  @options={{this.CLUSTER_SIZE_OPTIONS}}
  as |F|
>
  <F.Label>Size</F.Label>

  <F.Options>
    {{#let F.options as |option|}}
      <div class="doc-super-select-option-rich-content">
        <p class="doc-super-select-option-rich-header">
          <strong>{{option.size}}</strong>
          <strong>{{option.price}}</strong>
        </p>
        <p>{{option.description}}</p>
      </div>
    {{/let}}
  </F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

##### Rich content in SuperSelect::Multiple

TODO: 
* Update example to include simplified content in tags

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{this.noop}}
  @selected={{this.SELECTED_CLUSTER_SIZE_OPTIONS}}
  @options={{this.CLUSTER_SIZE_OPTIONS}}
  as |F|
>
  <F.Label>Size</F.Label>
  <F.Options>
    {{#let F.options as |option|}}
      <div class="doc-super-select-option-rich-content">
        <p class="doc-super-select-option-rich-header">
          <strong>{{option.size}}</strong>
          <strong>{{option.price}}</strong>
        </p>
        <p>{{option.description}}</p>
      </div>
    {{/let}}
  </F.Options>
</Hds::Form::SuperSelect::Multiple::Field>
```

#### Helper text

You can add extra information to the field using helper text. When helper text is added, the component automatically adds an `aria-describedby` attribute to the Super Select control, associating it with the automatically generated `ID` of the helper text element.

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @options={{this.GROUPED_OPTIONS}}
  @selected={{this.SELECTED_GROUPED_OPTION}}
  @ariaLabel="Label"
  as |F|
>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  {{F.options}}
</Hds::Form::SuperSelect::Single::Field>
```

#### Extra content in label and helper text

!!! Warning

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature. If needing to use a link, include a screen reader-only message that informs the user that some help text includes links, and additional keyboard exploration may be required.
!!!

The `Label` and `HelperText` contextual components used in the Field component yield their content. This means you can also pass structured content.

For example:

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @options={{this.GROUPED_OPTIONS}}
  @selected={{this.SELECTED_GROUPED_OPTION}}
  @ariaLabel="Label"
  as |F|
>
  <F.Label>Target infrastructure <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
  {{F.options}}
</Hds::Form::SuperSelect::Single::Field>
```

### Base components

The Base components are intended for rare cases where the Field components can’t be used and a custom implementation is needed. Most of the details for the Field components also apply to the Base components, but see the [Component API](#component-api) for more details.

```handlebars
<Hds::Form::SuperSelect::Multiple::Base
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @selected={{this.SELECTEDMULTIPLE}}
  @aria-label="Label"
  as |options|
>
  {{options}}
</Hds::Form::SuperSelect::Multiple::Base>
```
