/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

export interface MockFormSuperSelectSelectedComponentSingleSignature {
  Args: {
    option: {
      size: string;
    };
  };
  Element: HTMLSpanElement;
}

// This is not an HDS component, but a supporting file for `form/super-select.hbs` which requires a component to be passed in for the showcase
const MockFormSuperSelectSelectedComponentSingle: TemplateOnlyComponent<MockFormSuperSelectSelectedComponentSingleSignature> =
  <template>
    <HdsTextBody @tag="span" @size="200">{{@option.size}}</HdsTextBody>
  </template>;

export default MockFormSuperSelectSelectedComponentSingle;
