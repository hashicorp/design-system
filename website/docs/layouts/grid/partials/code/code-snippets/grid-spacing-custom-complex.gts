import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid
    {{style
      --hds-layout-grid-row-gap="10px"
      --hds-layout-grid-column-gap="0.625rem"
    }}
  >
    {{!
    multiple grid items appearing on multiple rows
    with a vertical gap of 10px and a horizontal one of 0.625rem
  }}
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
