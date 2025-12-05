/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsDropdown } from '@hashicorp/design-system-components/components';
import type { HdsDropdownSignature } from '@hashicorp/design-system-components/components/hds/dropdown/index';

interface CodeFragmentWithSimpleActionsSignature {
  Args: {
    listPosition?: HdsDropdownSignature['Args']['listPosition'];
    enableCollisionDetection?: HdsDropdownSignature['Args']['enableCollisionDetection'];
    isOpen?: HdsDropdownSignature['Args']['isOpen'];
    isInline?: HdsDropdownSignature['Args']['isInline'];
  };
}

const CodeFragmentWithSimpleActions: TemplateOnlyComponent<CodeFragmentWithSimpleActionsSignature> =
  <template>
    <HdsDropdown
      @isInline={{@isInline}}
      @isOpen={{@isOpen}}
      @listPosition={{@listPosition}}
      @enableCollisionDetection={{@enableCollisionDetection}}
      as |D|
    >
      <D.ToggleButton @color="secondary" @text="Menu" />
      <D.Interactive @href="#">Create</D.Interactive>
      <D.Interactive @href="#">Edit</D.Interactive>
    </HdsDropdown>
  </template>;

export default CodeFragmentWithSimpleActions;
