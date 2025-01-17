# [HDS Components UI Kit](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=2-7&t=YeAupEyKdQqauO1k-1)

## January 23rd, 2025

`Advanced Table` - Added new component.
`Code Editor` - Added new component.
`Table` - Added column borders.

`Flyout`

- Now uses Dialog Primitive as a base component
- Now features max-width settings in Figma that match the property in code.
- Added a [Template] component that combines the Flyout with the Overlay.

!!! Insight

**Migration Note**

Due to the new structure using the Dialog Primitive as a base, most instances of the Flyout will need to be relinked.
!!!

#### Form

All components that fall under the Form cateogry have been reordered in the library file and, rather than using the table of contents structure, are now named with "Form /" as a prefix on the page name.

`Primitives`

- New .Label local component to account for repeated label elements.
    - Instead of using booleans for required and optional (which allowed consumers to accidentally enable both at once), these have been combined into an `indicator` property to better align with code.
- Changed the name of .baseText to .ValueText to use a more semantic name.

!!! Insight

**Migration Note**

Due to the new component layer and naming conventions, each instance of Form::Fieldset will need to have text repopulated.
!!!

`Checkbox`

- Changed all naming to better match the component in code and subcomponent names.
- Removed unnecessary variants with Checkbox::Field, migrated to use booleans, and exposed nested properties to simplify the component usability.
- Created local nested instances for .Checkmark and .Indeterminate icons for easier maintenance.

!!! Insight

**Migration Note**

Due to the new component layer and naming structures, each instance of Checkbox::Base, Checkbox::Field, and Checkbox::Group will need to be relinked and repopulated.
!!!

`File Input`

Changed the structure fo FileInput::Field to expose nested properties rather than using additional variants for control state, labels, helper text, and error message.

!!! Insight

**Migration Note**

Due to the new component layer and naming conventions, each instance of FileInput::Base and FileInput::Field will need to be relinked and helper/error text be repopulated.

`Masked Input`

Simplified the construction of MaskedInput::Field by exposing nested component instances for label, character count, control, helper text, and error message.

!!! Insight

**Migration Note**

Due to the new nesting structure, all instances of MaskedInput will need to be repopulated with content once relinked.
!!!

`Radio`

- Changed the structure of Radio::Field to expose nested properties rather than using additional variants for radio settings, helper text, and error message.
- Exposed nested instances on Radio::Group to make it easier to customize each line item within the group.

!!! Insight

**Migration Note**

Due to the removal of certain variants in favor of nested properties, all instances of Radio::Field and Radio::Group will need to be relinked and all text repopulated.
!!!

`Radio Card`

- Updated .RadioCard::Item to include text properties for all customizable text fields.
- Updated RadioCard::Group to expose nested instances of helper text, error text, and card items.

!!! Insight

**Migration Note**

- Due to the restructuring of the component and addition of nested properties, all instances of RadioCard::Group will need to be relinked and all text repopulated.
- Please note that the intention of the layout in the card group is for the longest card to determine the overall height of the group. Once the longest card has been determined, set all other cards to "Fill Height" to ensure that all cards have the same height.
!!!

`Select`

- OptionList / Item and OptionGroupLabel have been hidden in favor of the use of [Browser] OptionList and/or [Template] Select.
    - Note: the naming difference in these components is due to their lack of corresponding component in code. These are Figma equivalents to the default browser UI that end-users will see in Chrome on MacOS
- Select::Base now allows text customization in the properties panel or hiding of the text with a boolean property.
- Select::Field now exposes nested component properties from Select::Base for control state, text within the control, label text, and label indicator (required/optional).
- Added a [Template] component for easier use of combined components in dropdown layouts.

!!! Insight

**Migration Note**

- Due to the restructuring of these components and the addition of nested properties, all instances of "Select::Base" and "Select::Field" will need to be relinked and all text repopulated.
- If designs areusing the individual depreacted OptionList / Item components to create custom option lists, we recommend replacing the lists with the component options "[Browser] OptionList" and/or "[Template] Select."
!!!

`Super Select`

- Text is now customizable as part of the ".value" nested component rather than text layer. This allows the text value to be customized in the properties panel.
- Generic placeholders have been exposed in the properties panel for easier customization.
- Component names have been changed for clarity around intended use:
    - "ListItem / Checkmark" is now "ListItemSingle"
    - "ListItem / Checkbox" is now "ListItemMultiple"
- "ListItemSingle" has been reduced in variant number and component complexity using boolean attributes for `checkmark`.
- Footer components for the dropdown list have been consolidated into the "AfterOptions" set of components.
- "SuperSelect::Multiple::Base" now exposes properties for each nested Tag.
- "SuperSelect::Multiple::Field" has been simplified in structure using exposed nested components for the control, label, helper text, and error message.
- "OptionsListMultiple" now exposes properties for each list item within the list as well as the "BeforeOptions" and "AfterOptions".
- "SuperSelect::Single::Base" now allows the control to use placeholder text or a filled style in addition to the generic instance.
- "SuperSelect::Single::Field" has been simplified in structure using exposed nested components for the control, label, helper text, and error message.

!!! Insight

**Migration Note**

Due to the comprehensive restructuring, these components and their properties will need to be repopulated when relinked.
!!!

`Text Input`

- "TextInput::Base" now has a nested component called ".Value" that allows customization of the text in the control from the properties panel.
- All Text Input components use "TextInput::Base" and local components for error messaging, indicators, character count, and labels with exposed nested properties in order to reduce the number of variants and streamline maintenance of the entire component set.

!!! Insight

**Migration Note**

Due to the comprehensive restructuring, these components and their properties will need to be repopulated when relinked.
!!!

`Textarea`

- "Textarea::Base" now has a nested component called ".Value" that allows customization of the text in the control from the properties panel.
- "Textarea::Field" now uses nested components for the control, label, helper text, error messaging, and character count in order to reduce the number of variants needed and streamline the maintenance of the component.

!!! Insight

**Maintenance Note**

Due to the comprehensive restructuring, these components and their properties will need to be repopulated when relinked.
!!!

`Toggle`

- "Toggle::Field" has been simplified using nested components with exposed properties for label, control, helper text, and error messaging.
- "Toggle::Group" now has a horizontal layout option.

!!! Insight

**Migration Note**

Due to the comprehensive restructuring, these components and their properties will need to be repopulated when relinked.
!!!

## December 20th, 2024

`IconTile` - Removed the border and updated the colors for improved contrast and to create a distinctive look that aligns better with the surrounding elements.

**Deprecated** HDS Components UI Kit v1.0. It will no longer receive updates or support. 

Released HDS Components UI Kit v2.0.

`SideNav` - No longer deprecated due to adjustments in prioritization.

## September 11th, 2024

`Text Input` - Added support for types `Tel`, `Week` and `Month`.

`Dropdown` - `ListItem Interactive` added support for the `Badge` component.

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
