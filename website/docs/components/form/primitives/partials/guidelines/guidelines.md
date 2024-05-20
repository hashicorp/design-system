## Content

### Form::Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.2.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

### Form::HelperText

- Use helper text to give the user extra details about the data you’re asking them to input, e.g., formatting requirements such as MM-DD-YYYY.

### Form::CharacterCount

!!! Info

The character count is not coupled with the invalid state of the field. Instead, it is the responsibility of the consumer to implement validation at the application-level.
!!!

Use a character count to communicate the current length of the value in an input and whether it meets or exceeds the length requirements passed to the component. The component accepts multiple arguments to set length requirements and exposes several computed values to support custom messages. Visit the [code](/components/form/primitives?tab=code#formcharactercount-1) documentation for more details.

#### Default messages

Depending on which property (or properties) are passed to the component, a different default message will be displayed by the component to communicate the relationship between the current length of the input value (`currentLength`) and the maximum length (`maxLength`), minimum length (`minLength`), or both.

<video width="100%" controls loop>
  <source
    src="/assets/components/form/primitives/character-count-default-interactions.mp4"
    type="video/mp4"
  />
</video>

_Test and interact with the default messaging examples in the [code](/components/form/primitives?tab=code#formcharactercount-1) documentation._

The default messages provide a consistent messaging pattern for the component by clearly communicating length requirements to the user while displaying their progress towards meeting the requirements.

![Character count with default messaging](/assets/components/form/primitives/character-count-defaults-filled.png)

#### Usage in Figma

For representative consistenty, the Figma component mirrors the default messages that are rendered in the Ember component and are labelled as such; `currentLength` (the default variant), `maxLength`, `minLength`, and `custom`.

In all variants except the `custom` variant, we recommend _only_ overriding the numerical value (e.g., "{numerical value} characters is allowed"). Overriding the text in these variants will require a custom implementation on the engineering side, instead, the `custom` variant should be used.

#### Custom messages

A custom message in the character count is supported and can be used when a product or application-specific message or term is required, e.g., "registry" or "workspace".

!!! Dont

Avoid presenting duplicate information between the helper text and the character count. Helper text should be used to provide persistent requirements while character count represents more of a progress indicator towards a length requirement.

![Character count with helper text](/assets/components/form/primitives/character-count-dont-helper-text-overlap.png)
!!!

!!! Dont

Don’t use the character count to display static details about the field. Use [helper text](/components/form/primitives#formhelpertext) to provide extra details about the information being requested and the character count to communicate the user’s progress toward meeting the requirements.

![Character count as helper text](/assets/components/form/primitives/character-count-dont-helper-text.png)
!!!

### Form::Error

- Error messages should provide the user with enough context to guide them in resolving the error.
- Keep labels and legends short and to the point (ie. "Select one option")
- Avoid overt politeness; don’t use "please" or "thank you" in your messaging.
- [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html): For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and the user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.