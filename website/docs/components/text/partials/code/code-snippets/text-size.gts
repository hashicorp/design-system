import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextDisplay,
  HdsTextBody,
  HdsTextCode,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay @tag="h1" @size="500">Page title with "Display-500" variant</HdsTextDisplay>
  <HdsTextBody @tag="p" @size="300">Paragraph text with "Body-300" variant-</HdsTextBody>
  <HdsTextCode @tag="pre" @size="100">Code sample with "Code-100" variant</HdsTextCode>
</template>;

export default LocalComponent;
