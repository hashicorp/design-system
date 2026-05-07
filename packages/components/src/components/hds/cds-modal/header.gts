/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/modal/modal-header.js';

export interface HdsCdsModalHeaderSignature {
  Args: Record<string, never>;
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsModalHeader extends Component<HdsCdsModalHeaderSignature> {
  <template>
    <cds-modal-header ...attributes>
      {{yield}}
    </cds-modal-header>
  </template>
}
