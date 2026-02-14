## How to use this component

[[code-snippets/stepper-list-basic]]

### Indicating status

To change the status of a Step, set the `@status` argument in the `[S].Step` contextual component. The default status value is `incomplete`.

[[code-snippets/stepper-list-status]]

A `processing` status is used to indicate an ongoing process in the background, such as the user's data being submitted.

[[code-snippets/stepper-list-processing]]

### Additional information

Using the named `<:title>` block is required. Additional information for a step is added through the named blocks `<:description>` and `<:content>`.

[[code-snippets/stepper-list-blocks]]
