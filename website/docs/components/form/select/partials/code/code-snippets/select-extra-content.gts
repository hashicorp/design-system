import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormSelectField,
  HdsBadge,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormSelectField name="demo-target-infrastructure" as |F|>
    <F.Label>Target infrastructure
      <HdsBadge @size="small" @text="Beta" /></F.Label>
    <F.HelperText>This is an experimental feature (<HdsLinkInline @href="#">read
        more</HdsLinkInline>).</F.HelperText>
    <F.Options>
      <option value="Kubernetes">Kubernetes</option>
      <option value="Other">Other</option>
    </F.Options>
  </HdsFormSelectField>
</template>;

export default LocalComponent;
