## Usage

### When to use

- When the list of options is large and search is required to help filter the list.
- When multiple selections are made and displayed as a group.
- When you require complex structured content to be displayed within the list (and trigger).

### When not to use

- To display a list of links (or buttons) in a menu, consider the [HDS Dropdown](/components/dropdown) component instead.
- A list of options 5 or less, consider the [HDS Select](/components/form/select) form element.
- As a means to filter an array of objects within a data set; e.g., when presented in a tabular format or list. Instead, consider other filtering patterns.


## Variants

### Single
Selection is limited to a single list item.

![Single selection example with list open](/assets/components/form/super-select/super-select-single-variant-text.png =504x*)

### Multiple
Multiple selections can be made within the list.

![Multiple selection example with list open](/assets/components/form/super-select/super-select-multiple-variant.png =504x*)

## Trigger default states

### Empty
The default option, where the trigger is empty, showing nothing selected.

![Showing an empty trigger, indicating to the user there is no option selected yet](/assets/components/form/super-select/super-select-trigger-empty.png =399x*)

### Placeholder text
Placeholder text was added to the trigger, which helps the user understand additional context, but is not reliant on this information to carry out a task.

![Showing placeholder text inside of the trigger, still indicating no selection is made, but with some additional guidance](/assets/components/form/super-select/super-select-trigger-placeholder-text.png =399x*)

### Populated
The trigger shows information populated, and has an option pre-selected before user interaction.

![Showing preselected options in both a single and multiple variant. This helps show something has been preselected previously and the user can update their options](/assets/components/form/super-select/super-select-trigger-filled.png =399x*)

## Before and after options
The before and after options are areas that sit above and below the list respectively, independent from the list’s overflow. They allow for either predefined components (like search) or custom content to occupy these spaces.

### BeforeOptions
BeforeOptions allows for one of two options to be displayed at a given time: search or custom content. These options are the same between both single and multiple variants.

#### Search
If enabled, allows the user to search by filtering the results based on the query.

![Search enabled before the list in both single and multiple variants](/assets/components/form/super-select/super-select-before-options-search.png =836x*)

#### CustomContent
If enabled, yielded content will occupy this space.

![Custom content enabled before the list in both single and multiple variants](/assets/components/form/super-select/super-select-before-options-custom-content.png =836x*)

!!! Dont

We recommend against placing heavy UI elements in the custom content as it can draw attention away from the list options and will only be visible when the menu is open. Consider placing them in relation to the trigger.

![Custom content enabled before the list in both single and multiple variants](/assets/components/form/super-select/super-select-dont-visually-heavy.png =836x*)

!!!

### AfterOptions
AfterOptions allows for one of two options to be displayed at a given time: footer or custom content. These options are the same between both single and multiple variants, however the footer has additional functions in the multiple variant.

#### Footer
The footer appends below the list displaying content and/or buttons (depending on the variant) that provide additional context (or functions) to the list options.

##### Single variant
The footer defaults to visible and shows a total counter, which is customizable to fit context.

![Custom content enabled before the list in both single and multiple variants](/assets/components/form/super-select/super-select-single-variant-footer-with-counter.png =626x*)

##### Multiple variant
The afterOptions and footer default to visible. The buttons allow users to expedite the deselection process. The counter (selected / total) is optional. Either both or individually may be shown.

![Custom content enabled before the list in both single and multiple variants](/assets/components/form/super-select/super-select-multiple-variant-footer-without-counter.png =757x*)

Show selected will change the list to display only selected list items while toggling the label of that button to “Show all."

![Flow showing the behavior of the show selected button and how it toggles the list to only display selected list items](/assets/components/form/super-select/super-select-flow-select-all.png =836x*)

If show selected is used while no selections have been made, a string of text will let the user know that no selections have been made yet.

![Flow showing the behavior of the show selected button when no selections have been made yet.](/assets/components/form/super-select/super-select-flow-no-selections-select-all.png =836x*)

Additionally, “clear selected” will wipe out the selections and revert the SuperSelect to its defined default state.

![Flow showing the behavior of the clear selected button and how it reverts the SuperSelect's state to the default one](/assets/components/form/super-select/super-select-flow-clear-selected.png =836x*)

##### Single and multiple variant footer with custom content
In either of the two variants, you are able to fill the footer with custom content. This is helpful when wanting to mimic the footer but still customize its contents.

![Showing the footer with custom content inside.](/assets/components/form/super-select/super-select-single-multiple-footer-custom-content.png =836x*) 

#### CustomContent
If enabled, yielded content will occupy this space.

![Showing the afterOptions slot with custom content](/assets/components/form/super-select/super-select-after-options-custom-content.png =836x*)

## List

### Positioning
Lists can be positioned to the left, center or right of the trigger, and above or below the trigger to fit more appropriately within the UI. This defaults to the bottom left with collision detection.

![Showing the different list positions (left, center and right + top and bottom)](/assets/components/form/super-select/super-select-list-positioning.png =836x*)

### Width

#### Match the trigger
Default behavior where the list's width matches the trigger's.

![Showing the list's width matching the trigger's](/assets/components/form/super-select/super-select-list-width-matching.png =504x*)

#### Auto width
If the list width is set to auto, it will size to the longest list item text string.

![Showing the list's auto width, resizing to the longest list item](/assets/components/form/super-select/super-select-list-width-auto.png =630x*)

## ListItem

### Types
There are four types of ListItems, two of which are variant specific.
- `Checkmark` is used for single selections within a list. This is only allowed within the single variant. 
- `Checkbox` is used to deliniate to the user that multiple selections within the list is permited. This is only allowed within the multiple variant.
- `Title` is used to group ListItems together and help visually organize categories or sections.
- `Separator` is used to create a visual separator between sections or categories.

![Showing the different list types as described above](/assets/components/form/super-select/super-select-list-item-types.png =399x*)

## Required and optional
For complex forms, indicate required fields. This is the most explicit and transparent method and ensures users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

![Showing required next to the label for the SuperSelect](/assets/components/form/super-select/super-select-required.png =399x*)

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate optional fields instead.

![Showing optional next to the label for the SuperSelect](/assets/components/form/super-select/super-select-optional.png =399x*)

## Error validation
For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.

## Content
For general content recommendations, refer to the [Primitives](/components/form/primitives) documentation.

### Options list
- We recommend keeping options clear and concise; avoid full sentences.
- Avoid using the same word at the beginning of a set of options.
- Order the set of options in a logical way based on the use case. For example:
    - default or most commonly selected options first
    - alphabetically
    - numerically