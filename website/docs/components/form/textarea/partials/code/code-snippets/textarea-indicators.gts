import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsFormTextareaField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormTextareaField @isRequired={{true}} name="demo-description" as |F|>
        <F.Label>Short description</F.Label>
        <F.HelperText>Add a short description about the workspace you are
          creating.</F.HelperText>
      </HdsFormTextareaField>

      <HdsFormTextareaField @isOptional={{true}} name="demo-description" as |F|>
        <F.Label>Short description</F.Label>
        <F.HelperText>Add a short description about the workspace you are
          creating.</F.HelperText>
      </HdsFormTextareaField>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
