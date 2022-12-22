## Conformance rating
<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

The `Form::Toggle::Base` variation of this component is conditionally conformant; that is, it is not conformant until it has an accessible name.
## Known Issues

If a link is used within a label, helper text, or error text, it will not be presented as a link to the user with a screen reader; only the text content is read out. It is generally preferable to avoid links within help/error text or labels; however, we understand that this may not be avoidable in some cases. Please use sparingly until a good known alternative approach is determined.

## Applicable WCAG Success Criteria

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.3.4" "1.3.5" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.4.6" "2.4.7" "3.2.1" "3.2.2" "3.2.4" "3.3.2" "4.1.1" "4.1.2" }} />
