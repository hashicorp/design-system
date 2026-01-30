import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsIcon,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="center" @gap="8">
    <HdsIcon @name="info" @size="24" />
    <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet</HdsTextBody>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
