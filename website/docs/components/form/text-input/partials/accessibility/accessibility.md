## Conformance rating

### Form::TextInput::Field

<Doc::Badge @type="success">Conformant</Doc::Badge>

`Form::TextInput::Field` is conformant when used as directed. For this reason, we recommend using `Form::TextInput::Field` by default.

### Form::TextInput::Base

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

`Form::TextInput::Base` is not conformant until it has an accessible name.

## Known issues

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. As such, care should be used when considering this feature.

## Applicable WCAG Success Criteria

This section is for reference only, some descriptions have been truncated for brevity. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.2.4" "3.3.1" "3.3.2" "4.1.2" }} />

---

<Doc::A11ySupport />
