## Conformance rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

Form primitives aren’t conformant until used in conjunction with the other components/elements that will make them conformant.

## Known issues

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature.

## Applicable WCAG Success Criteria

This section is for reference only, some descriptions have been truncated for brevity. 

This component intends to conform to the following WCAG success criteria:
<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "3.3.2" "4.1.1" "4.1.2" }} />

---

## Support
If any accessibility issues have been found within these components, please let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).