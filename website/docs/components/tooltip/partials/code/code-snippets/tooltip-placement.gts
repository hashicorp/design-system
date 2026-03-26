import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTooltipButton,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTooltipButton @text="Hello!" @placement="right">
    <HdsBadge
      @text="Some tests failed"
      @icon="alert-triangle"
      @color="warning"
    />
  </HdsTooltipButton>
</template>;

export default LocalComponent;
