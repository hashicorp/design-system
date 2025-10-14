/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { hash } from '@ember/helper';

import { HdsModal } from '@hashicorp/design-system-components/components';

// types
import type { HdsModalSignature } from '@hashicorp/design-system-components/components/hds/modal/index';

export interface CodeFragmentWithTriggerSignature {
  Args: {
    triggerText?: string;
    modalId: string;
    size?: HdsModalSignature['Args']['size'];
    color?: HdsModalSignature['Args']['color'];
    isDismissDisabled?: HdsModalSignature['Args']['isDismissDisabled'];
    returnFocusTo?: HdsModalSignature['Args']['returnFocusTo'];
    class?: string;
    onOpen?: HdsModalSignature['Args']['onOpen'];
    onClose?: HdsModalSignature['Args']['onClose'];
  };
  Blocks: {
    trigger: [{ openModal: () => void }];
    modal: [
      HdsModalSignature['Blocks']['default'][0] & {
        close: () => void;
        isOpen: boolean;
      },
    ];
  };
}

export default class CodeFragmentWithTrigger extends Component<CodeFragmentWithTriggerSignature> {
  @tracked isModalOpen = false;

  openModal = () => {
    this.isModalOpen = true;
    this.args.onOpen?.();
  };

  closeModal = () => {
    this.isModalOpen = false;
    // Create a mock event for the onClose callback
    const mockEvent = new Event('close');
    this.args.onClose?.(mockEvent);
  };

  <template>
    {{#if (has-block "trigger")}}
      {{yield (hash openModal=this.openModal) to="trigger"}}
    {{else}}
      <button type="button" {{on "click" this.openModal}}>
        {{@triggerText}}
      </button>
    {{/if}}

    {{#if this.isModalOpen}}
      <HdsModal
        id={{@modalId}}
        class={{@class}}
        @size={{@size}}
        @color={{@color}}
        @isDismissDisabled={{@isDismissDisabled}}
        @returnFocusTo={{@returnFocusTo}}
        @onClose={{this.closeModal}}
        as |M|
      >
        {{yield
          (hash
            Header=M.Header
            Body=M.Body
            Footer=M.Footer
            close=this.closeModal
            isOpen=this.isModalOpen
          )
          to="modal"
        }}
      </HdsModal>
    {{/if}}
  </template>
}
