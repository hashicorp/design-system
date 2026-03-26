import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTime,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody>
    <HdsTime @startDate="14 October 2024" @endDate="16 October 2024" />
  </HdsTextBody>
</template>;

export default LocalComponent;
