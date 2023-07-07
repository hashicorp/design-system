## Component API

The Page Header is flexible and exposes a number of contextual components to support many different composition methods.

<Doc::ComponentApi as |C|>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Contextual components

<Doc::ComponentApi as |C|>
  <C.Property @name="<[PH].Title>" @type="yielded component">
    Yields text and structured content within an `<h1>`
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Breadcrumb>" @type="yielded component">
    A container that yields its content inside the "breadcrumb" block. Conventionally used to add a [Breadcrumb](/components/breadcrumb) component.
  </C.Property>
  <C.Property @name="<[PH].IconTile>" @type="yielded component">
    A yielded `HDS::IconTile` component. It exposes the same API of the [IconTile component](/components/icon-tile?tab=code#component-api), apart from the `@size` argument, which is pre-defined to be `medium`.
  </C.Property>
  <C.Property @name="<[PH].Badges>" @type="yielded component">
    A container that yields its content inside the "badges" block. Intended to indicate status via one or more [Badge](/components/badge) components.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Subtitle>" @type="yielded component">
    A container that yields its content inside of the "metadata" block. The content can be a simple string or a more complex/structured one. The content inherits the text style.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Description>" @type="yielded component">
    A container that yields its content inside of the "metadata" block. The content can be a simple string or a more complex/structured one. The content inherits the text style.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Generic>" @type="yielded component">
    A container that yields its content inside of the "metadata" block. The content can be a simple string or a more complex/structured one. The content does not inherit any text style.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Actions>" @type="yielded component">
    A container that yields its content inside of the "actions" block. Intended for actions and buttons pertaining to the main page.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>