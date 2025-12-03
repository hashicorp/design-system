import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';
import type { HdsAccordionSignature } from '@hashicorp/design-system-components/components/hds/accordion/index';

interface AccordionOpenSignature {
  Element: HdsAccordionSignature['Element'];
}

const AccordionOpen: TemplateOnlyComponent<AccordionOpenSignature> = <template>
  <HdsAccordion ...attributes as |A|>
    <A.Item @isOpen={{true}}>
      <:toggle>Item one</:toggle>
      <:content>
        Additional content for item one which is displayed on page load
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Item two</:toggle>
      <:content>
        Additional content for item two which is hidden on page load
      </:content>
    </A.Item>
  </HdsAccordion>
</template>;

export default AccordionOpen;
