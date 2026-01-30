import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex
    {{style
      --hds-layout-flex-row-gap="10px"
      --hds-layout-flex-column-gap="0.625rem"
    }}
    @wrap={{true}}
  >
    {{!
    multiple flex items appearing on multiple rows
    with a vertical gap of 10px and an horizontal one of 0.625rem
  }}
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
