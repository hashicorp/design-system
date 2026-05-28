/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';
import type { HdsAccordionItemSignature } from '@hashicorp/design-system-components/components/hds/accordion/item/index';

export interface CodeFragmentWithToggleVariantsSignature {
  Args: {
    type?: HdsAccordionSignature['Args']['type'];
    size?: HdsAccordionSignature['Args']['size'];
    favorite?: HdsAccordionItemSignature['Args']['favorite'];
    favoriteIcon?: HdsAccordionItemSignature['Args']['favoriteIcon'];
  };
  Element: HTMLDivElement;
}

const CodeFragmentWithToggleVariants: TemplateOnlyComponent<CodeFragmentWithToggleVariantsSignature> =
  <template>
    <HdsAccordion @type={{@type}} @size={{@size}} as |A|>
      <A.Item @favorite={{@favorite}} @favoriteIcon={{@favoriteIcon}}>
        <:toggle>Item one</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>

      <A.Item
        @isStatic={{true}}
        @favorite={{@favorite}}
        @favoriteIcon={{@favoriteIcon}}
      >
        <:toggle>Item two</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>

      <A.Item
        @containsInteractive={{true}}
        @favorite={{@favorite}}
        @favoriteIcon={{@favoriteIcon}}
      >
        <:toggle>Item three</:toggle>
        <:content>
          <ShwPlaceholder @text="generic content" @height="40" />
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default CodeFragmentWithToggleVariants;
