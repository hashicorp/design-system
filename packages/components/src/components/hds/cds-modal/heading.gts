/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/modal/modal-heading.js';

export interface HdsCdsModalHeadingSignature {
  Args: Record<string, never>;
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsModalHeading extends Component<HdsCdsModalHeadingSignature> {
  <template>
    <cds-modal-heading ...attributes>
      {{yield}}
    </cds-modal-heading>
  </template>
}
