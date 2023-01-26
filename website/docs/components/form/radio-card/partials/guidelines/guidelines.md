## Usage

Use the Radio Card Group in most cases. Use individual Radio Cards only in special cases and sparingly.

### When to use

- To allow users to select a single option from a group of two or more Radio Cards.

### When not to use

- As a static card, use a [Card](/components/card)
- When a user could select multiple options, use a [Checkbox](/components/form/checkbox)

## Control position

In most cases, we recommend using the bottom position. Still, we offer Radio Cards in a left position, which is a good option when the content in the cards is minimal. 

### Bottom

<Hds::Form::RadioCard::Group @name="control-position-bottom" @controlPosition="bottom" as |G|>
  <G.RadioCard @maxWidth="33%" as |R|>
    <R.Icon @name="layers" />
    <R.Label>L7 permissions</R.Label>
    <R.Description>The source service may or may not connect to the destination service via unique permissions based on L7 criteria: path, header, or method.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

### Left

<Hds::Form::RadioCard::Group @name="control-position-left" @controlPosition="left" as |G|>
  <G.RadioCard @maxWidth="50%" as |R|>
    <R.Label>Use a preset</R.Label>
    <R.Description>Choose the authenticator you’ll be working with; Vault populates default settings.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

## Alignment

### Left

<Hds::Form::RadioCard::Group @alignment="left" @name="control-position-bottom" @controlPosition="bottom" as |G|>
  <G.RadioCard @maxWidth="33%" as |R|>
    <R.Icon @name="layers" />
    <R.Label>L7 permissions</R.Label>
    <R.Description>The source service may or may not connect to the destination service via unique permissions based on L7 criteria: path, header, or method.</R.Description>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

### Center

<Hds::Form::RadioCard::Group @alignment="center" @name="control-position-bottom" @controlPosition="bottom" as |G|>
  <G.RadioCard @maxWidth="33%" as |R|>
    <R.Icon @name="grafana-color" />
    <R.Label>Grafana Cloud</R.Label>
  </G.RadioCard>
</Hds::Form::RadioCard::Group>

## Legend style

<<<<<<< HEAD
The legend can receive any of the available text styles. We recommend using the default legend style provided with the component when placed along with other form components or `Display/400/Bold` when your form is broken down into sections.
=======
### Default style
>>>>>>> main

When placed along with other form components, we recommend using the default legend style provided by the component.

![Default legend style](/assets/components/form/radio-card/radio-card-default-legend.png =600x*)

### Display style

When using the Radio Card Group as its own section, we recommend using `Display/400/Bold` for the legend. 

![Display/400/Bold legend style](/assets/components/form/radio-card/radio-card-heading.png =600x*)

## Validation

!!! Warning

While we provide the structure and visual consistency for validation, the messaging and functionality need to be implemented by the product teams.
!!!

<Hds::Form::RadioCard::Group @alignment="center" @controlPosition="bottom" as |G|>
  <G.Legend>Choose a provider</G.Legend>
  <G.RadioCard as |R|>
    <R.Icon @name="aws-cloudwatch-color" />
    <R.Label>AWS Cloudwatch</R.Label>
  </G.RadioCard>
  <G.RadioCard as |R|>
    <R.Icon @name="datadog-color" />
    <R.Label>Datadog</R.Label>
  </G.RadioCard>
  <G.RadioCard as |R|>
    <R.Icon @name="grafana-color" />
    <R.Label>Grafana Cloud</R.Label>
  </G.RadioCard>
  <G.RadioCard as |R|>
    <R.Icon @name="splunk-color" />
    <R.Label>Splunk Cloud</R.Label>
  </G.RadioCard>
  <G.Error>Select a provider</G.Error>
</Hds::Form::RadioCard::Group>

### Types of validation

We recommend using a combination of client-side and server-side validation for the best user experience.

#### Client-side validation

[Client-side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation), sometimes called inline validation, is an initial check in the browser to ensure that required fields aren’t empty and the value is in the correct format. Client-side validation allows the user to quickly resolve errors before submitting the form.

![Example of client side form validation](/assets/components/form/radio-card/radio-card-validation-client-side.png =600x*)

#### Server-side validation

Server-side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

When using server-side validation, display a Critical Inline [Alert](/components/alert) above the form listing **all** errors with links to each invalid field.

![Example of server side form validation](/assets/components/form/radio-card/radio-card-validation-server-side.png =600x*)

## Content

### Form::Label

!!! Warning

**Labels and link**

Labels are part of the radio’s selectable area, making them interactive elements. This means that links inside labels are nested interactive elements and cannot be reached by assistive technology. If you plan to add links to radios, please contact the Design Systems Team for guidance.
!!!

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.2.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

### Form::HelperText

- Use helper text to give the user extra details about the option(s) you’re asking them to select, e.g., “Learn more about our pricing”.

### Form::Error

- Error messages should provide the user with enough context to guide them in resolving the error.
- Keep labels and legends short and to the point (ie. "Select one option")
- Avoid overt politeness; don’t use "please" or "thank you" in your messaging.
- [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: submissions are reversible, data is checked and the user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

## Related

- [Radio](/components/form/radio)
- [Card](/components/card)
