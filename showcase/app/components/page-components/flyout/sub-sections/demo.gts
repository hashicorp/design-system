/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentWithTrigger from 'showcase/components/page-components/flyout/code-fragments/with-trigger';

import {
  HdsButton,
  HdsButtonSet,
  HdsDropdown,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

export default class SubSectionDemo extends Component {
  @tracked deactivateFlyoutOnSubmitValidationError = false;

  // Methods for form validation flyout functionality
  deactivateFlyoutOnSubmit = (closeFlyout: () => void, event: Event) => {
    event.preventDefault(); // Prevent page reload

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const value = formData.get('deactivate-flyout-on-submit__input');

      if (!value) {
        this.deactivateFlyoutOnSubmitValidationError = true;
      } else {
        this.deactivateFlyoutOnSubmitValidationError = false;
        // Close the flyout when validation passes
        closeFlyout();
      }
    }
  };

  <template>
    <ShwTextH2>Demo</ShwTextH2>

    <CodeFragmentWithTrigger
      @triggerText="Open medium flyout"
      id="medium-flyout"
    >
      <:flyout as |F|>
        <F.Header>
          Medium flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Aliquam ac enim iaculis, faucibus enim id, dapibus quam. Nunc nibh
            mi, vehicula sed enim eget, lacinia venenatis tortor. Quisque vitae
            accumsan est, eu vehicula arcu. Pellentesque ut turpis tortor.
            Curabitur eu turpis nec tellus vehicula imperdiet finibus in magna.
            Fusce tincidunt condimentum tristique. Ut mauris enim, finibus
            pulvinar vulputate at, ultrices ut purus. Aenean tincidunt eros a
            scelerisque blandit. Praesent vel fermentum velit, nec sodales
            turpis. Suspendisse ac rhoncus urna. Donec fermentum, justo aliquam
            facilisis sodales, quam magna pulvinar turpis, ut commodo diam ex ut
            arcu. Ut suscipit nisi sed bibendum pretium. Quisque efficitur, arcu
            quis congue consectetur, ex lorem euismod arcu, id viverra velit
            lacus non odio. Vestibulum ac mauris tortor. Pellentesque nec
            dignissim libero.
          </p>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Duis euismod semper egestas. Vivamus consectetur augue eu mattis
            suscipit. Ut libero ipsum, sollicitudin a ornare ornare, consectetur
            eget mauris. Pellentesque sodales ligula eget purus congue molestie.
            Vivamus dolor magna, condimentum at consectetur vestibulum, mollis a
            purus. Aliquam malesuada arcu quis orci imperdiet accumsan. Donec
            pharetra odio libero, id cursus ipsum tristique vitae. Morbi
            placerat hendrerit massa vel varius. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Donec
            maximus porttitor ipsum, sed ultricies est fermentum at. In
            dignissim luctus ex vel condimentum.
          </p>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Nulla facilisi. Mauris consequat vehicula nunc, ut rutrum elit
            posuere quis. Duis convallis elit ac nibh viverra dapibus. Quisque
            eu laoreet arcu, in pharetra sapien. Nulla velit urna, elementum non
            dignissim in, gravida et dui. Praesent tincidunt vel leo sed ornare.
            Proin finibus metus dictum odio blandit dictum. Donec ipsum tellus,
            molestie nec aliquam sit amet, sollicitudin non neque. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </F.Body>
        <F.Footer as |FF|>
          <HdsButton type="button" @text="Primary" {{on "click" FF.close}} />
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Open large flyout"
      @size="large"
      id="large-flyout"
    >
      <:flyout as |F|>
        <F.Header>
          Large flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Aliquam ac enim iaculis, faucibus enim id, dapibus quam. Nunc nibh
            mi, vehicula sed enim eget, lacinia venenatis tortor. Quisque vitae
            accumsan est, eu vehicula arcu. Pellentesque ut turpis tortor.
            Curabitur eu turpis nec tellus vehicula imperdiet finibus in magna.
            Fusce tincidunt condimentum tristique. Ut mauris enim, finibus
            pulvinar vulputate at, ultrices ut purus. Aenean tincidunt eros a
            scelerisque blandit. Praesent vel fermentum velit, nec sodales
            turpis. Suspendisse ac rhoncus urna. Donec fermentum, justo aliquam
            facilisis sodales, quam magna pulvinar turpis, ut commodo diam ex ut
            arcu. Ut suscipit nisi sed bibendum pretium. Quisque efficitur, arcu
            quis congue consectetur, ex lorem euismod arcu, id viverra velit
            lacus non odio. Vestibulum ac mauris tortor. Pellentesque nec
            dignissim libero.
          </p>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Duis euismod semper egestas. Vivamus consectetur augue eu mattis
            suscipit. Ut libero ipsum, sollicitudin a ornare ornare, consectetur
            eget mauris. Pellentesque sodales ligula eget purus congue molestie.
            Vivamus dolor magna, condimentum at consectetur vestibulum, mollis a
            purus. Aliquam malesuada arcu quis orci imperdiet accumsan. Donec
            pharetra odio libero, id cursus ipsum tristique vitae. Morbi
            placerat hendrerit massa vel varius. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Donec
            maximus porttitor ipsum, sed ultricies est fermentum at. In
            dignissim luctus ex vel condimentum.
          </p>
        </F.Body>
        <F.Footer as |FF|>
          <HdsButtonSet>
            <HdsButton type="submit" @text="Primary" {{on "click" FF.close}} />
            <HdsButton
              type="button"
              @text="Secondary"
              @color="secondary"
              {{on "click" FF.close}}
            />
          </HdsButtonSet>
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger id="dropdown-initiated-flyout">
      <:trigger as |T|>
        <HdsDropdown @listPosition="bottom-left" @isInline={{true}} as |D|>
          <D.ToggleButton
            @color="secondary"
            @size="small"
            @text="Open flyout via dropdown"
          />
          <D.Interactive {{on "click" T.openFlyout}}>
            Open flyout
          </D.Interactive>
        </HdsDropdown>
      </:trigger>
      <:flyout as |F|>
        <F.Header>
          Flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Flyout
            content</p>
        </F.Body>
        <F.Footer as |FF|>
          <HdsButton type="button" @text="Confirm" {{on "click" FF.close}} />
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      id="dropdown-initiated-flyout-with-returned-focus"
      @returnFocusTo="dropdown-initiated-flyout-with-returned-focus-toggle"
    >
      <:trigger as |T|>
        <HdsDropdown @listPosition="bottom-left" @isInline={{true}} as |D|>
          <D.ToggleButton
            id="dropdown-initiated-flyout-with-returned-focus-toggle"
            @color="secondary"
            @size="small"
            @text="Open flyout via dropdown (with returned focus)"
          />
          <D.Interactive {{on "click" T.openFlyout}}>
            Open flyout
          </D.Interactive>
        </HdsDropdown>
      </:trigger>
      <:flyout as |F|>
        <F.Header>
          Flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Flyout
            content</p>
        </F.Body>
        <F.Footer as |FF|>
          <HdsButton type="button" @text="Confirm" {{on "click" FF.close}} />
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger
      @triggerText="Deactivated with `onClose`"
      id="deactivate-flyout-on-close"
    >
      <:flyout as |F|>
        <F.Header>
          Flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Clicking the
            "confirm" button executes the
            <code>F.close</code>
            method.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-top="12px"}}
          >This is equivalent to a manual dismiss (<code>Esc</code>
            key, click outside, click dismiss button) because they're all
            calling the same function, which invokes the native
            <code>close()</code>
            method of the
            <code>Dialog</code>
            HTML element, who then will cause the
            <code>willDestroyNode</code>
            action to execute.</p>
        </F.Body>
        <F.Footer as |FF|>
          <HdsButton type="button" @text="Confirm" {{on "click" FF.close}} />
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger id="deactivate-flyout-on-destruction">
      <:trigger as |T|>
        <button type="button" {{on "click" T.openFlyout}}>Deactivated on destroy</button>
      </:trigger>
      <:flyout as |F|>
        <F.Header>
          Flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Clicking the
            "confirm" button will directly remove the flyout from the DOM.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-top="12px"}}
          >This is not equivalent to a manual dismiss (<code>Esc</code>
            key, click outside, click dismiss button) because it will trigger
            directly the
            <code>willDestroyNode</code>
            action.</p>
        </F.Body>
        <F.Footer>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Deactivated on form submit"
      id="deactivate-flyout-on-submit"
    >
      <:flyout as |F|>
        <F.Header>
          Flyout title
        </F.Header>
        <F.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Clicking the
            "confirm" button will submit the form and the associated action will
            remove the flyout from the DOM.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin="12px 0 32px"}}
          >This is not equivalent to a manual dismiss (<code>Esc</code>
            key, click outside, click dismiss button) because it will directly
            trigger the
            <code>willDestroyNode</code>
            action.</p>
          <form
            id="deactivate-flyout-on-submit__form"
            aria-label="Deactivate Flyout on submit form"
            {{on "submit" (fn this.deactivateFlyoutOnSubmit F.close)}}
          >
            <HdsFormTextInputField
              name="deactivate-flyout-on-submit__input"
              as |FF|
            >
              <FF.Label>Fill in this input</FF.Label>
              <FF.HelperText>This is a fake input, used to emulate validation on
                submit</FF.HelperText>
              {{#if this.deactivateFlyoutOnSubmitValidationError}}
                <FF.Error>Fill in the input above</FF.Error>
              {{/if}}
            </HdsFormTextInputField>
          </form>
        </F.Body>
        <F.Footer as |FF|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="Confirm"
              form="deactivate-flyout-on-submit__form"
            />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" FF.close}}
            />
          </HdsButtonSet>
        </F.Footer>
      </:flyout>
    </CodeFragmentWithTrigger>
  </template>
}
