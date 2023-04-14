## How to use this component

SideNav does not exist as a single out of the box HDS component. Instead, it consists of a number of lower-level building block components consumers can use to assemble their own SideNav implementation.

**Note:** The `Hds::SideNav` component, which contains the child components, doesn't have an intrinsic width (it's 100% of the parent). This responsibility is delegated to the wrapping element in the consumer's codebase.

### Basic example using typical SideNav components

```handlebars
  <div class="doc-sidenav-demo">
    <Hds::SideNav>
      <:header>
        <Hds::SideNav::Header>
          <:logo>
            <Hds::SideNav::Header::HomeLink @icon="hashicorp" @ariaLabel="HashiCorp" @href="#" />
          </:logo>

          <:actions>
            <Hds::Dropdown class="hds-side-nav__dropdown" @listPosition="left" as |dd|>
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
            <Hds::Dropdown class="hds-side-nav__dropdown" @listPosition="left" as |dd|>
              <dd.ToggleIcon @icon="user" @text="user menu" />
              <dd.Title @text="Signed In" />
              <dd.Description @text="email@domain.com" />
              <dd.Interactive @href="#" @text="Account Settings" />
            </Hds::Dropdown>
          </:actions>
        </Hds::SideNav::Header>
      </:header>

      <:body>
        <Hds::SideNav::List as |S|>
          <S.Link @icon="dashboard" @text="Dashboard" @isActive={{true}} />

          <S.Title>Services</S.Title>
          <S.Link @text="Boundary" @icon="boundary" @href="#" />
          <S.Link @text="Consul" @icon="consul" @href="#" />
          <S.Link @text="Packer" @icon="packer" @href="#" />
          <S.Link @text="Vault" @icon="vault" @href="#" />
          <S.Link @text="Vault Secrets" @icon="lock" @href="#" />
          <S.Link @text="Terraform" @icon="terraform" @href="#" />
          <S.Link @text="Vagrant" @icon="vagrant" @badge="Alpha" @href="#" />
          <S.Link @text="Waypoint" @icon="waypoint" @badge="Alpha" @hasSubItems={{true}} />

          <S.Title>Default Org</S.Title>
          <S.Link @text="HashiCorp Virtual Networks" @icon="network" @href="#" />
          <S.Link @text="Access control (IAM)" @icon="users" @href="#" @hasSubItems={{true}} />
          <S.Link @text="Billing" @icon="credit-card" @href="#" @hasSubItems={{true}} />
          <S.Link @text="Settings" @icon="settings" @href="#" @hasSubItems={{true}} />
        </Hds::SideNav::List>
      </:body>

      <:footer>
        <Doc::Placeholder @height="30px" @text="footer content (eg: OrgSelect/ContextSwitcher)" @background="#e4e4e4" />
      </:footer>
    </Hds::SideNav>
  </div>
```