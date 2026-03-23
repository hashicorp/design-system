import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperNav
    @isInteractive={{false}}
    @ariaLabel="Standalone contextual components"
    as |S|
  >
    <S.Step>
      <:title>Step 1</:title>
    </S.Step>
    <S.Step>
      <:title>Step 2</:title>
    </S.Step>
    <S.Step>
      <:title>Step 3</:title>
    </S.Step>
  </HdsStepperNav>
  Steps content
</template>;

export default LocalComponent;
