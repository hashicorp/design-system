## How to use this component

SuperSelect is a custom select-like component aiming to overcome some limitations of the HTML `<select>` element.
It is based on the popular Ember [PowerSelect](https://ember-power-select.com/) add-on.

We provide two variants, `SuperSelect::Single` and `SuperSelect::Multiple`.

**There are two ways to use the Super Select variants:**

1. `Form::SuperSelect::Single::Base` or `Form::SuperSelect::Multiple::Base`—the base component with just the Super Select control.
2. `Form::SuperSelect::Single::Field` or `Form::SuperSelect::Multiple::Field`—the field parent component which includes the Super Select control, label, helper text, and error messaging (in a wrapping container).

We recommend using the Field component as it provides built-in accessibility functionality. Use the Base component for custom layouts or special use cases not covered by the Field component.

### Basic invocation including search

#### SuperSelect::Single::Field

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

#### SuperSelect::Multiple::Field

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

### Selected options

#### Single selection

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

#### Multiple selections

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @searchEnabled={{true}}
  @selected={{this.SELECTEDMULTIPLE}}
  as |F|
>
  <F.Label>Label</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Multiple::Field>
```

### Grouped options

#### Single

```handlebars
<Hds::Form::SuperSelect::Single::Field
  @onChange={{this.noop}}
  @options={{this.GROUPED_OPTIONS}}
  @selected={{this.SELECTED_GROUPED_OPTION}}
  @ariaLabel="Label"
  as |F|
>
  <F.Label>Target infrastructure</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Single::Field>
```

#### Multiple

```handlebars
<Hds::Form::SuperSelect::Multiple::Field
  @onChange={{this.noop}}
  @options={{this.GROUPED_OPTIONS}}
  @selected={{this.SELECTED_GROUPED_OPTIONS}}
  @ariaLabel="Label"
  as |F|
>
  <F.Label>Target infrastructure</F.Label>
  {{F.options}}
</Hds::Form::SuperSelect::Multiple::Field>
```
