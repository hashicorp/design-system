import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsAlert,
  HdsLinkInline,
  HdsFormTextInputField,
  HdsFormRadioGroup,
  HdsFormSelectField,
  HdsFormTextareaField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsAlert @type="inline" @color="critical" as |A|>
        <A.Title @tag="h2">Form submission error</A.Title>
        <A.Description>Correct the formatting of the following field:</A.Description>
        <A.Description>
          <HdsLinkInline @href="#" @color="secondary">Expiration date</HdsLinkInline>
        </A.Description>
      </HdsAlert>
    </FORM.Section>

    <FORM.Section>
      <HdsFormTextInputField name="field-1-name" as |F|>
        <F.Label>Field 1</F.Label>
      </HdsFormTextInputField>

      <HdsFormRadioGroup @layout="horizontal" @name="field-2-name" as |G|>
        <G.Legend>Field 2</G.Legend>
        <G.RadioField as |F|>
          <F.Label>Option 1</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Option 2</F.Label>
        </G.RadioField>
        <G.RadioField as |F|>
          <F.Label>Option 3</F.Label>
        </G.RadioField>
      </HdsFormRadioGroup>

      <HdsFormSelectField name="field-3-name" as |F|>
        <F.Label>Field 3</F.Label>
        <F.Options>
          <option value="Kubernetes">Kubernetes</option>
          <option value="Other" selected>Selected</option>
        </F.Options>
      </HdsFormSelectField>

      <HdsFormTextareaField name="field-4-name" as |F|>
        <F.Label>Field 4</F.Label>
      </HdsFormTextareaField>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
