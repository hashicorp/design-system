//
//   Copyright (c) HashiCorp, Inc.
//   SPDX-License-Identifier: MPL-2.0
//

import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface MockFormSuperSelectSelectedComponentMultipleSignature {
  Args: {
    option: {
      size: string;
    };
  };
  Element: HTMLSpanElement;
}

// This is not an HDS component, but a supporting file for `form/super-select.hbs` which requires a component to be passed in for the showcase

const MockFormSuperSelectSelectedComponentMultiple: TemplateOnlyComponent<MockFormSuperSelectSelectedComponentMultipleSignature> =
  <template>
    <span>
      {{@option.size}}
    </span>
  </template>;

export default MockFormSuperSelectSelectedComponentMultiple;
