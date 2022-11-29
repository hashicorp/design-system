---
title: Tabs
category: components
component: tabs
section: component-api
---

The `Tabs` component is composed of different parts, with their own APIs:

*   a `Tabs` main “container”
*   multiple `Tab` sub-components (individual Tabs)
*   multiple `Panel` sub-components (individual Panels corresponding to each Tab)

#### Tabs

Here is the API for the main (“container”) component:

<Doc::ComponentApi as |C|><C.Property @name="onClickTab" @type="function" @value="–">–</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>

#### Tabs::Tab

Here is the API for the “Tab” component:

<Doc::ComponentApi as |C|><C.Property @name="count" @type="string" @value="–">Displays an optional "count" indicator in the tab. Accepts the text value that should go in the [BadgeCount](/components/badge-count).</C.Property><C.Property @name="icon" @type="–" @value="–">Displays an optional icon in the tab. Accepts the name of the [FlightIcon](https://flight-hashicorp.vercel.app/).</C.Property><C.Property @name="isSelected" @type="boolean" @value="–">Sets a custom initial tab to display when the page is loaded. (The first tab is selected on page load by default.)</C.Property><C.Property @name="yield" @type="–" @value="–">Elements passed as children of this component are yielded inside a `<button>` element.</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>

#### Tabs::Panel

Here is the API for the “Panel” component:

<Doc::ComponentApi as |C|><C.Property @name="yield" @type="–" @value="–">Elements passed as children of this component are yielded inside a `<section>` element.</C.Property><C.Property @name="...attributes" @type="–" @value="–">`...attributes` spreading is supported on this component.</C.Property></Doc::ComponentApi>