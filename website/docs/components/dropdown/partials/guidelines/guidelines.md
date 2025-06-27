## Usage

### When to use

- To display a list of actions or links under a single button toggle.
- To allow singular or multiple selection outside of a form, such as within filtering.
- To provide the user with a way to easily switch context within the application.

### When not to use

- In forms when providing the user with options to choose from, consider [Select](/components/form/select).

## Toggle

### Toggle types

Toggles come in two variant types: **button** and **icon**.

![Example of the two toggle variant types](/assets/components/dropdown/dropdown-toggle-types.png)

### Toggle size

ToggleButtons come in two sizes: **small** and **medium**. This allows for placement in ButtonSets with buttons of the same size.

![Example of the two toggle button sizes](/assets/components/dropdown/dropdown-toggle-button-sizes.png)

ToggleIcons come in two sizes: **small** and **medium**.

!!! Info

While we provide a small size variant, we recommend only using this for the Overflow menu within [Tables](/components/table/table) because the icons and images can become unrecognizable in smaller sizes.
!!!

![Example of the two toggle button sizes](/assets/components/dropdown/dropdown-toggle-icon-sizes.png)

### Chevron usage

Open Toggles use icon `chevron-up`, while closed Toggles use `chevron-down`.

ToggleButtons require a visible chevron to indicate interactivity and provide distinction between Dropdowns and standard Buttons.

![Example of open and closed dropdowns](/assets/components/dropdown/dropdown-button-chevrons.png)

We strongly recommend providing visible chevrons on most instances of ToggleIcons to indicate interactivity. That said, it’s common to see ToggleIcons that use the `more-horizontal` icon without chevrons. Their placement, usually in the last column of a [Table](/components/table/table), is typically indicative of this type of interaction.

![Example of open and closed dropdowns](/assets/components/dropdown/dropdown-icon-chevrons.png)

## List

### Placement

Lists can be positioned to the left or right of the Toggle, and above or below the Toggle to fit more appropriately within the UI. Lists do not currently have collision detection.

![Dropdown list placement examples](/assets/components/dropdown/dropdown-placement.png)

### List size

#### Width

By default, Lists have a minimum width of 200px and a maximum width of 400px. This means if there’s a long string in a ListItem, the List will automatically expand up to 400px to accommodate the content before it wraps.

![Dropdown menu at 200px wide](/assets/components/dropdown/dropdown-menu-min-width.png)

If you do not want the width of the List to expand automatically to accommodate the widest ListItem, you can indicate a specific width between 200px–400px.

![A wider dropdown menu at 310px](/assets/components/dropdown/dropdown-menu-max-width.png)

#### Height

The height of the ListContainer is automatically determined based on the contents, but the height can also be set manually. We recommend setting the height manually if you know the list will be long. In code, the `@height` property actually acts as a `max-height`.

![Dropdown menu with many items and a set height so it scrolls](/assets/components/dropdown/dropdown-menu-scroll.png)

### Header

A Header provides a fixed space at the top of the List. Typically, Headers house a search feature that allows the user to search/filter through the available options in the list. This is great for really long lists when filtering on complex datasets.

![Dropdown menu with a header that includes a search field](/assets/components/dropdown/dropdown-menu-header.png)

### Footer

A Footer provides a fixed space at the bottom of the List. Typically, Footers house actions related to the ListItems, e.g., when found in a filtering pattern an "Apply" Button can be used to submit the selections.

![Dropdown menu with a footer that includes a button set with a primary "Apply" button and secondary "Cancel" button](/assets/components/dropdown/dropdown-menu-footer.png)

## ListItem

### ListItem types

For maximum flexibility, we offer a variety of ListItems options.

#### Interactive ListItems

Use Interactive ListItems for actions (buttons) or links.

- Use `Interactive - Critical` for destructive actions.
- Use `Interactive - Action` for everything else.

![Interactive ListItem types](/assets/components/dropdown/dropdown-listitem-types-interactive.png)

#### Selection ListItems

Selection ListItems allow the user to select one or more options within a Dropdown.

- Use `Checkmark` for switching context, e.g., organization switchers, project switchers, etc. Use for single selection only, as it doesn't provide enough indication that multi-selection is possible. For multi-selection, use `Checkbox`.
- Use `Checkbox` for multi-selection within a form or larger filter pattern.
- Use `Radio` for single selection within a form or larger filter pattern.

![Selection ListItem types](/assets/components/dropdown/dropdown-listitem-types-selection.png)

!!! Do

Use `Checkmark` for context switching.

![Example of proper checkmark list items](/assets/components/dropdown/dropdown-context-switcher-do.png)
!!!

!!! Dont

Don't use `Checkmark` instead of `Radio` in larger filter patterns.

![Example of incorrect checkmark list items](/assets/components/dropdown/dropdown-interactive-filter-dont.png)
!!!

#### Non-interactive ListItems

Non-interactive ListItems help provide structure and context to a Dropdown. Types include: `Description`, `Loading`, `Separator`, and `Title`.

![Non-interactive ListItem types](/assets/components/dropdown/dropdown-listitem-types-noninteractive.png)

!!! Do

Users may not understand why something is taking additional time to load. If possible, determine what should be displayed prior to the user opening the dropdown (e.g., on page load). If that is not possible, provide an informative loading message.

![Example of loading list item](/assets/components/dropdown/dropdown-loading-do.png)
!!!

#### Generic ListItems

The Generic ListItem allows you to add generic content in place of a ListItem. It includes predefined left and right padding to ensure proper alignment with other ListItems in the List.

!!! Warning

Be careful not to misuse or overuse the Generic ListItem. Relying on this escape hatch too often could result in an overly complex Dropdown.
!!!

![Generic ListItem type](/assets/components/dropdown/dropdown-listitem-types-generic.png)

### Icon usage

Icons in ListItems are optional, and we generally recommend letting the text speak for itself.

However, icons can add value when they reinforce the content or indicate external links. When using Critical ListItems, icons may also improve [how color blind users see critical actions](/components/dropdown?tab=accessibility).

!!! Dont

Avoid inconsistent icon use within the same List.

![Dropdown use case examples](/assets/components/dropdown/dropdown-icon-usage-dont.png)
!!!

!!! Do

Use icons consistently. Doing so keeps the text aligned so the eye can scan the list of options more easily.

![Dropdown use case examples](/assets/components/dropdown/dropdown-icon-usage-do.png)
!!!

### Badge usage

[Badges](/components/badge) in Interactive ListItems are optional. We recommend using only the `small` Badge option to align more closely with the text line height. Badges should be used sparingly and only when their use adds contextual value. Examples of appropriate use of Badge inside an Interactive ListItem include:

- When an item is in beta or behind a feature flag, i.e., a new item that users should be able to locate easily.
- When an item has vital information that users should be able to see at a glance, i.e., a unique status.
- When an item should be distinguished from others in the list, e.g., an item view is Public vs Private.

![Dropdown width badges in various places](/assets/components/dropdown/dropdown-interactive-badge-example.png)

!!! Info

The Figma component will not fully reflect the Badge wrapping behavior expected in the Ember component due to current known limitations in Figma’s auto layout settings.
!!!

Refer to the [Badge guidelines](/components/badge) to help inform choices around color and icon use. 

### Content

While there are no character limits for ListItems, we recommend keeping them short and concise so the List is easy to scan.

## Critical action patterns

We recommend adding a second confirmation layer after the user clicks “Delete” (e.g., showing a confirmation Modal that requires the user to take another action before proceeding). This safeguards against accidental clicks by requiring users to confirm the destructive action.

!!! Do

![example of how to use a second confirmation layer](/assets/components/dropdown/dropdown-example-do.png)
!!!

!!! Dont

![example of how not to use a second confirmation layer](/assets/components/dropdown/dropdown-example-dont.png)
!!!
