!!! Warning

**Release plan**

The `AppHeader` is being rolled out in a phased approach. In the phase one release, we will assist consumers in adoption spikes to optimize it to their needs. This unique approach is due to how the `AppHeader` tightly integrates into the release plan for the “Enterprise navigation” which includes the `AppSideNav` and `AppFrame` components.

At this time, we do not recommend adoption on your own. Please [contact the Design Systems Team](/about/support) for assistance.

!!!

## How to use this component

The `AppHeader` provides persistent global navigation controls and utility links such as help and user menus. It is meant to be paired with the `AppSideNav` which should be used to provide local or page-level navigation. Both these components are intended to be used within the [`Hds::AppFrame`](/layouts/app-frame) component. The `AppHeader` specifically should be used within the `App Frame’s` Frame.Header contextual component.

### Layout

The `AppHeader` exposes three “slots” (named blocks) where consumers can yield the navigation content and also add business logic to control the content.

The `<:logo>` block should contain the `AppHeader::HomeLink` which is provided as a child component.

The other two slots are intended for consumer-provided controls. The `<:globalActions>` block should typically contain a “context switcher” (sometimes called an “org switcher” or “project switcher”). The `<:utilityActions>` block is used to provide utilities including “Help” and “User” menus and, optionally, “Search”.

[[code-snippets/app-header-layout]]

### Content

!!! Warning

When adding Dropdown components within the App Header, be sure to set `enableCollisionDetection` to `true` for each Dropdown.

When a Dropdown item triggers navigation (either a route or URL change), the Dropdown must close. Consumers are responsible for invoking the [Dropdown `close` function](/components/dropdown?tab=code#component-api) in these cases.

!!!

#### HomeLink

The `Hds::AppHeader::HomeLink` child component should be yielded within the `<:logo>` block. It provides consistent branding and navigates the user to the “home” or main dashboard page.

It requires a value for the `@icon` and `@text` arguments.

It is built on top of the [`Hds::Interactive` component](/utilities/interactive), so it accepts all its routing arguments (eg. `@href`, `@route`, `@query`, `@model(s)`, etc.).

Refer to the [Component API section](/components/app-header?tab=code#appheaderhomelink) for details.

[[code-snippets/app-header-home-link]]

When `@isIconOnly` is set to `false`, the `@text` argument displays text inline with the logo and can be used to more deliberately title an application or provide other differentiating text.

[[code-snippets/app-header-icon-home-link]]

The `HomeLink` also accepts optional arguments; for example, it’s possible to provide a custom color for the icon if needed:

[[code-snippets/app-header-home-link-args]]

#### Global actions

Consumers should provide their own “context switcher” (e.g., “org switcher” or “project switcher”) control yielded within the `<:globalActions>` block. HDS does not currently provide this component.

[[code-snippets/app-header-global-actions]]

#### Utility actions

Consumers should provide their own utility action controls yielded within the `<:utilityActions>` block. Recommended controls are a user menu and help menu. Other controls such as a search button can optionally be included.

[[code-snippets/app-header-utility-actions]]
