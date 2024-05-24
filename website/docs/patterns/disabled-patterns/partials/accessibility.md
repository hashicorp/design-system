The `disabled` attribute in HTML is only valid for these form controls:

- `<button>`
- `<fieldset>`
- `<optgroup>`
- `<option>`
- `<select>`
- `<textarea>`
- `<input>`

In terms of accessibility, however, a form control with the `disabled` attribute is problematic. If a form control has the `disabled` attribute, it's not available to users with assistive technology. It's as though the element does not exist in the DOM at all.

When presenting a non-editable field, consider using the `readonly` attribute instead of the `disabled` attribute. This will provide the correct information to all users, but they won't be able to interact with it. 

## Applicable WCAG Success Criteria

- Principle 1: Perceivable. Information and user interface components must be presentable to users in ways the can perceive.
- Success Criterion 1.3.1: Info and Relationships. Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.
- Success Criterion 1.3.2: Meaningful Sequence. When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.
- Success Criterion 2.1.1: Keyboard. All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.
- Success Criterion 2.4.3: Focus Order. If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.
- Success Criterion 2.4.7: Focus Visible. Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
- Success Criterion 2.5.8: Target Size (Minimum). The target size for pointer inputs is at least 24 by 24 CSS pixels except in specific cases (see specification for details).
- Success Criterion 3.2.1: On Focus. When any component receives focus, it does not initiate a change of context.
- Success Criterion 3.2.2: On Input. Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.
- Guideline 3.3: Input Assistance. Help users avoid and correct mistakes.
- Success Criterion 3.3.1: Error Identification. If an input error is detected, the error is identified and described to the user in text.
- Success Criterion 3.3.2: Labels or Instructions. Labels or instructions are provided when content requires user input.
- Success Criterion 3.3.3: Error Suggestion. If an input error is detected and suggestions for correction are known, then the suggestions are provided to the user.
- Success Criterion 3.3.4: Error Prevention (Legal, Financial, Data). For Web pages that require user input, at least one of the following is true: submissions are reversible, checked for errors before going to the next step, or confirmed by the user.
- Success Criterion 4.1.2: Name, Role, Value. For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.
