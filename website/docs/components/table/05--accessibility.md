---
title: Table
category: components
component: table
section: accessibility
---

This component has been designed and implemented with accessibility in mind. When used as recommended, there should not be any WCAG conformance issues with this component. Developers should ensure that any table customizations they implement also meet the applicable WCAG Success Criteria.

There are a few critical items for developers to note:

*   The table row element (`tr`) is not eligible to receive interactions. If an interactive element is desired, place it within a table cell element (`td`).
*   When providing additional or alternative styles to the table element, do not change the `display` property in the CSS. This alters how the table is presented to the user with assistive technology, and they will no longer be presented with a table.

#### Applicable WCAG Success Criteria (Reference)

This section is for reference only. This component intends to conform to the following WCAG success criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.1.4" "2.4.3" "2.4.7" "4.1.1" "4.1.2" }} />
