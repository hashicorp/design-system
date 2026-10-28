---
"@hashicorp/design-system-components": minor
---

Upgraded `@ember/render-modifiers` from `3.0.0` to `4.0.0`. Applications built with ember-cli need `ember-auto-import` `2.10.1` or later. Older versions bundle an old copy of `@glimmer/validator` into the application alongside it, and the `did-update` modifier then throws `untrack is not a function`. This affects `Tabs`, `Accordion`, `Reveal`, `AppSideNav` and the `Dropdown` toggle icon.
