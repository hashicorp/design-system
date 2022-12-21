## Component API

The `Tabs` component is composed of different parts, with their own APIs:

*  `Tabs` “container”
*  multiple `Tab` sub-components
*  multiple `Panel` sub-components (corresponding to each Tab)

### Tabs API

<Doc::ComponentApi as |C|>
  <C.Property @name="onClickTab" @type="function"/>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

### Tabs::Tab API

<Doc::ComponentApi as |C|>
  <C.Property @name="count" @type="string">
    Displays an optional `count` indicator in the tab. Accepts the text value that should go in the [BadgeCount](/components/badge-count).
  </C.Property>
  <C.Property @name="icon">
    Displays an optional icon in the tab. Accepts the name of the [Icon](https://flight-hashicorp.vercel.app/).
  </C.Property>
  <C.Property @name="isSelected" @type="boolean">
    Sets a custom initial tab to display when the page is loaded. (The first tab is selected on page load by default.)
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `button` element.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

### Tabs::Panel API

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `section` element.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>