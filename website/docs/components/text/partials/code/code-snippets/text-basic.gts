import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextDisplay,
  HdsTextBody,
  HdsTextCode,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay>Text as "Display" variant</HdsTextDisplay>
  <HdsTextBody>Text as "Body" variant</HdsTextBody>
  <HdsTextCode>Text as "Code" variant</HdsTextCode>
</template>;

export default LocalComponent;
