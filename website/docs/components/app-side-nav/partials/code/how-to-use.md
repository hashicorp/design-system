
This section provides in-depth instructions on how consumers can use the **full-featured `Hds::AppSideNav`** component to build a “standard” sidebar navigation with responsive behavior, animations/transitions, support for portals, etc.

Given the complexity and level of customization that an application’s navigation may require, it is not possible to cover all the possible use cases in this documentation. For this reason, if you need to implement a navigation element using this component, [contact the Design Systems Team](/about/support) for support.

!!! Insight

The App Side Nav component is intended to be used in combination with the [`Hds::AppHeader`](/components/app-header) and [`Hds::AppFrame`](/layouts/app-frame) components:

- App Header takes care of global and utility navigation
- App Frame provides a top-level layout for the application’s page, but is agnostic of what the actual content is and what dimensions it has.
- App Side Nav takes care of providing the visual elements used to build page-level in context navigation for the application but is agnostic of where it’s used (even though it has intrinsic sizing).

!!!

## Full-featured component

The `Hds::AppSideNav` component provides a set of advanced features out of the box: layout, content (base elements + portals), responsiveness, accessibility.

### Layout

The App Side Nav component provides a top-level layout for the sidebar navigation.

Cnsumers can yield the navigation content and add business logic to control the content within it.

<!-- ```handlebars
<div class="doc-app-sidenav-demo">
  <Hds::AppSideNav>
    <Doc::Placeholder @height="500px" @text="&lt;:body /&gt;" @background="#e4e4e4" />
  </Hds::AppSideNav>
</div>
``` -->

It also comes with a set of CSS properties that automatically set the App Side Nav in a fixed position on the left of the application frame, and force it to occupy the full height of the window.

### Content

Standard HDS [`Button`](/components/button) and [`Dropdown`](/components/dropdown) components can also be used within the App Side Nav where needed. We recommend setting `enableCollisionDetection` to `true` for each Dropdown component used within the App Side Nav.

The App Side Nav is an agnostic container, in which consumers can _in principle_ add anything they want, in the order they want.

That said, to create consistent experiences for our end-users, it’s very likely that the choice of what component to use will fall on one of these two options:

- one (or more) **`Hds::AppSideNav::List`** components - this is the case when the navigation is very simple, with a single depth level, or when there’s a need to build a customized/non-standard navigation logic
- a combination of **`Hds::AppSideNav::Portal`** / **`Hds::AppSideNav::Portal::Target`** components - this is the preferable solution for complex multi-level navigations that need dynamic injection of content via “portals”

#### List (`AppSideNav::List`)

The `AppSideNav::List` component (and its sub-components) are the fundamental building blocks of the navigation. It generates a `<nav>` element, containing a `<ul>` list of “items”, with different variants of items, each one rendered as HTML `<li>` element, and exposed to the consumer as yielded components:

- `Title` - used to provide a title to a specific “section” of the list; it accepts any yielded content, applying specific color and typographic styles to it.
- `Link` - used to render a “link” item that navigates the user to a specific page/route/resource; it exposes a set of different properties/arguments, to allow the consumers specific customizations.
- `BackLink` - a simplified version of the `Link` element, used to take “back” the user to a previous page or navigation state; it shows a leading “left chevron” by default, and accepts a plain text string as an argument.
- `Item` - a generic item “container” that can be used to add non-standard content to a list; it accepts any yielded content.

Below is an example (with simplified code for better readability) of how these elements could be used to build different specific navigation items:

<!-- ```handlebars
<div class="doc-app-sidenav-demo--short">
  <Hds::AppSideNav>
    <Hds::AppSideNav::List as |SNL|>
      <SNL.BackLink @text="A “back” link" @href="#" />
      <SNL.Title>A section title</SNL.Title>
      <SNL.Link @text="A link with just text" @href="#" />
      <SNL.Link @text="A link with an icon" @icon="network" @href="#" />
      <SNL.Link @text="With a “count”" @icon="users" @count="12" @href="#" />
      <SNL.Link @text="With a “badge” " @icon="credit-card" @badge="Beta" @href="#" />
      <SNL.Link @text="With “sub items” indicator" @icon="settings" @hasSubItems={{true}} />
      <SNL.Link @href="#" @isHrefExternal="true" @icon="guide" @text="As an “external” link" />
      <SNL.Link @icon="hexagon" @href="#">
        <Doc::Placeholder @height="20px" @text="With generic yielded content" @background="#e4e4e4" />
      </SNL.Link>
      <SNL.Item>
        <Doc::Placeholder @height="20px" @text="Generic yielded content" @background="#e4e4e4" />
      </SNL.Item>
    </Hds::AppSideNav::List>
  </Hds::AppSideNav>
</div>
``` -->

In case a consumer needs to add custom/extra content inside the `<nav>` element but outside of the `<ul>` element, we provide two extra “slot” containers (`ExtraBefore` and `ExtraAfter`):

<!-- ```handlebars{data-execute=false}
<Hds::AppSideNav>
  <Hds::AppSideNav::List as |SNL|>
    <SNL.ExtraBefore>{{! content that is rendered before the list items }}</SNL.ExtraBefore>
    {{! ... list items ... }}
    <SNL.ExtraAfter>{{! content that is rendered after the list items }}</SNL.ExtraAfter>
  </Hds::AppSideNav::List>
</Hds::AppSideNav>
``` -->

For more details about how to use these sub-components, refer to the [“Component API”](/components/app-side-nav?tab=code#appsidenavlist) section.

We currently don’t expect consumers to use the `AppSideNav::List` component (and sub-components) directly in their navigation implementation (unless it consists only of a single-level flat navigation). It’s more likely they will use the “portals” components described below (they expose the `AppSideNav::List` via yielded sub-components).

#### Portals (`AppSideNav::Portal::Target` / `AppSideNav::Portal::Portal`)

Portals are used to build complex multi-level navigations, by dynamically injecting “lists” of links (as `AppSideNav::List` items) in multiple “panels” that automatically animate depending on their “depth” in the navigation.

These “portals” components are based on the [ember-stargate](https://github.com/simonihmig/ember-stargate) addon. Refer to this addon’s documentation for details about how a “portal” works.

The `AppSideNav::PortalTarget` needs to be added (once) to the “body” of the App Side Nav. It has a default target name (required by Ember Stargate), but this name can be overwritten using the `@targetName` argument.

The `AppSideNav::Portal` component instead can be added in any part of the application (in multiple places): its content will be injected at rendering time into the “target” portal depending on the nesting of the page route within the Ember application.

The `AppSideNav::Portal` component internally uses the `AppSideNav::List` component and yields its sub-items, so it can contain any of the following items:

- `Title`
- `Link`
- `BackLink`
- `Item`
- `ExtraBefore/After`

For more details about how to use these sub-components, refer to the [“Component API”](/components/app-side-nav?tab=code#appsidenavlist) section.

Below is an example (inspired by the Cloud UI navigation) of how the two kinds of portals are declared in code:

<!-- ```handlebars
{{!--
for demo purposes we set `@isResponsive` to `false` but in your app it will probably need to be set to `true` 
(or omitted to rely on defaults)
--}}
<div class="doc-app-sidenav-demo--cloud-ui">
  <Hds::AppSideNav @isResponsive={{false}}>
      {{!--
      this portal "target" needs to be added in the position where you want
      the content declared in the "portal(s)" to be injected
      (typically the `:body` of the `Hds::AppSideNav`)
      --}}
      <Hds::AppSideNav::Portal::Target />
  </Hds::AppSideNav>
</div>

{{!--
this "portal" can be declared in any part of the application, and its content
will be injected automatically in the "target" portal declared above;
if multiple portals are declared, multiple "panels" will be rendered
based on the nesting of the page route within the application’s global routing
--}}
<Hds::AppSideNav::Portal @ariaLabel="Primary" as |Nav|>
  <Nav.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />
  <Nav.Title>Services</Nav.Title>
  <Nav.Link @text="Boundary" @icon="boundary" @href="#" />
  <Nav.Link @text="Consul" @icon="consul" @href="#" />
  <Nav.Link @text="Packer" @icon="packer" @href="#" />
  <Nav.Link @text="Vault" @icon="vault" @href="#" />
  <Nav.Link @text="Vault Secrets" @icon="vault-secrets-square" @href="#" />
  <Nav.Link @text="Terraform" @icon="terraform" @href="#" />
  <Nav.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
  <Nav.Link @text="Waypoint" @icon="waypoint" @badge="Alpha" @hasSubItems={{true}} />
  <Nav.Title>Default Org</Nav.Title>
  <Nav.Link @text="HashiCorp Virtual Networks" @icon="network" @href="#" />
  <Nav.Link @text="Access control (IAM)" @icon="users" @href="#" @hasSubItems={{true}} />
  <Nav.Link @text="Billing" @icon="credit-card" @href="#" @hasSubItems={{true}} />
  <Nav.Link @text="Settings" @icon="settings" @href="#" @hasSubItems={{true}} />
  <Nav.Link @href="#" @isHrefExternal="true" @icon="guide" @text="Documentation" />
</Hds::AppSideNav::Portal>
``` -->

_Notice: given the complexity of the component and its usage, is not possible to exactly replicate its production-ready implementation in code; refer to other codebases (e.g., [Cloud UI](https://github.com/search?q=repo%3Ahashicorp%2Fcloud-ui+%3CHds%3A%3ASideNav%3A%3APortal&type=code)) to have a more in-depth view of how the “portals” should be used to build a complex app navigation._

Since the `AppSideNav::PortalTarget` supports multiple portals, each `AppSideNav::Portal` adds its content to the navigation as a distinct “panel”, pushing the previous one out of the viewport through an  animation (the injection of panels and the corresponding sliding animation is entirely controlled via JavaScript). The whole set of panels is automatically faded in/out on Side Nav minimization (see [Responsiveness](#responsiveness) below).

!!! Info

**Important**

When the App Side Nav is used in conjunction with portals, the nesting of navigation/subnavigation levels has to match one-to-one the hierarchy of the routing, otherwise it will not work as one would expect.

!!!

### Responsiveness

As mentioned above, the full-fledged `Hds::AppSideNav` component is “responsive” by default:

- when the **viewport is `desktop`**, the sidebar navigation is static and has a fixed width
    - the width at which the viewport is considered “desktop” is controlled by a dedicated CSS variable `--hds-app-desktop-breakpoint`; if needed it can be overwritten (at `:root` level) to define a custom “desktop” breakpoint
- when the **viewport is `mobile`**, the sidebar navigation is responsive and the user can minimize or maximize its width via a toggle button (the component will take care automatically of the transitions between these two states)
    - in this case the App Side Nav occupies only a minimum width in terms of page layout, even when expanded (it partially covers the main content)
    - a toggle button is added to the App Side Nav, used to expand/minimize its width
    - an overlay is automatically added to the main content area so that the user can’t interact with it while the App Side Nav is opened (if the user clicks on the overlay, the App Side Nav closes and returns to its minimized state; the same happens if the user presses the `esc` key)

This “responsive” behavior can be programmatically turned off passing a value `false` to the argument `@isResponsive` in the `Hds::AppSideNav` component.

_Notice that even if the `@isResponsive` parameter is set to `false`, some JavaScript is executed anyway in the background, and events listeners are attached to some DOM elements (even if these functionality are not used)._

#### Logical and visual states

When the component is “responsive” there are different “states” (and associated logic) for different combinations of these three parameters:

- `isResponsive`
- `isDesktop`
- `isMinimized`

![Schema of the different visual states in response to the change of viewports and the corresponding logic variables](/assets/components/app-side-nav/responsiveness.png)

Each one of these states has CSS class names associated, and they’re used by the component code to determine what layout to render for the sidebar navigation.

#### Content transitions between states

The App Side Nav component **automatically**:

- fades in/out the “actions” block in the header and the content injected in the body via “portals”.
- swaps the toggle button icon from “menu” to “close” and moves it from one position to another

Any other content in the App Side Nav needs to be **explicitly handled** by the consumers (in this way they have full control of the content they add, and they can customize the transition as they want/need).

One possible way to do it is to use the **`hds-app-side-nav-hide-when-minimized` class**. This is a special class that can be applied to a DOM element so that it **automatically** fades in/out when the App Side Nav changes its “minimization” state.

More specifically:

- `minimized → maximized` transition: the content appears with a fade-in effect, when the width animation is already completed (the width is maximised)
- `maximized → minimized` transition: the content disappears at once with no transition, before the width animation starts

Another option is to use the **`isMinimized` parameter**, which is useful in those cases where the content is so custom/specialized that it can’t just be faded in/out but needs to have a different kind of transition (eg. remain visible but change layout or respond to the width of the container). This value is passed down by the `<:header/body/footer>` named blocks as parameters, and can be used to build custom logic on the consumers’ side.

#### Advanced customization

Some aspects of the responsiveness/animation/transition of the App Side Nav are parameterized in code via CSS custom properties. It means that _in theory_ they could be customized/overwritten. This though is **something that we don’t recommend**.

Navigation is a cardinal element of the UI of an application, and its standardization across the different HashiCorp products is an important end goal. Also, the implementation of this component has required considerable efforts and investments, and we should preserve it as much as possible as a unifying element across products.

If you find yourself in the situation of wanting/needing to customize or change the aspect or the behavior of the App Side Nav component, [contact the Design Systems Team](/about/support) for support.

### Accessibility

#### `aria` attributes

The App Side Nav component already provides some of the required `aria` attributes. But other attributes are needed when declaring its content. Please refer to the [Accessibility](/components/app-side-nav?tab=accessibility) section for more details.

#### Animations

Animations and transition on the component will not take place if the user has `prefers-reduced-motion` enabled in their browser or operating system.

### Accessibility

Since this component is layout-only, there are no built-in accessibility features: you are responsible for making sure your custom App Side Nav implementation is conformant to the WCAG requirements.
