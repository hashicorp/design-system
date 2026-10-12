---
applyTo: "website/docs"
description: "Frontmatter syntax information"
---

## Frontmatter

All pages have a frontmatter block that provides metadata on a given page. It is declared at the top of a page's `index.md` file.

```md
---
title: Alert
description: Displays a brief message without interrupting a user's task.
caption: Displays a brief message without interrupting a user's task.
links:
  figma: https://www.figma.com/file/...
  github: https://github.com/hashicorp/...
layout:
  cover: false
  sidecar: false
navigation:
  order: 101
  keywords:
    - toggle
    - disclosure
    - details
    - reveal
    - list
  label: Alert
  hidden: false
previewImage: assets/illustrations/components/alert.jpg
status:
  updated: 2.3.0
```

### Frontmatter attributes

- `title` - (Required) Title of the page, used in the "cover" block and the <head> HTML block
- `description` - Extra description, appears below the title in the "cover" block
- `caption` - Blurb used when listing the page as "card" (eg. in landing pages)
- `links` - List of links related to the page
  - `figma` - Link to a Figma file/resource
  - `github` - Link to a GitHub page
- `layout` - Meta-information related to the layout of the page
  - `cover` - If the page "cover" is visible - default is true
  - `sidecar` - If the page "sidecar" is visible - default is true
- `navigation` - Meta-information related to the listing of the page in navigational contexts (eg. sidebar, cards)
  - `order` - Order of the pages in navigational lists - default is 100
  - `keywords` - (Optional) List of keywords that the page can be found with, when a filter is applied to a list of pages
  - `label` - (Optional) Alternative text to use in the sidebar navigation, instead of the title (which is used by default)
  - `hidden` - Hides the page from the sidebar navigation and the lists on the landing pages - default is false
- `previewImage` - (Optional) Full path to an image used when listing the page as "card" (eg. in landing pages). The path refers to the dist folder generated at build time, so is relative to the content of the /website/public folder.
- `status` - (Optional) Status of the component. Has values `added` | `updated` | `deprecated`
