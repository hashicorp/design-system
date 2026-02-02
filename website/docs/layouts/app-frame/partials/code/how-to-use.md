## How to use this component

The `AppFrame` is a pure layout component that can be used to build the top-level “frame” of an application. The frame’s child containers (“header”, “sidebar”, “main”, “footer”) are agnostic of the content, and don’t have intrinsic sizes (apart from the ones that are required to make it work as top-level application frame).

### “Main” container

The `AppFrame::Main` child component includes a default `id` with the value `hds-main` on the HTML `<main>` element it renders. This serves as a target for the `hasA11yRefocus` feature skip link which is built into the [`AppHeader`](/components/app-header?tab=code#appheader) component.

Note: The `AppSideNav` component, which is meant to only be used together with the `AppHeader` and not as standalone navigation, does not include a skip link.

Note: The `AppSideNav` component, which is meant to only be used together with the `AppHeader` and not as standalone navigation, does not include a skip link.

### Basic use

The most basic invocation of an application “frame” looks like this:

[[code-snippets/app-frame-basic]]

### Optional containers

Depending on the UI implementation of the product where the component is used, it's possible to omit certain containers simply by not yielding them. For example, this would be the “frame” of an application that doesn't have a “header”:

[[code-snippets/app-frame-no-header]]

#### Programmatic control of the containers’ rendering

Using the [exposed API of the component](#component-api), it's possible to programmatically control the rendering of some of the containers. An example of programmatic control of the rendering of the sidebar could be this:

[[code-snippets/app-frame-conditional]]

If for some reason it's not possible to use conditional logic to control the yielding of the containers, we provide an alternative way using special `has[Container]` arguments to programmatically control the rendering (see the [component API](#component-api) specifications for details):

[[code-snippets/app-frame-has-container-args]]

### Modals container

If the “modal“ container is empty, a `display: none` style is applied to it.

We also provide an extra container that can be used to display content that sits on top of all the other elements of the page (typically modal elements):

[[code-snippets/app-frame-modal]]

If the content is injected dynamically—eg. via JavaScript or via Ember "portals"—you can assign an ID to the HTML element so that it can be targeted in the DOM by the code:

[[code-snippets/app-frame-portals execute=false]]
