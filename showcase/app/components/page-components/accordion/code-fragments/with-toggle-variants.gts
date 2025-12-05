/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

export interface CodeFragmentWithToggleVariantsSignature {
  Args: {
    type?: HdsAccordionSignature['Args']['type'];
    size?: HdsAccordionSignature['Args']['size'];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithToggleVariants: TemplateOnlyComponent<CodeFragmentWithToggleVariantsSignature> =
  <template>
    <HdsAccordion @type={{@type}} @size={{@size}} as |A|>
      <A.Item>
        <:toggle>Item one</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>

      <A.Item @isStatic={{true}}>
        <:toggle>Item two</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>

      <A.Item @containsInteractive={{true}}>
        <:toggle>Item three</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default CodeFragmentWithToggleVariants;
