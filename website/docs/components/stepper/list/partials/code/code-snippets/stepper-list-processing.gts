import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsStepperList } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperList @ariaLabel="Processing status" as |S|>
    <S.Step @status="complete">
      <:title>Completed step</:title>
    </S.Step>
    <S.Step @status="processing">
      <:title>Current step</:title>
    </S.Step>
    <S.Step>
      <:title>Upcoming step</:title>
    </S.Step>
  </HdsStepperList>
</template>;

export default LocalComponent;
