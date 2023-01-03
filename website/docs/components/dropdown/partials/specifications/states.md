## States

### Button

![Example of dropdown button states](/assets/components/dropdown/dropdown-state-button.png)

### Icon

![Example of dropdown icon states](/assets/components/dropdown/dropdown-state-icon.png)

!!! Info

**A note on disabled states** 

Because disabled states completely remove the interactive function of an element, it can be challenging for a user to understand why it has been disabled and/or why they cannot interact with that element. In an effort to avoid this confusion, we opt for using methods like enabling or hiding the element and, thus, are not offering a disabled state for the Dropdown Toggle. [Read more about when to enable vs hide](https://docs.google.com/document/d/1fqsXjjPnz5HK2NcY1buh5RcI5S6XCgQwfr8GP3kClv0/edit#heading=h.52ub6bvbvcb7)

!!!

<!-- Can’t get the mock states to work here for some reason -->

<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Hover" mock-state-value="hover" />
  <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Default" mock-state-value="default" />
  <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Active" mock-state-value="active" />
  <Hds::Dropdown::ListItem::Interactive @color="action" @icon="hexagon" @text="Focus" mock-state-value="focus" />
</Doc::ListContainer>

<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Default" mock-state-value="default" />
  <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Hover" mock-state-value="hover" />
  <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Active" mock-state-value="active" />
  <Hds::Dropdown::ListItem::Interactive @color="critical" @icon="trash" @text="Focus" mock-state-value="focus" />
</Doc::ListContainer>

### ListItem

<Doc::ListContainer class="hds-dropdown-list">
  <Hds::Dropdown::ListItem::CopyItem @text="Default" mock-state-value="default" />
  <Hds::Dropdown::ListItem::CopyItem @text="Hover" mock-state-value="hover" />
  <Hds::Dropdown::ListItem::CopyItem @text="Active" mock-state-value="active" />
  <Hds::Dropdown::ListItem::CopyItem @text="Focus" mock-state-value="focus" />
  <Hds::Dropdown::ListItem::CopyItem @text="Success" mock-state-value="success" />
</Doc::ListContainer>
