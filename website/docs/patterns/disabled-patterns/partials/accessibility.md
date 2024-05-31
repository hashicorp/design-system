The `disabled` attribute is only valid for these HTML elements, referred to as form controls:

- `<button>`
- `<fieldset>`
- `<optgroup>`
- `<option>`
- `<select>`
- `<textarea>`
- `<input>`

From an accessibility perspective, however, using the `disabled` attribute on a form control can cause issues. This attribute makes the control inaccessible to assistive technology users, essentially making it seem like the element doesn't exist on the webpage.

To make a field non-editable, consider making it `readonly` vs. setting it as `disabled`. This will allow all users to access the information while preventing them from interacting with it.

Disabling a link isn't actually possible as a link is not a form control. To simulate a disabled link though, you can use [conditionals](https://guides.emberjs.com/release/components/conditional-content/) in Ember to display it as plain text until it is "enabled".

## Applicable WCAG Success Criteria

Consult the following Web Content Accessibility Guidelines (WCAG) when considering using the `disabled` attribute:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "2.1.1" "2.4.3" "2.4.7" "2.5.8" "3.2.1" "3.2.2" "3.3.1" "3.3.2" "3.3.3" "3.3.4" "4.1.2" }} />
