## Usage

The DialogPrimitive sub-components are not intended to be used independently of each other or in isolation. If you are looking to create your own dialog-based component, use the `DialogPrimitive::Wrapper` as your foundation.

A common example of this is a non-modal dialog such as a SplitWindow or Panel, which allows the user to interact with both the main page content and the content within the dialog.

!!! Info

If you discover a use case outside of this example, please [contact](/about/support) the HDS team for assistance.
!!!

![Example of a non-modal example](/assets/components/dialog-primitives/dialog-primitive-non-modal-example.png)

### Use within HDS components

Examples of how to use the DialogPrimitive components can be found in the HDS [Modal](/components/modal) and [Flyout](/components/flyout) components which are composed using the DialogPrimitive. They are both types of dialogs, but have different use cases depending on the context and type of information they convey.

### What is a “dialog”

The term “dialog” has somewhat of a loaded meaning and, depending on the context, can be either an ambiguous high-level term or have a specific semantic meaning. For example:

- Broadly, the term dialog can refer to the interaction between a user and an application or machine that encourages a bidirectional exchange of information between the two.
- Specifically, a dialog can refer to a semantic `<dialog>` element in HTML. This element can be further broken down into modal and non-modal dialogs, more details of which can be found in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).