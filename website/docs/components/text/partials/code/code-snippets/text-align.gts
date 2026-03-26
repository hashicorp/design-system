import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextDisplay,
  HdsTextBody,
  HdsTextCode,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay @tag="h1" @align="right">Page title, right-aligned</HdsTextDisplay>
  <HdsTextBody @tag="p" @align="center">Paragraph, center-aligned</HdsTextBody>
  <HdsTextCode @tag="pre" @align="left">Code sample, left-aligned</HdsTextCode>
</template>;

export default LocalComponent;
