import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormTextareaField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormTextareaField name="demo-description" as |F|>
    <F.Label>Short description <HdsBadge @size="small" @text="Beta" /></F.Label>
    <F.HelperText>This is an experimental feature (<HdsLinkInline @href="#">read
        more</HdsLinkInline>).</F.HelperText>
  </HdsFormTextareaField>
</template>;

export default LocalComponent;
