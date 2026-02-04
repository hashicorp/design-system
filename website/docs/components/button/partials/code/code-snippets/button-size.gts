import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsButton,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="24" as |LF|>
    <LF.Item>
      <HdsButton @text="Small button" @size="small" />
    </LF.Item>
    <LF.Item>
      <HdsButton @text="Large button" @size="large" />
    </LF.Item>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
