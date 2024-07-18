## How to use this component

The `AppHeader` provides persistent global navigation controls and utility links such as to help and user menus. It is meant to be paired with the `SideNav` which provides local or page-level navigation.

!!! Insight

The `AppHeader` is intended to be used in combination with the [`Hds::AppFrame`](/layouts/app-frame) component within the `Frame.Header` contextual component.

!!!

### Layout

The AppHeader exposes three “slots” (named blocks) where consumers can yield the navigation content and add business logic to control the content.

The `<:logo>` block should contain the `AppHeader::HomeLink` which is provided as a child component.

The other two slots are used for consumer provided controls. The `<:globalActions>` block typically should provide an “OrgSwitcher” or “ProjectSwitcher“ control while the `<:utilityActions>` block should contain utilities such “Help” and “User” menus and optionally “Search”.


```handlebars
<Hds::AppHeader>
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
```

### Content

#### HomeLink

The `Hds::AppHeader::HomeLink` child component should be yielded within the `<:logo>` block. It provides consistent branding and navigates the user to the “home“ or main dashboard page.

It requires a value for the `@icon` and `@ariaLabel` arguments.

It is built on top of the [`Hds::Interactive` component](/utilities/interactive), so it accepts all its routing arguments (eg. `@href`, `@route`, `@query`, `@model(s)`, etc.).

Refer to the [Component API section](/components/app-header?tab=code#appheaderhomelink) for details.

```handlebars
<Hds::AppHeader>
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
```

It also accepts optional arguments; for example, it’s possible to provide a custom color for the icon if needed:

```handlebars
<Hds::AppHeader>
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
```

#### Global actions

Consumers should provide their own “context switcher” (eg. organization or project selector) control yielded within the 
`<:globalActions>`. HDS does not currently provide this component.

```handlebars
<Hds::AppHeader>
  <:logo>
    <Hds::AppHeader::HomeLink 
      @icon="hashicorp" 
      @ariaLabel="HashiCorp home menu"
      @href="/"
    />
  </:logo>
  
  <:globalActions>
    <Hds::Dropdown as |dd|>
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
```

#### Utility actions

Consumers should provide their own utility action controls yielded within the `<:utilityActions>` block. Recommended controls are a user menu and help menu. Other controls such as a search button can optionally be included.

```handlebars
<Hds::AppHeader>
  <:logo>
    <Hds::AppHeader::HomeLink 
      @icon="hashicorp" 
      @ariaLabel="HashiCorp home menu"
      @href="/"
    />
  </:logo>
  
  <:globalActions>
    <Hds::Dropdown as |dd|>
      <dd.ToggleButton @text="Choose an organization" @icon="org" />
      <dd.Checkmark>
        organizationName
      </dd.Checkmark>
    </Hds::Dropdown>
  </:globalActions>

  <:utilityActions>
    <Hds::Dropdown @listPosition="bottom-right" as |dd|>
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

    <Hds::Dropdown @listPosition="bottom-right" as |dd|>
      <dd.ToggleIcon @icon="user" @text="user menu" />
      <dd.Title @text="Signed In" />
      <dd.Description @text="email@domain.com" />
      <dd.Interactive @href="#" @text="Account Settings" />
    </Hds::Dropdown>
  </:utilityActions>
</Hds::AppHeader>
```
