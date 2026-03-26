import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsPaginationNumbered
    @totalItems={{40}}
    @showTotalItems={{false}}
    @showSizeSelector={{false}}
    @pageSizes={{array 5 20 60}}
    @currentPageSize={{20}}
  />
</template>;

export default LocalComponent;
