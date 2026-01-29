import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex
    @wrap={{true}}
    @gap={{array "8" "24"}}
    class="doc-flex-outlined-container"
  >
    <DocPlaceholder @width="220px" @height="40px" @background="#e5ffd2">
      Some content
    </DocPlaceholder>
    <DocPlaceholder @width="250px" @height="40px" @background="#e4c5f3">
      Other content
    </DocPlaceholder>
    <DocPlaceholder @width="200px" @height="40px" @background="#d2f4ff">
      More content
    </DocPlaceholder>
    <DocPlaceholder @width="300px" @height="40px" @background="#fff8d2">
      Extra content
    </DocPlaceholder>
    <DocPlaceholder @width="240px" @height="40px" @background="#f3d9c5">
      Even more content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
