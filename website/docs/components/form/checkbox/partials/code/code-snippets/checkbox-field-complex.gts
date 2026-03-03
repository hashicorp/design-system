import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormCheckboxField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormCheckboxField name="demo-enable-cost-estimation" as |F|>
    <F.Label>Enable cost estimation
      <HdsBadge @size="small" @text="Beta" @color="highlight" /></F.Label>
    <F.HelperText>See
      <HdsLinkInline @href="#">our pricing</HdsLinkInline>
      for more information.</F.HelperText>
  </HdsFormCheckboxField>
</template>;

export default LocalComponent;
