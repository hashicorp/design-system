---
"@hashicorp/design-system-components": minor
---

# Interactive
- Introduced `<Hds::Interactive>` (a generic, "utility" component used internally by all the interactive elements like buttons and links)

# Button
- updated the button API to handle also links as `<a>`/`<LinkTo/LinkToExternal>` 
  - it can be used in place of the `<Hds::Link/LinkTo::CTA>` component (see below)
  - when the button is a link
		- the text is underlined for differentiation with a normal button - ⚠️ **Visual change!**
		- the button responds to `space` key event
- removed the `@type` argument from the API in favour of the `type` native attribute - 🚨 **Breaking change!**

# Link/LinkTo::CTA
- removed the `<Hds::Link/LinkTo::CTA>` component, in favour of `<Hds::Button>` component (see above) - 🚨 **Breaking change!**

# Link::Inline
- added the `<Hds::Link::Inline>` component (with API very similar to the `<Hds::Link::Standalone>`)

# Dropdown
- Updated the `Dropdown::ListItem::Interactive` to use the new `<Hds::Interactive>` component

# Alert/Toast components
- Removed the `<LinkTo::Standalone>` action (now you can use directly `<Link::Standalone>`)


