## Conformance rating

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

Breadcrumbs are conformant unless using the truncation feature, which would not pass a WCAG conformance audit.

## Known issues

When the browser zoom is scaled to 400% and a truncated menu is open, the menu may extend beyond the viewport and require the user to scroll in multiple directions. This is a failure of [Reflow – 1.4.10](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

![The breadcrumb component with the “truncation” dropdowm extending beyond the viewport](/assets/components/breadcrumb/breadcrumb-known-issue-truncation-outside-viewport.png =1208x*)

When the browser zoom is scaled to 400% and `@itemsCanWrap` is set to `false`, the text may truncate and become unavailable to keyboard-only users.

![The breadcrumb component with truncated text (ellipsis)](/assets/components/breadcrumb/breadcrumb-known-issue-truncated-text.png =1426x*)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG Success Criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.3" "1.4.4" "1.4.10" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.5" "2.4.6" "2.4.7" "3.2.3" }} />

---

<Doc::A11ySupport />
