## What is a “dialog”

A dialog is both a [semantic HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) and a UX pattern in which a “conversation” occurs between the user and the system.

### Dialog types

There are two types of dialogs:

- **Modal**: A modal dialog is an interruptive experience that demands the user’s attention and renders the rest of the page inert. It is often coupled with an overlay to obscure the page underneath and requires user action to proceed. The [Modal component](/components/modal) is an example of this.

- **Non-modal**: A non-modal dialog minimizes interruption by allowing the user to continue interacting with the rest of the page. It does not always require user action and is often dismissed on its own. The [Toast component](/components/toast) is an example of this.

### Conversation types

Conversations between the user and the system can be:

- **One-way**: A conversation in which the system communicates directly to the user. One-way conversations are commonly initiated when the system’s state changes, e.g., by notifying the user of a successful background process. Non-modal dialogs are best used for one-way conversations.

- **Two-way**: A conversation between the system and the user. It is commonly initiated by a user action, e.g., interacting with a button, and often requires user engagement. Modal dialogs are best for two-way conversations.

### What a “dialog” isn’t

#### Form errors and alerts

When a form is submitted with errors, it’s common to show an alert before the form. This kind of experience is not considered a dialog because, although the system communicates the error to the user (conversational), alerts do not overlay the UI or interrupt the user’s workflow.

#### Tooltip or Rich Tooltip

While the Tooltip and Rich Tooltip overlay the UI and block content underneath, they display static informational content and are not seen as a conversation between the system and user.

## Creating custom dialogs

!!! Info

The DialogPrimitive sub-components are not intended to be used independently of each other or in isolation. If looking to create a dialog-based component, use the `DialogPrimitive::Wrapper` as the foundation.
!!!

A common example of a non-modal dialog is a SplitWindow, Panel, or Drawer. This type of component allows the user to interact with both the main page content and the content within the dialog.

![](/assets/components/dialog-primitives/dialog-primitive-non-modal-example.png)

_If you discover other use cases, [contact the Design Systems Team](/about/support) for assistance._