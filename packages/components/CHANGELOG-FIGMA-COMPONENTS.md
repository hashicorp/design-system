# [HDS Components UI Kit v2.0](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=2-7&t=HYGTIoXBy2YkVWDP-1)

## February 4th, 2026

`FilterBar` - New component added.

## January 12th, 2026

`SuperSelect` - Fixed a bug where the nested ListItems weren't being published.

## December 4th, 2025

`Breadcrumb` - Fixed a bug that caused the text styles in the default state of the Breadcrumb Item to detach.

## November 5th, 2025

This changelog corresponds with the [5.0](/whats-new/release-notes#500) release.

`AppFooter` - Updated the copyright language to read "HashiCorp, an IBM Company" per brand guidance.

## October 1st, 2025

This changelog corresponds with the [4.24](/whats-new/release-notes#4240) release.

`AdvancedTable` - Added support for reordering columns.

`StepperNav` - Fixed a bug that was preventing the progress line from scaling property.

`Form / Layout` - Updated the order of actions to correspond with [button organization](/patterns/button-organization) guidelines.

`SuperSelect / Multiple` - Added `Separator` and `GroupTitle` list items to the component.

## September 4th, 2025

This changelog corresponds with the [4.23](/whats-new/release-notes#4230) release.

`AdvancedTable` - Added support for toggling pinning the first column in context menu and fixed visual bug for focus state for the table cells.

`AppHeader` - Added `size` property for breakpoint definition.

## August 7th, 2025

This changelog corresponds with the [4.22](/whats-new/release-notes#4220) release.

`Modal` - Fixed a color inheritance bug for the tagline.

`SuperSelect` - Updated the tags to better reflect the Ember component functionality. Added missing boolean property for helper text.

`Tab` - Fixed an auto layout bug to correct indicator length for longer text.

`RadioCard` - Fixed a color override bug for the icons within each card.

`Form Primitives` - Added a text property for the number/count in CharacterCount.

## July 2nd, 2025

This changelog corresponds with the [4.21](/whats-new/release-notes#4210) release.

`KeyValueInputs` - Added new [Template] component.

`Form / Layout` - Added new Form Layout [Template] component.

`AppHeader` - Added `text` property to the home link.

`AdvancedTable` - Added support for resizing columns, restructured the component to support functions within a context menu.

## June 4th, 2025

This changelog corresponds with the [4.20](/whats-new/release-notes#4200) release.

`CodeBlock` - Added height toggle for overflowing code.

### Breaking changes

`AppHeader` - Multiple changes include:

- Refactored the component to support a list coupled with the context switcher
- Reorganized the local component dependencies
- Updated the focus ring to use dark variables

## May 7th, 2025

This changelog corresponds with the [4.19](/whats-new/release-notes#4190) release.

`AppHeader` and `AppSideNav` - Components added.

`AdvancedTable` [Template] - Multi-select column added.

`CodeBlock`, `CodeEditor`, `SideNav` - Updated styling for the focus ring.

`SuperSelect / Multiple` - Multiple design improvements including:

- Displaying a selected number in the trigger when not empty.
- Correcting truncation of tags to maintain the trigger height.

`Select`, `TextInput`, `TextArea`, and `MaskedInput` - Fixed the overflow to not extend beyond the container or wrap, which mirrors the overflow behavior in the browser.

`RadioCard` - Fixed a bug in the border setting.

`Dropdown` - Radio and Checkbox list items updated to match font weight.

`SideNav` - **Deprecated** the component. Use the `AppHeader` and `AppSideNav` instead.

## April 24th, 2025

`Button`, `StandaloneLink`, `Breadcrumb`, `Table Primitives` - Removed interactive component variants

Unpublished all local variables for component-level tokens.

## April 2nd, 2025

`StepperList` and `StepperNav` - Components added.

`AdvancedTable` - Multiple enhancements including:

- Added support for expanding and collapsing all rows.
- Added support for a sticky column in the [Template] components.

`CodeBlock` and `CodeEditor` - Improved the color contrast in the focus ring.

## March 5th, 2025

`CodeEditor` - Added support for Javascript and Rego languages.

`Badge` - Updated colors for improved contrast and accessibility.

`Tag` - Updated to support truncation and tooltip. Content no longer wraps.

`Advanced Table` - Removed an unnecessary border from `Header::Selection`.

### Breaking changes

`Advanced Table` - Restructured `Cell::Selection` to mimic the `Table::Cell::Selection` component.

_This change alters the layer structure of the component and results in a breaking change for the `Advanced Table` cell "selection" components only._

## January 23rd, 2025

`Advanced Table` - Added new component.

`CodeEditor` - Added new component.

`Table` - Added column borders.

## December 20th, 2024

`IconTile` - Removed the border and updated the colors for improved contrast and to create a distinctive look that aligns better with the surrounding elements.

`SideNav` - No longer deprecated due to adjustments in prioritization.

### Figma v2.0 Components

- Deprecated HDS Components UI Kit v1.0. It will no longer receive updates or support.
- Released HDS components UI Kit v2.0.

In many cases, replacing v1.0 library components with the components in the Figma v2.0 Library will result in breaking changes. For a comprehensive list of how these changes will impact your designs, refer to the [changelog document](https://docs.google.com/document/d/1q9IGtrsVOf3KrSBGb8AdF3OhPUm3fYAwPdhSml7onMM/edit?tab=t.0#heading=h.15f60fqiivvr).

#### General changes

- Improved consistency in component naming conventions
- Enhanced property panel customization options
- Reduced variant complexity through boolean properties
- Added local tokens for custom styling (hidden from publishing)
- Standardized nested component structure

#### Component organization updates

- Standardized naming conventions, nested structures, and boolean property usage to reduce complexity.
- Updated organization with "Form /" prefixes and DialogPrimitive as the base for modal components.
- Introduced [Template] components for common combinations.
- Improved nested component accessibility for easier customization.

## August 2nd, 2024

`AppHeader` - Added a new navigation component to contain global and utility navigation elements.

`AppSideNav` - Added a new component that shares features and functionality with the legacy `SideNav`.

`Application Template` - Added a template component that provides a consistent starting point for the UI chrome.

`SideNav` - **Deprecated** the legacy navigation component. It will be removed from the library once adoption of the `AppHeader` and `AppSideNav` is complete.

### Breaking changes

`ApplicationState` - multiple enhancements including:

- Added support for a media slot above the title.
- Added an `alignment` property which can be set at the root level to `left` or `center`.
- The footer now supports up to three actions at once. The actions are now organized in accordance with our [Button Organization](/patterns/button-organization) pattern.
- Updated several visual styles including:
  - Removing the divider
  - Reducing the title from `Display/400/Bold` to `Display/300/Bold`
  - Changing the icon and the title color from `Foreground/Faint` to `Foreground/Strong`
  - Changing the body text color from `Foreground/Faint` to `Foreground/Primary`

_Adding support for three actions within the `ApplicationState` results in a breaking change to the previous actions. Before updating the library, we recommend annotating the text and icon name (with a comment or otherwise) in files that are in progress or still being referenced by engineering._

## February 27th, 2024

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
