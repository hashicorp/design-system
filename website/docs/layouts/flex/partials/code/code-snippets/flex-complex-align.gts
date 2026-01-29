import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex
    @justify="center"
    @align="center"
    class="doc-flex-fixed-height-container doc-flex-outlined-container"
  >
    <DocPlaceholder @width="240px" @height="180px" @background="#d2f4ff">
      Some content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
