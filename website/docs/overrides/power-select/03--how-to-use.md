---
category: overrides
component: power-select
section: how-to-use
---

# PowerSelect Component - How to use

To use this component in your application follow [the getting started guide on the add-on website](https://ember-power-select.com) then add the PowerSelect overrides as shown below.

#### Overrides import

If you are already using [design-system-components](https://github.com/hashicorp/design-system/blob/main/packages/components/README.md) in your project the overrides import would look something like this:

```
@import "@hashicorp/design-system-components";
@import "@hashicorp/design-system-power-select-overrides";
```

If you are not yet using [design-system-components](https://github.com/hashicorp/design-system/blob/main/packages/components/README.md) in your project but you want to use these PowerSelect custom styles you will need to add [design-system-tokens](https://github.com/hashicorp/design-system/blob/main/packages/tokens/README.md) to your project.

#### Basic usage

As these overrides rely on specificity, to apply them you need to wrap each PowerSelect instance in an element with `hds-power-select` class applied to it.

Invocation of the component with overrides would look something like this:

```handlebars
<div class="hds-power-select">
  <PowerSelect
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTED}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    as |option|
  >
    {{option}}
  </PowerSelect>
</div>
```

Renders to:

{{option}}

#### Search enabled

When used with the `@searchEnabled` argument, the input is automatically styled to resemble the [`Form::TextInput`](/components/form/text-input/01_overview/) component.

```handlebars
<div class="hds-power-select">
  <PowerSelect
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTED}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    @searchEnabled={{true}}
    as |option|
  >
    {{option}}
  </PowerSelect>
</div>
```

Renders to:

{{option}}

#### After options block

To consistently style the `@afterOptionsComponent` use the `hds-power-select__after-options` class on the outermost element of the after options component.

```handlebars
<div class="hds-power-select">
  <PowerSelect
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTED}}
    @afterOptionsComponent={{"power-select/after-options"}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    as |option|
  >
    {{option}}
  </PowerSelect>
</div>
```

Where `power-select/after-options.hbs` would look like this:

```handlebars
<div class="hds-power-select__after-options">
  5 results
</div>
```

Renders to:

{{option}}

#### Multiple selection

When multiple options are allowed the selected items are automatically styled to resemble the [`Tag`](/components/tag/01_overview/) component.

```handlebars
<div class="hds-power-select">
  <PowerSelectMultiple
    @options={{@model.OPTIONS}}
    @selected={{@model.SELECTEDMULTIPLE}}
    @onChange={{this.noop}}
    @renderInPlace={{true}}
    as |option|
  >
    {{option}}
  </PowerSelectMultiple>
</div>
```

Renders to:

{{option}}