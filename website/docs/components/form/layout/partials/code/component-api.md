## Component API

### Form

<Doc::ComponentApi as |C|>
  <C.Property @name="<[F].Header>" @type="yielded component">
    `Form::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].HeaderTitle>" @type="yielded component">
    `Form::Header::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].HeaderDescription>" @type="yielded component">
    `[Form::Header::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Section>" @type="yielded component">
    `Form::Section` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].SectionHeader>" @type="yielded component">
    `Form::Section::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].SectionHeaderDescription>" @type="yielded component">
    `Form::.Section::Header::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].SectionMultiFieldGroup>" @type="yielded component">
    `Form::Section::MultiFieldGroup` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].SectionMultiFieldGroupItem>" @type="yielded component">
    `Form::Section::MultiFieldGroup::Item` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Separator>" @type="yielded component">
    `Form::Separator` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[F].Footer>" @type="yielded component">
    `Form::Footer` yielded as contextual component (see below).
  </C.Property>
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
  <C.Property @name="<[FH].Title>" @type="yielded component">
    `Form::Header::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[FH].Description" @type="yielded component">
    `Form::Header::Description` yielded as contextual component (see below).
  </C.Property>
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

 <!-- 
 Question: I included a yielded Section component within the Section to allow for a nested Section but does that actually make sense to include?
 Should I keep the yielded Section within a Section and if so should I document it here? (I included it as sort of an edge case but I don't think we want to recommend or encourage that usage.)
  -->

<Doc::ComponentApi as |C|>
  <C.Property @name="<[FS].Header>" @type="yielded component">
    `Form::Section::Header` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[FS].HeaderTitle>" @type="yielded component">
    `Form::Section::Header::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[FS].HeaderDescription>" @type="yielded component">
    `Form::Section::Header::Description` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[FS].MultiFieldGroup>" @type="yielded component">
    `Form::Section::MultiFieldGroup` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[FS].MultiFieldGroupItem>" @type="yielded component">
    `Form::Section::MultiFieldGroup::Item` yielded as contextual component (see below).
  </C.Property>
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
  <C.Property @name="<[FSH].Title>" @type="yielded component">
    `Form::Section::Header::Title` yielded as contextual component (see below).
  </C.Property>
  <C.Property @name="<[FSH].Description" @type="yielded component">
    `Form::Section::Header::Description` yielded as contextual component (see below).
  </C.Property>
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
  <C.Property @name="<[MF].Item>" @type="yielded component">
    `Form::Section::MultiFieldGroup::Item` yielded as contextual component (see below).
  </C.Property>
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
