A text input is a form element that provides users with a way to read, input, or edit data.

## Types of text inputs

`Form::TextInput` accepts [all native HTML types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types), but we offer built in styling for the following:

### Text

<Hds::Form::TextInput::Field @type="text" placeholder="Placeholder" @width="300px" as |F|>
  <F.Label>Label</F.Label>
</Hds::Form::TextInput::Field>

### Password

<Hds::Form::TextInput::Field @type="password" placeholder="Password" @value="password" @width="300px" as |F|>
  <F.Label>Password</F.Label>
</Hds::Form::TextInput::Field>

### Search

<Hds::Form::TextInput::Field @type="search" placeholder="Search" @width="300px" as |F|>
  <F.Label>Search</F.Label>
</Hds::Form::TextInput::Field>

### Date and time

!!! Info

Date and time fields use the native browser functionality for the popovers. Some browsers do not display an icon or popover.
!!!

<Hds::Form::TextInput::Field @type="date" placeholder="mm/dd/yy" @width="150px" as |F|>
  <F.Label>Date</F.Label>
</Hds::Form::TextInput::Field>

<Hds::Form::TextInput::Field @type="time" placeholder="--:-- --" @width="150px" as |F|>
  <F.Label>Time</F.Label>
</Hds::Form::TextInput::Field>
