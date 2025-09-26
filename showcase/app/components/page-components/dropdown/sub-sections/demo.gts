/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

const SubSectionDemo: TemplateOnlyComponent = <template>
  <ShwTextH2>Demo</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Label>Using <code>preserveContentInDom</code></SF.Label>
    <SF.Item>
      <div class="shw-component-dropdown-fixed-height-container">
        <HdsDropdown
          @listPosition="bottom-left"
          @preserveContentInDom={{true}}
          as |D|
        >
          <D.ToggleButton @color="secondary" @text="Menu" />
          <D.Header @hasDivider={{true}}>
            This header should always be present in the DOM, regardless of
            whether the dropdown is open or closed
          </D.Header>
          <D.Interactive @href="#">
            This item should always be present in the DOM, regardless of whether
            the dropdown is open or closed
          </D.Interactive>
          <D.Footer @hasDivider={{true}}>
            This footer should always be present in the DOM, regardless of
            whether the dropdown is open or closed
          </D.Footer>
        </HdsDropdown>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionDemo;
