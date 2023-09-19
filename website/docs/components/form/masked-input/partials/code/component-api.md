## Component API

The Masked Input component has two different variants with their own APIs:

- `Form::MaskedInput::Base` - the base component: the input control
- `Form::MaskedInput::Field` - the field parent component: the input control with label, helper text, and error messaging (in a wrapping container)

### Form::MaskedInput::Base

<Doc::ComponentApi as |C|>
  <C.Property @name="value" @type="string|number|date">
    Input control’s value.
  </C.Property>
  <C.Property @name="isContentMasked" @type="boolean" @default="true">
    Set this argument to `false` to make the input content visible by default or bind it to a variable to control the masking from outside the component.
  </C.Property>
  <C.Property @name="isMultiline" @type="boolean" @default="false">
    By default, the component renders an `<input>`. If set to `true` it renders a `<textarea>`.
  </C.Property>
  <C.Property @name="isInvalid" @type="boolean" @default="false">
    Applies an “invalid” appearance to the control but doesn’t modify its logical validity.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    If set to `true`, it renders a [`Copy::Button`](/components/copy/button) next to the form control allowing the value of the input to be copied to the clipboard.
  </C.Property>
  <C.Property @name="copyButtonText" @type="string" @default="Copy masked content">
    Override this value to provide a meaningful `aria-label` for the [`Copy::Button`](/components/copy/button) component.
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    By default, the input fills the parent container. If a `@width` parameter is provided, the control will have a fixed width. When `hasCopyButton` is `true`, the width includes the associated copy button.
  </C.Property>
  <C.Property @name="height" @type="string" @valueNote="any valid CSS height (px, rem, etc)">
    Only available if `@isMultiline` is `true`. By default, the `<textarea>` has a `height` determined by the browser to accommodate 4 lines of text. If a custom `@height` value is provided, the control will have a fixed height.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    The attributes will be applied to the input control element. This means you can use all the standard HTML input attributes and all the usual Ember techniques for event handling, validation, etc.
    <br/><br/>
    Examples of HTML input attributes: `id`, `name`, `value`, `placeholder`, `disabled`, `readonly`, `required`. See [the whole list of attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes). Examples of Ember modifiers: `\{{on "input" [do something]}}`, `\{{on "change" [do something]}}`, `\{{on "blur" [do something]}}`.
  </C.Property>
</Doc::ComponentApi>

### Form::MaskedInput::Field

<Doc::ComponentApi as |C|>
  <C.Property @name="value" @type="string|number|date">
    Input control’s value.
  </C.Property>
  <C.Property @name="isContentMasked" @type="boolean" @default="true">
    Set this argument to `false` to make the input content visible by default or bind it to a variable to control the masking from outside the component.
  </C.Property>
  <C.Property @name="isMultiline" @type="boolean" @default="false">
    By default, the component renders an `<input>`. If set to `true` it renders a `<textarea>`.
  </C.Property>
  <C.Property @name="isInvalid" @type="boolean" @default="false">
    Applies an “invalid” appearance to the control but doesn’t modify its logical validity.
  </C.Property>
  <C.Property @name="isRequired" @type="boolean" @default="false">
    Appends a `Required` indicator next to the label text and sets the `required` attribute on the control when user input is required.
  </C.Property>
  <C.Property @name="isOptional" @type="boolean" @default="false">
    Appends an `Optional` indicator next to the label text when user input is optional.
  </C.Property>
  <C.Property @name="hasCopyButton" @type="boolean" @default="false">
    If set to `true`, it renders a [`Copy::Button`](/components/copy/button) next to the form control allowing the value of the input to be copied to the clipboard.
  </C.Property>
  <C.Property @name="copyButtonText" @type="string" @default="Copy masked content">
    Override this value to provide a meaningful `aria-label` for the [`Copy::Button`](/components/copy/button) component.
  </C.Property>
  <C.Property @name="width" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    By default, the input fills the parent container. If a `@width` parameter is provided, the control will have a fixed width. This width will only be applied to the control, not the other elements of the field.
  </C.Property>
  <C.Property @name="height" @type="string" @valueNote="any valid CSS height (px, rem, etc)">
    Only available if `@isMultiline` is `true`. By default, the `<textarea>` has a `height` determined by the browser to accommodate 4 lines of text. If a custom `@height` value is provided, the control will have a fixed height.
  </C.Property>
  <C.Property @name="id" @type="string">
    Input control’s ID attribute.
    <br/><br/>
    By default, the ID is automatically generated by the component. Use this argument to pass a custom ID.
  </C.Property>
  <C.Property @name="extraAriaDescribedBy" @type="string">
    Extra ID attribute to add to the `aria-describedby` HTML attribute.
    <br/><br/>
    By default, the `aria-describedby` attribute is automatically generated by the component, using the IDs of the helper text and errors (if present). Use this argument to pass an extra ID.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
    <br/><br/>
    The attributes will be applied to the input control element. This means you can use all the standard HTML attributes of the input control element and all the usual Ember techniques for event handling, validation, etc.
    <br/><br/>
    Examples of HTML attributes: `id`, `name`, `value`, `placeholder`, `disabled`, `readonly`, `required`. See [the whole list of HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes). Examples of Ember modifiers: `\{{on "input" [do something]}}`, `\{{on "change" [do something]}}`, `\{{on "blur" [do something]}}`.
  </C.Property>
</Doc::ComponentApi>

#### Contextual components

`Label`, `HelperText`, and `Error` content are passed to the field as yielded components.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Label>" @type="yielded component">
    Container that yields its content inside the `<label>` element. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Label`](/components/form/primitives) component.
    <br/><br/>
    The `for` attribute of the label is automatically generated using the `controlId` value of the control.
  </C.Property>
  <C.Property @name="<[F].HelperText>" @type="yielded component">
    Container that yields its content inside the "helper text" block. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::HelperText`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the element is automatically generated using the `controlId` value of the control.
  </C.Property>
  <C.Property @name="<[F].Error>" @type="yielded component">
    Container that yields its content inside the "error" block. The content can be a simple string or a more complex/structured string, in which case it inherits the text style. For details about its API, check the [`Form::Error`](/components/form/primitives) component.
    <br/><br/>
    The `id` attribute of the `Error` element is automatically generated.
    <Doc::ComponentApi as |C|>
      <C.Property @name="<[E].Message>" @type="yielded component">
        If the error is made of multiple messages, you can iterate over a collection of error messages yielding individual items using `Error.Message`.
      </C.Property>
    </Doc::ComponentApi>
  </C.Property>
</Doc::ComponentApi>
