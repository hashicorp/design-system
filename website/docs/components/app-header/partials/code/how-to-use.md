<!-- !!! Warning

**Release plan**

The `AppHeader` is being rolled out in a phased approach. In the phase one release, we will assist consumers in adoption spikes to optimize it to their needs. This unique approach is due to how the `AppHeader` tightly integrates into the release plan for the “Enterprise navigation” which includes the `SideNav` and `AppFrame` components.

At this time, we do not recommend adoption on your own. Please [contact the Design Systems Team](/about/support) for assistance.

!!! -->

## How to use this component

The `AppHeader` provides persistent global navigation controls and utility links such as help and user menus. It is meant to be paired with the `SideNav` which should be used to provide local or page-level navigation. Both these components are intended to be used within the [`Hds::AppFrame`](/layouts/app-frame) component. The `AppHeader` specifically should be used within the `App Frame’s `Frame.Header` contextual component.

### Layout

The `AppHeader` exposes three “slots” (named blocks) where consumers can yield the navigation content and also add business logic to control the content.

The `<:logo>` block should contain the `AppHeader::HomeLink` which is provided as a child component.

The other two slots are intended for consumer-provided controls. The `<:globalActions>` block should typically contain a “context switcher” (sometimes called an “org switcher” or “project switcher”). The `<:utilityActions>` block is used to provide utilities including “Help” and “User” menus and, optionally, “Search”.

<!-- ```handlebars
{{!--
for demo purposes, we set `@hasA11yRefocus` to `false` but in your app it will
probably need to be set to `true` (or omitted to rely on defaults)
--}}
<Hds::AppHeader @hasA11yRefocus={{false}}>
  <:logo>
    <Doc::Placeholder @height="2em" @width="auto" @text="HomeLink" @background="#e4e4e4" />
  </:logo>

  <:globalActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="OrgSwitcher" @background="#e4e4e4" />
  </:globalActions>

  <:utilityActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="HelpMenu" @background="#e4e4e4" />
    <Doc::Placeholder @height="2em" @width="auto" @text="UserMenu" @background="#e4e4e4" />
  </:utilityActions>
</Hds::AppHeader>
``` -->

### Content

!!! Info

When adding Dropdown components within the App Header, be sure to set `enableCollisionDetection` to `true` for each Dropdown.

!!!

#### HomeLink

The `Hds::AppHeader::HomeLink` child component should be yielded within the `<:logo>` block. It provides consistent branding and navigates the user to the “home” or main dashboard page.

It requires a value for the `@icon` and `@ariaLabel` arguments.

It is built on top of the [`Hds::Interactive` component](/utilities/interactive), so it accepts all its routing arguments (eg. `@href`, `@route`, `@query`, `@model(s)`, etc.).

Refer to the [Component API section](/components/app-header?tab=code#appheaderhomelink) for details.

<!-- ```handlebars
{{!--
for demo purposes, we set `@hasA11yRefocus` to `false` but in your app it will
probably need to be set to `true` (or omitted to rely on defaults)
--}}
<Hds::AppHeader @hasA11yRefocus={{false}}>
  <:logo>
    <Hds::AppHeader::HomeLink 
      @icon="hashicorp" 
      @ariaLabel="HashiCorp home menu"
      @href="/"
    />
  </:logo>
  
  <:globalActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="OrgSwitcher" @background="#e4e4e4" />
  </:globalActions>
  
  <:utilityActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="HelpMenu" @background="#e4e4e4" />
    <Doc::Placeholder @height="2em" @width="auto" @text="UserMenu" @background="#e4e4e4" />
  </:utilityActions>
</Hds::AppHeader>
``` -->

The `HomeLink` also accepts optional arguments; for example, it’s possible to provide a custom color for the icon if needed:

<!-- ```handlebars
{{!--
for demo purposes, we set `@hasA11yRefocus` to `false` but in your app it will
probably need to be set to `true` (or omitted to rely on defaults)
--}}
<Hds::AppHeader @hasA11yRefocus={{false}}>
  <:logo>
    <Hds::AppHeader::HomeLink 
      @icon="terraform" 
      @ariaLabel="Terraform home menu"
      @color="var(--token-color-terraform-brand)"
      @href="/"
    />
  </:logo>
  
  <:globalActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="OrgSwitcher" @background="#e4e4e4" />
  </:globalActions>

  <:utilityActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="HelpMenu" @background="#e4e4e4" />
    <Doc::Placeholder @height="2em" @width="auto" @text="UserMenu" @background="#e4e4e4" />
  </:utilityActions>
</Hds::AppHeader>
``` -->

#### Global actions

Consumers should provide their own “context switcher” (e.g., “org switcher” or “project switcher”) control yielded within the `<:globalActions>` block. HDS does not currently provide this component.

<!-- ```handlebars
{{!--
for demo purposes, we set `@hasA11yRefocus` to `false` but in your app it will
probably need to be set to `true` (or omitted to rely on defaults)
--}}
<Hds::AppHeader @hasA11yRefocus={{false}}>
  <:logo>
    <Hds::AppHeader::HomeLink 
      @icon="hashicorp" 
      @ariaLabel="HashiCorp home menu"
      @href="/"
    />
  </:logo>
  
  <:globalActions>
    <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
      <dd.ToggleButton @text="Choose an organization" @icon="org" />
      <dd.Checkmark>
        organizationName
      </dd.Checkmark>
    </Hds::Dropdown>
  </:globalActions>

  <:utilityActions>
    <Doc::Placeholder @height="2em" @width="auto" @text="HelpMenu" @background="#e4e4e4" />
    <Doc::Placeholder @height="2em" @width="auto" @text="UserMenu" @background="#e4e4e4" />
  </:utilityActions>
</Hds::AppHeader>
``` -->

#### Utility actions

Consumers should provide their own utility action controls yielded within the `<:utilityActions>` block. Recommended controls are a user menu and help menu. Other controls such as a search button can optionally be included.

<!-- ```handlebars
{{!--
for demo purposes, we set `@hasA11yRefocus` to `false` but in your app it will
probably need to be set to `true` (or omitted to rely on defaults)
--}}
<Hds::AppHeader @hasA11yRefocus={{false}}>
  <:logo>
    <Hds::AppHeader::HomeLink 
      @icon="hashicorp" 
      @ariaLabel="HashiCorp home menu"
      @href="/"
    />
  </:logo>
  
  <:globalActions>
    <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
      <dd.ToggleButton @text="Choose an organization" @icon="org" />
      <dd.Checkmark>
        organizationName
      </dd.Checkmark>
    </Hds::Dropdown>
  </:globalActions>

  <:utilityActions>
    <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
      <dd.ToggleIcon @icon="help" @text="help menu" />
      <dd.Title @text="Help & Support" />
      <dd.Interactive @href="#">Documentation</dd.Interactive>
      <dd.Interactive @href="#">Tutorials</dd.Interactive>
      <dd.Interactive @href="#">Terraform Provider</dd.Interactive>
      <dd.Interactive @href="#">Changelog</dd.Interactive>
      <dd.Separator />
      <dd.Interactive @href="#">Create support ticket</dd.Interactive>
      <dd.Interactive @href="#">Give feedback</dd.Interactive>
    </Hds::Dropdown>

    <Hds::Dropdown @enableCollisionDetection={{true}} as |dd|>
      <dd.ToggleIcon @icon="user" @text="user menu" />
      <dd.Title @text="Signed In" />
      <dd.Description @text="email@domain.com" />
      <dd.Interactive @href="#">Account settings</dd.Interactive>
    </Hds::Dropdown>
  </:utilityActions>
</Hds::AppHeader>
``` -->
