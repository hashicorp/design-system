## Component API

The Page Header is a flexible component that exposes a number of contextual components to support many different composition methods. 

### Contextual components

<Doc::ComponentApi as |C|>
  <C.Property @name="<[PH].Title>" @type="yielded component">
    Yields text and structured content within an `<h1>`
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Breadcrumb>" @type="yielded component">
    A container that yields a Helios [Breadcrumb](/components/breadcrumb) component.
  </C.Property>
  <C.Property @name="<[PH].IconTile>">
    Yields an `medium` IconTile in line with the page title. For details about its API check the [IconTile](/components/icon-tile?tab=code) component.
  </C.Property>
  <C.Property @name="<[PH].Badges>" @type="yielded component">
    A container that yields its content inside of the `PageHeader`, intended to indicate status via a [Badge](/components/badge).
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Subtitle>" @type="yielded component">
    A container that yields its content inside of the `PageHeader` metadata. The content can be a simple string or a more complex/structured one, in which case it inherits the text style.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Description>" @type="yielded component">
    A container that yields its content inside of the `PageHeader` metadata. The content can be a simple string or a more complex/structured one, in which case it inherits the text style.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Generic>" @type="yielded component">
    A container that yields its content inside of the `PageHeader` metadata. The content does not inherit any styles and can be customized as desired.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
  <C.Property @name="<[PH].Actions>" @type="yielded component">
    A container that yields its content inside of the `PageHeader`, intended for actions and buttons pertaining to the main page.
    <br/><br/>
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>