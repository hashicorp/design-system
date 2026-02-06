import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsFormTextInputField,
  HdsFormSelectField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <FORM.SectionMultiFieldGroup as |FG|>
        <HdsFormTextInputField as |F|>
          <F.Label>City</F.Label>
        </HdsFormTextInputField>

        <FG.Item @width="auto">
          <HdsFormSelectField as |F|>
            <F.Label>State</F.Label>
            <F.Options>
              <option value="state-1">Ohio</option>
              <option value="state-2">Massachusetts</option>
              <option value="state-3">Washington</option>
              <option value="state-4">Florida</option>
              <option value="state-4">North Carolina</option>
            </F.Options>
          </HdsFormSelectField>
        </FG.Item>

        <FG.Item @width="8em">
          <HdsFormTextInputField as |F|>
            <F.Label>Zip</F.Label>
          </HdsFormTextInputField>
        </FG.Item>
      </FORM.SectionMultiFieldGroup>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
