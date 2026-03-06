import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormTextInputField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextInputField name="demo-aws-account-id" as |F|>
    <F.Label>AWS Account ID <HdsBadge @size="small" @text="Beta" /></F.Label>
    <F.HelperText>This is an experimental feature (<HdsLinkInline @href="#">read
        more</HdsLinkInline>).</F.HelperText>
  </HdsFormTextInputField>
</template>;

export default LocalComponent;
