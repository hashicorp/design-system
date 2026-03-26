import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTime,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody>
    <HdsTime @date="29 November 2021 9:30" />
  </HdsTextBody>
</template>;

export default LocalComponent;
