---
"@hashicorp/design-system-components": minor
---

`Icon` - Added component:

`Hds::Icon` is meant to replace usage of the `FlightIcon` component from `ember-flight-icons`.

- Displays `block` by default. (`FlightIcon` displays `inline-block` by default)

Codemod:

Added new v4/icon codemod. Running this codemod will replace instances of `FlightIcon` with `Hds::Icon`.
See codemod README for documentation.
