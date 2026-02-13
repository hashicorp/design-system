import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormError } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormError @controlId="error-message-first">
    This is a simple error message
  </HdsFormError>
</template>;

export default LocalComponent;
