import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAlert } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAlert @type="inline" @color="success" @icon="bulb" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>Description here</A.Description>
  </HdsAlert>
</template>;

export default LocalComponent;
