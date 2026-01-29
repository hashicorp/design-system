import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="16" class="doc-flex-outlined-container">
    <DocPlaceholder @width="100%" @height="auto" @background="#d2f4ff">
      Some content that wants to occupy all the available space
    </DocPlaceholder>
    <button type="button">A simple button</button>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
