---
"@hashicorp/design-system-components": major
---

Removed the deprecated PowerSelect style overrides (`design-system-power-select-overrides.css` and `design-system-power-select-overrides.scss`) and the `hds-power-select` and `hds-power-select__after-options` classes.

To migrate, replace `PowerSelect` instances with [`SuperSelect`](https://helios.hashicorp.design/components/form/super-select), and remove the imports of the overrides from your application's styles or `ember-cli-build.js`.
