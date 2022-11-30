## When to use

- To display a list of actions under a single button toggle.

## When not to use

- In forms, when needing to select one or more options, use a [Select](/components/form/select/overview)
- When selecting an option results in immediate navigation or update to the page contentx, use a Context Switcher _(coming soon)_

---

_Dropdown_

## Anatomy

![Dropdown anatomy](/assets/components/dropdown/dropdown-anatomy.png)

#### Toggle

Required

#### List

Required, but only visible when open

---

_Toggle_

## Anatomy

### Button

![Toggle button anatomy](/assets/components/dropdown/dropdown-toggle-button-anatomy.png)

### Icon

![Toggle icon anatomy](/assets/components/dropdown/dropdown-toggle-button-anatomy.png)

![Toggle avatar anatomy](/assets/components/dropdown/dropdown-toggle-avatar-anatomy.png)

![Toggle icon only anatomy](/assets/components/dropdown/dropdown-toggle-icon_only-anatomy.png)

---

## States

### Button

![Example of dropdown button states](/assets/components/dropdown/dropdown-state-button.png)

### Icon

![Example of dropdown icon states](/assets/components/dropdown/dropdown-state-icon.png)

_Banner (highlight):_ **A note on disabled states**: Because disabled states completely remove the interactive function of an element, it can be challenging for a user to understand why it has been disabled and/or why they cannot interact with that element. In an effort to avoid this confusion, we opt for using methods like enabling or hiding the element and, thus, are not offering a disabled state for the Dropdown Toggle. [Read more about when to enable vs hide](https://docs.google.com/document/d/1fqsXjjPnz5HK2NcY1buh5RcI5S6XCgQwfr8GP3kClv0/edit#heading=h.52ub6bvbvcb7)

---

## Size

ToggleButtons come in a Medium and Small size to allow for placement in ButtonSets with buttons of the same size.

Medium

<section>
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
</section>

Small

<section>
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
</section>

---

## Chevron

Open toggles use a chevron pointing up, while closed toggles use a chevron pointing down.

_Banner (highlight):_ Set `isOpen=true` when displaying the toggle with a menu and `isOpen=false` when displaying the toggle.

### Open

<section>
  <Hds::Dropdown::Toggle::Button @text="Manage" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;"/>
  <ul class="hds-dropdown-list">
    <Hds::Dropdown::ListItem::Interactive @text="Rename" />
    <Hds::Dropdown::ListItem::Interactive @text="Edit" />
    <Hds::Dropdown::ListItem::Interactive @text="Restore" />
  </ul>
</section>

### Closed

<section>
  <Hds::Dropdown as |dd|>
    <dd.ToggleButton @text="Manage" @color="secondary" />
    <dd.Interactive @text="Rename" />
    <dd.Interactive @text="Edit" />
    <dd.Interactive @text="Restore" />
  </Hds::Dropdown>
</section>

### ToggleIcon

Chevrons provide a stronger signifier that ToggleIcon's open the list, so they're required for all variations except thos used for the more icon.

<section>
  <Hds::Dropdown::Toggle::Icon @text="Icon" @icon="user" />
  <Hds::Dropdown::Toggle::Icon @text="Avatar" @imageSrc="/assets/images/avatar.png" />
</section>

---

_List_

## Placement

### Right (default)

The list will align to the right side of the toggle and will be placed 4px below the toggle.

![Right placement example](/assets/components/dropdown/dropdown-placement-right_example.png)

### Left

In the event that the toggle is positioned on the left side of the screen, the list can be aligned to the left side to fit more appropriately within the UI.

![Left placement example](/assets/components/dropdown/dropdown-placement-left_example.png)

---

## Size

### Default ("fluid") width

The default List has a min-width of 200px and a max-width of 400px.

This means if there's a list item with a lot of text (ie. Description), the list will automatically expand up to 400px to accommodate the contentx of the widest list item.

<section>
  <Hds::Dropdown::Toggle::Icon @text="Manage" @isOpen={{true}} @imageSrc="/assets/images/avatar.png" style="margin-bottom: 4px;" />
  <ul class="hds-dropdown-list">
    <Hds::Dropdown::ListItem::Interactive @text="Account settings" />
    <Hds::Dropdown::ListItem::Interactive @text="Sign out" />
  </ul>
</section>

### Fixed width

If you do not want the width of the List to expand automatically to accommodate the widest list item, we offer a Fixed width list.

As a best practice we do not recommend lists wider than 400px.

<section>
  <Hds::Dropdown::Toggle::Button @text="Manage" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;" />
  <ul class="hds-dropdown-list" style="width: 250px">
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
  </ul>
</section>

### Height

The height of the list container is based on the contents within the list. The list will no scroll.

<section>
  <Hds::Dropdown::Toggle::Button @text="Integrate with Terraform Cloud" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;" />
  <ul class="hds-dropdown-list">
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
  </ul>
</section>

---

_ListItem_

## Anatomy

![ListItem Anatomy](/assets/components/dropdown/dropdown-list_item-anatomy.png)

#### Text

Required

#### Icon

Required for Critical ListItems. Optional otherwise.

#### Indicator

Visible in hover and active state

#### Focus ring

Visible in focus state

---

## Type

![Dropdown ListItem types](/assets/components/dropdown/dropdown-list_item-types.png)

_Banner (highlight):_ **A note on loading** Users may not understand why something is taking additional time to load. If possible, determine what should be displayed prior to the user opening the dropdown (ie. on page load). If that is not possible, you could consider providing a more informative loading message, such as “Checking permissions”.

---

## States

<!-- Can't get the mock states to work here for some reason -->

<section>
  <ul class="hds-dropdown-list">
    <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Hover" mock-state-value="hover" />
    <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Default" mock-state-value="default" />
    <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Active" mock-state-value="active" />
    <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Focus" mock-state-value="focus" />
  </ul>
</section>

<section>
  <ul class="hds-dropdown-list">
    <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Default" mock-state-value="default" />
    <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Hover" mock-state-value="hover" />
    <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Active" mock-state-value="active" />
    <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Focus" mock-state-value="focus" />
  </ul>
</section>

_Banner (highlight):_ **A note on disabled states** Because disabled states completely remove the interactive functionality of an element, it can be challenging for a user to understand why it has been disabled and/or why they cannot interact with that element. In an effort to avoid this confusion, we opt for using methods like enabling or hiding the element and, thus, are not offering a disabled state for the ListItems. [Read more about when to enable vs hide.](https://docs.google.com/document/d/1fqsXjjPnz5HK2NcY1buh5RcI5S6XCgQwfr8GP3kClv0/edit#heading=h.52ub6bvbvcb7)

---

## Icons

Icons in ListItems are **optional.**

We recommend letting the text speak for itself unless an icon provides additional value.

Ask yourself... "Which icon should I use here?" If the answer isn't obvious within 5 seconds, consider whether the icons is really providing additional value.

<section>
    <Hds::Dropdown::Toggle::Button @text="More" @color="secondary" @isOpen={{true}} style="margin-bottom: 4px;" />
    <ul class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Title @text="About" />
      <Hds::Dropdown::ListItem::Interactive @text="About Consul" @color="action" @icon="play-circle" />
      <Hds::Dropdown::ListItem::Interactive @text="Why Consul on HCP" @color="action" @icon="link" />
      <Hds::Dropdown::ListItem::Interactive @text="Success story" @color="action" @icon="play-circle" />
      <Hds::Dropdown::ListItem::Separator />
      <Hds::Dropdown::ListItem::Title @text="Automate with Terraform" />
      <Hds::Dropdown::ListItem::Interactive @text="Quick start a development cluster" @color="action" />
    </ul>
</section>

### Critical

While icons are optional, we do recommend using a relevant icon for Critical ListItems. Using the right icon provides a stronger affordance that the action is destructive. See the section on [color blind users and critical actions](https://www.figma.com/file/8I4u10OyhYZIea4MpXwJwm/Design-guidelines-migration?node-id=7192%3A13227) for more details about making these actions more accessible.

<section>
    <Hds::Dropdown::Toggle::Icon @text="Icon" @icon="more-horizontal" @isOpen={{true}} />
    <ul class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Interactive @text="Rename" @color="action" />
      <Hds::Dropdown::ListItem::Interactive @text="Restore" @color="action" />
      <Hds::Dropdown::ListItem::Separator />
      <Hds::Dropdown::ListItem::Interactive @text="Delete" @color="critical" @icon="trash" />
    </ul>
</section>

---

## Content

### General

We recommend only using dropdowns to display a list of links or actions. A dropdown should not be a catch-all used to squeeze a lot of content into a small, contained area. The more content (especially non-ListItem content) added to a dropdown, the more challenging it can be for a user to quickly parse, and the more likely it is for the dropdown to become less accessible. When finding that you need to add more custom content to the dropdown, please [reach out the HDS team](https://hashicorp.slack.com/archives/C7KTUHNUS) to discuss alternative options.

Text can wrap or the list can expand to accommodate the text, up to 400px. Review size guidelines to learn more about resizing the list.

### ListItems

There is no character limit for interactive ListItems but we recommend keeping them short and concise (~36 characters before needing to expand the width of the list).

---

_CopyItem_

_Banner (warning):_ **CopyItem** is a temporary built-in component. It was built so we could support existing use cases found during the audit. We will eventually be tackling this as its own component, at which point, the design and functionality are likely to change, so we don’t recommend using it outside of the dropdown component.

## Anatomy

![Dropdown CopyItem anatomy](/assets/components/dropdown/dropdown-copy_item-anatomy.png)

#### Title

Optional

#### Text

Required

#### Copy icon

Required

#### Focus ring

Visible in focus state

---

## States

<section>
  <ul class="hds-dropdown-list">
    <Hds::Dropdown::ListItem::CopyItem @text="Default" mock-state-value="default" />
    <Hds::Dropdown::ListItem::CopyItem @text="Hover" mock-state-value="hover" />
    <Hds::Dropdown::ListItem::CopyItem @text="Active" mock-state-value="active" />
    <Hds::Dropdown::ListItem::CopyItem @text="Focus" mock-state-value="focus" />
    <Hds::Dropdown::ListItem::CopyItem @text="Success" mock-state-value="success" />
  </ul>
</section>

---

## Accessibility

Color blind users (specifically those with [Achromatopsia](https://en.wikipedia.org/wiki/Achromatopsia)) may have a hard time perceiving Critical ListItems within our dropdown. To provide a more accessible experience, we recommend:

- Using strong, clear language for the text (ie. “Delete...”, “Revoke...”, etc)
- Adding a relevant icon
- Moving the Critical ListItem to the bottom of the list or the section
  - If at the bottom of a list, consider adding a separator above the Critical ListItem to help separate it from other ListItems
- Adding a second confirmation layer after the user clicks “Delete” (ie. showing a confirmation modal that requires the user to type “Delete” into a field before proceeding)

<section>
    <Hds::Dropdown::Toggle::Icon @text="Icon" @icon="more-horizontal" @isOpen={{true}} />
    <ul class="hds-dropdown-list">
      <Hds::Dropdown::ListItem::Interactive @text="Rename" @color="action" />
      <Hds::Dropdown::ListItem::Interactive @text="Restore" @color="action" />
      <Hds::Dropdown::ListItem::Separator />
      <Hds::Dropdown::ListItem::Interactive @text="Delete" @color="critical" @icon="trash" />
    </ul>
</section>

### Keyboard navigation

[Many types of users](https://webaim.org/techniques/keyboard/) rely on their keyboard to navigate the web, so it's important that we annotate the [focus order](https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html#:~:text=3%3A%20Focus%20Order-,Success%20Criterion%202.4.,that%20preserves%20meaning%20and%20operability) (how keyboard users navigate the web) to ensure we're providing them with a natural path and great experience.

_Banner (highlight):_ Focus order annotated with Figma plugin, [A11y Focus Order](https://www.figma.com/community/plugin/731310036968334777/A11y---Focus-Orderer).

![Dropdown focus order](/assets/components/dropdown/dropdown-focus_order-01.png)

![Dropdown focus order](/assets/components/dropdown/dropdown-focus_order-02.png)

![Dropdown focus order](/assets/components/dropdown/dropdown-focus_order-03.png)

### Known issuesd

**ToggleIcon/Icon/No Chevron:** doesn't provide enough affordance; it's not quickly seen as actionable, but we intend to tackle this when working on the table component.
