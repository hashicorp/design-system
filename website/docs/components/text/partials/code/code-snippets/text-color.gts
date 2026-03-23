import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody @tag="p" @color="strong">Paragraph with "strong" color applied</HdsTextBody>
  <HdsTextBody @tag="p" @color="action-active">Paragraph with "action-active"
    color applied</HdsTextBody>
  <HdsTextBody @tag="p" @color="highlight-high-contrast">Paragraph with
    "highlight-high-contrast" color applied</HdsTextBody>
</template>;

export default LocalComponent;
