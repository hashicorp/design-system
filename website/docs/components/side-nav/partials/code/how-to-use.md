## How to use this component

SideNav does not exist as a single out of the box HDS component. It instead consists of a number of lower-level building block components consumers can use to assemble into their own SideNav implementation. These SideNav building block components are used together with the Cloud-ui SideNav component.

**Note:** The `Hds::SideNav::Wrapper` component which contains the child components, is 100% width by default. Its max-width is constrained by a parent element in the Cloud-ui SideNav.

### Basic example using typical SideNav components

<div class="doc-side-nav-width">
  ```handlebars
      <Hds::SideNav::Wrapper>
        <:header>
          <Hds::SideNav::Header>
            <:logo>
              <Hds::SideNav::HomeLink @icon="hashicorp" @text="HashiCorp" @href="#" />
            </:logo>
            <:actions>
              <Hds::Dropdown class="hds-side-nav__dropdown" @listPosition="left" as |dd|>
                <dd.ToggleIcon @icon="help" @text="settings menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="email@domain.com" />
                <dd.Separator />
                <dd.Interactive @href="#" @text="Settings and Preferences" />
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
          OrgSelect / ContextSwitcher goes here
        </:footer>
      </Hds::SideNav::Wrapper>
  ```
</div>

### SideNav::Wrapper

The main wrapper for all the SideNav child components. Used to lay out the “Header”, “Body”, and “Footer” sections. Named blocks are used to pass content to the appropriate section.

<div class="doc-side-nav-width">
  ```handlebars
  <Hds::SideNav::Wrapper>
    <:header>
      “Header” content
    </:header>

    <:body>
      “Body” content
    </:body>

    <:footer>
      “Footer” content
    </:footer>
  </Hds::SideNav::Wrapper>
  ```
</div>

<!-- 
{invocation details}

```handlebars
ADD DEMO HERE
``` -->