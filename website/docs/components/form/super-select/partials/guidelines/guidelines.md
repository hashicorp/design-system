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


## Before and after options
The before and after options are areas that sit above and below the list respectively, independent from the list items’ overflow. They allow for either predefined components (like search) or custom content to occupy these spaces.

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
The footer defaults to hidden, but when enabled shows a counter (selected count / total count). Either of the two texts are togglable and customizable to fit context.

![Custom content enabled before the list in both single and multiple variants](/assets/components/form/super-select/super-select-single-variant-footer-with-counter.png =626x*)

## Content

- {description}
- {description}
- {description}
- {description}
- {description}