/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/modal/modal-body.js';

export interface HdsCdsModalBodySignature {
  Args: Record<string, never>;
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsModalBody extends Component<HdsCdsModalBodySignature> {
  <template>
    <cds-modal-body ...attributes>
      {{yield}}
    </cds-modal-body>
  </template>
}
