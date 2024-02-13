---
"@hashicorp/design-system-components": major
---

`Pagination` - Removed handling of query parameters from `onPageSizeChange` function for `Pagination::Numbered`.

_Unfortunately, it's not possible to cover this breaking change with a codemod. Consumers should review their usage of the `onPageSizeChange` callback and, if necessary, implement the persistence of the "page number" and "page size" values via query parameters themselves._
