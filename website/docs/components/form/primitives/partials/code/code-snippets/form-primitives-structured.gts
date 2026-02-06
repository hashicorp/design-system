import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormLabel,
  HdsBadge,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormLabel @controlId="control-ID">
    <span>Some text</span>
    <HdsBadge @size="small" @text="Some badge" @color="highlight" />
  </HdsFormLabel>
</template>;

export default LocalComponent;
