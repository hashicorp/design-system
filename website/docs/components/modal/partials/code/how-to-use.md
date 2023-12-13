## Browser support

The Modal component leverages the `<dialog>` element which is currently supported by all major browser vendors. To ensure support on older browser versions (e.g., Safari 14 or Internet Explorer 11) we rely on [a polyfill](https://github.com/GoogleChrome/dialog-polyfill) that is automatically loaded when needed.

## Page scroll

When a Modal is open, the rest of the page becomes inert. The page scrolling is also disabled by applying `overflow: hidden` to the `<body>` element, to make it clear to the user that the underlying elements are not interactive and to avoid confusion. Depending on users’ scroll bar settings, opening a Modal may cause slight layout shifts on the horizontal axis.

## Positioning

As an overlaying component, the `Hds::Modal` requires a high value on the z-axis. We are currently setting `50` as a default value, but we recommend you review the `z-index` values used across your project and either adjust them accordingly or increase this value by defining an override.

## Focus and focus trap

This component uses [`ember-focus-trap`](https://github.com/josemarluedke/ember-focus-trap) to prevent the focus from going outside the Modal and to dismiss the Modal when clicking outside the Modal. This Ember modifier requires at least one interactive element to be present within the Modal, which is by default achieved by the dismiss button in the header.

When a Modal is opened with the keyboard, the focus is automatically set to the first focusable element inside the Modal, which is the “Dismiss” button. The action of this button has no effect on the system, so focusing on it helps prevent users from accidentally confirming the Modal.

## How to use this component

```handlebars
<Hds::Button
  @text="Open basic modal"
  @color="secondary"
  {{on "click" (fn this.activateModal "basicModalActive")}}
/>

{{#if this.basicModalActive}}
  <Hds::Modal id="basic-modal" @onClose={{fn this.deactivateModal "basicModalActive"}} as |M|>
    <M.Header>
      Modal title
    </M.Header>
    <M.Body>
      <p class="hds-typography-body-300 hds-foreground-primary">Modal content</p>
    </M.Body>
    <M.Footer as |F|>
      <Hds::Button type="button" @text="Confirm" {{on "click" F.close}} />
    </M.Footer>
  </Hds::Modal>
{{/if}}
```

### Form within a Modal dialog

If a Modal dialog contains interactive elements, such as a form, the initial focus should be set on the first input, which is the first focusable element within the form. This can be achieved by setting the `autofocus` property on the first form element.

When the Modal dialog contains information that might be lost on close, use a confirmation message before discarding it.

```handlebars
<Hds::Button
  @text="Open form modal"
  @color="secondary"
  {{on "click" (fn this.activateModal "formModalActive")}}
/>

{{#if this.formModalActive}}
  <Hds::Modal
    id="form-modal"
    @onClose={{fn this.deactivateModal "formModalActive"}}
    as |M|
  >
    <M.Header>
      Why do you want to leave the beta?
    </M.Header>
    <M.Body>
      <form name="leaving-beta-form">
        <Hds::Form::Select::Field autofocus @width="100%" as |F|>
          <F.Label>Select the primary reason</F.Label>
          <F.Options>
            <option></option>
          </F.Options>
        </Hds::Form::Select::Field>
        <Hds::Form::Textarea::Field @isOptional={{true}} as |F|>
          <F.Label>Your feedback</F.Label>
        </Hds::Form::Textarea::Field>
      </form>
    </M.Body>
    <M.Footer as |F|>
      <Hds::ButtonSet>
        <Hds::Button type="submit" @text="Leave Beta"
          {{on "click" (fn this.deactivateModal "formModalActive")}}
        />
        <Hds::Button type="button" @text="Cancel" @color="secondary"
          {{on "click" F.close}}
        />
      </Hds::ButtonSet>
    </M.Footer>
  </Hds::Modal>
{{/if}}
```