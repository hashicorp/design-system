/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import {
  HdsCdsButton,
  HdsCdsModal,
  HdsCdsModalBody,
  HdsCdsModalFooter,
  HdsCdsModalHeader,
  HdsCdsModalCloseButton,
  HdsCdsModalHeading,
} from '@hashicorp/design-system-components/components';

export interface CodeFragmentDismissModalSignature {
  Args: {
    isDismissDisabled: boolean;
    isOpen: boolean;
    onBeforeClose: (event: Event) => void;
    onClose: (event: Event) => void;
    onForceClose: () => void;
  };
  Element: HTMLDivElement;
}

const CodeFragmentDismissModal: TemplateOnlyComponent<CodeFragmentDismissModalSignature> =
  <template>
    <HdsCdsModal
      @open={{@isOpen}}
      {{on "cds-modal-beingclosed" @onBeforeClose}}
      {{on "cds-modal-closed" @onClose}}
    >
      <HdsCdsModalHeader>
        <HdsCdsModalHeading>
          Dismiss
          {{if @isDismissDisabled "disabled" "enabled"}}
        </HdsCdsModalHeading>
        <HdsCdsModalCloseButton />
      </HdsCdsModalHeader>
      <HdsCdsModalBody>
        <p>
          {{#if @isDismissDisabled}}
            Closing is blocked. Use the "Force close" button.
          {{else}}
            Try escape, overlay click, cancel, or confirm.
          {{/if}}
        </p>
      </HdsCdsModalBody>
      <HdsCdsModalFooter>
        <HdsCdsButton
          @kind="secondary"
          disabled={{@isDismissDisabled}}
          data-modal-close
        >
          Cancel
        </HdsCdsButton>
        <HdsCdsButton
          @kind="primary"
          disabled={{@isDismissDisabled}}
          data-modal-close
        >
          Confirm
        </HdsCdsButton>
        {{#if @isDismissDisabled}}
          <HdsCdsButton @kind="ghost" {{on "click" @onForceClose}}>
            Force close
          </HdsCdsButton>
        {{/if}}
      </HdsCdsModalFooter>
    </HdsCdsModal>
  </template>;

export default CodeFragmentDismissModal;
