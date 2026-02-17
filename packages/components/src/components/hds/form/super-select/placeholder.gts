/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../../text/body.gts';

export interface HdsFormSuperSelectPlaceholderSignature {
  Args: {
    placeholder?: string;
  };
}

const HdsFormSuperSelectPlaceholder: TemplateOnlyComponent<HdsFormSuperSelectPlaceholderSignature> =
  <template>
    <HdsTextBody
      @tag="span"
      @size="200"
      class="ember-power-select-placeholder"
    >{{@placeholder}}</HdsTextBody>
  </template>;

export default HdsFormSuperSelectPlaceholder;
