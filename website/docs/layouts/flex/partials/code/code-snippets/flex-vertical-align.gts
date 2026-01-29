import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @align="center" @gap="8">
    <DocPlaceholder @width="100px" @height="100px" @background="#d2f4ff">
      Some content
    </DocPlaceholder>
    <DocPlaceholder @width="200px" @height="40px" @background="#fff8d2">
      Other content
    </DocPlaceholder>
    <DocPlaceholder @width="300" @height="20px" @background="#e4c5f3">
      More content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
