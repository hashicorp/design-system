import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsForm } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Header>
      <FORM.HeaderTitle @tag="h3" @size="300">My form title</FORM.HeaderTitle>
      <FORM.HeaderDescription>A brief description of my form content.</FORM.HeaderDescription>
    </FORM.Header>
  </HdsForm>
</template>;

export default LocalComponent;
