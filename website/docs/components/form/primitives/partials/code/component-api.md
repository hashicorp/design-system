## Component API

### Form::Label

<Doc::ComponentApi as |C|>
  <C.Property @name="controlId" @type="string">
    The ID of the form control associated with the label. This is used to populate the `for` attribute of the `<label>` element.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<label>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::HelperText

<Doc::ComponentApi as |C|>
  <C.Property @name="controlId" @type="string">
    The ID of the form control associated with the helper text. This is used to populate the element’s `id` HTML attribute (with a `helper-text-` prefix). This HelperText ID can then be referenced in the `aria-describedby` attribute of the form control.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::CharacterCount

<Doc::ComponentApi as |C|>
  <C.Property @name="controlId" @type="string">
    The ID of the form control associated with the character count. This is used to populate the element’s `id` HTML attribute (with a `character-count-` prefix). This CharacterCount ID can then be referenced in the `aria-describedby` attribute of the form control.
  </C.Property>
  <C.Property @name="value" @type="string">
    The value of the associated input to be used for comparing its length with the maximum and/or minimum limits `maxLength` and `minLength`, respectively.
  </C.Property>
  <C.Property @name="maxLength" @type="number">
    The maximum number of characters allowed in the associated form element, used to determine the number of remaining characters. This does not restrict users from adding characters over the limit. To define the maximum string length that the user can enter, set `maxlength` attribute on the associated input field.
  </C.Property>
  <C.Property @name="minLength" @type="number">
    The minimum number of characters required for the associated form element, used to determine the shortfall value.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element. We only recommend using the block content for providing custom messages. The following variables are available within the block: `currentLength` (the current number of characters in the associated form control), `maxLength` (the maximum number of characters allowed in the associated form control), `minLength` (the minimum number of characters required in the associated form control), `remaining` (the difference between `maxLength` and `currentLength`), and `shortfall` (the difference between `currentLength` and `minLength`).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Error

<Doc::ComponentApi as |C|>
  <C.Property @name="controlId" @type="string">
    The ID of the form control associated with the error. This is used to populate the element’s `id` HTML attribute (with an `error-` prefix). This Error ID can then be referenced in the `aria-describedby` attribute of the form control.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Indicator

<Doc::ComponentApi as |C|>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Shows the `Required` indicator.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Shows the `Optional` indicator.
  </C.Property>
</Doc::ComponentApi>

### Form::Legend

<Doc::ComponentApi as |C|>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of a `<legend>` HTML element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Field

<Doc::ComponentApi as |C|>
  <C.Property @name="layout" @type="enum" @values={{array "vertical" "flag" }}>
    Sets the layout of the component. “Vertical” layout is used for `TextInput`, `Textarea` and `Select` fields. “Flag” layout is used for `Checkbox`, `Radio` and `Toggle` fields.
  </C.Property>
  <C.Property @name="id" @type="string">
    The control’s ID attribute.
    <br/><br/>
    By default the ID is automatically generated by the component; use this argument if you need to pass a custom ID for specific reasons you may have.
  </C.Property>
  <C.Property @name="extraAriaDescribedBy" @type="string">
    An extra ID attribute to be added to the `aria-describedby` HTML attribute.
    <br/><br/>
    By default the `aria-describedby` attribute is automatically generated by the component, using the IDs of the helper text and errors (if they’re present); use this argument if you need to pass extra IDs for specific reasons you may have.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

Control, label, helper text, and error content are passed to the field as yielded components, using the `Label`, `HelperText`, `Control`, `CharacterCount`, and `Error` keys.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Label>" @type="yielded component">
    A container that yields its content inside the `<label>` element. The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the `Form::Label` component.
    <br/><br/>
    The `for` attribute of the label is automatically generated.
  </C.Property>
  <C.Property @name="<[F].HelperText>" @type="yielded component">
    A container that yields its content inside the "helper text" block. The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the `Form::HelperText` component.
    <br/><br/>
    The `id` attribute of the element is automatically generated.
  </C.Property>
  <C.Property @name="<[F].Control>" @type="yielded component">
    It is a very simple container that yields its content. It is used to forward the “base” control inside the “field” control wrapper. The `Control` yielded component exposes two hashed arguments:
  </C.Property>
  <C.Property @name="[C].id" @type="string">
    Returns the unique `id` attribute for the control element (generated automatically, unless provided using the `@id` argument described above).
  </C.Property>
  <C.Property @name="[C].ariaDescribedBy" @type="string">
    Returns the `aria-describedby` attribute for the control element (generated automatically, based on the presence of the `HelperText` an/or the `Error` elements in the field, plus the optional `@extraAriaDescribedBy` argument described above).
  </C.Property>
  <C.Property @name="<[F].CharacterCount>" @type="yielded component">
    An auto-generated or custom character count message to guide users when editing a field. For details about its API, check the `Form::CharacterCount` component.
    <br/><br/>
    The `id` attribute of the element is automatically generated.
  </C.Property>
  <C.Property @name="<[F].Error>" @type="yielded component">
    A container that yields its content inside the “error” block. The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API, check the `Form::Error` component.
    <br/><br/>
    The `id` attribute of the `Error` element is automatically generated.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>

### Form::Fieldset

<Doc::ComponentApi as |C|>
  <C.Property @name="layout" @type="enum" @values={{array "vertical" "horizontal" }} @default="vertical">
    Sets the layout of the field controls in the component.
  </C.Property>
  <C.Property @name="id" @type="string">
    The fieldset’s ID attribute.
    <br/><br/>
    By default the ID is automatically generated by the component; use this argument if you need to pass a custom ID for specific reasons you may have.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

`Control`, `Label`, `HelperText`, and `Error` content are passed to the field as yielded components. The component also exposes two hashed methods, `id` and `ariaDescribedBy`.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Legend>" @type="yielded component">
    A container that yields its content inside the `<legend>` element. The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the `Form::Legend` component.
  </C.Property>
  <C.Property @name="<[F].HelperText>" @type="yielded component">
    A container that yields its content inside the “helper text” block (at group level). The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the `Form::HelperText` component.
    <br/><br/>
    The `id` attribute of the element is automatically generated.
  </C.Property>
  <C.Property @name="<[F].Control>" @type="yielded component">
    It is a very simple container that yields its content. It is used to forward the “field” control inside the fields’ “group” control wrapper.
    <br/><br/>
    You can pass all the controls to a single `<Control>` container, or you can have one control per container.
  </C.Property>
  <C.Property @name="[C].id" @type="function">
    Returns the unique `id` attribute for the control element (generated automatically, unless provided using the `@id` argument described above).
  </C.Property>
  <C.Property @name="[C].ariaDescribedBy" @type="function">
    Returns the `aria-describedby` attribute for the control element (generated automatically, based on the presence of the `HelperText` an/or the `Error` elements in the field, plus the optional `@extraAriaDescribedBy` argument described above).
  </C.Property>
  <C.Property @name="<[F].Error>" @type="yielded component">
    Container that yields its content inside the “error” block (at group level). The content can be a simple string, or a more complex/structured one (in which case it inherits the text style). For details about its API check the [`Form::Error`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the `Error` element is automatically generated.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>
