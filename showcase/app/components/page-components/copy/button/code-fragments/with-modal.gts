/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import {
  HdsButton,
  HdsButtonSet,
  HdsModal,
} from '@hashicorp/design-system-components/components';

import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

import CodeFragmentWithGenericDialogContent from 'showcase/components/page-components/copy/button/code-fragments/with-generic-dialog-content';

export interface CodeFragmentWithModalSignature {
  Element: HdsButtonSignature['Element'];
}

export default class CodeFragmentWithModal extends Component<CodeFragmentWithModalSignature> {
  @tracked isModalOpen = false;

  openModal = () => {
    this.isModalOpen = true;
  };

  closeModal = () => {
    this.isModalOpen = false;
  };

  <template>
    <HdsButton
      @color="secondary"
      @text="Open modal"
      {{on "click" this.openModal}}
    />
    {{#if this.isModalOpen}}
      <HdsModal id="test-copy-button-modal" @onClose={{this.closeModal}} as |M|>
        <M.Header>
          Lorem ipsum dolor
        </M.Header>
        <M.Body>
          <form name="test-copy-button-modal-form">
            <CodeFragmentWithGenericDialogContent />
          </form>
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="OK"
              {{on "click" this.closeModal}}
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
  </template>
}
