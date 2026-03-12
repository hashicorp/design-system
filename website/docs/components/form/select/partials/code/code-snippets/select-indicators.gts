import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsFormSelectField,
  HdsForm,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsFormSelectField
        @isRequired={{true}}
        name="demo-target-infrastructure"
        as |F|
      >
        <F.Label>Target infrastructure</F.Label>
        <F.HelperText>The target infrastructure is where you want to deploy your
          apps.</F.HelperText>
        <F.Options>
          <option value=""></option>
          <option value="Kubernetes">Kubernetes</option>
          <option value="Other">Other</option>
        </F.Options>
      </HdsFormSelectField>

      <HdsFormSelectField
        @isOptional={{true}}
        name="demo-target-infrastructure"
        as |F|
      >
        <F.Label>Target infrastructure</F.Label>
        <F.HelperText>The target infrastructure is where you want to deploy your
          apps.</F.HelperText>
        <F.Options>
          <option value=""></option>
          <option value="Kubernetes">Kubernetes</option>
          <option value="Other">Other</option>
        </F.Options>
      </HdsFormSelectField>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
