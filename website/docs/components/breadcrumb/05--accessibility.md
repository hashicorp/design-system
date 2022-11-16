---
category: components
component: breadcrumb
section: accessibility
---

# Breadcrumb - Accessibility

This component has been designed and implemented with accessibility in mind. However, if the truncation feature is used, this component would not pass a WCAG conformance audit.

#### Known issues

*   when the browser zoom is used to scale content to 400%, if the `Breadcrumb` has a `"truncation"` open, the dropdow may extend beyond the viewport and require the user to scroll in more than one direction (this is a failure of [Reflow – 1.4.10](https://www.w3.org/WAI/WCAG21/Understanding/reflow.html)).
    
    ![The breadcrumb component with the “truncation” dropdowm extending beyond the viewport](/assets/images/breadcrumb-known-issue-truncation-outside-viewport.png)
*   when the browser zoom is used to scale content to 400%, if the `Breadcrumb` is not allowed to wrap its items (via the `@itemsCanWrap` prop) the text gets likely truncated, making it impossible for keyboard-only user to access the truncated content
    
    ![The breadcrumb component with truncated text (ellipsis)](/assets/images/breadcrumb-known-issue-truncated-text.png)