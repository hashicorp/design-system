import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="16" class="doc-flex-outlined-container">
    <DocPlaceholder @width="auto" @height="80px" @background="#d2f4ff">
      Some content that is taller than the sibling item
    </DocPlaceholder>
    <button type="button" class="doc-flex-margin-left-auto">
      A simple button
    </button>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
