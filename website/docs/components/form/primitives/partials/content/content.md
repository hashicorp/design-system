## General recommendations

### Form::Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- All inputs need a visible label to let users know what the purpose of the input is. This is required for accessibility by [WCAG 3.2.2](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html)

### Form::HelperText

- Use helper text to give the user extra details about the data you’re asking them to input, e.g., formatting requirements such as MM-DD-YYYY.

### Form::CharacterCount

!!! Warning

**Consumer responsibility**

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

![A workspace name input with the text "work" entered. If the character count is showing current length, it reads "4 characters entered". If maximum length, it reads "21 characters remaining". If minimum length, it reads "1 character remaining".](/assets/components/form/primitives/character-count-defaults-filled.png)

#### Usage in Figma

For representative consistency, the Figma component mirrors the default messages that are rendered in the Ember component and are labelled as such; `currentLength` (the default variant), `maxLength`, `minLength`, and `custom`.

In all variants except the `custom` variant, we recommend _only_ overriding the numerical value (e.g., "{numerical value} characters is allowed"). Overriding the text in these variants will require a custom implementation on the engineering side, instead, the `custom` variant should be used.

#### Custom messages

A custom message in the character count is supported and can be used when a product or application-specific message or term is required, e.g., "registry" or "workspace".

!!! Dont

Avoid presenting duplicate information between the helper text and the character count. Helper text should be used to provide persistent requirements while character count represents more of a progress indicator towards a length requirement.

![Workspace name input where the helper text says there is a 5 character minimum and the character count below the input also says there is a 5 character minimum.](/assets/components/form/primitives/character-count-dont-helper-text-overlap.png)
!!!

!!! Dont

Don’t use the character count to display static details about the field. Use [helper text](/components/form/primitives#formhelpertext) to provide extra details about the information being requested and the character count to communicate the user’s progress toward meeting the requirements.

![](/assets/components/form/primitives/character-count-dont-helper-text.png)
!!!

### Form::Error

- Error messages should provide the user with enough context to guide them in resolving the error.
- Keep labels and legends short and to the point (ie. "Select one option")
- Avoid overt politeness; don’t use "please" or "thank you" in your messaging.
- If an input is errored out, it is visually identifiable with related error messaging by [WCAG 3.3.1](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html).
- If an input is errored out, the messaging is clear for the user to rectify the issue by [WCAG 3.3.3](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html).
- If data input is related to legal or financial information, the user is given an opportunity to review, confirm or rectify the information before finalizing its submission by [WCAG 3.3.4](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html)
- Use roles or properties to help identify statuses so that they are accessible by assistive technologies without reciving focus by [WCAG 4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html).