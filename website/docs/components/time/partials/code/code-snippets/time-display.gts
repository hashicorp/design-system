import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTime,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody>
    HashiConf 2024 ended
    <HdsTime @date="16 October 2024" @display="relative" />.
  </HdsTextBody>
</template>;

export default LocalComponent;
