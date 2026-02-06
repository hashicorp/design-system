import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutFlex,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="center" @gap="8">
    <img
      class="doc-flex-media-avatar"
      src="/assets/images/avatar.png"
      alt="portrait of a cat wearing coat and tie"
    />
    <HdsTextBody @size="200" @tag="p">Lorem ipsum dolor sit amet</HdsTextBody>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
