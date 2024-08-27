
This section provides in-depth instructions on how consumers can use the **full-featured `Hds::SideNav`** component to build a "standard" sidebar navigation with responsive behavior, animations/transitions, support for portals, etc.

It also provides generic guidance on how to use the **layout-only `Hds::SideNav::Base`** component to build a customized sidebar navigation (if that would be necessary).

Given the complexity and level of customization that an application's navigation may require, it is not possible to cover all the possible use cases in this documentation. For this reason, if you need to implement a navigation element using this component, [contact the Design Systems Team](/about/support) for support.

!!! Insight

The Side Nav component is intended to be used in combination with the [`Hds::AppFrame`](/layouts/app-frame) component:

- AppFrame takes care of providing a top-level layout for the application's page, but is agnostic of what the actual content is and what dimensions it has.
- Side Nav takes care of providing the visual elements used to build a top-level navigation for the application, but is agnostic of where it's used (even though it has intrinsic sizing).

!!!

## Full-featured component

The `Hds::SideNav` component provides a set of advanced features out of the box: layout, content (base elements + portals), responsiveness, accessibility.

### Layout

The Side Nav component provides a top-level layout for the sidebar navigation.

It exposes three "slots" (named blocks) where the consumers can yield the navigation content, and add business logic to control this content:  `<:header>`, `<:body>` and `<:footer>`.

```handlebars
<div class="doc-sidenav-demo">
  <Hds::SideNav>
    <:header>
      <Doc::Placeholder @height="72px" @text="&lt;:header /&gt;" @background="#e4e4e4" />
    </:header>
    <:body>
      <Doc::Placeholder @height="500px" @text="&lt;:body /&gt;" @background="#e4e4e4" />
    </:body>
    <:footer>
      <Doc::Placeholder @height="36px" @text="&lt;:footer /&gt;" @background="#e4e4e4" />
    </:footer>
  </Hds::SideNav>
</div>
```

It also comes with a set of CSS properties that automatically set the Side Nav in a fixed position on the left of the application frame, and force it to occupy the full height of the window (the Side Nav "header" and "footer" are fixed, while its "body" is scrollable if the content overflows the available space).

### Content

#### Header (`<:header>`)

Typically the `Hds::SideNav::Header` sub-component should be added here. It provides two slots (named blocks):

- the `<:logo>` block should contain the `<Hds::SideNav::Header::HomeLink>` (but it could contain also custom content, if necessary)
- the `<:actions>` block should contain optional top-level actions (eg. global search, user menu, help menu, etc.)

Note: When the Side Nav is paired with the [`Hds::AppHeader`](/components/app-header) component, the `<:header>` slot normally is not used.

```handlebars
<div class="doc-sidenav-demo--short">
  <Hds::SideNav>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Doc::Placeholder @width="100%" @height="100%" @text="logo" @background="#e4e4e4" />
        </:logo>
        <:actions>
          <Doc::Placeholder @width="150px" @height="36px" @text="actions" @background="#e4e4e4" />
        </:actions>
      </Hds::SideNav::Header>
    </:header>
    {{! ... }}
  </Hds::SideNav>
</div>
```

##### Logo

To add a logo to the "header" of the Side Nav use the `<Hds::SideNav::Header::HomeLink>` sub-component.

It requires a value for the `@icon` and `@ariaLabel` arguments:

```handlebars
<div class="doc-sidenav-demo--short">
  <Hds::SideNav>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Hds::SideNav::Header::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp home menu" @href="#" />
        </:logo>
        <:actions>
          <Doc::Placeholder @width="150px" @height="36px" @text="actions" @background="#e4e4e4" />
        </:actions>
      </Hds::SideNav::Header>
    </:header>
    {{! ... }}
  </Hds::SideNav>
</div>
```

It also accepts optional arguments, for example it’s possible to provide a custom color for the icon if needed:

```handlebars
<div class="doc-sidenav-demo--short">
  <Hds::SideNav>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Hds::SideNav::Header::HomeLink
            @icon="boundary"
            {{! you can provide a custom color for the icon }}
            @color="var(--token-color-boundary-brand)"
            @ariaLabel="Boundary home menu"
            @href="#"
          />
        </:logo>
        <:actions>
          <Doc::Placeholder @width="150px" @height="36px" @text="actions" @background="#e4e4e4" />
        </:actions>
      </Hds::SideNav::Header>
    </:header>
    {{!-- ... --}}
  </Hds::SideNav>
</div>
```

The HomeLink is built on top of the [`Hds::Interactive` component](/utilities/interactive), so it accepts all its routing arguments (eg. `@href`, `@route`, `@query`, `@model(s)`, etc.).

Refer to the [Component API section](/components/side-nav?tab=code#sidenavheaderhomelink) for details.

##### Actions

This block is intended to contain top-level actionable elements like dropdowns and buttons.

Here is an example of some possible actions:

```handlebars
<div class="doc-sidenav-demo--short">
  <Hds::SideNav>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Hds::SideNav::Header::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp home menu" @href="#" />
        </:logo>
        <:actions>
          <Hds::Button @icon="search" @isIconOnly={{true}} @text="Search" />
          <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleIcon @icon="help" @text="settings menu" />
            <dd.Title @text="Help & Support" />
            <dd.Interactive @text="Documentation" @href="#" />
            <dd.Interactive @text="Tutorials" @href="#" />
            <dd.Interactive @text="Terraform Provider" @href="#" />
            <dd.Interactive @text="Changelog" @href="#" />
            <dd.Separator />
            <dd.Interactive @text="Create support ticket" @href="#" />
            <dd.Interactive @text="Give feedback" @href="#" />
          </Hds::Dropdown>
          <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleIcon @icon="user" @text="user menu" />
            <dd.Title @text="Signed In" />
            <dd.Description @text="email@domain.com" />
            <dd.Interactive @href="#" @text="Account Settings" />
          </Hds::Dropdown>
        </:actions>
      </Hds::SideNav::Header>
    </:header>
    {{! ... }}
  </Hds::SideNav>
</div>
```

The `Hds::SideNav::Header::IconButton` is a specialized sub-component that can be used to add a button (or link) as "action" with a visual style specific to the Side Nav. It requires a value for the `@icon` and `@ariaLabel` arguments. The IconButton is built on top of the [`Hds::Interactive` component](/utilities/interactive), so it accepts all its routing arguments (eg. `@href`, `@route`, `@query`, `@model(s)`, etc.).

The dropdown elements instead (in this case) are using the standard [`Hds::Dropdown` component](/components/dropdown). We recommend setting `enableCollisionDetection` to `true` for each Dropdown component used within the Side Nav.

You can also add custom elements to the `<:actions>` block, if these two don't cover your specific needs, but in this case you will have to take care of their styling so that they blend in with the rest of the Side Nav elements.

!!! Info

The "actions" block is automatically faded in/out whenever the Side Nav transition between minimized/maximized states (see [Responsiveness](#responsiveness) below for details).

!!!

#### Body (`<:body>`)

The `<:body>` block is where the actual navigation lives. It's an agnostic container, in which consumers _in principle_ can add anything they want, in the order they want.

That said, to create consistent experiences for our end-users, it's very likely that the choice of what component to use will fall on one of these two options:

- one (or more) **`Hds::SideNav::List`** components - this is the case when the navigation is very simple, with a single depth level, or when there's a need to build a customized/non-standard navigation logic
- a combination of **`Hds::SideNav::Portal`** / **`Hds::SideNav::Portal::Target`** components - this is the preferable solution for complex multi-level navigations that need dynamic injection of content via "portals"

#### List (`SideNav::List`)

The `SideNav::List` component (and its sub-components) are the fundamental building blocks of the navigation. It generates a `<nav>` element, containing a `<ul>` list of "items", with different variants of items, each one rendered as HTML `<li>` element, and exposed to the consumer as yielded components:

- `Title` - used to provide a title to a specific "section" of the list; it accepts any yielded content, applying specific color and typographic styles to it.
- `Link` - used to render a "link" item that navigates the user to a specific page/route/resource; it exposes a set of different properties/arguments, to allow the consumers specific customizations.
- `BackLink` - a simplified version of the `Link` element, used to take "back" the user to a previous page or navigation state; it shows a leading "left chevron" by default, and accepts a plain text string as an argument.
- `Item` - a generic item "container" that can be used to add non-standard content to a list; it accepts any yielded content.

Below is an example (with simplified code for better readability) of how these elements could be used to build different specific navigation items:

```handlebars
<div class="doc-sidenav-demo--short">
  <Hds::SideNav>
    {{! ... }}
    <:body>
      <Hds::SideNav::List as |SNL|>
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
      </Hds::SideNav::List>
    </:body>
    {{! ... }}
  </Hds::SideNav>
</div>
```

In case a consumer needs to add custom/extra content inside the `<nav>` element but outside of the `<ul>` element, we provide two extra "slot" containers (`ExtraBefore` and `ExtraAfter`):

```handlebars{data-execute=false}
<Hds::SideNav>
  {{! ... }}
  <:body>
    <Hds::SideNav::List as |SNL|>
      <SNL.ExtraBefore>{{! content that is rendered before the list items }}</SNL.ExtraBefore>
      {{! ... list items ... }}
      <SNL.ExtraAfter>{{! content that is rendered after the list items }}</SNL.ExtraAfter>
    </Hds::SideNav::List>
  </:body>
  {{! ... }}
</Hds::SideNav>
```

For more details about how to use these sub-components refer to the ["Component API"](/components/side-nav?tab=code#sidenavlist) section.

We don't expect consumers to use directly the `SideNav::List` component (and sub-components) directly in their navigation implementation (unless it consists only of a single-level flat navigation). It's more likely they will use the "portals" components described below (they expose the `SideNav::List` via yielded sub-components).

#### Portals (`SideNav::Portal::Target` / `SideNav::Portal::Portal`)

Portals are used to build complex multi-level navigations, by dynamically injecting "lists" of links (as `SideNav::List` items) in multiple "panels" that automatically animate depending on their "depth" in the navigation.

These "portals" components are based on the [ember-stargate](https://github.com/simonihmig/ember-stargate) addon. Refer to this addon's documentation for details about how a "portal" works.

The `SideNav::PortalTarget` needs to be added (once) to the "body" of the Side Nav. It has a default target name (required by Ember Stargate), but this name can be overwritten using the `@targetName` argument.

The `SideNav::Portal` component instead can be added in any part of the application (in multiple places): its content will be injected at rendering time into the "target" portal depending on the nesting of the page route within the Ember application.

The `SideNav::Portal` component internally uses the `SideNav::List` component and yields its sub-items, so it can contain any of the following items:

- `Title`
- `Link`
- `BackLink`
- `Item`
- `ExtraBefore/After`

For more details about how to use these sub-components refer to the ["Component API"](/components/side-nav?tab=code#sidenavlist) section.

Below is an example (inspired by the Cloud UI navigation) of how the two kinds of portals are declared in code:

```handlebars
{{!--
for demo purposes we set `@isResponsive` and `@hasA11yRefocus` to `false`
but in your app they will probably need to be set to `true` (or omitted to rely on defaults)
--}}
<div class="doc-sidenav-demo--cloud-ui">
  <Hds::SideNav @isResponsive={{false}} @hasA11yRefocus={{false}}>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Hds::SideNav::Header::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp" @href="#" />
        </:logo>
        <:actions>
          <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleIcon @icon="help" @text="help menu" />
            <dd.Title @text="Help & Support" />
            <dd.Interactive @text="Documentation" @href="#" />
            <dd.Interactive @text="Tutorials" @href="#" />
            <dd.Interactive @text="Terraform Provider" @href="#" />
            <dd.Interactive @text="Changelog" @href="#" />
            <dd.Separator />
            <dd.Interactive @text="Create support ticket" @href="#" />
            <dd.Interactive @text="Give feedback" @href="#" />
          </Hds::Dropdown>
          <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
            <dd.ToggleIcon @icon="user" @text="user menu" />
            <dd.Title @text="Signed In" />
            <dd.Description @text="email@domain.com" />
            <dd.Interactive @href="#" @text="Account Settings" />
          </Hds::Dropdown>
        </:actions>
      </Hds::SideNav::Header>
    </:header>
    <:body>
      {{!--
      this portal "target" needs to be added in the position where you want
      the content declared in the "portal(s)" to be injected
      (typically the `:body` of the `Hds::SideNav`)
      --}}
      <Hds::SideNav::Portal::Target />
    </:body>
    <:footer>
      <Doc::Placeholder @height="36px" @text="Org/Project Select (“context switcher”)" @background="#e4e4e4" />
    </:footer>
  </Hds::SideNav>
</div>

{{!--
this "portal" can be declared in any part of the application, and its content
will be injected automatically in the "target" portal declared above;
if multiple portals are declared, multiple "panels" will be rendered
based on the nesting of the page route within the application’s global routing
--}}
<Hds::SideNav::Portal @ariaLabel="Primary" as |Nav|>
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
</Hds::SideNav::Portal>

```

_Notice: given the complexity of the component and its usage, is not possible to exactly replicate its production-ready implementation in code; refer to other codebases (e.g., [Cloud UI](https://github.com/search?q=repo%3Ahashicorp%2Fcloud-ui+%3CHds%3A%3ASideNav%3A%3APortal&type=code)) to have a more in-depth view of how the "portals" should be used to build a complex app navigation._


Since the `SideNav::PortalTarget` supports multiple portals, each `SideNav::Portal` adds its content to the navigation as a distinct "panel", pushing the previous one out of the viewport through an  animation (the injection of panels and the corresponding sliding animation is entirely controlled via JavaScript). The whole set of panels is automatically faded in/out on Side Nav minimization (see [Responsiveness](#responsiveness) below).

!!! Info

**Important**

When the Side Nav is used in conjunction with portals, the nesting of navigation/subnavigation levels has to match one-to-one the hierarchy of the routing, otherwise it will not work as one would expect.

!!!


#### Footer (`<:footer>`)

This area usually contains a “context switcher” (e.g., “org switcher” or “project switcher”) control, but technically it can contain anything (it depends on the context/application where the Side Nav is used).

If you want (and you probably do) the content automatically fades in/out when the Side Nav changes its "minimization" state, you have to apply the specific class `hds-side-nav-hide-when-minimized` to the top-level elements of your content.

Note: When the Side Nav is paired with the [`Hds::AppHeader`](/components/app-header) component, the `<:footer>` slot is not used.

```handlebars{data-execute=false}
<Hds::SideNav>
  ...
  <:footer>
    <OrganizationPicker
      @currentOrg={{this.currentOrg}}
      @organizations={{this.organizations}}
      {{! apply this special class to automatically fade in/out }}
      class='hds-side-nav-hide-when-minimized'
    />
  </:footer>
</Hds::SideNav>
```

Alternatively, if you want to create a custom transition (or respond in a different way to the minimization of the width) you can use the variable `isMinimized` provided by the `<:footer>` named block:

```handlebars{data-execute=false}
<Hds::SideNav>
  ...
  <:footer as |Footer|>

    {{! show/hide when minimization is toggled }}
    {{#unless Footer.isMinimized}}
      [ YOUR CUSTOM CONTENT HERE ]
    {{/unless}}

    {{! apply custom class (eg. to transition) when minimization is toggled }}
    <div class={{if Footer.isMinimized "is-minimized" "is-expanded"}}>
      [ YOUR CUSTOM CONTENT HERE ]
    <div>
  </:footer>
</Hds::SideNav>
```

### Used with App Header

When the Side Nav is paired with the [`Hds::AppHeader`](/components/app-header) component, only the `<:body>` slot need be used.

```handlebars
<div class="doc-sidenav-demo">
  <Hds::SideNav>
    <:body>
      <Doc::Placeholder @height="500px" @text="&lt;:body /&gt;" @background="#e4e4e4" />
    </:body>
  </Hds::SideNav>
</div>
```

### Responsiveness

As mentioned above, the full-fledged `Hds::SideNav` component is "responsive" by default:

- when the **viewport is `desktop`** the sidebar navigation is static and has a fixed width
    - the width at which the viewport is considered "desktop" is controlled by a dedicated CSS variable `--hds-app-desktop-breakpoint`; if needed it can be overwritten (at `:root` level) to define a custom "desktop" breakpoint
- when the **viewport is `mobile`** the sidebar navigation is responsive and the user can minimize or maximize its width via a toggle button (the component will take care automatically of the transitions between these two states)
    - in this case the Side Nav occupies only a minimum width in terms of page layout, even when expanded (it partially covers the main content)
    - a toggle button is added to the Side Nav, used to expand/minimize its width
    - an overlay is automatically added to the main content area so that the user can't interact with it while the Side Nav is opened (if the user clicks on the overlay, the Side Nav closes and returns to its minimized state; the same happens if the user presses the `esc` key)

This "responsive" behavior can be programmatically turned off passing a value `false` to the argument `@isResponsive` in the `Hds::SideNav` component.

_Notice that even if the `@isResponsive` parameter is set to `false`, some JavaScript is executed anyway in the background, and events listeners are attached to some DOM elements (even if these functionality are not used)._

#### Logical and visual states

When the component is "responsive" there are different "states" (and associated logic) for different combinations of these three parameters:

- `isResponsive`
- `isDesktop`
- `isMinimized`

![Schema of the different visual states in response to the change of viewports and the corresponding logic variables](/assets/components/side-nav/responsiveness.png)

Each one of these states has CSS class names associated, and they're used by the component code to determine what layout to render for the sidebar navigation.

#### Content transitions between states

The Side Nav component **automatically**:

- fades in/out the "actions" block in the header and the content injected in the body via "portals".
- swaps the toggle button icon from "menu" to "close" and moves it from one position to another

Any other content in the Side Nav needs to be **explicitly handled** by the consumers (in this way they have full control of the content they add, and they can customize the transition as they want/need).

One possible way to do it is to use the **`hds-side-nav-hide-when-minimized` class**. This is a special class that can be applied to a DOM element so that it **automatically** fades in/out when the Side Nav changes its "minimization" state.

More specifically:

- `minimized → maximized` transition: the content appears with a fade-in effect, when the width animation is already completed (the width is maximised)
- `maximized → minimized` transition: the content disappears at once with no transition, before the width animation starts

Another option is to use the **`isMinimized` parameter**, which is useful in those cases where the content is so custom/specialized that can't just be faded in/out but needs to have a different kind of transition (eg. remain visible but change layout or respond to the width of the container). This value is passed down by the `<:header/body/footer>` named blocks as parameters, and can be used to build custom logic on the consumers' side.

See the code snippet for the `<:footer>` above for examples of both approaches.

#### Advanced customization

Some aspects of the responsiveness/animation/transition of the Side Nav are parameterized in code via CSS custom properties. It means that _in theory_ they could be customized/overwritten. This though is **something that we don't recommend**.

Navigation is a cardinal element of the UI of an application, and its standardization across the different HashiCorp products is an important end goal. Also, the implementation of this component has required considerable efforts and investments, and we should preserve it as much as possible as a unifying element across products.

If you find yourself in the situation of wanting/needing to customize or change the aspect or the behavior of the Side Nav component, [contact the Design Systems Team](/about/support) for support.

### Accessibility

#### `ember-a11y-refocus`

By default, the component uses the [ember-a11y-refocus](https://github.com/ember-a11y/ember-a11y-refocus) addon to provide a "navigator narrator" and a "Skip Link" to the navigation (see [the addon documentation for details)](https://github.com/ember-a11y/ember-a11y-refocus#what-this-addon-does).

!!! Info

**Notice**

The addon introduces a refocusing behavior **on route changes** that may interfere with the hosting application (eg. unfocusing an active element). For details on how to control this behavior, see the section about [customizing the definition of a route change](https://github.com/ember-a11y/ember-a11y-refocus#customizing-the-definition-of-a-route-change).

!!!

This functionality can be disabled using the `@hasA11yRefocus=\{{false}}` argument, if that is necessary.

#### `aria` attributes

The Side Nav component already provides some of the required `aria` attributes. But other attributes are needed when declaring its content. Please refer to the [Accessibility](/components/side-nav?tab=accessibility) section for more details.

#### Animations

Animations and transition on the component will not take place if the user has `prefers-reduced-motion` enabled in their browser or operating system.

---

## Layout-only component

The `Hds::SideNav::Base` component can be used in cases where it's necessary to build a navigation that doesn't need the full set of features provided by the `Hds::SideNav` one, or to implement a custom navigation with its own logic (something we discourage, but may be necessary for certain contexts).

### Content

The component exposes a set of "slots" (named blocks) where the content can be provided to the sidebar navigation and inserted in specific "containers".

Here is an example of how the component could be used:

```handlebars
<div class="doc-sidenav-demo">
  <Hds::SideNav::Base>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Hds::SideNav::Header::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp home menu" @href="#" />
        </:logo>
      </Hds::SideNav::Header>
    </:header>
    <:body>
      <Hds::SideNav::List as |S|>
        <S.Title>Companies</S.Title>
        <S.Link @text="Apple" @icon="apple" @href="#" />
        <S.Link @text="Google" @icon="google" @href="#" />
        <S.Link @text="Microsoft" @icon="microsoft" @href="#" />
        <S.Title>Software</S.Title>
        <S.Link @text="GitHub" @icon="github" @href="#" />
        <S.Link @text="Loom" @icon="loom" @href="#" />
        <S.Link @text="Slack" @icon="slack" @href="#" />
        <S.Title>Socials</S.Title>
        <S.Link @text="Facebook" @icon="facebook" @href="#" />
        <S.Link @text="LinkedIn" @icon="linkedin" @href="#" />
        <S.Link @text="Twitch" @icon="twitch" @href="#" @badge="New" />
        <S.Link @text="YouTube" @icon="youtube" @href="#" />
      </Hds::SideNav::List>
    </:body>
  </Hds::SideNav::Base>
</div>
```

In this example we're using the `<Hds::SideNav::Header>` and `<Hds::SideNav::Header::HomeLink>` but _in theory_ you could use your own content for the `<:header>` block (same for the `<:footer>`).

A special "slot" called `<:root>` is also available: it can be used to add content that needs to live within the Side Nav, but can't be added to the "header/body/footer" containers.

For details about these slots see the ["Component API"](/components/side-nav?tab=code#component-api) section.

In theory one could also use portals to inject the content, but this somehow defeats the purpose of the `Hds::SideNav::Base` component: its simplicity of use. So if you find yourself in need to use portals, consider adopting the full-featured variant of the Side Nav component instead.


### Responsiveness

This base component is **not** responsive: this means its width is fixed, at any viewport size.

It's possible though to tweak that fixed width by overwriting the CSS custom property `--hds-app-sidenav-width-fixed`:

```handlebars
{{! in your CSS:
  .doc-sidenav-demo--custom-width {
    --hds-app-sidenav-width-fixed: 200px;
  }
}}

<div class="doc-sidenav-demo--custom-width">
  <Hds::SideNav::Base>
    <:header>
      <Hds::SideNav::Header>
        <:logo>
          <Hds::SideNav::Header::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp home menu" @href="#" />
        </:logo>
      </Hds::SideNav::Header>
    </:header>
    <:body>
      <Hds::SideNav::List as |S|>
        <S.Title>Category</S.Title>
        <S.Link @text="Link #1" @icon="circle" @href="#" />
        <S.Link @text="Link #2" @icon="triangle" @href="#" />
        <S.Link @text="Link #3" @icon="square" @href="#" />
        <S.Link @text="Link #4" @icon="hexagon" @href="#" />
      </Hds::SideNav::List>
    </:body>
  </Hds::SideNav::Base>
</div>
```

### Accessibility

Since this component is layout-only, there are no built-in accessibility features: you have to take care of making sure your custom Side Nav implementation is conformant to the WCAG requirements.

