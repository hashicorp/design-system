## Usage

### When to use

- As a form element that provides users with a way to read, input, or edit data in a freeform way.

### When not to use

- If needing a multi-line text input, consider [Textarea](/components/form/textarea)
- If needing to allow the user to make a selection from a predetermined list of options, consider [Checkbox](/components/form/checkbox), [Radio button](/components/form/radio), or [Select](/components/form/select).

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

<Hds::Form::TextInput::Field @type="search" placeholder="Search" @width="300px" as |F|>
  <F.Label>Search</F.Label>
</Hds::Form::TextInput::Field>

#### Loading

<Hds::Form::TextInput::Field @type="search" placeholder="Search" @width="300px" @isLoading="true" as |F|>
  <F.Label>Search</F.Label>
</Hds::Form::TextInput::Field>

### Date and time

!!! Info

Date and time fields use the native browser functionality for the popovers. Some browsers do not display an icon or popover.
!!!

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

### Telephone

<Hds::Form::TextInput::Field @type="tel" @width="300px" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" as |F|>
  <F.Label>Tel</F.Label>
</Hds::Form::TextInput::Field>

## Required and optional

For complex forms, indicate **required** fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

<Hds::Form::TextInput::Field @type="text" @isRequired={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate **optional** fields instead.

<Hds::Form::TextInput::Field @type="text" @isOptional={{true}} @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

## Readonly, disabled, and hidden fields

Readonly, disabled, and hidden fields are very similar, but there are key differences to be aware of when choosing the correct type of Text Input. Since these fields are not editable by a user, we recommend using them sparingly.

Readonly fields are not editable by the user but the value in the field **is** passed when the form is submitted.

<Hds::Form::TextInput::Field @type="text" @width="300px" @value="helios-cluster-31" readonly as |F|>
  <F.Label>Cluster ID</F.Label>
</Hds::Form::TextInput::Field>

Disabled fields are not editable by the user and the value in the field **is not** passed when the form is submitted.

<Hds::Form::TextInput::Field @type="text" @width="300px" @value="helios-cluster-31" disabled as |F|>
  <F.Label>Cluster ID</F.Label>
</Hds::Form::TextInput::Field>

Hidden fields are not visible to the user but the value in the field **is** passed when the form is submitted.

| Field type     | Visible in UI   | Editable by user    | Value passed on `submit`   |
|----------------|-----------------|---------------------|----------------------------|
| Readonly       | ✅              | 🚫                  | ✅                          |
| Disabled       | ✅              | 🚫                  | 🚫                          |                              
| Hidden         | 🚫              | 🚫                  | ✅                          |

## Character count

For tracking the number of characters entered into a TextInput and defining requirements around minimum and maximum length, refer to the [Character count](/components/form/primitives#formcharactercount) documentation.

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.

## Content

For high-level content recommendations, refer to our [Primitives](/components/form/primitives) documentation.
