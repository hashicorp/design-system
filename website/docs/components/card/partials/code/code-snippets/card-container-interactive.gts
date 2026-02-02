import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCardContainer } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-card-interactive-demo">
    <HdsCardContainer
      @level="mid"
      @levelHover="high"
      @levelActive="mid"
      @hasBorder={{true}}
    >
      <a href="#">
        [Your static content here]
      </a>
    </HdsCardContainer>
  </div>
</template>;

export default LocalComponent;
