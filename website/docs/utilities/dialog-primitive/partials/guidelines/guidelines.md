## Usage

The DialogPrimitive sub-components are not intended to be used independently of each other or in isolation. If you are looking to create your own dialog-based component, use the `DialogPrimitive::Wrapper` as your foundation.

Some examples may include:

- A dialog element that is inline with the main page content and does not overlay the page. This is often referred to as a "non-modal" dialog.
- Building your own custom dialog element if neither the [Modal](/components/modal) or [Flyout](/components/flyout) are suitable.

### What is a "dialog"

The term "dialog" has somewhat of a loaded meaning and depending on the context, can be either an ambiguous high-level term, or have a specific semantic meaning. For example:

- Broadly; the term dialog can refer to the interaction between a user and a application or machine and encourages a bidirectional exchange of information between the two.
- Specifically: a dialog can refer to a semantic `<dialog>` element in `HTML`. This element can be further broken down further into modal and non-modal dialogs, more details of which can be found in the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog).

### Within HDS components

An example of how to use the DialogPrimitive components can be found in both the HDS [Modal](/components/modal) and [Flyout](/components/flyout) components are composed using the DialogPrimitive. They are both considered dialogs, but have somewhat different use cases depending the context, type of information they express, and intended speed of interaction.

---

#### Title Icon
- Can be optionally displayed.
- Purely decorative. Is the visual flourish to the title and, if displayed, the tagline.

#### Tagline
- Can be optionally displayed.
- Is used to maintain context of the dialog's feature, function or flow in which it was triggered by.
- Should be limited to a couple of words.

#### Title
- Is required
- Must explain or provide context to the body's content

#### Dismiss Button
- Is required
- Allows the user to close the dialog on click (or pressing the `escape` key)

### DialogPrimitive::Description
- Can be optionally displayed.
- This text is used to provide additional information regarding the dialog

### DialogPrimitive::Body
- Is required
- A container of content, ranging from text to simple or complex forms

### DialogPrimitive::Footer
- Is required
- Can have up to three call to actions
- Reference [button content](/components/button#content) for text guidelines