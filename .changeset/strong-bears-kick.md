---
"@hashicorp/design-system-components": minor
---

- removed `ember-cli-clipboard` as dependency and introduced a custom `hds-clipboard` modifier (using the web [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API))
- `Copy::Button`
  - replaced third-party `clipboard` modifier with `hds-clipboard`
  - removed `@container` argument (not needed anymore, it was used in the third party library as a hack to account for focus trapping and focus shifting)
  - added `@onSuccess/onError` callbacks
- `Copy::Snippet`
  - replaced third-party `clipboard` modifier with `hds-clipboard`
  - added `@onSuccess/onError` callbacks
- `Dropdown::ListItem::CopyItem`
  - the change to the underlying `Copy::Snippet` has fixed an issue with the focus being lost on copy (causing the dropdown to close on copy)
