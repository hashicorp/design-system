## Usage

### When to use

- As a form element that provides users with a way to read, input, or edit data in a freeform way.

### When not to use

- For multi-line text input, consider [Textarea](/components/form/textarea).
- To allow the user to make a selection from a predetermined list of options, consider [Checkbox](/components/form/checkbox), [Radio button](/components/form/radio), or [Select](/components/form/select).

## Types of text inputs

Text Input accepts [all native HTML types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types), but we offer built in styling for the following:

### Text

<Hds::Form::TextInput::Field @type="text" placeholder="Placeholder" @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

### Password

The `TextInput` component has a visibility toggle feature for password fields. By default, a button appears allowing users to switch easily between visible and obfuscated input.

<Hds::Form::TextInput::Field @type="password" @hasVisibilityToggle={{true}} placeholder="Password" @value="password" @width="300px" as |F|>
  <F.Label>Password</F.Label>
</Hds::Form::TextInput::Field>

### Search

#### Default state

<Hds::Form::TextInput::Field @type="search" placeholder="Search" @width="300px" as |F|>
  <F.Label>Search</F.Label>
</Hds::Form::TextInput::Field>

#### Loading state

<Hds::Form::TextInput::Field @type="search" placeholder="Search" @width="300px" @isLoading="true" as |F|>
  <F.Label>Search</F.Label>
</Hds::Form::TextInput::Field>

### Date and time

!!! Info

**Code consideration**

Date and time fields use the native browser functionality for the popovers. Some browsers do not display an icon or popover.
!!!

<Hds::Form as |FORM|>
  <FORM.Section>
    <Hds::Form::TextInput::Field @type="date" placeholder="mm/dd/yy" as |F|>
      <F.Label>Date</F.Label>
    </Hds::Form::TextInput::Field>
    <Hds::Form::TextInput::Field @type="time" placeholder="--:-- --" as |F|>
      <F.Label>Time</F.Label>
    </Hds::Form::TextInput::Field>
    <Hds::Form::TextInput::Field @type="datetime-local" placeholder="mm/dd/yyT--:-- --" as |F|>
      <F.Label>Datetime</F.Label>
    </Hds::Form::TextInput::Field>
    <Hds::Form::TextInput::Field @type="month" placeholder="yyyy-mm" as |F|>
      <F.Label>Month</F.Label>
    </Hds::Form::TextInput::Field>
    <Hds::Form::TextInput::Field @type="week" placeholder="yyyy-W00" as |F|>
      <F.Label>Week</F.Label>
    </Hds::Form::TextInput::Field>
  </FORM.Section>
</Hds::Form>

### Telephone

<Hds::Form::TextInput::Field @type="tel" @width="300px" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" as |F|>
  <F.Label>Tel</F.Label>
</Hds::Form::TextInput::Field>

## Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

### Required

<Hds::Form::TextInput::Field @type="text" @isRequired={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

### Optional

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::TextInput::Field @type="text" @isOptional={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

## Readonly, disabled, and hidden fields

Readonly, disabled, and hidden fields are very similar, but there are key differences to be aware of when choosing the correct type of Text Input. Since these fields are not editable by a user, we recommend using them sparingly.

### Readonly

Readonly fields are not editable by the user but the value in the field **is** passed when the form is submitted.

<Hds::Form::TextInput::Field @type="text" @width="300px" @value="helios-cluster-31" readonly as |F|>
  <F.Label>Cluster ID</F.Label>
</Hds::Form::TextInput::Field>

### Disabled

Disabled fields are also not editable by the user and the value in the field **is not** passed when the form is submitted.

!!! Warning

**Accessibility alert**

Screen readers do not have access to disabled fields; therefore, we recommend against disabling fields. Please read more about [showing, hiding, or disabling elements](https://helios.hashicorp.design/patterns/disabled-patterns).
!!!

<Hds::Form::TextInput::Field @type="text" @width="300px" @value="helios-cluster-31" disabled as |F|>
  <F.Label>Cluster ID</F.Label>
</Hds::Form::TextInput::Field>

### Hidden

Hidden fields are not visible to the user but the value in the field **is** passed when the form is submitted.

| Field type     | Visible in UI   | Editable by user    | Value passed on `submit`   |
|----------------|-----------------|---------------------|----------------------------|
| Readonly       | ✅              | 🚫                  | ✅                          |
| Disabled       | ✅              | 🚫                  | 🚫                          |                              
| Hidden         | 🚫              | 🚫                  | ✅                          |

## Character Count

!!! Warning

**Consumer responsibility**

The character count is not coupled with the invalid state of the field. Instead, it is the responsibility of the consumer to implement validation at the application-level.
!!!

Use a character count to communicate the current length of the value in an input and whether it meets or exceeds the length requirements passed to the component. The component accepts multiple arguments to set length requirements and exposes several computed values to support custom messages. Visit the [primitive code](/components/form/primitives?tab=code#formcharactercount-1) documentation for more details.

### Default messages

Depending on which property (or properties) are passed to the component, a different default message will be displayed by the component to communicate the relationship between the current length of the input value (`currentLength`) and the maximum length (`maxLength`), minimum length (`minLength`), or both.

<video width="100%" controls loop>
  <source
    src="/assets/components/form/text-input/text-input-character-count-default-interactions.mp4"
    type="video/mp4"
  />
</video>

_Test and interact with the default messaging examples in the [primitive code](/components/form/primitives?tab=code#formcharactercount-1) documentation._

The default messages provide a consistent messaging pattern for the component by clearly communicating length requirements to the user while displaying their progress towards meeting the requirements.

![A workspace name input with the text "work" entered. If the character count is showing current length, it reads "4 characters entered". If maximum length, it reads "21 characters remaining". If minimum length, it reads "1 character remaining".](/assets/components/form/text-input/text-input-character-count-defaults-filled.png)

### Usage in Figma

For representative consistency, the Figma component mirrors the default messages that are rendered in the Ember component and are labelled as such; `currentLength` (the default variant), `maxLength`, `minLength`, and `custom`.

In all variants except the `custom` variant, we recommend _only_ overriding the numerical value (e.g., "{numerical value} characters is allowed"). Overriding the text in these variants will require a custom implementation on the engineering side, instead, the `custom` variant should be used.

### Custom messages

A custom message in the character count is supported and can be used when a product or application-specific message or term is required, e.g., "registry" or "workspace".

!!! Dont

Avoid presenting duplicate information between the helper text and the character count. Helper text should be used to provide persistent requirements while character count represents more of a progress indicator towards a length requirement.

![Workspace name input where the helper text says there is a 5 character minimum and the character count below the input also says there is a 5 character minimum.](/assets/components/form/text-input/text-input-character-count-dont-helper-text-overlap.png)

!!!

!!! Dont

Don’t use the character count to display static details about the field. Use [helper text](/components/form/primitives?tab=content#helper-text) to provide extra details about the information being requested and the character count to communicate the user’s progress toward meeting the requirements.

![](/assets/components/form/text-input/text-input-character-count-dont-helper-text.png)

!!!

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.
