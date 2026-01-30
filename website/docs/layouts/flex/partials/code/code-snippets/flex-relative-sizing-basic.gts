import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex as |LF|>
    ...
    <LF.Item @basis="200px" @grow={{1}} @shrink={{0}}>
      {{! the flex item content here }}
    </LF.Item>
    ...
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
