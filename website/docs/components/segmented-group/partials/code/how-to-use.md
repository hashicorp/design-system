## How to use this component

### Within a filter pattern

[[code-snippets/segmented-group-simple-filter]]

For complex filters we recommend grouping related filter criteria into a Segmented Group.

[[code-snippets/segmented-group-complex-filter]]

### Within a form

When used within a form we recommend using component composition, passing a `SegmentedGroup` in a [`Form::Field`](/components/form/primitives?tab=code#formfield-1). The `Form::Field` exposes two attributes, `id` and `ariaDescribedBy`, that are used to associate the input with the label, helper text, and error.

[[code-snippets/segmented-group-form]]

### Generic Segment

Use the `Generic` block to pass custom Segments to the group. The predefined Segments adjust their styles automatically depending on their placement within the group. You will need to ensure similar styling for your custom Segment.

[[code-snippets/segmented-group-generic]]
