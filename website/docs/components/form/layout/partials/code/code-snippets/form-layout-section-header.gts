import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsForm } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Section>
      <FORM.SectionHeader>
        <FORM.SectionHeaderTitle @tag="h3">Section header title</FORM.SectionHeaderTitle>
        <FORM.SectionHeaderDescription>
          Section Header description
        </FORM.SectionHeaderDescription>
      </FORM.SectionHeader>
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
