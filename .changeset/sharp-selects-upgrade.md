---
"@hashicorp/design-system-components": major
---

<!-- START components/form/super-select -->
`SuperSelect` - Upgraded `ember-power-select` from 8.12.0 to 9.0.3, which requires `ember-basic-dropdown` 9.

To migrate:
- Install `ember-basic-dropdown` `^9.0.1`, `@ember/test-helpers` `^5.7.0` and `@glimmer/component` `^2.1.1`. All three are now peer dependencies.
- Import the `ember-basic-dropdown` styles before the `ember-power-select` styles, because `ember-power-select` no longer includes them. With Sass, add `@use "ember-basic-dropdown";` before `@use "ember-power-select";`. With CSS, import `node_modules/ember-basic-dropdown/dist/vendor/ember-basic-dropdown.css`, and change the `ember-power-select` path to `node_modules/ember-power-select/dist/vendor/ember-power-select.css`.
- Components passed to `@selectedItemComponent` now receive the selected option as `@selected` instead of `@option`. A component that still reads `@option` renders nothing.
- Components can no longer be passed by name as strings to `@selectedItemComponent`, `@placeholderComponent`, `@beforeOptionsComponent`, `@afterOptionsComponent`, `@optionsComponent` or `@triggerComponent`. Pass the component itself.
- `@options` and `@selected` no longer accept Ember `ArrayProxy`, `ObjectProxy` or `PromiseProxy` instances. Pass native arrays or promises instead.
- When "Clear selected" is used in `SuperSelect::Multiple`, `@onChange` now receives an empty array instead of `null`.
- The options list and the "after options" content are now wrapped in a `div.ember-power-select-options-wrapper` element. Update custom CSS or test selectors that rely on them being direct children of the dropdown content.

The signatures of the `Base` and `Field` components are now generic over the option type (`T`) and the `@extra` type (`TExtra`), which are inferred from `@options` and `@extra`. As a result:
- The yielded option, `@selected`, `@onChange`, `@search` and the other callbacks are typed with the option type, so `{{! @glint-expect-error }}` comments around yielded options can be removed.
- `@selected` must be an option, `undefined` or (in `SuperSelect::Multiple`) an array of options. `null` is no longer accepted.
- `@onChange` in `SuperSelect::Single` receives `T | undefined`.
- Custom components passed to `@selectedItemComponent` and similar arguments must match the signatures from `ember-power-select/types` (for example `PowerSelectSelectedItemSignature<T>`), using the same option type as `@options`.
- Import the `Select` type from `ember-power-select/types` instead of `ember-power-select/components/power-select`.
- The `@multiple` argument was removed from the signatures, since the component type already determines it.
<!-- END -->

<!-- START components/form/key-value-inputs -->
`KeyValueInputs` - The yielded `SuperSelectSingle` and `SuperSelectMultiple` components keep the generic types of the `SuperSelect` `Base` components, so their options are typed from `@options`.
<!-- END -->

<!-- START components/segmented-group -->
`SegmentedGroup` - The yielded `SuperSelectSingle` and `SuperSelectMultiple` components keep the generic types of the `SuperSelect` `Base` components, so their options are typed from `@options`.
<!-- END -->
