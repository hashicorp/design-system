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
import { CDS_MODAL_SIZE_OPTIONS } from '@hashicorp/design-system-components/components/hds/cds-modal/index';

type ModalSize = (typeof CDS_MODAL_SIZE_OPTIONS)[number];

export interface CodeFragmentVariantModalSignature {
  Args: {
    activeSizeLabel: string;
    isOpen: boolean;
    onClose: (event: Event) => void;
    size?: ModalSize;
  };
  Element: HTMLDivElement;
}

const CodeFragmentVariantModal: TemplateOnlyComponent<CodeFragmentVariantModalSignature> =
  <template>
    <HdsCdsModal
      @open={{@isOpen}}
      @size={{@size}}
      {{on "cds-modal-closed" @onClose}}
    >
      <HdsCdsModalHeader>
        <HdsCdsModalHeading>
          {{@activeSizeLabel}}
          modal
        </HdsCdsModalHeading>
      </HdsCdsModalHeader>
      <HdsCdsModalBody>
        <p>Current size variant: <strong>{{@activeSizeLabel}}</strong>.</p>
      </HdsCdsModalBody>
      <HdsCdsModalFooter>
        <HdsCdsButton @kind="secondary" data-modal-close>
          Cancel
        </HdsCdsButton>
        <HdsCdsButton @kind="primary" data-modal-close>
          Confirm
        </HdsCdsButton>
      </HdsCdsModalFooter>
    </HdsCdsModal>
  </template>;

export default CodeFragmentVariantModal;
