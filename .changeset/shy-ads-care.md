---
"@hashicorp/design-system-components": major
---

`Hds::Dropdown` – Removed `@listPosition` `left` and `right` (use `bottom-left` and `bottom-right`, respectively).

To migrate:

 - in `Hds::Dropdown` instances:
   - replace `@listPosition="left"` with `@listPosition="bottom-left"`
   - replace `@listPosition="right"` with `@listPosition="bottom-right"`
