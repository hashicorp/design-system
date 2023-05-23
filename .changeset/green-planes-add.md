---
"@hashicorp/design-system-components": minor
"website": minor
---

Refactor `Hds::Disclosure` internal utility component into two new components: 
- Rename the original `Hds::Disclosure` component to `Hds::MenuPrimitive`
- Add a new `Hds::DisclosurePrimitive` component stripped of the “click outside/unfocus/esc to close” functionality
