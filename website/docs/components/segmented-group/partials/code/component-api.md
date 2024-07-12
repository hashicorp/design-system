## Component API

### SegmentedGroup

<Doc::ComponentApi as |C|>
  <C.Property @name="<[S].Button>" @type="yielded component">
    `Button` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[S].Dropdown>" @type="yielded component">
    `Dropdown` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[S].Select>" @type="yielded component">
    `Form::Select::Base` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[S].TextInput>" @type="yielded component">
    `Form::TextInput::Base` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[S].Generic>" @type="yielded component">
    A generic container yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

The following predefined segments can be passed into the Segmented Group as yielded contextual components: `Button`, `Dropdown`, `Select`, `TextInput`. For bespoke Segments use the `Generic` contextual component and style it accordingly.

#### [S].Button

The [`Button`](/components/button) component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API of the [`Button`](/components/button?tab=code#component-api) component.
  </C.Property>
</Doc::ComponentApi>

#### [S].Dropdown

The [`Dropdown`](/components/dropdown) component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API of the [`Dropdown`](/components/dropdown?tab=code#component-api) component.
  </C.Property>
</Doc::ComponentApi>

#### [S].Select

The [`Form::Select::Base`](/components/form/select) component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
    It exposes the same API of the [`Form::Select::Base`](/components/form/select?tab=code#formselectbase-1) component.
  </C.Property>
</Doc::ComponentApi>

#### [S].TextInput

The [`Form::TextInput::Base`](/components/form/text-input) component, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property>
      It exposes the same API of the [`Form::TextInput::Base`](/components/form/text-input?tab=code#formtextinputbase-1) component.
  </C.Property>
</Doc::ComponentApi>

#### [S].Generic

A generic container, yielded as contextual component.

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded after all the other elements.
    <br/>The content is unstyled by default, so consumers will need to take care of layout and style of the content.
  </C.Property>
</Doc::ComponentApi>
