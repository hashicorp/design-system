## Component API

Super Select consists of two main components, `Form::SuperSelect::Single` and `Form::SuperSelect::Multiple`.

Each of these main components have two different variants with their own APIs:

- `Form::SuperSelect::Single::Base` or `Form::SuperSelect::Multiple::Base`—the base component with just the Super Select control.
- `Form::SuperSelect::Single::Field` or `Form::SuperSelect::Multiple::Field`—the field parent component with the Super Select control, label, helper text, and error messaging (in a wrapping container).

The Single and Multiple base components have nearly identical APIs to the 8.2.0 version of the [ember-power-select](https://ember-power-select.com) addon.

While the [ember-power-select documentation](https://ember-power-select.com/docs) has the full list of supported options for the base components, we’ve included the most common ones here for your convenience as well as the options for which default values have been overridden.

!!! Info

The default values of some [ember-power-select](https://ember-power-select.com/docs/api-reference) options have been overridden in some cases to either resolve accessibility issues or to customize according to our needs. These options are documented below.

!!!

### SuperSelect::Single::Base

#### Common options from ember-power-select

<Doc::ComponentApi as |C|>
  <C.Property @name="options" @type="collection">
    An array of objects to be displayed as options in the dropdown.
  </C.Property>
  <C.Property @name="placeholder" @type="string">
    Placeholder text to display when no option is selected.
  </C.Property>
  <C.Property @name="searchEnabled" @type="boolean" @default="false">
    Enables a search input field to filter options.
  </C.Property>
  <C.Property @name="selected" @type="any | array">
    The selected option object. Can be used to set a pre-selected option.
  </C.Property>
  <C.Property @name="onChange" @type="function">
    The function to be invoked when the user selects or unselects an option.
  </C.Property>
</Doc::ComponentApi>

#### SuperSelect::Single only options and options with custom values

<Doc::ComponentApi as |C|>
  <C.Property @name="afterOptionsComponent" @type="string/contextual-component" @default="component hds/form/super-select/after-options">
    The component rendered after the list of options. `SuperSelect::Single` displays a custom afterOptions component containing a results count by default.
    <br><br>
    **Customization options:**<br>
    • To turn off rendering of the afterOptions component, set `showAfterOptions` to `false`.<br>
    • To customize the value of the afterOptions component, specify a value for `afterOptionsContent`<br>
    • To replace the default afterOptions component, set the value of `afterOptionsComponent` to point to your own custom component. (Example: `component "path/to/component"`)
  </C.Property>
  <C.Property @name="showAfterOptions" @type="boolean" @default="true">
    Controls whether the default `afterOptions` component is displayed or hidden.
  </C.Property>
  <C.Property @name="afterOptionsContent" @type="string" @default="resultCountMessage">
    Sets the content of the default `afterOptions` component overriding the default content.
  </C.Property>
  <C.Property @name="closeOnSelect" @type="boolean" @default="true">
    Defaults to false instead for `SuperSelect::Multiple`.
  </C.Property>
  <C.Property @name="placeholderComponent" @type="string or component" @default="component">
    Set to use a custom HDS `optionGroup` component to provide visual consistency.
  </C.Property>
  <C.Property @name="dropdownMaxWidth" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    Sets a `max-width` for the dropdown containing the options list.
    <br><br>
    If a value for `dropdownMaxWidth` is set, `matchTriggerWidth` is automatically set to false.
  </C.Property>
  <C.Property @name="matchTriggerWidth" @type="boolean" @default="true">
    When enabled, the dropdown width matches the width of the trigger.
    <br><br>
    If a value for `dropdownMaxWidth` is set, `matchTriggerWidth` is automatically set to false.
  </C.Property>
  <C.Property @name="renderInPlace" @type="boolean">
    Determines whether the dropdown options are rendered in place within the DOM vs. being attached to the root of the HTML `<body>` and positioned with JavaScript.
    <br><br>
    Set as `true` in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.)
    <br><br>
    <strong>Note</strong>: It cannot be overridden.
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@searchEnabled` is set to `true`.
  </C.Property>
  <C.Property @name="groupComponent" @type="component hds/form/super-select/option-group">
    Used to create groups of options similarly to the `optgroup` element used within native HTML `select` elements. Requires use of the `options` property (see [grouped options example](#grouped-options)).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SuperSelect::Single::Field

<Doc::ComponentApi as |C|>
  <C.Property @name="id" @type="string">
    Super Select Single’s ID attribute.
    <br/><br/>
    By default, the ID is automatically generated by the component. Use this argument to pass a custom ID.
  </C.Property>
  <C.Property @name="extraAriaDescribedBy" @type="string">
    Extra ID attribute to add to the `aria-describedby` HTML attribute.
    <br/><br/>
    By default, the `aria-describedby` attribute is automatically generated by the component, using the IDs of the helper text and errors (if present). Use this argument to pass an extra ID.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text and sets the `required` attribute on the control when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    The attributes will be applied to the [ember-power-select](https://ember-power-select.com) addon component which `SuperSelect` is built on.
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

`Options`, `Label`, `HelperText`, and `Error` content are passed to the field as yielded components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Options>" @type="yielded component">
    Container that yields its content inside the `SuperSelect` list.
  </C.Property>
  <C.Property @name="<[F].Label>" @type="yielded component">
    Container that yields its content inside the `<label>` element. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Label`](/components/form/primitives) component.
    <br/><br/>
    The `for` attribute of the label is automatically generated using the `controlId` value of the control.
  </C.Property>
  <C.Property @name="<[F].HelperText>" @type="yielded component">
    Container that yields its content inside the “helper text” block. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::HelperText`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the element is automatically generated using the `controlId` value of the control.
  </C.Property>
  <C.Property @name="<[F].Error>" @type="yielded component">
    Container that yields its content inside the “error” block. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Error`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the `Error` element is automatically generated.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>

### SuperSelect::Multiple::Base

#### Common options from ember-power-select

<Doc::ComponentApi as |C|>
  <C.Property @name="options" @type="collection">
    Collection of options to display in the component.
  </C.Property>
  <C.Property @name="placeholder" @type="string">
    Placeholder text to display when no option is selected.
  </C.Property>
  <C.Property @name="searchEnabled" @type="boolean" @default="false">
    Enables a search input field to filter options.
  </C.Property>
  <C.Property @name="selected" @type="any or array">
    The selected option object. Can be used to set a pre-selected option.
  </C.Property>
  <C.Property @name="onChange" @type="function">
    A closure action that is called when the selected option changes.
  </C.Property>
</Doc::ComponentApi>

#### SuperSelect::Multiple only options and options with custom values

<Doc::ComponentApi as |C|>
  <C.Property @name="afterOptionsComponent" @type="string/contextual-component" @default="component hds/form/super-select/after-options">
    The component rendered after the list of options. `SuperSelect::Multiple` displays a custom afterOptions component containing “Show selected” button, “Clear selected” button, and a selected total count by default.
    <br><br>
    **Customization options:**<br>
    • To turn off rendering of the afterOptions component, set `showAfterOptions` to `false`.<br>
    • To customize the value of the afterOptions component, specify a value for `afterOptionsContent`<br>
    • To replace the default afterOptions component, set the value of `afterOptionsComponent` to point to your own custom component. (Example: `component "path/to/component"`)
  </C.Property>
  <C.Property @name="showAfterOptions" @type="boolean" @default="true">
    Controls whether the default `afterOptions` component is displayed or hidden.
  </C.Property>
  <C.Property @name="afterOptionsContent" @type="string" @default="resultCountMessage">
    Sets the content of the default `afterOptions` component overriding the default content.
  </C.Property>
  <C.Property @name="closeOnSelect" @type="boolean" @default="false">
    Defaults to true instead for `SuperSelect::Single`.
  </C.Property>
  <C.Property @name="placeholderComponent" @type="string or component" @default="component">
    Set to use a custom HDS `optionGroup` component to provide visual consistency.
  </C.Property>
  <C.Property @name="dropdownMaxWidth" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    Sets a `max-width` for the dropdown containing the options list.
    <br><br>
    If a value for `dropdownMaxWidth` is set, `matchTriggerWidth` is automatically set to false.
  </C.Property>
  <C.Property @name="matchTriggerWidth" @type="boolean" @default="true">
    When enabled, the dropdown width matches the width of the trigger.
    <br><br>
    If a value for `dropdownMaxWidth` is set, `matchTriggerWidth` is automatically set to false.
  </C.Property>
  <C.Property @name="renderInPlace" @type="boolean">
    Determines whether the dropdown options are rendered in place within the DOM vs. being attached to the root of the HTML `<body>` and positioned with JavaScript.
    <br><br>
    Set as `true` in `SuperSelect` components to fix a `PowerSelect` accessibility issue. (The opener element or “trigger” should be next to dropdown content it hides & reveals.)
    <br><br>
    Note: It cannot be overridden.
  </C.Property>
  <C.Property @name="searchPlaceholder" @type="string" @default="Search">
    Displays placeholder text in the search input when `@searchEnabled` is set to `true`.
    <br><br>
    Note: Currently not active, awaiting update to ember-power-select.
  </C.Property>
  <C.Property @name="groupComponent" @type="component hds/form/super-select/option-group">
    Used to create groups of options similarly to the `optgroup` element used within native HTML `select` elements. Requires use of the `options` property (see [grouped options example](#grouped-options)).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### SuperSelect::Multiple::Field

<Doc::ComponentApi as |C|>
  <C.Property @name="id" @type="string">
    Super Select Multiple’s ID attribute.
    <br/><br/>
    By default, the ID is automatically generated by the component. Use this argument to pass a custom ID.
  </C.Property>
   <C.Property @name="extraAriaDescribedBy" @type="string">
    Extra ID attribute to add to the `aria-describedby` HTML attribute.
    <br/><br/>
    By default, the `aria-describedby` attribute is automatically generated by the component, using the IDs of the helper text and errors (if present). Use this argument to pass an extra ID.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text and sets the `required` attribute on the control when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    The attributes will be applied to the [ember-power-select](https://ember-power-select.com) addon component which `SuperSelect` is built on.
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

`Options`, `Label`, `HelperText`, and `Error` content are passed to the field as yielded components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Options>" @type="yielded component">
    Container that yields its content inside the `SuperSelect` list.
  </C.Property>
  <C.Property @name="<[F].Label>" @type="yielded component">
    Container that yields its content inside the `<label>` element. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Label`](/components/form/primitives) component.
    <br/><br/>
    The `for` attribute of the label is automatically generated using the `controlId` value of the control.
  </C.Property>
  <C.Property @name="<[F].HelperText>" @type="yielded component">
    Container that yields its content inside the “helper text” block. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::HelperText`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the element is automatically generated using the `controlId` value of the control.
  </C.Property>
  <C.Property @name="<[F].Error>" @type="yielded component">
    Container that yields its content inside the “error” block. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Error`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the `Error` element is automatically generated.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>
