Dialog Primitives are used to assemble dialog components such as a modal or flyout.

- `DialogPrimitive::Wrapper` is the structure in how primitives are arranged
- `DialogPrimitive::Header` is the where an optionally toggled icon, optionally toggled icon, title and dismiss button are placed
- `DialogPrimitive::Description` is the descriptive text of a dialog, which can be optionally toggled on or off
- `DialogPrimitive::Body` is the generic container that houses content from simple text, to complex forms
- `DialogPrimitive::Footer` is the container for call to actions

Dialog Primitives are the building blocks for dialog components, and are not intended to be used independently of each other or seperate from the DialogPrimitive Wrapper.