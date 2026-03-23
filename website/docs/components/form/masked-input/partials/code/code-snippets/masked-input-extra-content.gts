import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormMaskedInputField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormMaskedInputField name="demo-team-token" as |F|>
    <F.Label>Terraform Cloud team token
      <HdsBadge @size="small" @text="Beta" /></F.Label>
    <F.HelperText>The token must include
      <HdsLinkInline @href="#">permissions to manage workspaces and projects</HdsLinkInline>.</F.HelperText>
  </HdsFormMaskedInputField>
</template>;

export default LocalComponent;
