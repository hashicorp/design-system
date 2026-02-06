import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @direction="column" @gap="16" as |LF|>
    <HdsBadge @text="Stretched badge" @color="critical" />
    <LF.Item>
      <HdsBadge @text="Non-stretched badge" @color="success" />
    </LF.Item>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
