## Component API

The Tabs component is composed of different parts, with their own APIs:

- `Tabs` container
- `Tab` child components
- `Panel` child components corresponding to each Tab

### Tabs API

<Doc::ComponentApi as |C|>
  <C.Property @name="onClickTab" @type="function"/>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Tabs::Tab API

<Doc::ComponentApi as |C|>
  <C.Property @name="count" @type="string">
    Displays an optional `count` indicator in the tab. Accepts the text value that should go in [Badge Count](/components/badge-count).
  </C.Property>
  <C.Property @name="icon">
    Displays an optional icon in the tab. Accepts the name of any Helios [Icon](/icons/library).
  </C.Property>
  <C.Property @name="isSelected" @type="boolean" @values={{array "false" "true" }} @default="false">
    Customizes the initial tab to display when the page is loaded. The first tab is selected on page load by default.
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `button` element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Tabs::Panel API

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `section` element.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>
