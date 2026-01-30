import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsCardContainer,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="stretch" @gap="48" as |LF|>
    <LF.Item @basis={{0}} @grow={{true}}>
      <HdsCardContainer
        @level="mid"
        @hasBorder={{true}}
        class="doc-flex-cards-item"
      >
        <HdsTextBody @tag="p" @size="200">
          This is some generic content inside a card
        </HdsTextBody>
      </HdsCardContainer>
    </LF.Item>
    <LF.Item @basis={{0}} @grow={{true}}>
      <HdsCardContainer
        @level="mid"
        @hasBorder={{true}}
        class="doc-flex-cards-item"
      >
        <HdsTextBody @tag="p" @size="200">
          This is some generic content inside a card
        </HdsTextBody>
      </HdsCardContainer>
    </LF.Item>
    <LF.Item @basis={{0}} @grow={{true}}>
      <HdsCardContainer
        @level="mid"
        @hasBorder={{true}}
        class="doc-flex-cards-item"
      >
        <HdsTextBody @tag="p" @size="200">
          This is also some generic content inside a card, but the text is
          longer and makes the card grow vertically
        </HdsTextBody>
      </HdsCardContainer>
    </LF.Item>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
