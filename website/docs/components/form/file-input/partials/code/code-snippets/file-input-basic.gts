import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormFileInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormFileInputField name="demo-profile-photo" as |F|>
    <F.Label>Upload a file</F.Label>
  </HdsFormFileInputField>
</template>;

export default LocalComponent;
