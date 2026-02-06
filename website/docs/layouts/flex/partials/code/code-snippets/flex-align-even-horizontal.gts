import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex
    @justify="space-between"
    @gap="16"
    class="doc-flex-outlined-container"
  >
    <DocPlaceholder @width="auto" @height="40px" @background="#e5ffd2">
      Some content
    </DocPlaceholder>
    <DocPlaceholder @width="auto" @height="40px" @background="#e4c5f3">
      Other content
    </DocPlaceholder>
    <DocPlaceholder @width="auto" @height="40px" @background="#d2f4ff">
      More content
    </DocPlaceholder>
    <DocPlaceholder @width="200px" @height="80px" @background="#fff8d2">
      Some content that is wider and taller
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
