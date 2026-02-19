import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormHelperText } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormHelperText @controlId="helper-text-first">
    This is some helper text
  </HdsFormHelperText>
</template>;

export default LocalComponent;
