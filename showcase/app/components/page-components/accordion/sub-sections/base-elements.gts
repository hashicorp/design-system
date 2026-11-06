/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import CodeFragmentWithToggleCallback from 'showcase/components/page-components/accordion/code-fragments/with-toggle-callback';

import { HdsAccordionItem } from '@hashicorp/design-system-components/components';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>Standalone accordion item</ShwTextH3>
  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="HdsAccordionItem">
      <HdsAccordionItem
        @size="small"
        @type="flush"
        @titleTag="h3"
        @isOpen={{true}}
      >
        <:toggle>Standalone item</:toggle>
        <:content as |C|>
          This item can be used without the
          <code>HdsAccordion</code>
          parent. Its yielded
          <code>close</code>
          action closes the content:
          <button type="button" {{on "click" C.close}}>Close item</button>
        </:content>
      </HdsAccordionItem>
    </SG.Item>
    <SG.Item @label="Toggle callback">
      <CodeFragmentWithToggleCallback />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionBaseElements;
