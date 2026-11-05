---
"@hashicorp/design-system-components": patch
---

Stopped re-exporting nine internal modules (such as `modifiers/hds-code-editor/languages/sentinel.js` and `components/hds/advanced-table/utils.js`) into the consuming app. None of them is a component or modifier, and six have no default export, so an app whose build loads every re-export failed on them.
