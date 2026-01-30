import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="16" class="doc-flex-outlined-container">
    <DocPlaceholder @width="auto" @height="40px" @background="#d2f4ff">
      Some content
    </DocPlaceholder>
    <DocPlaceholder @width="auto" @height="40px" @background="#d2f4ff">
      Other content
    </DocPlaceholder>
    <DocPlaceholder
      class="doc-flex-margin-left-auto"
      @width="auto"
      @height="40px"
      @background="#fff8d2"
    >
      More content
    </DocPlaceholder>
    <DocPlaceholder @width="auto" @height="40px" @background="#e4c5f3">
      Extra content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
