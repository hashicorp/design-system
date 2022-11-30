## When to use

- To allow user to make a selection from a pre-defined set of options in a form
- When the length of the form is a concern or screen real estate is vital.

## When not to use

- When a user can select more than on option, consider using [Checkbox](/components/form/checkbox/overview).
- When the set of options is fewer than 5, consider using [Radio](/components/form/radio/overview).
- When need to display a list of buttons or links in a menu, us [Dropdown](/components/dropdown/overview).

---

## Anatomy

![Anatomy of the Select component](/assets/components/select/select-anatomy.png)

#### Label

Required

#### Helper text

Optional

#### Selected value

Options: empty (default), isSelected

#### Base control

Required

#### Error message

Triggered by system

---

## State

#### Default

Default

![Select default with default state](/assets/components/select/select-state-default-default.png)

Hover

![Select default with hover state](/assets/components/select/select-state-default-hover.png)

Focus

![Select default with focus state](/assets/components/select/select-state-default-focus.png)

#### Disabled

Default

![Select disabled with default state](/assets/components/select/select-state-disabled-default.png)

Hover

![Select disabled with hover state](/assets/components/select/select-state-disabled-hover.png)

Focus

![Select disabled with focus state](/assets/components/select/select-state-disabled-focus.png)

#### Invalid

Default

![Select invalid with default state](/assets/components/select/select-state-invalid-default.png)

Hover

![Select invalid with hover state](/assets/components/select/select-state-invalid-hover.png)

Focus

![Select invalid with focus state](/assets/components/select/select-state-invalid-focus.png)

### Disabled

- Disabled fields are not editable by the user.
- If the user doesn't need to review the data, consider using a hidden field instead.
- Use these fields sparingly.

---

## Required and optional

<section style="display: flex; flex-direction: column; gap: 1rem;">
  <Hds::Form::Select::Field @isRequired={{true}} as |F|>
    <F.Label>Label</F.Label>
    <F.Options>
      <option value="">--Required select--</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </F.Options>
  </Hds::Form::Select::Field>
  <Hds::Form::Select::Field @isOptional={{true}} as |F|>
    <F.Label>Label</F.Label>
    <F.Options>
      <option value="">--Optional select--</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
    </F.Options>
  </Hds::Form::Select::Field>
</section>

### Best practices

- For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don't have to make assumptions.
  - If a field is required, consider adding a default value to help the user avoid and error.
- For shorter, simpler forms (ie. login/signup and feedback requests), indicate **optional** fields instead.
  - If a field is optional, avoid using a default value as that value will get passed as data to the form.

[Marking required fields in forms](https://www.nngroup.com/articles/required-fields/)

---

## Validation

_Insert banner (warning):_ While we provide the structure and visual consistency for validation, the messaging and functionality are to be handled by the application teams.

<section>
  <Hds::Form::Select::Field @isRequired={{true}} @isInvalid={{true}} as |F|>
    <F.Label>Region selection</F.Label>
    <F.Options>
      <option value="">--Select an option--</option>
      <option value="US-WEST">US-WEST</option>
      <option value="US-EAST">US-EAST</option>
    </F.Options>
    <F.Error>Region selection is required. Select a region.</F.Error>
  </Hds::Form::Select::Field>
</section>

### Client side and Server side validation

Use a combination of client side and server side validation for the best user experience. Catching basic errors with client side validation allows the user to quickly resolve the error **before** submitting the form.

#### Client side (or inline) validation

Client side validation is an initial check that happens in the browser to ensure required fields are filled out and that the value is in the correct format.

[More about client side validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

![Visual example of client side validation](/assets/components/select/select-client-side-validation.png)

#### Server side validation

Server side validation provides a more thorough check on the server once the data has been submitted and helps keep our applications safe.

When using server side validation, display a Critical [AlertInline](/components/alert/overview) above the form listing all errors with links to each invalid field.

![Visual example of server side validation](/assets/components/select/select-server-side-validation.png)

---

## Content

### Label

- We recommend keeping labels clear and concise, about 1-3 words. They should not consist of full sentences.
- [3.3.2 Labels or Instructions (A)](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html): Labels or instructions are provided when content requires user input.

### Options

- We recommend keeping options clear and concise; avoid full sentences.
- Avoid using the same word at the beginning of a set of options.
- Order the set of options in a logical way based on the use case, ie. default or most commonly selected options first, alphabetically, or numerically.

### Helper text

- Use helper text when needing to provide the user with extra details about the data you're asking them to select from.

### Error messages

- Error messages need to provide the user with enough context to guide them in resolving the error.
- Keep error messages short and to the point.
  - ie. "Network region is required. Select a region."
- Avoid overt politeness; don't use "please" or "thank you" in your messages.
- [3.3.1 Error Identification (A)](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html): If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- [3.3.3 Error Suggestion (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html): If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- [3.3.4 Error Prevention (Legal, Financial, Data) (AA)](https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html): For web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllabel data in data storage systems, or that submit user test reponses, at least one of the following is true: submissions are reversible, data is checked and user is provided an opportunity to correct them, a mechanism is available for reviewing, confirming, and correcting the information before finalizing the submission.
- [4.1.3 Status Messages (AA)](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html): In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.

Refer to [HashiCorp's Style, Language, and Voice Guidelines](https://docs.google.com/document/d/1MRvGd6tS5JkIwl_GssbyExkMJqOXKeUE00kSEtFi8m8/edit?usp=sharing) for more content tips.

---

## Accessibility

### Mouse

Hover

![Image of hover interaction on the select](/assets/components/select/accessibility/mouse/select-hover.png)

Click to open OptionList

![Image of the interaction of opening the OptionList](/assets/components/select/accessibility/mouse/select-click-to-open.png)

Hover between items

![Image of the hover interaction between two items in an OptionList](/assets/components/select/accessibility/mouse/select-hover-between-items.png)

Click to select OptionList/Item

![Image of the selected state of a item in the OptionList](/assets/components/select/accessibility/mouse/select-click-to-select.png)

### Keyboard

Focus

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Tab" @size="small" />
</div>

![Example image of focusing on the select with tab on a keyboard](/assets/components/select/accessibility/keyboard/select-focus.png)

Open OptionList

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Spacebar" @size="small" />
  <Hds::Badge @color="neutral" @type="filled" @text="↓" @size="small" />
</div>

![Example image of selecting an item in the OptionList with spacebar](/assets/components/select/accessibility/keyboard/select-spacebar.png)

Move between items

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="↑" @size="small" />
  <Hds::Badge @color="neutral" @type="filled" @text="↓" @size="small" />
</div>

![Example image of moving between items with up and down arrow keys](/assets/components/select/accessibility/keyboard/select-arrow-keys.png)

Select OptionList/Item

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Enter" @size="small" />
</div>

![Example image of selecting an item in an OptionList with enter](/assets/components/select/accessibility/keyboard/select-enter.png)

Close with changing

<div>
  <Hds::Badge @color="neutral" @type="filled" @text="Esc" @size="small" />
</div>

![Example image of closing the select with the escape key](/assets/components/select/accessibility/keyboard/select-focus.png)
