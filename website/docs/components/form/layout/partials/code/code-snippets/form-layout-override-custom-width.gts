import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsForm } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm @sectionMaxWidth="36rem" as |FORM|>
    <!-- Sections, FormHeader, FormFooter, and FormSeparators will all have 36rem max-width -->

    <FORM.Section @isFullWidth={{true}}>
      <!-- Except this Section, which will have 100% max-width -->
    </FORM.Section>
  </HdsForm>
</template>;

export default LocalComponent;
