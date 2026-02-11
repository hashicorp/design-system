import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsFormTextInputField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <FORM.SectionMultiFieldGroup>
        <HdsFormTextInputField as |F|>
          <F.Label>First name</F.Label>
        </HdsFormTextInputField>

        <HdsFormTextInputField as |F|>
          <F.Label>Last name</F.Label>
        </HdsFormTextInputField>
      </FORM.SectionMultiFieldGroup>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
