import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPaginationNumbered @totalItems={{40}} @sizeSelectorLabel="Per page" />
</template>;

export default LocalComponent;
