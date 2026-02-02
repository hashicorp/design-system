import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAlert } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAlert @type="inline" @color="success" as |A|>
    <A.Title>Title here</A.Title>
    <A.Description>First line of description.</A.Description>
    <A.Description>Second line of description.</A.Description>
  </HdsAlert>
</template>;

export default LocalComponent;
