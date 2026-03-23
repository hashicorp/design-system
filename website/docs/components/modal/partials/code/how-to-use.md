## Browser support

The Modal component leverages the `<dialog>` element which is [currently supported by all major browser vendors](https://caniuse.com/dialog).

## Page scroll

When a Modal is open, the rest of the page becomes inert. The page scrolling is also disabled by applying `overflow: hidden` to the `<body>` element, to make it clear to the user that the underlying elements are not interactive and to avoid confusion. Depending on users’ scroll bar settings, opening a Modal may cause slight layout shifts on the horizontal axis.

## Positioning

As an overlaying component, the `Hds::Modal` is rendered on the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), meaning it is always placed on top of all other elements in the page.

## Focus and focus trap

!!! info

Browsers use a variety of heuristics to decide when to visually show focus state based on what is considered most useful to users. For that reason, even though the Modal’s dismiss button is focused by default, it may not visually appear to be focused.

!!!

This component uses [`ember-focus-trap`](https://github.com/josemarluedke/ember-focus-trap) to prevent the focus from going outside the Modal and to dismiss the Modal when clicking outside the Modal. This Ember modifier requires at least one interactive element to be present within the Modal, which is by default achieved by the dismiss button in the header.

When a Modal is opened with the keyboard, the focus is automatically set to the first focusable element inside the Modal, which is the “Dismiss” button. The action of this button has no effect on the system, so focusing on it helps prevent users from accidentally confirming the Modal.

When the Modal has been closed, the browser automatically returns the focus to the element that initiated the opening. If that element doesn't exist anymore in the DOM (e.g., if the Modal is opened using an Interaction item in a Dropdown) the focus is returned to the `<body>` element. To avoid this side-effect (that comes with accessibility implications), it's possible to use the `@returnFocusTo` argument, where the consumer can provide the DOM `id` attribute of the element where the focus should be returned once the Modal is closed.

## How to use this component

[[code-snippets/modal-basic]]

### Form within a Modal dialog

If a Modal dialog presents a form, the initial focus should be set on the first input, as the first focusable element in the form. This can be achieved by setting the `autofocus` property on the first form input.

The `<form>` element should be placed in the yielded `Body` subcomponent. We also recommend associating it with the submit button using the `form` attribute, as shown below.

When the Modal dialog contains information that might be lost on close, use a confirmation message before discarding it.

[[code-snippets/modal-with-form]]
