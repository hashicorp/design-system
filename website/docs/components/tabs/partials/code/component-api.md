## Component API

The Tabs component is composed of different parts, with their own APIs:

- `Tabs` container
- `Tab` child components
- `Panel` child components corresponding to each Tab

### Tabs API

<Doc::ComponentApi as |C|>
  <C.Property @name="size" @type="enum" @values={{array "medium" "large" }} @default="medium">
    Sets the size of the `Tabs`.
  </C.Property>
  <C.Property @name="onClickTab" @type="function">
    Callback function invoked when the one of the tabs is clicked, if provided. The function receives the DOM `event` and the tab's `index` (integer number) as arguments.
  </C.Property>
  <C.Property @name="selectedTabIndex" @type="integer">
    This argument can be used to select the initial tab and control the component state bypassing its default internal state (usually via query parameters).
    <br/>
    _Notice: when the initial tab is set using this parameter instead of using the `@isSelected` argument on the `Tab` sub-component, the consumer is responsible for updating the index whenever the user clicks on one of the tabs (via `onClickTab`)._
  </C.Property>
  <C.Property @name="isParentVisible" @type="boolean" default="false">
    Special argument used to control nested tabs. See ["How to use / Nested tabs"](/components/tabs?tab=code#nested-tabs) for details.
  </C.Property>
  <C.Property @name="...attributes">
    This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).
  </C.Property>
</Doc::ComponentApi>

### Tabs::Tab API

<Doc::ComponentApi as |C|>
  <C.Property @name="icon">
    Displays an optional icon in the tab. Accepts any [icon](/icons/library) name.
  </C.Property>
  <C.Property @name="count" @type="string">
    Displays an optional `count` indicator in the tab. Accepts the text value that should go in [Badge Count](/components/badge-count).
  </C.Property>
  <C.Property @name="isSelected" @type="boolean" @default="false">
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
