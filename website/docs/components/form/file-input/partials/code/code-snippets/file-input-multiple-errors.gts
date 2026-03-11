import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormFileInputField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormFileInputField name="demo-profile-photo" as |F|>
    <F.Label>Upload a file</F.Label>
    <F.Error as |E|>
      <E.Message>File size should be a maximum of 2 MB.</E.Message>
      <E.Message>Dimensions should be a minimum of 100px × 100px.</E.Message>
    </F.Error>
  </HdsFormFileInputField>
</template>;

export default LocalComponent;
