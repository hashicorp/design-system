# [HDS Product - Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=6790-10926&mode=design&t=Ps0aMGZ6F3z7bAJ4-0)

## 2023

### September 15th, 2023

- `IconTile` and `IconTile-Logo` - added a new product variant for Vault Secrets.

### August 17th, 2023

- `SideNav` - changed the icon from `User` to `Help` in the first dropdown at the top of the `SideNav`.

### July 31st, 2023

- Field/Date`, `Field/Time`, `Field/Datetime` - fixed the default width of the components to match the browser default.

### July 13th, 2023

- [`Accordion`](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=36870-71031&mode=design) - component added.
- [`MaskedInput`](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=39336-85955&mode=design) - component added.

### July 12th, 2023

- Added a "Form Primitives" page to house the `Fieldset` component.

### June 9th, 2023

- [`Reveal`](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=35103-70091&mode=design) - component added.

### June 1st, 2023

- `Dropdown` - fixed a spacing issue between the label and chevron in the ToggleButton.

### May 31st, 2023

- `ApplicationState` - published older changes that were made to lessen the prominence of the text.

### May 11th, 2023

- Added two new utility components:
    - `Cursor` - can be used to showcase interactive states.
    - `Scrollbar` - can be used to indicate which regions/containers should be scrollable.

### May 10th, 2023

- `SegmentedGroup` - made the following iterations to the component:
    - fixed a bug that created an “inception” style loop of the inheritance between the published component library and the local components.
    - added more straightforward support for the focus state of the `Select` component when nested within a `SegmentedGroup`.
- `Select` - updated the focus state to bring consistency in how the `Select` and the other form controls account for this interactive state.

### April 28th, 2023

- `Tooltip` - releasing the Tooltip component which provides additional information in a concise and unobtrusive way.

- `SegmentedGroup` - releasing the SegmentedGroup which combines one or more input fields and actions to handle complex filter and data collection.

### April 14th, 2023

- `Dropdown` - fixed a bug in the ListHeader where the search field wasn’t resizing properly.

### May 30th, 2023

- `Dropdown` - ⛔️ **Breaking Change** - refactored the dropdown component to utilize new Figma functionality and added the following new features:
    - Added `ListItem variants`: `Checkmark`, `Checkbox`, `Radio`.
    - Added `ListItem variants`: `Checkmark`, `Checkbox`, `Radio`.
    - Updates positioning options from Left and Right to Top left, Top right, Bottom left, Bottom right
    - Improved accessibility on `ToggleIcon` by adding a border to better indicate interactivity.
    - Added small variants of the `ToggleButton` and `ToggleIcon`.
    - Added a Header and Footer to the List.
    - Added the ability to set a fixed height on the List resulting in the use of a scrollbar for longer lists.

[Tips for migration](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=6264-20834&mode=design)

### February 14th, 2023

- `Pagination` - releasing the `Pagination` component. `Pagination` lets users navigate through content broken down into pages.

- `Flyout` - releasing the `Flyout` component. A `Flyout` is used to show and hide additional information and content that is related to the main page without navigating or routing to a new page.

- `Overlay` - this component was originally organized with the `Modal` component, but has been refactored into it’s own page and stickersheet as it’s used outside of just the `Modal`.

### January 12th, 2023

- `Modal` - fixed a bug in which the tagline wasn’t inheriting the color style in the header.

## 2022

### December 15th, 2022

- `Modal` - updated the border radius (visual change) and moved the color property out of the header subcomponent and into the main component.
- `Table` - small update to auto layout to assist in wrapping content.

### December 12th, 2022

- `Checkbox` - added indeterminate state to checkbox base and field.

### November 2nd, 2022

- `Tabs` - releasing the Tabs component. Tabs allow users to move between different views within the same context and at the same level of hierarchy.

### October 4th, 2022

- `Radio card` - releasing the Radio card component. Radio card groups allow users to select a single option from a group of two or more radio cards.

### September 22nd, 2022

- `Dropdown` - introduced a small variant of the `ToggleButton`.

### August 30th, 20222

- `Search` - fixed a bug where the Search component wasn't resizing properly.

### July 29th, 2022

- `Checkbox` - releasing the checkbox component. Checkboxes allow users to check or uncheck an option or setting, or to allow users to select one or more options from a list.
- `Radio` - releasing the radio component. Radios allow users to select a single option from a group of two or more mutually exclusive options.
- `Select` - releasing the select component. Selects are form controls for selecting from a set of options.
- `Stepper` - indicator: Releasing the stepper indicator component. A stepper indicator helps the user maintain context and directionality when advancing through a multi-step flow or feature.
- `Tag` - releasing the tag component. Tags indicate an object's categorization, i.e., for filtering.
- `Textarea` - releasing the textarea component. A textarea is a multi-line text input.
- `TextInput` - releasing the text input component. Text inputs are form controls that provide the user with a way to read, input, or edit short data.
- `Toggle` - releasing the toggle component. Toggles allow users to turn on and off two mutually exclusive options that provide an immediate response after any of them are selected.

### May 27th, 2022

- `Dropdown` - released 2 ListItem variants; ListItem “type=loading” and ListItem/CopyItem.
- `Button/Link/CTA` - updated the styling (added an underline) and moved the LinkCTA component into the Button component as new variants tied to the property “isLink”; updated the documentation to reflect these changes.

- `Alert` - released a refactored version of the Alert component. These updates include: updated documentation, improved actions using boolean properties for easier configuration, and the use of individual strokes for borders on page alerts.
- `Toast` - released a refactored version of the Toast component with improved actions using boolean properties for easier configuration.
- In this release, the alert and toast components are no longer in experimental mode and are considered safe to use by consumers.

### May 19th, 2022

- `Dropdown` - released a refactored version of the Dropdown component. These updates include: resizing fixes, providing more ListItems within the pre-built list, making ListItem types more discoverable, and adding more properties on the parent component for easier and faster configuration.

### May 6th, 2022

- `Alert` - releasing the Alert component. Alerts display a brief, short, important message in a way that attracts the user's attention. They should not be confused with toasts or confirmation modals.
- `Toast` - releasing the Toast component. A Toast is an animated notification that displays a short message communicating an immediate and direct response to an action.

### April 25th, 2022

- `Dropdown` - released the Dropdown component. Dropdowns display a list of links or actions for the user to choose from. They should not to be confused with Selects, which are used in forms.
- `UI Kit` - removed all the “WIP” language and added meaningful descriptions and documentation links to each component.

### April 5th, 2022

- `LinkCTA` - we added a LinkCTA component. This is a link that looks like a button. There are now also additional docs around when to use a Link vs LinkCTA vs Button.
- `Badge` - ⛔️ **Breaking Change** - we removed badge variants in a status color (success, warning, critical) that did not have icons. These variants were not accessible because they were relying solely on color to indicate meaning, which fails WCAG SC 1.4.1. These were available previously with a note that warned they were inaccessible, but we have opted to take a stronger stance and not support these variants. Badges in a status color will need to always include an icon.
- `ButtonGroup` - fixed a minor color mapping issue with the border on the primary variant of the ButtonGroup component.

### March 23rd, 2022

- Re-mapping the colors used in the components to the new semantic tokens or built-in local styles, as necessary.
