## Conformance status

<Doc::Badge @type="warning">Conditionally conformant</Doc::Badge>

This component has been designed and implemented with accessibility in mind. However, if the truncation feature is used, this component would not pass a WCAG conformance audit.

## Known issues

When the browser zoom is used to scale content to 400%, if the breadcrumb has a `"truncation"` open, the dropdown may extend beyond the viewport and require the user to scroll in more than one direction (this is a failure of [Reflow – 1.4.10](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)).
    
![The breadcrumb component with the “truncation” dropdowm extending beyond the viewport](/assets/images/breadcrumb-known-issue-truncation-outside-viewport.png)

When the browser zoom is used to scale content to 400%, if the breadcrumb is not allowed to wrap its items (via the `@itemsCanWrap` prop) the text will likely get truncated, making it impossible for a keyboard-only user to access the truncated content.
    
![The breadcrumb component with truncated text (ellipsis)](/assets/images/breadcrumb-known-issue-truncated-text.png)

## Applicable WCAG Success Criteria

This section is for reference only. This component intends to conform to the following WCAG success criteria:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "1.4.3" "1.4.4" "1.4.10" "1.4.12" "2.1.1" "2.1.2" "2.4.3" "2.4.5" "2.4.6" "2.4.7" "3.2.3" }} />