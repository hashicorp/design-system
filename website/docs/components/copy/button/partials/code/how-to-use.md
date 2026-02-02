## How to use this component

The basic invocation requires `text` and `targetToCopy` to be passed:

[[code-snippets/copy-button-basic]]

### Icon-only

[[code-snippets/copy-button-icon]]

### Sizes

The component supports `small` and `medium` sizes (`medium` is the default):

[[code-snippets/copy-button-small]]

### Full-width

This indicates that the component should take up the full-width of the parent container. It’s set to `false` by default.

[[code-snippets/copy-button-full-width]]

### Text to copy

The consumer can also indicate a string to be copied instead of indicating a target element:

[[code-snippets/copy-button-text-to-copy]]

### Composition with form inputs

These representative examples showcase the compositional recommendations in the [guidelines](/components/copy/button#composition-with-other-components) using the [Fieldset](/components/form/primitives?tab=code#formfieldset) primitive.

#### With single line inputs

[[code-snippets/copy-button-form-single-line]]

#### With multi-line inputs

[[code-snippets/copy-button-form-multi-line]]