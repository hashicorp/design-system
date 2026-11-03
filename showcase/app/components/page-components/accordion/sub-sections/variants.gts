/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Variants</ShwTextH2>

  <ShwTextH3>Size</ShwTextH3>
  <ShwGrid @columns={{3}} as |SG|>
    {{#each SIZES as |size|}}
      <SG.Item @label={{capitalize size}}>
        <HdsAccordion @size={{size}} as |A|>
          <A.Item @isOpen={{true}}>
            <:toggle>{{capitalize size}} accordion item</:toggle>
            <:content>
              The item size affects the spacing and typography of the title and
              content.
            </:content>
          </A.Item>
        </HdsAccordion>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH3>Title tag</ShwTextH3>
  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Default title tag (div)">
      <HdsAccordion as |A|>
        <A.Item @isOpen={{true}}>
          <:toggle>Section title</:toggle>
          <:content>Content for the section.</:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
    <SG.Item @label="Heading title tag (h3)">
      <HdsAccordion @titleTag="h3" as |A|>
        <A.Item @isOpen={{true}}>
          <:toggle>Section title</:toggle>
          <:content>Content for the section.</:content>
        </A.Item>
      </HdsAccordion>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionVariants;
