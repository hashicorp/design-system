/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/modal/modal-close-button.js';

export interface HdsCdsModalCloseButtonSignature {
  Args: {
    closeButtonLabel?: string;
  };
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsModalCloseButton extends Component<HdsCdsModalCloseButtonSignature> {
  <template>
    <cds-modal-close-button
      close-button-label={{@closeButtonLabel}}
      ...attributes
    >
      {{yield}}
    </cds-modal-close-button>
  </template>
}
