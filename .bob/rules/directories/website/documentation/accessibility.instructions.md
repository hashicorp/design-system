---
applyTo: "website/docs/components/**/accessibility/**"
description: "Guidelines for component accessibility documentation"
---

# Component accessibility documentation

## Content

- Conformance rating - WCAG compliance when used on its own. If not compliant, steps to make component compliant are listed
- General accessibility guidance - (Optional) Any specific accessibility content that the consumer should be aware of
- Keyboard navigation - (Optional) Any keyboard navigation user flows are listed out in details
- Applicable WCAG success criteria - Lists all relevant WCAG success criteria

## Example template

```md
## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Keyboard navigation

<Doc::Badge @type="neutral">Tab</Doc::Badge>

Focus on a toggle.

![Keyboard accordion navigation example](/assets/components/accordion/accordion-focus.png =800x*)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.1.1" "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "1.4.13" "2.1.1" "2.1.2" "2.4.3" "2.4.6" "2.4.7" "2.5.3" "3.2.1" "3.2.4" "4.1.2" }} />

---

<Doc::A11ySupport />
```