/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import NOOP from 'showcase/utils/noop';
import CodeFragmentWithTrigger from '../code-fragments/with-trigger';

import {
  HdsButton,
  HdsButtonSet,
  HdsFormSelectField,
  HdsFormTextareaField,
  HdsTabs,
  HdsDropdown,
  HdsFormSuperSelectSingleBase,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

export default class SubSectionDemo extends Component {
  @tracked isDismissDisabled: boolean | undefined = undefined;
  @tracked deactivateModalOnSubmitValidationError = false;

  superSelectOptions = ['Option 1', 'Option 2', 'Option 3'];
  superSelectSelectedOption = this.superSelectOptions[0];

  // Methods for non-dismissable modal functionality
  enableDismissDisabled = () => {
    this.isDismissDisabled = true;
  };

  disableDismissDisabled = () => {
    this.isDismissDisabled = undefined;
  };

  resetIsDismissDisabled = () => {
    this.isDismissDisabled = false;
  };

  // Methods for form validation modal functionality
  deactivateModalOnSubmit = (closeModal: () => void, event: Event) => {
    event.preventDefault(); // Prevent page reload

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const value = formData.get('deactivate-modal-on-submit__input');

      if (!value) {
        this.deactivateModalOnSubmitValidationError = true;
      } else {
        this.deactivateModalOnSubmitValidationError = false;
        // Close the modal when validation passes
        closeModal();
      }
    }
  };

  <template>
    <ShwTextH2>Demo</ShwTextH2>

    <CodeFragmentWithTrigger @triggerText="Open basic modal" id="basic-modal">
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Modal content
          </p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Open long content modal"
      id="long-modal"
      @size="small"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Sed ut perspiciatis
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
            exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid
            ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui
            in ea voluptate velit esse quam nihil molestiae consequatur, vel
            illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero
            eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas
            molestias excepturi sint occaecati cupiditate non provident,
            similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus id quod maxime placeat
            facere possimus, omnis voluptas assumenda est, omnis dolor
            repellendus. Temporibus autem quibusdam et aut officiis debitis aut
            rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint
            et molestiae non recusandae. Itaque earum rerum hic tenetur a
            sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat.</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger @triggerText="Open form modal" id="form-modal">
      <:modal as |M|>
        <M.Header>
          Why do you want to leave the beta?
        </M.Header>
        <M.Body>
          {{! template-lint-disable no-autofocus-attribute }}
          <form
            name="leaving-beta-form"
            aria-label="Leaving Beta Feedback Form"
          >
            <HdsFormSelectField autofocus @width="100%" as |F|>
              <F.Label>Select the primary reason</F.Label>
              <F.Options>
                <option></option>
              </F.Options>
            </HdsFormSelectField>
            <HdsFormTextareaField @isOptional={{true}} as |F|>
              <F.Label>Your feedback</F.Label>
            </HdsFormTextareaField>
          </form>
          {{! template-lint-enable no-autofocus-attribute }}
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="Leave Beta"
              {{on "click" M.close}}
            />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger @triggerText="Open tabs modal" id="tabs-modal">
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <HdsTabs as |T|>
            <T.Tab>One</T.Tab>
            <T.Tab>Two</T.Tab>
            <T.Tab>Three</T.Tab>
            <T.Panel>
              <p class="hds-typography-body-300 hds-foreground-primary">Content
                1</p>
            </T.Panel>
            <T.Panel>
              <p class="hds-typography-body-300 hds-foreground-primary">Content
                2</p>
            </T.Panel>
            <T.Panel>
              <p class="hds-typography-body-300 hds-foreground-primary">Content
                3</p>
            </T.Panel>
          </HdsTabs>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger
      @triggerText="Open dropdown modal"
      id="dropdown-modal"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.</p>
          <HdsDropdown @listPosition="bottom-left" as |dd|>
            <dd.ToggleButton @text="Generic dropdown" />
            <dd.Interactive @href="#">Lorem</dd.Interactive>
            <dd.Interactive @href="#">Ipsum</dd.Interactive>
            <dd.Interactive @href="#">Dolor</dd.Interactive>
          </HdsDropdown>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Open super-select modal (base)"
      id="superselect-modal-base"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.</p>
          <HdsFormSuperSelectSingleBase
            @options={{this.superSelectOptions}}
            @selected={{this.superSelectSelectedOption}}
            @verticalPosition="below"
            @onChange={{NOOP}}
            @ariaLabel="Label"
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectSingleBase>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Open super-select modal (with search) [bug]"
      id="superselect-modal-with-search-bug"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.</p>
          <HdsFormSuperSelectSingleBase
            @options={{this.superSelectOptions}}
            @selected={{this.superSelectSelectedOption}}
            @searchEnabled={{true}}
            @initiallyOpened={{true}}
            @verticalPosition="below"
            @ariaLabel="Label"
            @onChange={{NOOP}}
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectSingleBase>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Open super-select modal (with search) [fix]"
      id="superselect-modal-with-search-fix"
      class="shw-component-modal-with-super-select-fix-overflow"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.</p>
          <HdsFormSuperSelectSingleBase
            @options={{this.superSelectOptions}}
            @selected={{this.superSelectSelectedOption}}
            @onChange={{NOOP}}
            @searchEnabled={{true}}
            @initiallyOpened={{true}}
            @verticalPosition="below"
            @ariaLabel="Label"
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectSingleBase>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger
      @triggerText="Open non-dismissable modal"
      id="dismiss-disabled-modal"
      @isDismissDisabled={{this.isDismissDisabled}}
      @onOpen={{this.enableDismissDisabled}}
      @onClose={{this.disableDismissDisabled}}
    >
      <:modal as |M|>
        <M.Header>
          Try to close this modal
        </M.Header>
        <M.Body>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-bottom="12px"}}
          >When this modal is opened, the
            <code>isDismissDisabled</code>
            argument is set to
            <code>true</code>, so it can't be dismissed (not by clicking the
            cancel button or the close button, nor clicking on the overlay area
            or via
            <code>esc</code>
            key).</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin="12px 0"}}
          >Click this button to reset the variable to
            <code>false</code>
            and go back to its normal state, where you should be able to close
            it.</p>
          <button
            type="button"
            {{style padding=".25rem"}}
            {{on "click" this.resetIsDismissDisabled}}
          >Reset
            <code>isDismissDisabled</code></button>
          <pre>this.isDismissDisabled = {{this.isDismissDisabled}}</pre>
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger id="dropdown-initiated-modal">
      <:trigger as |T|>
        <HdsDropdown @listPosition="bottom-left" @isInline={{true}} as |D|>
          <D.ToggleButton
            @color="secondary"
            @size="small"
            @text="Open modal via dropdown"
          />
          <D.Interactive {{on "click" T.openModal}}>
            Open modal
          </D.Interactive>
        </HdsDropdown>
      </:trigger>
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal
            content</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      id="dropdown-initiated-modal-with-returned-focus"
      @returnFocusTo="dropdown-initiated-modal-with-returned-focus-toggle"
    >
      <:trigger as |T|>
        <HdsDropdown @listPosition="bottom-left" @isInline={{true}} as |D|>
          <D.ToggleButton
            id="dropdown-initiated-modal-with-returned-focus-toggle"
            @color="secondary"
            @size="small"
            @text="Open modal via dropdown (with returned focus)"
          />
          <D.Interactive {{on "click" T.openModal}}>
            Open modal
          </D.Interactive>
        </HdsDropdown>
      </:trigger>
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal
            content</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <br />
    <br />

    <CodeFragmentWithTrigger
      @triggerText="Deactivated with `onClose`"
      id="deactivate-modal-on-close"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
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
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Deactivated on destroy"
      id="deactivate-modal-on-destruction"
    >
      <:modal as |M|>
        {{! template-lint-disable no-duplicate-landmark-elements }}
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Clicking the
            "confirm" button will directly remove the modal from the DOM.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin-top="12px"}}
          >This is not equivalent to a manual dismiss (<code>Esc</code>
            key, click outside, click dismiss button) because it will directly
            trigger the
            <code>willDestroyNode</code>
            action.</p>
        </M.Body>
        <M.Footer>
          <HdsButton type="button" @text="Confirm" {{on "click" M.close}} />
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>

    <CodeFragmentWithTrigger
      @triggerText="Deactivated on form submit"
      id="deactivate-modal-on-submit"
    >
      <:modal as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Clicking the
            "confirm" button will submit the form and the associated action will
            remove the modal from the DOM.</p>
          <p
            class="hds-typography-body-200 hds-foreground-primary"
            {{style margin="12px 0 32px"}}
          >This is not equivalent to a manual dismiss (<code>Esc</code>
            key, click outside, click dismiss button) because it will directly
            trigger the
            <code>willDestroyNode</code>
            action.</p>
          {{! template-lint-disable no-duplicate-landmark-elements }}
          <form
            id="deactivate-modal-on-submit__form"
            aria-label="Deactivate Modal On Submit Form"
            {{on "submit" (fn this.deactivateModalOnSubmit M.close)}}
          >
            <HdsFormTextInputField
              name="deactivate-modal-on-submit__input"
              as |F|
            >
              <F.Label>Fill in this input</F.Label>
              <F.HelperText>This is a fake input, used to emulate validation on
                submit</F.HelperText>
              {{#if this.deactivateModalOnSubmitValidationError}}
                <F.Error>Fill in the input above</F.Error>
              {{/if}}
            </HdsFormTextInputField>
          </form>
          {{! template-lint-enable no-duplicate-landmark-elements }}
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="Confirm"
              form="deactivate-modal-on-submit__form"
            />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </:modal>
    </CodeFragmentWithTrigger>
    {{! template-lint-enable no-autofocus-attribute }}
  </template>
}
