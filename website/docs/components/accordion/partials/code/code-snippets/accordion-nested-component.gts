import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionNestedSignature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionNested: TemplateOnlyComponent<AccordionNestedSignature> =
  <template>
    <HdsAccordion @type="flush" as |A|>
      <A.Item @isOpen={{true}}>
        <:toggle>Item one</:toggle>
        <:content>
          <HdsAccordion @type="flush" as |AA|>
            <AA.Item>
              <:toggle>Nested item one</:toggle>
              <:content>Nested content one</:content>
            </AA.Item>
            <AA.Item>
              <:toggle>Nested item two</:toggle>
              <:content>Nested content two</:content>
            </AA.Item>
          </HdsAccordion>
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default AccordionNested;
