import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid class="doc-grid-demo-custom-grid-column-gap">
    {{!
    // example of CSS code associated with the demo class:
    .doc-grid-demo-custom-grid-column-gap {
      --hds-layout-grid-column-gap: 13px;
    }
  }}
    {{!
    multiple grid items here, with a non-standard gap between them
  }}
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
