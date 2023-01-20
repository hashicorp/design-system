## When to use

- To display a list of actions under a single button toggle.

## When not to use

- In forms. When providing more than 5–7 options in a form, use a [Select](/components/form/select) instead.
- When selecting an option results in immediate navigation or update to the page content, use a Context Switcher _(coming soon)_.

## ToggleButton Size

ToggleButtons come in two sizes: **small** and **medium**. This allows for placement in ButtonSets with buttons of the same size.

### Small

<Hds::ButtonSet>
  <Hds::Dropdown as |dd|>
    <dd.ToggleButton @text="Primary" @size="small"/>
    <dd.Interactive @text="Item One" />
    <dd.Interactive @text="Item Two" />
    <dd.Interactive @text="Item Three" />
    <dd.Interactive @text="Item Four" />
  </Hds::Dropdown>
  <Hds::Dropdown as |dd|>
    <dd.ToggleButton @text="Secondary" @color="secondary" @size="small" />
    <dd.Interactive @text="Item One" />
    <dd.Interactive @text="Item Two" />
    <dd.Interactive @text="Item Three" />
    <dd.Interactive @text="Item Four" />
  </Hds::Dropdown>
</Hds::ButtonSet>

### Medium

<Hds::ButtonSet>
  <Hds::Dropdown as |dd|>
    <dd.ToggleButton @text="Primary" />
    <dd.Interactive @text="Item One" />
    <dd.Interactive @text="Item Two" />
    <dd.Interactive @text="Item Three" />
    <dd.Interactive @text="Item Four" />
  </Hds::Dropdown>
  <Hds::Dropdown as |dd|>
    <dd.ToggleButton @text="Secondary" @color="secondary" />
    <dd.Interactive @text="Item One" />
    <dd.Interactive @text="Item Two" />
    <dd.Interactive @text="Item Three" />
    <dd.Interactive @text="Item Four" />
  </Hds::Dropdown>
</Hds::ButtonSet>

## Chevron

Open toggles use a chevron pointing up, while closed toggles use a chevron pointing down.

!!! Info

**Figma Tip**

Set `isOpen=true` when displaying the toggle with a menu and `isOpen=false` when displaying the toggle.

!!!

### Open

<Hds::Dropdown as |dd|>
  <dd.ToggleButton @text="Manage" @color="secondary" @isOpen={{true}} />
  <dd.Interactive @text="Rename" />
  <dd.Interactive @text="Edit" />
  <dd.Interactive @text="Restore" />
</Hds::Dropdown>

### Closed

<Hds::Dropdown as |dd|>
  <dd.ToggleButton @text="Manage" @color="secondary" />
  <dd.Interactive @text="Rename" />
  <dd.Interactive @text="Edit" />
  <dd.Interactive @text="Restore" />
</Hds::Dropdown>

### ToggleIcon

Chevrons indicate that ToggleIcon opens the list, so they’re required for all variations. The only (temporary) exception is the overflow menu, which uses the “more-horizontal” icon.

<Hds::Dropdown::Toggle::Icon @text="Icon" @icon="user" />
<Hds::Dropdown::Toggle::Icon @text="Avatar" @imageSrc="/assets/images/avatar.png" />

## List

### Placement

#### Right (default)

![Right placement example](/assets/components/dropdown/dropdown-placement-right_example.png)

#### Left

![Left placement example](/assets/components/dropdown/dropdown-placement-left_example.png)

## List Size

### Default width

The default List has a min-width of 200px and a max-width of 400px.

This means if there’s a list item with a lot of text (i.e., Description), the list will automatically expand up to 400px to accommodate the content of the widest list item.

<Hds::Dropdown::Toggle::Icon @text="Manage" @isOpen={{true}} @imageSrc="/assets/images/avatar.png" style="margin-bottom: 4px;" />
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @text="Account settings" />
  <Hds::Dropdown::ListItem::Interactive @text="Sign out" />
</Doc::ListContainer>

### Fixed width

If you do not want the width of the List to expand automatically to accommodate the widest list item, you can indicate a specific width.

As a best practice, we do not recommend lists wider than 400px.

<Hds::Dropdown::Toggle::Button @text="Manage" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;" />
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Title @text="Consul version v1.10.6" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Interactive @text="Update Consul version" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Interactive @text="Edit cluster" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Title @text="Import to Terraform" />
  <Hds::Dropdown::ListItem::Description @text="Copy and run this command in Terraform to import and manage this resource via our Terraform Provider" />
  <Hds::Dropdown::ListItem::Generic>
    <Hds::Link::Standalone @color="primary" @text="Docs: Import usage" @icon="docs-link" @iconPosition="leading" @href="#" />
  </Hds::Dropdown::ListItem::Generic>
  <Hds::Dropdown::ListItem::CopyItem @text="terraform import hcp_connect" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Interactive @text="Delete cluster" @color="critical" @icon="trash" />
</Doc::ListContainer>

### Height

The height of the list container is automatically determined based on the contents within the list.

<Hds::Dropdown::Toggle::Button @text="Integrate with Terraform Cloud" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;" />
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Title @text="Integrate with Terraform Cloud" />
  <Hds::Dropdown::ListItem::Description @text="Create a new run task in Terraform using the URL and key below." />
  <Hds::Dropdown::ListItem::CopyItem @copyItemTitle="Endpoint URL" @text="https://api.cloud.hashicorp.com/" />
  <Hds::Dropdown::ListItem::CopyItem @copyItemTitle="HMAC Key" @text="91ee1e8ef65b337f0e70d793f456c71d" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Title @text="Manage" />
  <Hds::Dropdown::ListItem::Interactive @text="Regenrate HMAC key" @color="action" @icon="reload" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Interactive @text="Integrating with Terraform Cloud" @color="action" @icon="external-link" />
  <Hds::Dropdown::ListItem::Interactive @text="About Terraform Cloud" @color="action" @icon="external-link" />
  <Hds::Dropdown::ListItem::Interactive @text="About Packer" @color="action" @icon="external-link" />
</Doc::ListContainer>

## ListItem Types

![Dropdown ListItem types](/assets/components/dropdown/dropdown-list_item-types.png)

!!! Info

**A note on loading**

Users may not understand why something is taking additional time to load. If possible, determine what should be displayed prior to the user opening the dropdown (e.g., on page load). If that is not possible, consider providing a more informative loading message.

!!!

## Icons

Icons in ListItems are optional.

We recommend letting the text speak for itself unless an icon provides additional value.

Ask yourself, “Which icon should I use here?” If the answer isn’t obvious within 5 seconds, consider whether the icon is really providing additional value.

<Hds::Dropdown::Toggle::Button @text="More" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;" />
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Title @text="About" />
  <Hds::Dropdown::ListItem::Interactive @text="About Consul" @color="action" @icon="play-circle" />
  <Hds::Dropdown::ListItem::Interactive @text="Why Consul on HCP" @color="action" @icon="link" />
  <Hds::Dropdown::ListItem::Interactive @text="Success story" @color="action" @icon="play-circle" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Title @text="Automate with Terraform" />
  <Hds::Dropdown::ListItem::Interactive @text="Quick start a development cluster" @color="action" />
</Doc::ListContainer>

### Critical

While icons are optional, we recommend using a relevant icon for Critical ListItems. Using the right icon provides a stronger/more immediate visual indication that the action is destructive. See the section on [color blind users and critical actions](https://www.figma.com/file/8I4u10OyhYZIea4MpXwJwm/Design-guidelines-migration?node-id=7192%3A13227) (internal link) for more details about making these actions more accessible.

<Hds::Dropdown::Toggle::Icon @text="Icon" @icon="more-horizontal" @isOpen={{true}} />
<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @text="Rename" @color="action" />
  <Hds::Dropdown::ListItem::Interactive @text="Restore" @color="action" />
  <Hds::Dropdown::ListItem::Separator />
  <Hds::Dropdown::ListItem::Interactive @text="Delete" @color="critical" @icon="trash" />
</Doc::ListContainer>

## Content

### General

We recommend using dropdowns only to display a list of links or actions. A dropdown should **not** be a catch-all used to squeeze a lot of content into a small, contained area. A crowded dropdown is difficult for the user to parse and can result in a poor user experience.

If you find that you need additional custom content in the dropdown, please [reach out to the HDS team](https://hashicorp.slack.com/archives/C7KTUHNUS) (internal link) to discuss alternative options.

### ListItems

There is no character limit for interactive ListItems, but we recommend keeping them short and concise (~36 characters).
