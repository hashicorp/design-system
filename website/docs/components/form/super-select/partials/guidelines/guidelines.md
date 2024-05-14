## Usage

### When to use

- When the list of options is large and search is required to help filter the list.
- When complex, structured content is required to be displayed within the options.

### When not to use

- To display a list of links (or buttons) in a menu, consider the [Dropdown](/components/dropdown) component instead.
- When a simple select is needed for a form, consider the [Select](/components/form/select) form component.
- As a means to filter an array of objects within a data set; e.g., when presented in a tabular format or list. Instead, consider other [filtering patterns](/patterns/filter-patterns).

## Components

### Single

Selection is limited to a single option item.

![Single selection example with list open](/assets/components/form/super-select/super-select-single-variant-text.png =504x*)

### Multiple

Multiple options can be selected.

![Multiple selection example with list open](/assets/components/form/super-select/super-select-multiple-variant.png =504x*)

## Trigger value states

**Empty**

The trigger is empty by default, indicating that nothing is selected.

![Showing an empty trigger, indicating to the user there is no option selected yet](/assets/components/form/super-select/super-select-trigger-empty.png)

**Placeholder text**

Placeholder text can be added to the trigger to provide the user additional context. However, this information should not be required for them to carry out a task.

![Showing placeholder text inside of the trigger, still indicating no selection is made, but with some additional guidance](/assets/components/form/super-select/super-select-trigger-placeholder-text.png)

**Filled**

When one or more values are selected, the trigger is populated with the selected value(s). One or more values can be pre-selected before user interaction, as needed.

![Showing preselected options in both a single and multiple variant. This helps show something has been preselected previously and the user can update their options](/assets/components/form/super-select/super-select-trigger-filled.png)

## Before and after options

The before and after options are areas above and below the list, independent from the list of options. Predefined components (like search) or custom content can occupy these spaces.

### BeforeOptions

BeforeOptions allows for either a search field or custom content to be displayed before the options list.

!!! Warning

Currently, the Multiple component includes search within an area of the trigger instead of displaying it in the beforeOptions. This causes a nested interaction which is an accessibility violation. We are in the process of working with the Ember Power Select maintainers to resolve this issue and make it the same as in the Single component.

!!!

#### Search

If enabled, search allows the user to filter results based on a query.

![Search enabled before the list in both Single and Multiple components](/assets/components/form/super-select/super-select-before-options-search.png =836x*)

#### CustomContent

If enabled, custom content will occupy this space.

![Custom content enabled before the list in both Single and Multiple components](/assets/components/form/super-select/super-select-before-options-custom-content.png =836x*)

!!! Dont

We recommend against placing heavy UI elements in custom content as it can draw attention away from the list options and will only be visible when the menu is open. Consider placing such content outside the list relative to the trigger for better visibility.

![Custom content enabled before the list in both Single and Multiple components](/assets/components/form/super-select/super-select-dont-visually-heavy.png =836x*)

!!!

### AfterOptions

AfterOptions allows for either a standardized footer or custom content to be displayed after the options list. The footer has additional functionality in the Multiple component compared to the Single.

#### Footer

By default, the footer displays below the options list and contains content and/or buttons which provide additional context or functions related to the options.

##### Single

The footer for the Single component includes a total count, which is customizable to fit the context.

![Custom content enabled before the list in both Single and Multiple components](/assets/components/form/super-select/super-select-single-variant-footer-with-counter.png)

##### Multiple

The footer for the Multiple component includes buttons to modify the options and a count of the number of options selected out of the total.

![Custom content enabled before the list in both Single and Multiple components](/assets/components/form/super-select/super-select-multiple-variant-footer.png)

The “Show selected” button displays only the selected options in the list. When toggled, the text changes to “Show all.”

![Flow showing the behavior of the show selected button and how it toggles the list to only display selected list items](/assets/components/form/super-select/super-select-flow-select-all.png)

If “Show selected” is toggled when no options have been selected, a message will appear notifying the user.

![Flow showing the behavior of the show selected button when no selections have been made yet.](/assets/components/form/super-select/super-select-flow-no-selections-select-all.png)

The “Clear selected” button clears all selections and reverts the Super Select to its default/deselected state. This button is hidden if no options are selected.

![Flow showing the behavior of the clear selected button and how it reverts the Super Select's state to the default one](/assets/components/form/super-select/super-select-flow-clear-selected.png)

##### Footer with custom content

The footer can contain custom content instead of the default content. This is helpful in maintaining the standard appearance of the footer container while allowing for custom usage.

![Showing the footer with custom content inside.](/assets/components/form/super-select/super-select-single-multiple-footer-custom-content.png =836x*) 

#### CustomContent

If enabled, custom content will occupy this space.

![Showing the afterOptions slot with custom content](/assets/components/form/super-select/super-select-after-options-custom-content.png =836x*)

## List

### Positioning

Lists can be positioned to the left or right, as well as above or below the trigger as necessary to fit within the UI. These options are only available when `matchTriggerWidth` is set to `false`. This effects the ember component only.

![Showing the different list positions (left, right + top and bottom)](/assets/components/form/super-select/super-select-list-positioning.png =836x*)

### Width

By default, the width of the list matches the trigger width.

![Showing the list's width matching the trigger's](/assets/components/form/super-select/super-select-list-width-matching.png)

#### Auto width

If the list width is set to “auto" it will match the width of the longest list item, which may result in the list being narrower or wider than the trigger width. A `max-width` can also be defined for the list.

![Showing the list's auto width, resizing to the longest list item](/assets/components/form/super-select/super-select-list-width-auto.png)

## ListItem Types

There are four types of ListItems, two of which are component-specific.

- `Checkmark` is used in the Single component to indicate a selection has been made.
- `Checkbox` is used in the Multiple component to indicate that more than one option can be selected.
- `Title` is used to group ListItems together and help visually organize groups.
- `Separator` is used to create a visual separation between groups.

![Showing the different list types](/assets/components/form/super-select/super-select-list-item-types.png)

## Groups

ListItems can be grouped visually by adding a title and a separator. The last group in the list doesn’t require a separator.

![Groups of list items represented in both Single and Multiple components](/assets/components/form/super-select/super-select-group-list-items.png =836x*)

## Required and optional

For complex forms, required fields should be indicated. This is the most explicit and transparent method to ensure users don’t have to make assumptions. Read more about best practices for [marking required fields in forms](https://www.nngroup.com/articles/required-fields/).

![Showing required next to the label for the Super Select](/assets/components/form/super-select/super-select-required.png )

For shorter, simpler forms (e.g., login/signup and feedback requests), indicate optional fields instead.

![Showing optional next to the label for the Super Select](/assets/components/form/super-select/super-select-optional.png )

## Error validation

For error validation recommendations, refer to the [Form patterns](/patterns/form-patterns?tab=validation) documentation.

## Content

For general content recommendations, refer to the [Primitives](/components/form/primitives) documentation.

### Options list

- Keep option content clear and concise; avoid full sentences.
- Avoid repeating the same word at the beginning of list options.
- Order the options in a logical way based on the use case. For example:
    - default or most commonly selected options first
    - alphabetically
    - numerically
