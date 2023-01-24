## Browser support

The `Hds::Flyout` component leverages the `<dialog>` element which is currently supported by all major browser vendors. To ensure support on older browser versions (for example, Safari 14 or Internet Explorer 11) we rely on [a polyfill](https://github.com/GoogleChrome/dialog-polyfill) that is automatically loaded when needed.

## Page scroll

When an `Hds::Flyout` component is open, the rest of the page is disabled (via `inert`). However, scrolling at the page level is still available. To make it clear to the user that the underlying elements are not interactive and to avoid confusion, we recommend disabling the page scroll `onOpen` and enabling it back `onClose` (for example, by setting `overflow: hidden;` and `overflow: auto;` respectively) by applying it to the `<body>` element.

## Positioning

As an overlaying component, the `Hds::Flyout` requires a high value on the z-axis. We are currently setting `49` as a default value, but we recommend you review the `z-index` values used across your project and either adjust them accordingly or increase this value by defining an override.

## Focus trap

This component uses [`ember-focus-trap`](https://github.com/josemarluedke/ember-focus-trap) to prevent the focus from going outside the Flyout and to deactivate the Flyout when clicking outside. This Ember modifier requires at least one interactive element to be present within the Flyout, which is by default achieved by the dismiss button in the header.

## Basic use

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

!!! Info

When a Flyout is opened with the keyboard, the focus is automatically set to the first focusable element inside the Flyout, which is the "Dismiss" button.

!!!
