---
category: components
group: form
component: toggle
section: design-guidelines
---

# Toggle - Design Guidelines

## When to use

- To allow users to turn on and off two mutally exclusive options that provide an immediate response after any of them are selected.

## When not to use

- When a user could check and uncheck an option, use a [Checkbox](/components/form/checkbox/overview).
- When users need to select more than one option from a list, use a [Checkbox](/components/form/checkbox/overview).
- When only one choice must be selected, use [Radio](/components/form/radio/overview) buttons.

---

## Anatomy

![Toggle field anatomy](/assets/components/form/toggle/toggle-field-anatomy.png)

#### Base control

Required

#### Label

Required

#### Helper text

Optional

#### Error message

Triggered by system

---

## State

![Toggle states](/assets/components/form/toggle/toggle-states.png)

---

_Group_

## Anatomy

![Anatomy of the Toggle Group](/assets/components/form/toggle/toggle-group-anatomy.png)

#### Legend

Optional

#### Helper text

Optional

#### Fields

At least one is required

---

## Validation

_Banner (warning):_ While we provide the structure and visual consistency for validation, the messaging and functionality are to be handled by the application teams.

<section>
  <Hds::Form::Toggle::Group as |G|>
    <G.Toggle::Field as |F|>
      <F.Label>Share state globally by default</F.Label>
      <F.HelperText>New workspaces will share state with any workspace in their organization</F.HelperText>
      <F.Error>There was an error connecting to the server, try again</F.Error>
    </G.Toggle::Field>
  </Hds::Form::Toggle::Group>
</section>

### Server side validation

Server side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

When using server side validation, display a Critical [AlertInline](/components/alerts/overview) above the form listing all errors with links to each invalid field.

![Example of server side validation](/assets/components/general/validation-server_side.png)

---

## Content

### Label

- We recommend keeping labels clear and concise.
- [3.2.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

_Banner (informational):_ Labels and link: Labels are part of the checkbox's selectable area, making them interactive elements. This means that links inside them are nested interactive elements and cannot be reached by assistive technology. If you plan to add links to checkboxes, please contact the design system team for guidance.

### Helper text

- Use helper text when needing to provide the user with extra details about the option(s) you're asking them to select, ie. Learn more about our pricing.

### Error messages

- Error messages need to provide the user with enough context to guide them in resolving the error.
- Keep messages short and to the point.
  - ie. "Select at least one option"
- Avoid over politeness; don't use 'please' or 'thank you' in your messages.
- [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-contrallable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and the user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.4 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without recieving focus.

Refer to [HashiCorp's Style, Language, and Voice Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.
