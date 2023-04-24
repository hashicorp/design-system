## Usage

### When to use

- To display a list of actions or links under a single button toggle.
- To allow singular or multiple selection outside of a form, such as within filtering.
- To provide the user with a way to easily switch context within the application. 

### When not to use

- In forms when providing the user with options to choose from, consider [Select](/components/form/select).

## Toggle

### Types

Toggles come in two variant types: **button** and **icon**.

<Doc::Layout @spacing="24px">
  <Hds::Dropdown as |dd|>
    <dd.ToggleButton @text="Primary" />
    <dd.Interactive @text="Item One" />
    <dd.Interactive @text="Item Two" />
    <dd.Interactive @text="Item Three" />
    <dd.Interactive @text="Item Four" />
  </Hds::Dropdown>
  <Hds::Dropdown as |dd|>
    <dd.ToggleIcon @icon="user" @text="user menu" />
    <dd.Interactive @text="Item One" />
    <dd.Interactive @text="Item Two" />
    <dd.Interactive @text="Item Three" />
    <dd.Interactive @text="Item Four" />
  </Hds::Dropdown>
</Doc::Layout>

### Size

ToggleButtons come in two sizes: **small** and **medium**. This allows for placement in ButtonSets with buttons of the same size.

<Doc::Layout @spacing="24px" @direction="vertical">
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
</Doc::Layout>

ToggleIcons come in two sizes: **small** and **medium**. 

While we provide a small size variant, we recommend only using this for the Overflow menu within [Tables](/components/table) because the icons and images start to become unrecognizable in smaller sizes.

  <Hds::ButtonSet>
    <Hds::Dropdown as |dd|>
      <dd.ToggleIcon @icon="user" @size="small" @text="user menu" />
      <dd.Interactive @text="Item One" />
      <dd.Interactive @text="Item Two" />
      <dd.Interactive @text="Item Three" />
      <dd.Interactive @text="Item Four" />
    </Hds::Dropdown>
    <Hds::Dropdown as |dd|>
      <dd.ToggleIcon @icon="user" @text="user menu" />
      <dd.Interactive @text="Item One" />
      <dd.Interactive @text="Item Two" />
      <dd.Interactive @text="Item Three" />
      <dd.Interactive @text="Item Four" />
    </Hds::Dropdown>
  </Hds::ButtonSet>

### Chevron usage

Open Toggles use icon `chevron-up`, while closed Toggles use `chevron-down`.

ToggleButtons require a visible chevron to indicate interactivity and provide distinction between Dropdowns and standard Buttons.

![Example of open and closed dropdowns](/assets/components/dropdown/dropdown-button-chevrons.png =286x*)

We strongly recommend providing visible chevrons on most instances of ToggleIcons to indicate interactivity. That said, it’s common to see ToggleIcons that use the `more-horizontal` icon without chevrons. Their placement, usually in the last column of a [Table](/components/table), is typically indicative of this type of interaction.

![Example of open and closed dropdowns](/assets/components/dropdown/dropdown-icon-chevrons.png =750x*)

## List

### Placement

Lists can be positioned to the left or right of the Toggle, and above or below the Toggle to fit more appropriately within the UI. Lists do not currently have collision detection. 

![Dropdown list placement examples](/assets/components/dropdown/dropdown-placement.png =963x*)

### Size

#### Default width

Lists have a minimum width of 200px and a maximum width of 400px. This means if there’s a long string in a ListItem the List will automatically expand up to 400px to accommodate that content before the content wraps.

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Title @text="Signed in as" />
    <Hds::Dropdown::ListItem::Description @text="name@email.com" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="User settings" />
    <Hds::Dropdown::ListItem::Interactive @text="Admin" />
    <Hds::Dropdown::ListItem::Interactive @text="Sign out" />
  </Doc::ListContainer>
</div>

#### Fixed width

If you do not want the width of the List to expand automatically to accommodate the widest list item, you can indicate a specific width. As a best practice, we have set the maximum width to 400px.

<div class="hds-dropdown__content" style="width: 400px">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Title @text="Consul version v1.10.6" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="Update Consul version" />
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
</div>

#### Height

The height of the ListContainer is automatically determined based on the contents, but the height can also be set manually. We recommend setting the height manually if you know the list will be long.  

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Title @text="Integrate with Terraform Cloud" />
    <Hds::Dropdown::ListItem::Description @text="Create a new run task in Terraform using the URL and key below." />
    <Hds::Dropdown::ListItem::CopyItem @copyItemTitle="Endpoint URL" @text="https://api.cloud.hashicorp.com/" />
    <Hds::Dropdown::ListItem::CopyItem @copyItemTitle="HMAC Key" @text="91ee1e8ef65b337f0e70d793f456c71d" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Title @text="Manage" />
    <Hds::Dropdown::ListItem::Interactive @text="Regenerate HMAC key" @color="action" @icon="reload" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="Integrating with Terraform Cloud" @color="action" @icon="external-link" />
    <Hds::Dropdown::ListItem::Interactive @text="About Terraform Cloud" @color="action" @icon="external-link" />
    <Hds::Dropdown::ListItem::Interactive @text="About Packer" @color="action" @icon="external-link" />
  </Doc::ListContainer>
</div>

## ListItem

### Types

![Dropdown ListItem types](/assets/components/dropdown/dropdown-listitem-types.png =449x*)

!!! Info

**A note on Loading**

Users may not understand why something is taking additional time to load. If possible, determine what should be displayed prior to the user opening the dropdown (e.g., on page load). If that is not possible, provide an informative loading message.
!!!

### Icon usage

Icons in ListItems are optional, and we recommend letting the text speak for itself unless an icon provides additional value.

We don’t recommend mixing and matching icon use; that’s to say, if using an icon in one ListItem, use an icon in all ListItems. Doing so keeps the text aligned so the eye can scan the list of options more easily.

!!! Do

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Title @text="About" />
    <Hds::Dropdown::ListItem::Interactive @text="About Consul" @color="action" @icon="play-circle" />
    <Hds::Dropdown::ListItem::Interactive @text="Why Consul on HCP" @color="action" @icon="link" />
    <Hds::Dropdown::ListItem::Interactive @text="Success story" @color="action" @icon="play-circle" />
  </Doc::ListContainer>
</div>
!!!

!!! Dont

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Title @text="About" />
    <Hds::Dropdown::ListItem::Interactive @text="About Consul" @color="action" @icon="play-circle" />
    <Hds::Dropdown::ListItem::Interactive @text="Why Consul on HCP" @color="action" @icon="link" />
    <Hds::Dropdown::ListItem::Interactive @text="Success story" @color="action" />
  </Doc::ListContainer>
</div>
!!!

### Critical ListItems

#### Icons in Critical ListItems

While icons are optional, we recommend using a relevant icon for Critical ListItems. Using the correct icon provides a stronger and more immediate visual indication that the action is destructive. Read more about [how color blind users see critical actions](/components/dropdown?tab=accessibility) in our UIs.

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Interactive @text="Rename" @color="action" />
    <Hds::Dropdown::ListItem::Interactive @text="Restore" @color="action" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="Delete" @color="critical" @icon="trash" />
  </Doc::ListContainer>
</div>

#### Critical action patterns
We recommend adding a second confirmation layer after the user clicks “Delete” (e.g., showing a confirmation Modal that requires the user to type “Delete” into a field before proceeding). This safeguards against accidental clicks by requiring users to confirm the destructive action.

!!! Do

![example of how to use a second confirmation layer](/assets/components/dropdown/dropdown-example-do.png =780x*)

!!!

!!! Dont

![example of how not to use a second confirmation layer](/assets/components/dropdown/dropdown-example-dont.png =507x*)

!!!


## Content

There is no character limit for ListItems, but we recommend keeping them short and concise (~36 characters).

Take care to use dropdowns correctly. A crowded or overly complex dropdown can lead to a frustrating user experience, especially for assistive technology users. Contact the [Design Systems Team](/about/support) to discuss alternative options if a dropdown feels too complex.
