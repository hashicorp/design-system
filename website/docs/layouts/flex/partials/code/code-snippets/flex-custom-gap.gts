import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex class="doc-flex-demo-custom-flex-column-gap">
    {{!
    // example of CSS code associated with the demo class:
    .doc-flex-demo-custom-flex-column-gap {
      --hds-layout-flex-column-gap: 13px;
    }
  }}
    {{!
    multiple flex items here, with a non-standard gap between them
  }}
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
