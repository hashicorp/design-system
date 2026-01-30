import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsIconTile,
  HdsTextDisplay,
  HdsTextBody,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="start" @gap="16">
    <HdsIconTile @logo="boundary" />
    <HdsLayoutFlex @direction="column" @gap="4">
      <HdsTextDisplay @size="400" @tag="h5">Lorem ipsum dolor</HdsTextDisplay>
      <HdsTextBody @size="200" @tag="p">
        Lorem ipsum dolor sit amet consectetur adipiscing elit
      </HdsTextBody>
      <HdsLinkStandalone
        @icon="external-link"
        @iconPosition="trailing"
        @text="Documentation"
        @href="#"
      />
    </HdsLayoutFlex>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
