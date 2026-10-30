---
"@hashicorp/design-system-components": major
---

<!-- START components/form/textarea -->
`Form::Textarea` - Replaced Ember's built-in `Textarea` with a native HTML element in Base, Field, and contextual KeyValueInputs usage.

Removed implicit two-way `@value` updates. Consumers must explicitly update their state from `input` events to keep saved values, validation, and character counts in sync. Applications that dispatch `change` without `input` must also handle `change`. The `v8/textarea` codemod migrates straightforward `.hbs`, `.gts`, and `.gjs` bindings, updates backing classes, and reports cases requiring manual review.

Removed the built-in `ember-text-area` and `ember-view` classes. Use `hds-form-textarea` or application classes instead.
<!-- END -->
