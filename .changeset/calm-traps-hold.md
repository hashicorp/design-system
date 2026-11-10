---
"@hashicorp/design-system-components": major
---

Upgraded `ember-focus-trap` from `1.1.1` to `2.0.0`, which ships its own types and upgrades `focus-trap` from 6 to 8.

`ember-focus-trap` 2 requires Node.js 22 or later, and pnpm 10 or later when installed with pnpm. On older, end-of-life versions, installs show an engine warning, and Yarn 1 fails on Node.js versions before 22 unless it's run with `--ignore-engines`.

Apps that use the `{{focus-trap}}` modifier without depending on `ember-focus-trap` themselves get it through HDS, so they move to `focus-trap` 8 as well. Since [`focus-trap` 7.3.0](https://github.com/focus-trap/focus-trap/blob/master/CHANGELOG.md#730), a click outside a trap with `clickOutsideDeactivates` returns focus to where it was before the trap, even when the click lands on something focusable. `AdvancedTable` cells don't: when a click outside a cell moves focus, focus stays where the click put it.
