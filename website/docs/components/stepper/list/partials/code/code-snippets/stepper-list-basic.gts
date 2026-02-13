import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperList } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperList @ariaLabel="Basic usage" as |S|>
    <S.Step>
      <:title>One</:title>
    </S.Step>
    <S.Step>
      <:title>Two</:title>
    </S.Step>
    <S.Step>
      <:title>Three</:title>
    </S.Step>
  </HdsStepperList>
</template>;

export default LocalComponent;
