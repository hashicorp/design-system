/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

interface PowerSelectSelectedOptionSingleSignature {
  Args: {
    option: {
      size: string;
    };
  };
}

// This is not an HDS component, but a supporting file for overrides/power-select.hbs which requires a component to be passed in for the showcase
const PowerSelectSelectedOptionSingle: TemplateOnlyComponent<PowerSelectSelectedOptionSingleSignature> =
  <template>
    <HdsTextBody>{{@option.size}}</HdsTextBody>
  </template>;

export default PowerSelectSelectedOptionSingle;
