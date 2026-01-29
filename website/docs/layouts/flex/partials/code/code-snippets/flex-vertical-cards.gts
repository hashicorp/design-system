import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsCardContainer,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @direction="column" @gap="16">
    <HdsCardContainer
      @level="mid"
      @hasBorder={{true}}
      class="doc-flex-cards-item"
    >
      <HdsTextBody @tag="p" @size="200">
        This is some generic content inside a card
      </HdsTextBody>
    </HdsCardContainer>
    <HdsCardContainer
      @level="mid"
      @hasBorder={{true}}
      class="doc-flex-cards-item"
    >
      <HdsTextBody @tag="p" @size="200">
        This is some other generic content inside a card
      </HdsTextBody>
    </HdsCardContainer>
    <HdsCardContainer
      @level="mid"
      @hasBorder={{true}}
      class="doc-flex-cards-item"
    >
      <HdsTextBody @tag="p" @size="200">
        This is also some generic content inside a card, but the text is longer
        and makes the card grow vertically
      </HdsTextBody>
    </HdsCardContainer>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
