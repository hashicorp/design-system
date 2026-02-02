import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCardContainer } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <ul class="doc-card-list-demo">
    <HdsCardContainer
      @tag="li"
      @hasBorder={{true}}
      class="doc-card-list-demo__item"
    >
      Card item 1
    </HdsCardContainer>

    <HdsCardContainer
      @tag="li"
      @hasBorder={{true}}
      class="doc-card-list-demo__item"
    >
      Card item 2
    </HdsCardContainer>

    <HdsCardContainer
      @tag="li"
      @hasBorder={{true}}
      class="doc-card-list-demo__item"
    >
      Card item 3
    </HdsCardContainer>
  </ul>
</template>;

export default LocalComponent;
