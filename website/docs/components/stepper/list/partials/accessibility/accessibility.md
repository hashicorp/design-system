## Conformance rating

<Doc::Badge @type="success">Conformant</Doc::Badge>

When used as recommended, there should not be any WCAG conformance issues with this component.

## Best Practices

### Using processing status

Only use the `@status` value of `processing` on a step, when it is related to a loading or background process, or if user interaction can not continue until completed. If used outside these use cases this status is not conformant.

## Applicable WCAG Success Criteria

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.1" "1.4.3" "1.4.4" "1.4.10" "1.4.11" "1.4.12" "2.2.2" "2.4.6" }} />

---

<Doc::A11ySupport />
