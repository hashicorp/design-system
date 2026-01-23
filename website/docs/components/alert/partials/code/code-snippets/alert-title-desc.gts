import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsAlert,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @direction="column" @gap="24">
    <HdsAlert @type="inline" as |A|>
      <A.Title>Title here</A.Title>
    </HdsAlert>

    <HdsAlert @type="inline" as |A|>
      <A.Description>Description here</A.Description>
    </HdsAlert>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
