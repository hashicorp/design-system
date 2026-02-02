import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutGrid,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid @columnMinWidth="100%" @gap="16" as |LG|>
    <HdsBadge @text="Stretched badge" @color="critical" />

    <LG.Item>
      <HdsBadge @text="Non-stretched badge" @color="success" />
    </LG.Item>
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
