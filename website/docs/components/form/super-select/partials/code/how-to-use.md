## How to use this component

SuperSelect is a custom select-like component aiming to overcome some limitations of the HTML `<select>` element.
It is based on the popular Ember [PowerSelect](https://ember-power-select.com/) add-on.

We provide two different subcomponent variants, `SuperSelect::Single` and `SuperSelect::Multiple`.

### SuperSelect::Single

Use `SuperSelect::Single` if you only want users to be able to select a single option similarly to the behavior
of the native HTML `<select>`.

```handlebars
<Hds::Form::SuperSelect::Single
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @selected={{this.SELECTED}}
  @searchEnabled={{true}}
  as |option|
>
  {{option}}
</Hds::Form::SuperSelect::Single>
```

### SuperSelect::Multiple

Use `Select::Multiple` to enable users to select multiple options if needed.

```handlebars
<Hds::Form::SuperSelect::Multiple
  @onChange={{this.noop}}
  @options={{this.OPTIONS}}
  @selected={{this.SELECTED}}
  @searchEnabled={{true}}
  as |option|
>
  {{option}}
</Hds::Form::SuperSelect::Multiple>
```
