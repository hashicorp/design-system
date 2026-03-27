import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { Hds<%= columnizedModuleName %> } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <Hds<%= columnizedModuleName %>>This is the Hds<%= columnizedModuleName %> component </Hds<%= columnizedModuleName %>>
</template>;

export default LocalComponent;
