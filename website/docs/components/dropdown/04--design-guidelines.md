# Dropdown - Design Guidelines

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
