The `disabled` attribute is only valid for these HTML elements, referred to as form controls:

- `<button>`
- `<fieldset>`
- `<optgroup>`
- `<option>`
- `<select>`
- `<textarea>`
- `<input>`

In terms of accessibility, however, a form control with the `disabled` attribute is problematic. If a form control has the `disabled` attribute, it's not available to users with assistive technology. It's as though the element does not exist in the DOM at all.

When presenting a non-editable field, consider using the `readonly` attribute instead of the `disabled` attribute. This will provide the correct information to all users, but they won't be able to interact with it.

If it's text that will eventually be a link (think, download link), then it should be text until it is valid to become a link (that's why the `disabled` attribute is not valid for `<a>` elements!). This can be accomplished with use of [conditionals](https://guides.emberjs.com/release/components/conditional-content/) in Ember.

## Applicable WCAG Success Criteria

Consult the following Web Content Accessibility Guidelines (WCAG) when considering using the `disabled` attribute:

<Doc::WcagList @criteriaList={{array "1.3.1" "1.3.2" "2.1.1" "2.4.3" "2.4.7" "2.5.8" "3.2.1" "3.2.2" "3.3.1" "3.3.2" "3.3.3" "3.3.4" "4.1.2" }} />
