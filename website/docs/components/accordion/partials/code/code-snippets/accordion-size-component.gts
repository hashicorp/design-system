import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAccordion } from '@hashicorp/design-system-components/components';

const AccordionSize: TemplateOnlyComponent = <template>
  <HdsAccordion @size="large" as |A|>
    <A.Item>
      <:toggle>Item one</:toggle>
      <:content>
        Additional content for item one
      </:content>
    </A.Item>
    <A.Item>
      <:toggle>Item two</:toggle>
      <:content>
        Additional content for item two
      </:content>
    </A.Item>
  </HdsAccordion>
</template>;

export default AccordionSize;
