import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import {
  HdsLayoutGrid,
  HdsCardContainer,
  HdsLayoutFlex,
  HdsIconTile,
  HdsTextDisplay,
  HdsBadge,
  HdsTextBody,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

import { hash } from '@ember/helper';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid @columnWidth={{hash sm="100%" md="33.33%"}} @gap="32">
    <HdsCardContainer @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
      <HdsLayoutGrid @columnMinWidth="100%" @gap="16">
        <HdsLayoutFlex @align="center" @gap="8">
          <HdsIconTile @icon="cloud" @size="small" />
          <HdsTextDisplay @tag="h2" @size="300">
            Active resources
          </HdsTextDisplay>
        </HdsLayoutFlex>
        <HdsLayoutGrid @columnMinWidth="100%" @gap="8" as |LG|>
          <LG.Item>
            <HdsBadge
              @text="5 active resources"
              @color="success"
              @icon="check-circle"
            />
          </LG.Item>
          <HdsTextBody @tag="p">
            There are 5 active resources inside this project.
          </HdsTextBody>
        </HdsLayoutGrid>
        <HdsLinkStandalone
          @icon="arrow-right"
          @iconPosition="trailing"
          @text="View active resources"
          @href="#"
        />
      </HdsLayoutGrid>
    </HdsCardContainer>

    <HdsCardContainer @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
      <HdsTextDisplay @tag="h2" @size="300">Card #2</HdsTextDisplay>
    </HdsCardContainer>

    <HdsCardContainer @level="mid" @hasBorder={{true}} {{style padding="24px"}}>
      <HdsTextDisplay @tag="h2" @size="300">Card #3</HdsTextDisplay>
    </HdsCardContainer>
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
