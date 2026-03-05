import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormFileInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormFileInputField name="demo-profile-photo" as |F|>
    <F.Label>Upload a file</F.Label>
    <F.HelperText>File size should be a maximum of 2 MB.</F.HelperText>
  </HdsFormFileInputField>
</template>;

export default LocalComponent;
