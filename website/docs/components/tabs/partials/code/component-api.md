The `Tabs` component is composed of different parts, with their own APIs:

*   a `Tabs` main “container”
*   multiple `Tab` sub-components (individual Tabs)
*   multiple `Panel` sub-components (individual Panels corresponding to each Tab)

#### Tabs

Here is the API for the main (“container”) component:

<Doc::ComponentApi as |C|>
  <C.Property @name="onClickTab" @type="function"/>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### Tabs::Tab

Here is the API for the “Tab” component:

<Doc::ComponentApi as |C|>
  <C.Property @name="count" @type="string">
    Displays an optional "count" indicator in the tab. Accepts the text value that should go in the [BadgeCount](/components/badge-count).
  </C.Property>
  <C.Property @name="icon">
    Displays an optional icon in the tab. Accepts the name of the [FlightIcon](https://flight-hashicorp.vercel.app/).
  </C.Property>
  <C.Property @name="isSelected" @type="boolean">
    Sets a custom initial tab to display when the page is loaded. (The first tab is selected on page load by default.)
  </C.Property>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `<button>` element.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>

#### Tabs::Panel

Here is the API for the “Panel” component:

<Doc::ComponentApi as |C|>
  <C.Property @name="yield">
    Elements passed as children of this component are yielded inside a `<section>` element.
  </C.Property>
  <C.Property @name="...attributes">
    `...attributes` spreading is supported on this component.
  </C.Property>
</Doc::ComponentApi>