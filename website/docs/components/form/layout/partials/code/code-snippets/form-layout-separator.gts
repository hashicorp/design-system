import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <HdsTextBody>First section</HdsTextBody>
    </FORM.Section>

    <FORM.Separator />

    <FORM.Section>
      <HdsTextBody>Second section</HdsTextBody>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
