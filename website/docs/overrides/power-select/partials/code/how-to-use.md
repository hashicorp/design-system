!!! Warning

**Deprecation notice**

The PowerSelect style overrides are deprecated and will be removed in a future major release. We recommend migrating PowerSelect instances to [SuperSelect](/components/form/super-select).
!!!

[PowerSelect](https://ember-power-select.com) is a popular Ember add-on aiming to overcome some limitations of the `<select>` tag. We only provide style overrides for this add-on to keep it in line with other form components.

These style overrides assume the PowerSelect component is set up in your project using the **default theme**.

To use this component in your application, follow [the getting started guide on the add-on website](https://ember-power-select.com), then add the PowerSelect overrides.

## Import the overrides

If you’re already using [`design-system-components`](https://github.com/hashicorp/design-system/blob/main/packages/components/README.md), import the overrides:

[[code-snippets/sass-imports]]

If you’re not using [`design-system-components`](https://github.com/hashicorp/design-system/blob/main/packages/components/README.md) but need to use these custom PowerSelect styles, add [`design-system-tokens`](https://github.com/hashicorp/design-system/blob/main/packages/tokens/README.md) to your project.

[[code-snippets/sass-all-imports]]

## How to use these overrides

These overrides rely on specificity, so to apply them, wrap each PowerSelect instance in an element with the `hds-power-select` class applied to it.

Invocation of the component with overrides would look like this:

[[code-snippets/power-select-basic]]

### Search enabled

When used with the `@searchEnabled` argument, the input is automatically styled to resemble the [`Form::TextInput`](/components/form/text-input) component.

[[code-snippets/power-select-search]]

### `@afterOptionsComponent` block

Use the `hds-power-select__after-options` class on the outermost element of the “after-options” component to consistently style `@afterOptionsComponent`.

[[code-snippets/power-select-after-options]]

`power-select/after-options.hbs` would look like this:

[[code-snippets/after-options-component execute=false]]

### Multiple selection

The selected items are automatically styled to resemble the [Tag](/components/tag) component when multiple options are allowed.

[[code-snippets/power-select-multi-select]]
