## Browser support

The Flyout component leverages the `<dialog>` element which is [currently supported by all major browser vendors](https://caniuse.com/dialog).

## Page scroll

When a Flyout is open, the rest of the page becomes inert. The page scrolling is also disabled by applying `overflow: hidden` to the `<body>` element, to make it clear to the user that the underlying elements are not interactive and to avoid confusion. Depending on users’ scroll bar settings, opening a Flyout may cause slight layout shifts on the horizontal axis.

## Positioning

As an overlaying component, the `Hds::Flyout` is rendered on the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), meaning it is always placed on top of all other elements in the page.

## Focus trap

This component uses [`ember-focus-trap`](https://github.com/josemarluedke/ember-focus-trap) to prevent the focus from going outside the Flyout and to deactivate the Flyout when clicking outside. This Ember modifier requires at least one interactive element to be present within the Flyout, which is by default achieved by the dismiss button in the header.

## Focus and focus trap

This component uses [`ember-focus-trap`](https://github.com/josemarluedke/ember-focus-trap) to prevent the focus from going outside the Flyout and to dismiss the Flyout when clicking outside the Flyout. This Ember modifier requires at least one interactive element to be present within the Modal, which is by default achieved by the dismiss button in the header.

When a Modal is opened with the keyboard, the focus is automatically set to the first focusable element inside the Modal, which is the “Dismiss” button. The action of this button has no effect on the system, so focusing on it helps prevent users from accidentally confirming the Modal.

When the Flyout has been closed, the browser automatically returns the focus to the element that initiated the opening. If that element doesn't exist anymore in the DOM (e.g., if the Flyout is opened using an Interaction item in a Dropdown) the focus is returned to the `<body>` element. To avoid this side-effect (that comes with accessibility implications), it's possible to use the `@returnFocusTo` argument, where the consumer can provide the DOM `id` attribute of the element where the focus should be returned once the Flyout is closed.

## How to use this component

!!! Info

When a Flyout is opened with the keyboard, the focus is automatically set to the first focusable element inside the Flyout, which is the “Dismiss” button.

!!!

```handlebars
<Hds::Button
  @text="Open Flyout"
  @color="secondary"
  {{on "click" (fn this.activateFlyout "basicFlyoutActive")}}
/>

{{#if this.basicFlyoutActive}}
  <Hds::Flyout id="basic-flyout"
    @onClose={{fn this.deactivateFlyout "basicFlyoutActive"}} as |M|>
    <M.Header @tagline="Main page context" @icon="info">
      Additional information
    </M.Header>
    <M.Description>
      Lorem ipsum dolor sit amet consectetur.
      Ut ultrices id venenatis in felis auctor ante.
    </M.Description>
    <M.Body>
      <p class="hds-typography-body-300 hds-foreground-primary">
        Aliquam ac enim iaculis, faucibus enim id, dapibus quam.
        Nunc nibh mi, vehicula sed enim eget, lacinia venenatis tortor.
        Quisque vitae accumsan est, eu vehicula arcu.
      </p>
    </M.Body>
  </Hds::Flyout>
{{/if}}
```