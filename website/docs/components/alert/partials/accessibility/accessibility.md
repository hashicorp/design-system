## Conformance rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

Alerts are conformant when there are no interactive elements present inside of the alert. There is future work planned to make this component WCAG conformant by adding support for the correct ARIA roles when interactive elements are contained within the alert.

## Best practices

### Notification
An Alert is a live region with important, usually time-sensitive information. The use of this alert component will cause immediate notifications for users with assistive technology.

### Dismissing the alert
Since alerts are not required to receive focus, it should not be required that the user close the alert.

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.10" "1.4.11" "1.4.12" "2.1.1" "2.1.2" "2.2.1" "2.5.3" "4.1.2" "4.1.3" }} />

---

<Doc::A11ySupport />
