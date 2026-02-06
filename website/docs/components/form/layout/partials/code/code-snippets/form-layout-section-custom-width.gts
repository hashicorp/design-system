import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsForm } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm @sectionMaxWidth="100%">
    <!-- Sections, FormHeader, FormFooter, and FormSeparators will all have 100% max-width -->
  </HdsForm>
</template>;

export default LocalComponent;
