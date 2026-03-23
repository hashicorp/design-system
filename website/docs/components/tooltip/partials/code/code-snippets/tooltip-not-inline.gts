import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTooltipButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <p>
    Text before
    <HdsTooltipButton @text="Hello!" aria-label="HashiCorp" @isInline={{false}}>
      <HdsIcon @name="hashicorp" />
    </HdsTooltipButton>
    Text after
  </p>
</template>;

export default LocalComponent;
