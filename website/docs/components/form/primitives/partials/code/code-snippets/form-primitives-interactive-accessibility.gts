import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormHelperText,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormHelperText @controlId="control-ID">
    Some text with a
    <HdsLinkInline @route="show" @model="components/link/inline">
      HdsLinkInline</HdsLinkInline>, or
    <code>some formatted code</code>
    or a
    <strong>strong message</strong>.
  </HdsFormHelperText>
</template>;

export default LocalComponent;
