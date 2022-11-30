---
title: Dropdown
category: components
component: dropdown
section: accessibility
---

This component has been designed and implemented with accessibility in mind. When used as recommended, there should not be any accessibility issues with this component.

#### Known Potential Accessibility Issues

The following are known potential issues, and developers should keep these in mind when implementing this component:

1.  In any instance where data truncation occurs, there is no current method to access that data for the keyboard-only user. Therefore, we do not recommend allowing data to be truncated within this component.
2.  If the "overflow" toggle is used in the incorrect context, it will fail on perceivability. It must be used in in the current recommended context of a data table. For the best user experience, interactive elements should visually present as interactive, unless their context otherwise makes it clear that they are/should be interactive.

#### Applicable WCAG Success Criteria (Reference)

This section is for reference only. This component intends to conform to the following WCAG success criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.7" }} />
