# [HDS Product - Components](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=6790-10926&mode=design&t=Ps0aMGZ6F3z7bAJ4-0)

## Date TBD

### Breaking changes

`Alert` and `Toast` - Updated the `StandaloneLink` to the secondary variant from the primary variant to align with our documented usage recommendations.

_Updating the `StandaloneLink` to the secondary variant will revert any changes you've made to the text and leading icon properties. Prior to updating the library we recommend annotating (with a comment or otherwise) work that is in progress or is still being referenced by engineering with the intended text and icon variant._

`Table` - multiple enhancements to the `Table` components including:

- Added support for multi-selection with `Header Column / Selection` and `Cell / Selection`.
- Added support for a `Tooltip` in the `Header Column` component.
- Updated the visual language of the sort button in `Header Column` by decoupling the sort functionality into a nested `Sort Button`

_Adding support for a `Tooltip` and updates to the `Sort Button` result in a breaking change in sortable variants. While the `Label` in the `Header Column` should persist, we recommend annotating (with a comment or otherwise) work that is in-progress or still being referenced by engineering with the columns that are intended to be sortable._

## January 24th, 2024

`IconTile` - Added Vault Radar logo.

## November 6th, 2023

`CodeBlock` - Added new component.

## November 3rd, 2023

`Breadcrumb` - Updated the number of `breadcrumb / _items` to the component.

## October 23rd, 2023

`Button` - Updated icon only button variants to be square to match the ToggleIcon.

`Dropdown / ToggleIcon` - Fixed the small variant so that it’s the correct size (28px height) to match the other small Buttons and ToggleButton.

## September 15th, 2023

`IconTile` and `IconTile-Logo` - Added a new product variant for Vault Secrets.

## August 17th, 2023

`SideNav` - Changed the icon from `User` to `Help` in the first dropdown at the top of the `SideNav`.

## July 31st, 2023

`Field/Date`, `Field/Time`, `Field/Datetime` - Fixed the default width of the components to match the browser default.

## July 13th, 2023

Added new components:

- `Accordion`
- `MaskedInput`

## July 12th, 2023

Added a “Form Primitives” page to house the `Fieldset` component.

## June 9th, 2023

`Reveal` - Added the component.

## June 1st, 2023

### Breaking change

`Dropdown` - Fixed a spacing issue between the label and chevron in the ToggleButton.

## May 31st, 2023

`ApplicationState` - Updated the text style to reduce the prominence.

## May 11th, 2023

Added new utility components:

- `Cursor`
- `Scrollbar`

## May 10th, 2023

`SegmentedGroup` - Refactored the component, including:

- Fixing a bug that created an “inception” style loop of the inheritance between the published component library and the local components.
- Adding more straightforward support for the focus state of the `Select` component when nested within a `SegmentedGroup`.

`Select` - Updated the focus state to bring consistency in how the `Select` and the other form controls account for this interactive state.

## April 28th, 2023

Added new components:

- `Tooltip`
- `SegmentedGroup`

## April 14th, 2023

`Dropdown` - Fixed a bug in the ListHeader where the search field wasn’t resizing properly.

## May 30th, 2023

### Breaking change

`Dropdown` - Refactored the component to utilize new Figma functionality and added the following features:

- Added `ListItem variants`: `Checkmark`, `Checkbox`, `Radio`.
- Added `ListItem variants`: `Checkmark`, `Checkbox`, `Radio`.
- Updated positioning options from Left and Right to Top left, Top right, Bottom left, Bottom right
- Improved accessibility on `ToggleIcon` by adding a border to better indicate interactivity.
- Added small variants of the `ToggleButton` and `ToggleIcon`.
- Added a Header and Footer to the List.
- Added the ability to set a fixed height on the List resulting in the use of a scrollbar for longer lists.

[Tips for migration](https://www.figma.com/file/noyY6dUMDYjmySpHcMjhkN/HDS-Product---Components?type=design&node-id=6264-20834&mode=design)

## February 14th, 2023

`Overlay` - Moved this component from the `Modal` page to it’s own page and stickersheet as it’s used with other components.

Added new components:

- `Pagination`
- `Flyout`

## January 12th, 2023

`Modal` - Fixed a bug in which the tagline wasn’t inheriting the color style in the header.

## December 15th, 2022

`Modal` - Updated the border radius (visual change) and moved the color property out of the header subcomponent and into the main component.

`Table` - Updated to auto layout to assist in wrapping content.

## December 12th, 2022

`Checkbox` - Added an indeterminate state to the component.

## November 2nd, 2022

`Tabs` - Added the component.

## October 4th, 2022

`RadioCard` - Added the component.

## September 22nd, 2022

`Dropdown` - Added a small variant of the `ToggleButton`.

## August 30th, 20222

`Search` - Fixed a bug where the Search component wasn't resizing properly.

## July 29th, 2022

Added new components:

- `Checkbox`
- `Radio`
- `Select`
- `Stepper Indicator`
- `Tag`
- `Textarea`
- `TextInput`
- `Toggle`

## May 27th, 2022

`Dropdown` - Added 2 ListItem variants; ListItem “type=loading” and ListItem/CopyItem.

`Button/Link/CTA` - Updated the styling (added an underline) and moved the LinkCTA component into the Button component as new variants tied to the property “isLink”.

### Breaking change

`Alert`, `Toast` - Refactored the component with improved actions using boolean properties for easier configuration.

## May 19th, 2022

### Breaking change

`Dropdown` - Refactored the component, including:

- fixing resizing issues,
- adding more ListItems within the pre-built list,
- making ListItem types more discoverable,
- adding more properties on the parent component for easier and faster configuration.

## May 6th, 2022

`Alert`, `Toast` - Added the components.

## April 25th, 2022

`Dropdown` - Added the component.

Removed all the “WIP” language and added meaningful descriptions and documentation links to each component.

## April 5th, 2022

`LinkCTA` - Added the component.

`ButtonGroup` - Fixed a minor color mapping issue with the border on the primary variant of the ButtonGroup component.

### Breaking change

`Badge` - Removed badge variants in a status color (success, warning, critical) that did not have icons.

## March 23rd, 2022

Re-mapped the colors used in the components to the new semantic tokens or built-in local styles, as necessary.
