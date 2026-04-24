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
  HdsCdsModalHeading,
} from '@hashicorp/design-system-components/components';

export interface CodeFragmentControlledModalSignature {
  Args: {
    closeCount: number;
    isOpen: boolean;
    onClose: (event: Event) => void;
    onCloseWithState: () => void;
  };
  Element: HTMLDivElement;
}

const CodeFragmentControlledModal: TemplateOnlyComponent<CodeFragmentControlledModalSignature> =
  <template>
    <HdsCdsModal @open={{@isOpen}} {{on "cds-modal-closed" @onClose}}>
      <HdsCdsModalHeader>
        <HdsCdsModalHeading>
          Controlled modal
        </HdsCdsModalHeading>
      </HdsCdsModalHeader>
      <HdsCdsModalBody>
        <p>
          This modal is controlled with tracked state. It has been closed
          <strong>{{@closeCount}}</strong>
          times.
        </p>
      </HdsCdsModalBody>
      <HdsCdsModalFooter>
        <HdsCdsButton @kind="secondary" {{on "click" @onCloseWithState}}>
          Close with state
        </HdsCdsButton>
        <HdsCdsButton @kind="primary" data-modal-close>
          Close with native event
        </HdsCdsButton>
      </HdsCdsModalFooter>
    </HdsCdsModal>
  </template>;

export default CodeFragmentControlledModal;
