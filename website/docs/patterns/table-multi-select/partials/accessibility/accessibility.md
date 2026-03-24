!!! Info

It is the responsibility of consumers to implement this pattern and to ensure that all accessibility success criteria are met or exceeded.
!!!

## Aria role

Due to its dynamic nature, updates to the selected count must be announced to those using assistive technology. This can be done by adding [`role=status`](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22) to the element containing the count.

This is a _representative_ example of how this could be accomplished using HDS components and `role=status` to announce changes in the UI. Test it yourself by enabling VoiceOver and incrementing the `selectedCount` with the "Add to count" button.

[[code-snippets/multi-select-a11y]]
