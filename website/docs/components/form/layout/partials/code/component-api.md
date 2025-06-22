## Component API

### Form

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="enum" @values={{array "form" "div"}} @default="form">
    The HTML tag that wraps the `Form` content.
  </C.Property>
  <C.Property @name="sectionMaxWidth" @type="string" @valueNote="any valid CSS width (px, rem, etc)" @default="672px">
    The max-width value for `Form Section` components and other direct `Form` child components which include the `FormHeader`, `FormSeparator`, and `FormFooter`.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Header

<Doc::ComponentApi as |C|>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the header should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Header::Title

<Doc::ComponentApi as |C|>
  <C.Property @name="tag" @type="enum" @values={{array "div" "h1" "h2" "h3" "h4" "h5" "h6"}} @default="div">
    A valid HTML tag name to be used to render the `Title` element.
  </C.Property>
  <C.Property @name="size" @type="string" @values={{array "500" "400" "300" "200" "100" }} @default="200">
    The size of the `Display` text style.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Header::Description

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Section

<Doc::ComponentApi as |C|>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the section should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Section::Header

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Separator

<Doc::ComponentApi as |C|>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the separator should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Section::MultiFieldGroup

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Section::MultiFieldGroupItem

<Doc::ComponentApi as |C|>
  <C.Property @name="width" @type="string" @valueNote="any valid CSS width (px, rem, etc)">
    Sets the width for the component.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Form::Footer

<Doc::ComponentApi as |C|>
  <C.Property @name="isFullWidth" @type="boolean" @default="false">
    Indicates that the footer should take up the full width of the parent container.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children are yielded as inner content of the element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
