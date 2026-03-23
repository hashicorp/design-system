import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperNav } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperNav
    @currentStep={{1}}
    @isInteractive={{false}}
    @ariaLabel="Interactive"
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

    <S.Panel>Content 1</S.Panel>
    <S.Panel>Content 2</S.Panel>
    <S.Panel>Content 3</S.Panel>
  </HdsStepperNav>
</template>;

export default LocalComponent;
