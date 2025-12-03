import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionStaticSignature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionStatic: TemplateOnlyComponent<AccordionStaticSignature> =
  <template>
    <HdsAccordion ...attributes as |A|>
      <A.Item>
        <:toggle>Item one</:toggle>
        <:content>
          Additional content for item one
        </:content>
      </A.Item>
      <A.Item @isStatic={{true}}>
        <:toggle>Item two</:toggle>
        <:content>
          Additional content for item two
        </:content>
      </A.Item>
    </HdsAccordion>
  </template>;

export default AccordionStatic;
