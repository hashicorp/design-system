import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormFileInputField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormFileInputField name="demo-profile-photo" as |F|>
    <F.Label>Upload a file <HdsBadge @size="small" @text="Beta" /></F.Label>
    <F.HelperText>This is an
      <HdsLinkInline @href="#">experimental feature</HdsLinkInline>.</F.HelperText>
  </HdsFormFileInputField>
</template>;

export default LocalComponent;
