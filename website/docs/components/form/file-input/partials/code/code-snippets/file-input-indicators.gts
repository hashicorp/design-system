import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsFormFileInputField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormFileInputField
        @isRequired={{true}}
        name="demo-profile-photo"
        as |F|
      >
        <F.Label>Upload a file</F.Label>
        <F.HelperText>File size should be a maximum of 2 MB.</F.HelperText>
      </HdsFormFileInputField>

      <HdsFormFileInputField
        @isOptional={{true}}
        name="demo-profile-photo"
        as |F|
      >
        <F.Label>Upload a file</F.Label>
        <F.HelperText>File size should be a maximum of 2 MB.</F.HelperText>
      </HdsFormFileInputField>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
