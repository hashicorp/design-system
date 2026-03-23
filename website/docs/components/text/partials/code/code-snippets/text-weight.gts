import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsTextDisplay,
  HdsTextBody,
  HdsTextCode,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay @tag="h4" @size="300" @weight="medium">Level 4 heading with
    "medium" font weight</HdsTextDisplay>
  <HdsTextBody @tag="p" @weight="semibold">Paragraph text with "semibold" font
    weight</HdsTextBody>
  <HdsTextCode @tag="pre" @weight="bold">Code sample with "bold" font weight</HdsTextCode>
</template>;

export default LocalComponent;
