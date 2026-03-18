import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormToggleField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormToggleField name="demo-cost-estimate" as |F|>
    <F.Label>Enable cost estimation
      <HdsBadge @size="small" @text="Beta" @color="highlight" /></F.Label>
    <F.HelperText>See
      <HdsLinkInline @href="#">our pricing</HdsLinkInline>
      for more information.</F.HelperText>
  </HdsFormToggleField>
</template>;

export default LocalComponent;
