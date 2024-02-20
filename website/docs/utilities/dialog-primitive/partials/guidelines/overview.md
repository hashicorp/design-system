Dialog Primitives are building blocks that help contruct dialog-based components.

- `DialogPrimitive::Wrapper` is the structure that contains and arranges all other dialog primitives
- `DialogPrimitive::Header` is where an optionally toggled icon, optionally toggled tagline, title and dismiss button are housed
- `DialogPrimitive::Description` is the descriptive text of a dialog, which can also be optionally displayed
- `DialogPrimitive::Body` is the generic container that houses content from simple text, to complex forms
- `DialogPrimitive::Footer` is the container for call to actions for the body content

These primitives are not intended to be used independently of each other or separate from the DialogPrimitive Wrapper. If you are looking to create your own dialog-based component, use the DialogPrimitive Wrapper as your foundation.