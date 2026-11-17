---
"@hashicorp/design-system-components": patch
---

Added `sideEffects` to `package.json`, so bundlers can leave out components an app doesn't use, such as `CodeEditor` which imports CodeMirror.

CSS and Sass files are still marked as having side effects, so importing them keeps working.
