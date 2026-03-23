import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormMaskedInputBase } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormMaskedInputBase
    @value="036215df4996ca649928d8864b4df9e42cba0d6d"
    aria-label="Terraform Cloud team token"
    name="demo-team-token"
  />
</template>;

export default LocalComponent;
