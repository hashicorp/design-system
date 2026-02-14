import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsStepperList,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsStepperList @ariaLabel="Additional information" as |S|>
    <S.Step @status="complete">
      <:title>Completed step</:title>
      <:description>Step description</:description>
    </S.Step>
    <S.Step @status="progress">
      <:title>Current step</:title>
      <:description>Step description</:description>
      <:content>
        <HdsButton @text="Do step action" />
      </:content>
    </S.Step>
    <S.Step>
      <:title>Upcoming step</:title>
      <:description>Step description</:description>
    </S.Step>
  </HdsStepperList>
</template>;

export default LocalComponent;
