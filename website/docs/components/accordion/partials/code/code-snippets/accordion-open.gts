import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

const AccordionOpen: TemplateOnlyComponent = <template>
  <HdsAccordion as |A|>
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
