## How to use this component

Super Select is a custom select-like component aiming to overcome some limitations of the HTML `<select>` element.

It’s primarily a wrapper for [ember-power-select](https://ember-power-select.com) and uses the 8.2.0 version with specific accessibility and styling choices that best fit our design system.

!!! Warning

ember-power-select 8.0, and by extension the Super Select component, requires the following line in your `application.hbs`. [Read more about migrating from 7.0 to 8.0](https://ember-power-select.com/docs/migrate-7-0-to-8-0).

```markup
<BasicDropdownWormhole />
```

!!!

We provide two main components with similar APIs: `Form::SuperSelect::Single` and `Form::SuperSelect::Multiple`.

**There are two ways to use each of the Super Select component types:**

1. `Form::SuperSelect::Single::Base` or `Form::SuperSelect::Multiple::Base`—the base component with just the Super Select control. In these instances, you will need to add your own label, helper text, and error messaging.
2. `Form::SuperSelect::Single::Field` or `Form::SuperSelect::Multiple::Field`—the field parent component which includes the Super Select control, label, helper text, and error messaging (in a wrapping container).

We recommend using the Field variation as it provides built-in accessibility functionality. Use the Base variation for custom layouts or special use cases not otherwise covered.

### Form::SuperSelect::Single

In cases where the [Dropdown](/components/dropdown) or [Form Select](/components/form/select) components are not suitable, use `SuperSelect::Single`.

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{fn (mut this.SELECTED_OPTION)}}
  @selected={{this.SELECTED_OPTION}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  as |F|
>
  <F.Label>This is the label</F.Label>
  <F.Options>{{F.options}}</F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

### Form::SuperSelect::Multiple

Use `SuperSelect::Multiple` to allow users to select multiple options.

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{fn (mut this.SELECTED_OPTIONS)}}
  @selected={{this.SELECTED_OPTIONS}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  as |F|
>
  <F.Label>This is the label</F.Label>
  <F.Options>{{F.options}}</F.Options>
</Hds::Form::SuperSelect::Multiple::Field>
```

### Pre-selected options

To pre-select an option, declare a value for the `selected` argument:

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{fn (mut this.PRE_SELECTED_OPTION)}}
  @selected={{this.PRE_SELECTED_OPTION}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  as |F|
>
  <F.Label>Label</F.Label>
  <F.Options>{{F.options}}</F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

### Placeholder

Placeholder text can be added to provide additional context. However, this information should not be necessary for users to complete a task.

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{fn (mut this.PLACEHOLDER_SELECTED_OPTION)}}
  @selected={{this.PLACEHOLDER_SELECTED_OPTION}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @placeholder="Your location"
  as |F|
>
  <F.Label>Select your location of residence</F.Label>
  <F.Options>{{F.options}}</F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

### Grouped options

To group similar sets of options, pass a nested data structure specifying the `groupName` and associated `options`.

!!! Warning

If options are implemented as an array of strings and have the same name, they will be treated as the same, so selecting one will select others with the same name. To avoid this, implement your options using objects. (e.g. [{name: "name", label: "label"}, ...])

!!!

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
  @onChange={{fn (mut this.SELECTED_GROUPED_OPTIONS)}}
  @selected={{this.SELECTED_GROUPED_OPTIONS}}
  @options={{this.GROUPED_OPTIONS}}
  as |F|
>
  <F.Label>Grouped options</F.Label>
  <F.Options>{{F.options}}</F.Options>
</Hds::Form::SuperSelect::Multiple::Field>
```

### Rich-content options

Super Select allows you to add HTML tags within options to lay out and structure content vs. `Hds::FormSelect` which only allows plain text strings as option content.

#### Rich content with default display in SuperSelect::Single

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{fn (mut this.SELECTED_CLUSTER_SIZE_OPTION)}}
  @selected={{this.SELECTED_CLUSTER_SIZE_OPTION}}
  @options={{this.CLUSTER_SIZE_OPTIONS}}
  as |F|
>
  <F.Label>Size</F.Label>
  <F.Options>
    {{#let F.options as |option|}}
      <Hds::Text::Body @size="200">
        <div class="doc-super-select-option-rich-header">
          <strong>{{option.size}}</strong>
          <strong>{{option.price}}</strong>
        </div>
        <div>{{option.description}}</div>
      </Hds::Text::Body>
    {{/let}}
  </F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

#### Rich content with default display in SuperSelect::Multiple

By default, all content of selected options displays in the “trigger”. Visually, this looks ok in `SuperSelect::Single`. However, in `SuperSelect::Multiple` the selected items are displayed as pill-shaped “tags” so can look quite busy.

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{fn (mut this.SELECTED_CLUSTER_SIZE_OPTIONS)}}
  @selected={{this.SELECTED_CLUSTER_SIZE_OPTIONS}}
  @options={{this.CLUSTER_SIZE_OPTIONS}}
  as |F|
>
  <F.Label>Size</F.Label>
  <F.Options>
    {{#let F.options as |option|}}
      <Hds::Text::Body @size="200">
        <div class="doc-super-select-option-rich-header">
          <strong>{{option.size}}</strong>
          <strong>{{option.price}}</strong>
        </div>
        <div>{{option.description}}</div>
      </Hds::Text::Body>
    {{/let}}
  </F.Options>
</Hds::Form::SuperSelect::Multiple::Field>
```

### Selected item component

To simplify the content displayed in the selected options, use `@selectedItemComponent` to specify a custom component with only the content you wish to display.

An example of a custom `selectedItemComponent` example:

```markup
<span>
  {{@option.size}}
</span>
```

`SuperSelect::Multiple` invocation with `selectedItemComponent` specified:

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{fn (mut this.SELECTED_CLUSTER_SIZE_OPTIONS)}}
  @selected={{this.SELECTED_CLUSTER_SIZE_OPTIONS}}
  @selectedItemComponent={{component "power-select/selected-option-multiple"}}
  @options={{this.CLUSTER_SIZE_OPTIONS}}
  as |F|
>
  <F.Label>Size</F.Label>
  <F.Options>
    {{#let F.options as |option|}}
      <Hds::Text::Body @size="200">
        <div class="doc-super-select-option-rich-header">
          <strong>{{option.size}}</strong>
          <strong>{{option.price}}</strong>
        </div>
        <div>{{option.description}}</div>
      </Hds::Text::Body>
    {{/let}}
  </F.Options>
</Hds::Form::SuperSelect::Multiple::Field>
```

`SuperSelect::Single` invocation with `selectedItemComponent` specified:

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{fn (mut this.SELECTED_CLUSTER_SIZE_OPTION)}}
  @selected={{this.SELECTED_CLUSTER_SIZE_OPTION}}
  @selectedItemComponent={{component "power-select/selected-option-single"}}
  @options={{this.CLUSTER_SIZE_OPTIONS}}
  as |F|
>
  <F.Label>Size</F.Label>
  <F.Options>
    {{#let F.options as |option|}}
      <Hds::Text::Body @size="200">
        <div class="doc-super-select-option-rich-header">
          <strong>{{option.size}}</strong>
          <strong>{{option.price}}</strong>
        </div>
        <div>{{option.description}}</div>
      </Hds::Text::Body>
    {{/let}}
  </F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

### Limiting width

If needed, you can use `dropdownMaxWidth` to limit the width of the dropdown content. Setting a value for `dropdownMaxWidth` automatically sets `matchTriggerWidth` to `false` meaning that the width of the dropdown content will not necessarily match the list of the toggle or trigger element as it does by default.

```handlebars
<div class="doc-super-select-constrain-width">
  <Hds::Form::SuperSelect::Single::Field
    @onChange={{fn (mut this.SELECTED_LONG_OPTION)}}
    @selected="API code"
    @options={{this.LONG_OPTIONS}}
    @dropdownMaxWidth="25em"
    as |F|
  >
    <F.Label>Choose one</F.Label>
    <F.Options>{{F.options}}</F.Options>
  </Hds::Form::SuperSelect::Single::Field>
</div>
```

### Helper text

You can add extra information to the field using [Helper Text](/components/form/primitives#formhelpertext). When helper text is added, the component automatically adds an `aria-describedby` attribute to the Super Select control, associating it with the automatically generated `ID` of the helper text element.

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{fn (mut this.SELECTED_GROUPED_OPTION)}}
  @selected={{this.SELECTED_GROUPED_OPTION}}
  @options={{this.GROUPED_OPTIONS}}
  @ariaLabel="Label"
  as |F|
>
  <F.Label>Target infrastructure</F.Label>
  <F.HelperText>The target infrastructure is where you want to deploy your apps.</F.HelperText>
  <F.Options>{{F.options}}</F.Options>
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
  @onChange={{fn (mut this.EXTRA_SELECTED_GROUPED_OPTION)}}
  @selected={{this.EXTRA_SELECTED_GROUPED_OPTION}}
  @options={{this.GROUPED_OPTIONS}}
  @ariaLabel="Label"
  as |F|
>
  <F.Label>Target infrastructure <Hds::Badge @size="small" @text="Beta" /></F.Label>
  <F.HelperText>This is an experimental feature (<Hds::Link::Inline @href="#">read more</Hds::Link::Inline>).</F.HelperText>
  <F.Options>{{F.options}}</F.Options>
</Hds::Form::SuperSelect::Single::Field>
```

### Base components

The Base components are intended for rare cases where the Field components can’t be used and a custom implementation is needed. Most of the details for the Field components also apply to the Base components, but see the [Component API](#component-api) for more details.

```handlebars
<Hds::Form::SuperSelect::Multiple::Base
  @onChange={{fn (mut this.SELECTED_MULTIPLE)}}
  @selected={{this.SELECTED_MULTIPLE}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @ariaLabel="Select server preferences"
  as |options|
>
  {{options}}
</Hds::Form::SuperSelect::Multiple::Base>
```
