import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="24">
    <DocPlaceholder @width="100%" @height="40px" @background="#e5ffd2">
      Some content
    </DocPlaceholder>
    <DocPlaceholder @width="80%" @height="40px" @background="#e4c5f3">
      Other content
    </DocPlaceholder>
    <DocPlaceholder @width="60%" @height="40px" @background="#d2f4ff">
      More content
    </DocPlaceholder>
    <DocPlaceholder @width="120%" @height="40px" @background="#fff8d2">
      Extra content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
