---
"@hashicorp/design-system-codemods": minor
---

Added the `v8/textarea` transform to migrate implicit HDS Textarea value bindings in `.hbs` files to explicit `input` and `change` handlers. Added diagnostics for existing modifiers, complex bindings, and missing global helper dependencies. Strict-mode `.gts` and `.gjs` files require manual migration.
