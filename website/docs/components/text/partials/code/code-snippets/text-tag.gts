import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextDisplay,
  HdsTextBody,
  HdsTextCode,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay @tag="h1">Page title</HdsTextDisplay>
  <HdsTextBody @tag="p">Paragraph text</HdsTextBody>
  <HdsTextCode @tag="pre">Code sample</HdsTextCode>
</template>;

export default LocalComponent;
