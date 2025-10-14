/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsModal,
  HdsButton,
  HdsButtonSet,
  HdsFormSelectField,
  HdsFormTextareaField,
  HdsTabs,
  HdsDropdown,
  HdsFormSuperSelectSingleBase,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

interface ModalState {
  basicModalActive: boolean;
  longModalActive: boolean;
  formModalActive: boolean;
  tabsModalActive: boolean;
  dropdownModalActive: boolean;
  superselectModalActive1: boolean;
  superselectModalActive2: boolean;
  superselectModalActive3: boolean;
  dismissDisabledModalActive: boolean;
  dropdownInitiatedModalActive: boolean;
  dropdownInitiatedWithReturnedFocusModalActive: boolean;
  deactivateModalOnCloseActive: boolean;
  deactivateModalOnDestroyActive: boolean;
  deactivateModalOnSubmitActive: boolean;
}

export default class SubSectionDemo extends Component {
  @deepTracked modals: ModalState = {
    basicModalActive: false,
    longModalActive: false,
    formModalActive: false,
    tabsModalActive: false,
    dropdownModalActive: false,
    superselectModalActive1: false,
    superselectModalActive2: false,
    superselectModalActive3: false,
    dismissDisabledModalActive: false,
    dropdownInitiatedModalActive: false,
    dropdownInitiatedWithReturnedFocusModalActive: false,
    deactivateModalOnCloseActive: false,
    deactivateModalOnDestroyActive: false,
    deactivateModalOnSubmitActive: false,
  };

  @tracked isDismissDisabled: boolean | undefined = undefined;
  @tracked deactivateModalOnSubmitValidationError = false;

  superSelectOptions1 = ['Option 1', 'Option 2', 'Option 3'];
  superSelectSelectedOption1 = this.superSelectOptions1[0];
  superSelectOptions2 = ['Option 1', 'Option 2', 'Option 3'];
  superSelectSelectedOption2 = this.superSelectOptions2[0];
  superSelectOptions3 = ['Option 1', 'Option 2', 'Option 3'];
  superSelectSelectedOption3 = this.superSelectOptions3[0];

  activateModal = (modal: keyof ModalState) => {
    this.modals[modal] = true;

    if (modal === 'dismissDisabledModalActive') {
      this.isDismissDisabled = true;
    }
  };

  deactivateModal = (modal: keyof ModalState) => {
    this.modals[modal] = false;

    if (modal === 'dismissDisabledModalActive') {
      this.isDismissDisabled = undefined;
    }
  };

  deactivateModalOnSubmit = (event: Event) => {
    event.preventDefault(); // Prevent page reload

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const value = formData.get('deactivate-modal-on-submit__input');

      if (!value) {
        this.deactivateModalOnSubmitValidationError = true;
      } else {
        this.deactivateModalOnSubmitValidationError = false;
        this.modals.deactivateModalOnSubmitActive = false;
      }
    }
  };

  resetIsDismissDisabled = () => {
    this.isDismissDisabled = false;
  };

  noop = () => {
    // no-op for demo purposes
  };

  <template>
    <ShwTextH2>Demo</ShwTextH2>

    <button
      type="button"
      {{on "click" (fn this.activateModal "basicModalActive")}}
    >Open basic modal</button>

    {{#if this.modals.basicModalActive}}
      <HdsModal
        id="basic-modal"
        @onClose={{fn this.deactivateModal "basicModalActive"}}
        as |M|
      >
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
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "longModalActive")}}
    >Open long content modal</button>

    {{#if this.modals.longModalActive}}
      <HdsModal
        id="long-modal"
        @size="small"
        @onClose={{fn this.deactivateModal "longModalActive"}}
        as |M|
      >
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
      </HdsModal>
    {{/if}}

    <br />
    <br />

    <button
      type="button"
      {{on "click" (fn this.activateModal "formModalActive")}}
    >Open form modal</button>

    {{! template-lint-disable no-autofocus-attribute }}
    {{#if this.modals.formModalActive}}
      <HdsModal
        id="form-modal"
        @onClose={{fn this.deactivateModal "formModalActive"}}
        as |M|
      >
        <M.Header>
          Why do you want to leave the beta?
        </M.Header>
        <M.Body>
          <form name="leaving-beta-form">
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
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="Leave Beta"
              {{on "click" (fn this.deactivateModal "formModalActive")}}
            />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "tabsModalActive")}}
    >Open tabs modal</button>

    {{#if this.modals.tabsModalActive}}
      <HdsModal
        id="tabs-modal"
        @onClose={{fn this.deactivateModal "tabsModalActive"}}
        as |M|
      >
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
      </HdsModal>
    {{/if}}

    <br />
    <br />

    <button
      type="button"
      {{on "click" (fn this.activateModal "dropdownModalActive")}}
    >Open dropdown modal</button>

    {{#if this.modals.dropdownModalActive}}
      <HdsModal
        id="dropdown-modal"
        @onClose={{fn this.deactivateModal "dropdownModalActive"}}
        as |M|
      >
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
            <dd.ToggleButton @text="Menu" />
            <dd.Interactive @href="#">Create</dd.Interactive>
            <dd.Interactive @href="#">Edit</dd.Interactive>
          </HdsDropdown>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "superselectModalActive1")}}
    >Open super-select modal (base)</button>

    {{#if this.modals.superselectModalActive1}}
      <HdsModal
        id="superselect-modal1"
        @onClose={{fn this.deactivateModal "superselectModalActive1"}}
        as |M|
      >
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
            @options={{this.superSelectOptions1}}
            @selected={{this.superSelectSelectedOption1}}
            @onChange={{this.noop}}
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectSingleBase>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "superselectModalActive2")}}
    >Open super-select modal (with search) [bug]</button>

    {{#if this.modals.superselectModalActive2}}
      <HdsModal
        id="superselect-modal2"
        @onClose={{fn this.deactivateModal "superselectModalActive2"}}
        as |M|
      >
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
            @options={{this.superSelectOptions2}}
            @selected={{this.superSelectSelectedOption2}}
            @onChange={{this.noop}}
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectSingleBase>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "superselectModalActive3")}}
    >Open super-select modal (with search) [fix]</button>

    {{#if this.modals.superselectModalActive3}}
      <HdsModal
        id="superselect-modal3"
        class="shw-component-modal-with-super-select-fix-overflow"
        @onClose={{fn this.deactivateModal "superselectModalActive3"}}
        as |M|
      >
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
            @options={{this.superSelectOptions3}}
            @selected={{this.superSelectSelectedOption3}}
            @onChange={{this.noop}}
            as |option|
          >
            {{option}}
          </HdsFormSuperSelectSingleBase>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <br />
    <br />

    <button
      type="button"
      {{on "click" (fn this.activateModal "dismissDisabledModalActive")}}
    >Open non-dismissable modal</button>

    {{#if this.modals.dismissDisabledModalActive}}
      <HdsModal
        id="dismiss-disabled-modal"
        @isDismissDisabled={{this.isDismissDisabled}}
        @onClose={{fn this.deactivateModal "dismissDisabledModalActive"}}
        as |M|
      >
        <M.Header>
          Try to close this modal
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">You should
            not be able to close this modal by pressing the escape key. You can
            click the "X" in the top right corner of this modal to proceed.</p>
          <p class="hds-typography-body-300 hds-foreground-primary">The backdrop
            (overlay) is also disabled by default when
            <code>@isDismissDisabled</code>
            is
            <code>true</code>.</p>
          <p class="hds-typography-body-300 hds-foreground-primary">You also
            cannot use the "onClose" callback, but only the "close" method
            provided by the yielded object.</p>
          <br />
          <p class="hds-typography-body-300 hds-foreground-primary">If you want
            to proceed to the next demo, click the button below to get the "X"
            icon back, so you can close the modal. Then press the following
            button to restore the dismissal functionality.</p>
          <br />
          <p class="hds-typography-body-300 hds-foreground-primary">Notice: this
            approach is used mainly for showcase purposes, normally you should
            not toggle the "isDismissDisabled" property using buttons inside the
            modal; it should be something external to the modal that triggers
            the toggle of the property. For example, adding/removing
            <code>disabled</code>
            property to/from a form (on validation), or by using the
            action/callback methods provided by external services or helper
            functions.</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="button"
              @text="Restore dismiss capability"
              {{on "click" this.resetIsDismissDisabled}}
            />
            <HdsButton
              type="button"
              @text="Close"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    {{/if}}

    <br />
    <br />

    <HdsDropdown @listPosition="bottom-left" @isInline={{true}} as |D|>
      <D.ToggleButton
        @color="secondary"
        @size="small"
        @text="Open modal via dropdown"
      />
      <D.Interactive
        {{on "click" (fn this.activateModal "dropdownInitiatedModalActive")}}
      >
        Open modal
      </D.Interactive>
    </HdsDropdown>

    {{#if this.modals.dropdownInitiatedModalActive}}
      <HdsModal
        id="dropdown-initiated-modal"
        @onClose={{fn this.deactivateModal "dropdownInitiatedModalActive"}}
        as |M|
      >
        <M.Header>
          Modal opened from dropdown
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal
            content</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <HdsDropdown @listPosition="bottom-left" @isInline={{true}} as |D|>
      <D.ToggleButton
        id="dropdown-initiated-modal-with-returned-focus-toggle"
        @color="secondary"
        @size="small"
        @text="Open modal via dropdown (with returned focus)"
      />
      <D.Interactive
        {{on
          "click"
          (fn
            this.activateModal "dropdownInitiatedWithReturnedFocusModalActive"
          )
        }}
      >
        Open modal
      </D.Interactive>
    </HdsDropdown>

    {{#if this.modals.dropdownInitiatedWithReturnedFocusModalActive}}
      <HdsModal
        id="dropdown-initiated-modal-with-returned-focus"
        @onClose={{fn
          this.deactivateModal
          "dropdownInitiatedWithReturnedFocusModalActive"
        }}
        @returnFocusTo="dropdown-initiated-modal-with-returned-focus-toggle"
        as |M|
      >
        <M.Header>
          Modal with returned focus
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal
            content</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <br />
    <br />

    <button
      type="button"
      {{on "click" (fn this.activateModal "deactivateModalOnCloseActive")}}
    >Deactivated with onClose</button>

    {{#if this.modals.deactivateModalOnCloseActive}}
      <HdsModal
        id="deactivate-modal-on-close"
        @onClose={{fn this.deactivateModal "deactivateModalOnCloseActive"}}
        as |M|
      >
        <M.Header>
          Deactivated with
          <code>onClose</code>
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">This modal
            is closed/deactivated using the
            <code>onClose</code>
            callback. This means it will be closed when:</p>
          <ul class="hds-typography-body-300 hds-foreground-primary">
            <li>the user clicks on the "X" icon (header)</li>
            <li>the user clicks on the overlay/backdrop</li>
            <li>the user presses the "Escape" key</li>
          </ul>
          <p class="hds-typography-body-300 hds-foreground-primary">But it will
            <strong>not</strong>
            be closed when the user clicks the "Close" button below.</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Close" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "deactivateModalOnDestroyActive")}}
    >Deactivated on destroy</button>

    {{#if this.modals.deactivateModalOnDestroyActive}}
      <HdsModal
        id="deactivate-modal-on-destruction"
        @onClose={{fn this.deactivateModal "deactivateModalOnDestroyActive"}}
        as |M|
      >
        <M.Header>
          Deactivated on destroy
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">This modal
            is closed/deactivated using both the
            <code>onClose</code>
            callback
            <strong>and</strong>
            the
            <code>close</code>
            method. This means it will be closed both when the user interacts
            with the modal to close it (using the default methods) and when they
            click the "Close" button below.</p>
        </M.Body>
        <M.Footer>
          <HdsButtonSet>
            <HdsButton
              type="button"
              @text="Close"
              {{on
                "click"
                (fn this.deactivateModal "deactivateModalOnDestroyActive")
              }}
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    {{/if}}

    <button
      type="button"
      {{on "click" (fn this.activateModal "deactivateModalOnSubmitActive")}}
    >Deactivated on form submit</button>

    {{#if this.modals.deactivateModalOnSubmitActive}}
      <HdsModal
        id="deactivate-modal-on-submit"
        @onClose={{fn this.deactivateModal "deactivateModalOnSubmitActive"}}
        as |M|
      >
        <M.Header>
          Deactivated on form submit
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">This modal
            is closed/deactivated when the form is submitted. The modal will be
            closed/deactivated only if the form validation passes, otherwise it
            will remain open and show an error. This is just an example of how
            you can control the modal opening/closing using the modifier's
            cleanup function.</p>
          <form
            id="deactivate-modal-on-submit__form"
            {{on "submit" this.deactivateModalOnSubmit}}
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
      </HdsModal>
    {{/if}}
    {{! template-lint-enable no-autofocus-attribute }}
  </template>
}
