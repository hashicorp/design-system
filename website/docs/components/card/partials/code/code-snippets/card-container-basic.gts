import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCardContainer } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCardContainer @level="mid" @hasBorder={{true}}>
    [Your content here]
  </HdsCardContainer>
</template>;

export default LocalComponent;
