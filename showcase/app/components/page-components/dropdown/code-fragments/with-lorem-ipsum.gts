/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import { HdsDropdown } from '@hashicorp/design-system-components/components';
import type { HdsDropdownSignature } from '@hashicorp/design-system-components/components/hds/dropdown/index';

interface CodeFragmentWithLoremIpsumSignature {
  Args: {
    matchToggleWidth?: HdsDropdownSignature['Args']['matchToggleWidth'];
    toggleButtonWidth?: string;
    width?: HdsDropdownSignature['Args']['width'];
  };
}

const CodeFragmentWithLoremIpsum: TemplateOnlyComponent<CodeFragmentWithLoremIpsumSignature> =
  <template>
    <HdsDropdown
      @isOpen={{true}}
      @listPosition="bottom-left"
      @width={{@width}}
      @matchToggleWidth={{@matchToggleWidth}}
      as |D|
    >
      <D.ToggleButton
        @color="secondary"
        @text="Menu"
        {{style width=@toggleButtonWidth}}
      />
      <D.Interactive @href="#">
        Lorem ipsum dolor sit amet
      </D.Interactive>
      <D.Interactive @href="#">
        Consectetur adipisicing elit
      </D.Interactive>
    </HdsDropdown>
  </template>;

export default CodeFragmentWithLoremIpsum;
