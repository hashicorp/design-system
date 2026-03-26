import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTabs } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTabs as |T|>
    <T.Tab>One</T.Tab>
    <T.Tab>Two</T.Tab>
    <T.Tab @isSelected={{true}}>Three</T.Tab>

    <T.Panel>Content 1</T.Panel>
    <T.Panel>Content 2</T.Panel>
    <T.Panel>Content 3, I am displayed on page load.</T.Panel>
  </HdsTabs>
</template>;

export default LocalComponent;
