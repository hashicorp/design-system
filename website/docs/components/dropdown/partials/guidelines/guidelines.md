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

!!! Info

While we provide a small size variant, we recommend only using this for the Overflow menu within [Tables](/components/table) because the icons and images start to become unrecognizable in smaller sizes.
!!!

<Doc::Layout @spacing="24px">
  <Hds::Dropdown as |dd|>
    <dd.ToggleIcon @icon="more-horizontal" @size="small" @text="Overflow Options" @hasChevron={{false}} />
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

#### Width

By default, Lists have a minimum width of 200px and a maximum width of 400px. This means if there’s a long string in a ListItem, the List will automatically expand up to 400px to accommodate the content before it wraps.

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

If you do not want the width of the List to expand automatically to accommodate the widest ListItem, you can indicate a specific width between 200px–400px.

<div class="hds-dropdown__content" style="width: 320px">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Title @text="Consul version v1.10.6" />
    <Hds::Dropdown::ListItem::Interactive @text="Update Consul version" @icon="sync" />
    <Hds::Dropdown::ListItem::Interactive @text="Edit cluster" @icon="edit" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Title @text="Import to Terraform" />
    <Hds::Dropdown::ListItem::Description @text="Copy and run this command in Terraform to import and manage this resource via our Terraform Provider" />
    <Hds::Dropdown::ListItem::Generic>
      <Hds::Link::Standalone @color="primary" @text="Docs: Import usage" @icon="docs-link" @iconPosition="trailing" @href="#" />
    </Hds::Dropdown::ListItem::Generic>
    <Hds::Dropdown::ListItem::CopyItem @text="terraform import hcp_connect" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="Delete cluster" @color="critical" @icon="trash" />
  </Doc::ListContainer>
</div>

#### Height

The height of the ListContainer is automatically determined based on the contents, but the height can also be set manually. We recommend setting the height manually if you know the list will be long. In code, the `@height` property actually acts as a `max-height`.

<div class="hds-dropdown__content" style="height: 275px">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Checkbox @value="Planned">Planned</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy override">Policy override</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy checked">Policy checked</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Cost estimated">Cost estimated</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Errored">Errored</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Fetched">Fetched</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Planning">Planning</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Planned">Planned</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy override">Policy override</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy checked">Policy checked</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Cost estimated">Cost estimated</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Errored">Errored</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Fetched">Fetched</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Planning">Planning</Hds::Dropdown::ListItem::Checkbox>
  </Doc::ListContainer>
</div>


### Header

A Header provides a fixed space at the top of the List. Typically, Headers house a search feature that allows the user to search/filter through the available options in the list. This is great for really long lists when filtering on complex datasets. 

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::Header @hasDivider={{true}}>
      <Hds::Form::TextInput::Base @type="search" placeholder="Search" />
    </Hds::Dropdown::Header>
    <Hds::Dropdown::ListItem::Checkbox @value="Planned">Planned</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy override">Policy override</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy checked">Policy checked</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Cost estimated">Cost estimated</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Errored">Errored</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Fetched">Fetched</Hds::Dropdown::ListItem::Checkbox>
  </Doc::ListContainer>
</div>

### Footer

A Footer provides a fixed space at the bottom of the List. Typically, Footers house actions related to the ListItems, e.g., when found in a filtering pattern an "Apply" Button can be used to submit the selections.

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Checkbox @value="Planned">Planned</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy override">Policy override</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Policy checked">Policy checked</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Cost estimated">Cost estimated</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Errored">Errored</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::ListItem::Checkbox @value="Fetched">Fetched</Hds::Dropdown::ListItem::Checkbox>
    <Hds::Dropdown::Footer @hasDivider={{true}}>
      <Hds::ButtonSet>
        <Hds::Button @text="Apply" type="submit" @size="small" @isFullWidth={{true}} />
        <Hds::Button @text="Cancel" @color="secondary" @size="small" @isFullWidth={{true}} />
      </Hds::ButtonSet>
    </Hds::Dropdown::Footer>
  </Doc::ListContainer>
</div>

## ListItem

### Types

For maximum flexibility, we offer a variety of ListItems options. 

#### Interactive ListItems

Use Interactive ListItems for actions (buttons) or links.

- Use `Interactive - Critical` for destructive actions. 
- Use `Interactive - Action` for everything else.

![Interactive ListItem types](/assets/components/dropdown/dropdown-listitem-types-interactive.png =449x*)

#### Selection ListItems

Selection ListItems allow the user to select one or more options within a Dropdown.

- Use `Checkmark` for switching context, e.g., organization switchers, project switchers, etc. Use for single selection only, as it doesn't provide enough indication that multi-selection is possible. For multi-selection, use `Checkbox`. 
- Use `Checkbox` for multi-selection within a form or larger filter pattern.
- Use `Radio` for single selection within a form or larger filter pattern.

![Selection ListItem types](/assets/components/dropdown/dropdown-listitem-types-selection.png =396x*)

!!! Do

Use `Checkmark` for context switching. 

![Example of proper checkmark list items](/assets/components/dropdown/dropdown-interactive-contextswitcher-do.png =280x*)
!!!

!!! Dont

Don't use `Checkmark` instead of `Radio` in larger filter patterns.  

![Example of incorrect checkmark list items](/assets/components/dropdown/dropdown-interactive-filter-dont.png =768x*)
!!!

#### Non-interactive

Non-interactive ListItems help provide structure and context to a Dropdown. Types include: `Description`, `Loading`, `Separator`, and `Title`.

![Non-interactive ListItem types](/assets/components/dropdown/dropdown-listitem-types-noninteractive.png =449x*)

!!! Do

Users may not understand why something is taking additional time to load. If possible, determine what should be displayed prior to the user opening the dropdown (e.g., on page load). If that is not possible, provide an informative loading message.

![Example of loading list item](/assets/components/dropdown/dropdown-loading-do.png =248x*)
!!!

#### Generic

The Generic ListItem allows you to add custom content in place of a ListItem. It includes predefined left and right padding to ensure proper alignment with other ListItems in the List. 

!!! Warning

Be careful not to misuse or overuse the Generic ListItem. Relying on this escape hatch too often could result in an overly complex Dropdown.
!!!

![Generic ListItem type](/assets/components/dropdown/dropdown-listitem-types-generic.png =449x*)

### Icon usage

Icons in ListItems are optional. Generally, we recommend letting the text speak for itself, but icons can add value in the following situations:

- When they reinforce the content, e.g., `edit` for an edit or rename action. 
- When using Interactive ListItems: using trailingIcons to indicate a link is external.
- When using Critical ListItems; read more about [how color blind users see critical actions](/components/dropdown?tab=accessibility) in our UIs.
- To avoid inconsistent icon use within the same List. Instead use icons in all ListItems. Doing so keeps the text aligned so the eye can scan the list of options more easily.

!!! Do

Use icons consistently and when they reinforce the content.

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Interactive @text="Rename cluster" @color="action" @icon="edit" />
    <Hds::Dropdown::ListItem::Interactive @text="Restore cluster" @color="action" @icon="reload" />
    <Hds::Dropdown::ListItem::Interactive @text="Reference cluster" @color="action" @icon="github" @trailingIcon="external-link" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="Delete cluster" @color="critical" @icon="trash" />
  </Doc::ListContainer>
</div>
!!!

!!! Dont

Avoid inconsistent icon use.

<div class="hds-dropdown__content">
  <Doc::ListContainer class="hds-dropdown__list">
    <Hds::Dropdown::ListItem::Interactive @text="Rename cluster" @color="action" />
    <Hds::Dropdown::ListItem::Interactive @text="Restore cluster" @color="action" @icon="reload" />
    <Hds::Dropdown::ListItem::Separator />
    <Hds::Dropdown::ListItem::Interactive @text="Delete cluster" @color="critical" @icon="trash" />
  </Doc::ListContainer>
</div>
!!!

### Content

While there are no character limits for ListItems, we recommend keeping them short and concise so the List is easy to scan.

## Critical action patterns

We recommend adding a second confirmation layer after the user clicks “Delete” (e.g., showing a confirmation Modal that requires the user to take another action before proceeding). This safeguards against accidental clicks by requiring users to confirm the destructive action.

!!! Do

![example of how to use a second confirmation layer](/assets/components/dropdown/dropdown-example-do.png =780x*)
!!!

!!! Dont

![example of how not to use a second confirmation layer](/assets/components/dropdown/dropdown-example-dont.png =507x*)
!!!