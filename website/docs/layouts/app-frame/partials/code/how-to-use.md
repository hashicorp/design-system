## How to use this component

The `AppFrame` is a pure layout component that can be used to build the top-level “frame” of an application. The frame’s child containers (“header”, “sidebar”, “main”, “footer”) are agnostic of the content, and don’t have intrinsic sizes (apart from the ones that are required to make it work as top-level application frame).

### “Main” container

The `AppFrame::Main` child component includes a default `id` with the value `hds-main` on the HTML `<main>` element it renders. This serves as a target for the `hasA11yRefocus` feature skip links which are built into the [`AppHeader`](/components/app-header?tab=code#appheader) and the standalone [`SideNav`](/components/side-nav?tab=code#side-nav) components.

Note: The upcoming `AppSideNav` component, which is meant to only be used together with the `AppHeader` and not as standalone navigation, does not include a skip link.

### Basic use

The most basic invocation of an application “frame” looks like this:

```handlebars
<div class="doc-app-frame-mock-viewport">
  <Hds::AppFrame as |Frame|>
    <Frame.Header>
      {{! your "header" content goes here, this is just a mock placeholder }}
      <Doc::Placeholder @height="60px" @text="header" @background="#e5ffd2" />
    </Frame.Header>
    <Frame.Sidebar>
      {{! your "sidebar" content goes here, this is just a mock placeholder }}
      <Doc::Placeholder @width="120px" @height="100%" @text="sidebar" @background="#e4c5f3" />
    </Frame.Sidebar>
    <Frame.Main>
      {{! your "main" content goes here, this is just a mock placeholder }}
      <Doc::Placeholder @height="100%" @text="main" @background="#d2f4ff" />
    </Frame.Main>
    <Frame.Footer>
      {{! your "footer" content goes here, this is just a mock placeholder }}
      <Doc::Placeholder @height="60px" @text="footer" @background="#fff8d2" />
    </Frame.Footer>
  </Hds::AppFrame>
</div>
```

### Optional containers

Depending on the UI implementation of the product where the component is used, it's possible to omit certain containers simply by not yielding them. For example, this would be the “frame” of an application that doesn't have a “header”:

```handlebars
<div class="doc-app-frame-mock-viewport">
  <Hds::AppFrame as |Frame|>
    <Frame.Sidebar>
      <Doc::Placeholder @width="120px" @height="100%" @text="sidebar" @background="#e4c5f3" />
    </Frame.Sidebar>
    <Frame.Main>
      <Doc::Placeholder @height="100%" @text="main" @background="#d2f4ff" />
    </Frame.Main>
    <Frame.Footer>
      <Doc::Placeholder @height="60px" @text="footer" @background="#fff8d2" />
    </Frame.Footer>
  </Hds::AppFrame>
</div>
```

#### Programmatic control of the containers’ rendering

Using the [exposed API of the component](#component-api), it's possible to programmatically control the rendering of some of the containers. An example of programmatic control of the rendering of the sidebar could be this:

```handlebars
<div class="doc-app-frame-mock-viewport">
  <Hds::AppFrame as |Frame|>
    {{! conditional control of the rendering of the "sidebar" }}
    {{#if this.yourSidebarBooleanFlag}}
      <Frame.Sidebar>
        <Doc::Placeholder @width="120px" @height="100%" @text="sidebar" @background="#e4c5f3" />
      </Frame.Sidebar>
    {{/if}}
    <Frame.Main>
      <Doc::Placeholder @height="100%" @text="main" @background="#d2f4ff" />
    </Frame.Main>
    <Frame.Footer>
      <Doc::Placeholder @height="60px" @text="footer" @background="#fff8d2" />
    </Frame.Footer>
  </Hds::AppFrame>
</div>
```

If for some reason it's not possible to use conditional logic to control the yielding of the containers, we provide an alternative way using special `has[Container]` arguments to programmatically control the rendering (see the [component API](#component-api) specifications for details):

```handlebars
<div class="doc-app-frame-mock-viewport">
  <Hds::AppFrame @hasSidebar={{false}} as |Frame|>
    <Frame.Sidebar>
      <Doc::Placeholder @width="120px" @height="100%" @text="sidebar" @background="#e4c5f3" />
    </Frame.Sidebar>
    <Frame.Main>
      <Doc::Placeholder @height="100%" @text="main" @background="#d2f4ff" />
    </Frame.Main>
    <Frame.Footer>
      <Doc::Placeholder @height="60px" @text="footer" @background="#fff8d2" />
    </Frame.Footer>
  </Hds::AppFrame>
</div>
```

### Modals container

We also provide an extra container that can be used to display content that sits on top of all the other elements of the page (typically modal elements):

!!! Info

If the “modal“ container is empty, a `display: none` style is applied to it.
!!!

```handlebars
<div class="doc-app-frame-mock-viewport">
  <Hds::AppFrame as |Frame|>
    <Frame.Header>
      <Doc::Placeholder @height="60px" @text="header" @background="#e5ffd2" />
    </Frame.Header>
    <Frame.Sidebar>
      <Doc::Placeholder @width="120px" @height="100%" @text="sidebar" @background="#e4c5f3" />
    </Frame.Sidebar>
    <Frame.Main>
      <Doc::Placeholder @height="100%" @text="main" @background="#d2f4ff" />
    </Frame.Main>
    <Frame.Footer>
      <Doc::Placeholder @height="60px" @text="footer" @background="#fff8d2" />
    </Frame.Footer>
    <Frame.Modals>
      {{! your "modal" content goes here, this is just a mock placeholder }}
      <div class="doc-app-frame-fake-overlay" />
      <div class="doc-app-frame-fake-modal">
        <Doc::Placeholder @width="100%" @height="100%" @text="modal" @background="#ffffffb5" />
      </div>
    </Frame.Modals>
  </Hds::AppFrame>
</div>
```

If the content is injected dynamically—eg. via JavaScript or via Ember "portals"—you can assign an ID to the HTML element so that it can be targeted in the DOM by the code:

```handlebars{data-execute=false}
<div class="doc-app-frame-mock-viewport">
  <Hds::AppFrame as |Frame|>
    <Frame.Sidebar>
      ...
    </Frame.Sidebar>
    <Frame.Main>
      ...
    </Frame.Main>
    {{! assign an ID to the element to target it in the DOM }}
    <Frame.Modals id="app-frame-modals" data-test-modals-container />
  </Hds::AppFrame>
</div>
```
