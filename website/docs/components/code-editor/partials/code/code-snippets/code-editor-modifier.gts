import type { TemplateOnlyComponent } from '@ember/component/template-only';

import hdsCodeEditor from '@hashicorp/design-system-components/modifiers/hds-code-editor';

const LocalComponent: TemplateOnlyComponent = <template>
  <div {{hdsCodeEditor ariaLabel="Ember modifier usage"}} />
</template>;

export default LocalComponent;
