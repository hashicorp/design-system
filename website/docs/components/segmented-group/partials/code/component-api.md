## Component API

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The following predefined Segments can be passed into the Segmented Group as yielded components: `Button`, `Dropdown`, `Select`, `TextInput`. For bespoke Segments use the `Generic` block and style it accordingly.

<Doc::ComponentApi as |C|>
  <C.Property @name="<[S].Button>" @type="yielded component">
    For details about its API, check the [`Button`](/components/button?tab=code#component-api) component.
  </C.Property>
  <C.Property @name="<[S].Dropdown>" @type="yielded component">
    For details about its API, check the [`Dropdown`](/components/dropdown?tab=code#component-api) component.
  </C.Property>
  <C.Property @name="<[S].Select>" @type="yielded component">
    For details about its API, check the [`Form::Select::Base`](/components/form/select?tab=code#formselectbase-1) component.
  </C.Property>
  <C.Property @name="<[S].TextInput>" @type="yielded component">
    For details about its API, check the [`Form::TextInput::Base`](/components/form/text-input?tab=code#formtextinputbase-1) component.
  </C.Property>
  <C.Property @name="<[S].Generic>" @type="yielded component">
    A component that yields its content. The content does not inherit any styles.
  </C.Property>
</Doc::ComponentApi>
