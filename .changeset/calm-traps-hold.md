---
"@hashicorp/design-system-components": patch
---

Upgraded `ember-focus-trap` from `1.1.1` to `2.0.0`, which ships its own types and upgrades `focus-trap` from `6.9.4` to `8.2.4`.

`ember-focus-trap` 2 requires Node.js 22 or later and pnpm 10 or later. On older, end-of-life versions, installs show an engine warning, and Yarn 1 fails on Node.js versions before 22 unless it's run with `--ignore-engines`.
