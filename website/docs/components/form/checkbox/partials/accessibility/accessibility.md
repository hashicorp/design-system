## Conformance rating

### Form::Checkbox::Field

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::Checkbox::Field` is conformant when used as directed.

### Form::Checkbox::Group

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::Checkbox::Group` is conformant when used as directed.

### Form::Checkbox::Base

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

`Form::Checkbox::Base` is not conformant until it has an accessible name.

!!! Info

**Links within labels, help text, or error text**

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, it is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined.
!!!

## Applicable WCAG Success Criteria

This section is for reference only, some descriptions have been truncated for brevity.

This component intends to conform to the following WCAG success criteria:
<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.2.4" "3.3.2" "4.1.1" "4.1.2" }} />

## Support

If any accessibility issues have been found within this component, please let us know by [submitting an issue](https://github.com/hashicorp/design-system/issues/new/choose).
