import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAlert } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAlert @type="inline" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
    <A.Generic>
      [your content here]
    </A.Generic>
  </HdsAlert>
</template>;

export default LocalComponent;
