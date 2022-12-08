#### Browser support

The `Hds::Modal` component leverages the `<dialog>` element which is currently supported by all major browser vendors. To ensure support on older browser versions (for example, Safari 14 or Internet Explorer 11) we rely on [a polyfill](https://github.com/GoogleChrome/dialog-polyfill) that is automatically loaded when needed.

#### Page scroll

When an `Hds::Modal` component is open the rest of the page becomes inert. However, scrolling at the page level is still available. To make it clear to the users that the underlying elements are not interactive and to avoid confusion, we recommend disabling the page scroll `onOpen` and enabling it back `onClose` (for example, by setting `overflow: hidden;` and `overflow: auto;` respectively) by applying it to the `<body>` element.

#### Positioning

As an overlaying component, the `Hds::Modal` requires a high value on the z-axis. We are currently setting `50` as a default value, but we recommend you review the `z-index` values used across the project and either adjust them accordingly or increase this value by defining an override.

#### Focus trap

This component uses [`ember-focus-trap`](https://github.com/josemarluedke/ember-focus-trap) to prevent the focus from going outside the modal and to deactivate the modal when clicking outside the modal. This Ember modifier requires at least one interactive element to be present within the modal, which is by default achieved by the dismiss button in the header.

#### Basic use

The simplest way to invoke a modal is by doing something like this:

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

Note: When a modal dialog is open with the keyboard, the focus is automatically set to the first focusable element inside the dialog, which is the "Dismiss" button. The action of this button has no effect on the system, so focusing on it helps prevent users from accidentally confirming.

#### Form within a modal dialog

When the modal dialog contains information that might be lost on close, we recommend using a confirmation message before discarding it.

```handlebars
<Hds::Button
  @text="Open form modal"
  @color="secondary"
  {{on "click" (fn this.activateModal "formModalActive")}}
/>

{{#if this.formModalActive}}
  <Hds::Modal
    id="form-modal"
    @isDismissDisabled={{this.isModalDismissDisabled}}
    @onClose={{fn this.checkBeforeDeactivate "formModalActive"}}
    as |M|
  >
    <M.Header>
      Why do you want to leave the beta?
    </M.Header>
    <M.Body>
      <form {{on "change" this.markFormAsChanged}} name="leaving-beta-form">
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
          {{on "click" (fn this.saveFormAndClose "formModalActive")}}
        />
        <Hds::Button type="button" @text="Cancel" @color="secondary" {{on "click" F.close}} />
      </Hds::ButtonSet>
    </M.Footer>
  </Hds::Modal>
{{/if}}
```

Note: If a modal dialog contains interactive elements, such as a form, the initial focus should be set on the first input, which is the first focusable element within the form. This can be achieved by setting the `autofocus` property on the first form element.