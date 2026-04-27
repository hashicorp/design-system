/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/modal/modal-body-content.js';

export interface HdsCdsModalBodyContentSignature {
  Args: Record<string, never>;
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsModalBodyContent extends Component<HdsCdsModalBodyContentSignature> {
  <template>
    <cds-modal-body-content ...attributes>
      {{yield}}
    </cds-modal-body-content>
  </template>
}
