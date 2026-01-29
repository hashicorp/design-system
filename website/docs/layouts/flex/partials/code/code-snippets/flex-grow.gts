import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutFlex @gap="16" class="doc-flex-outlined-container" as |LF|>
    <DocPlaceholder @width="auto" @height="40px" @background="#d2f4ff">
      Some content
    </DocPlaceholder>
    <LF.Item @grow={{true}}>
      <DocPlaceholder @height="40px" @background="#e5ffd2">
        This content occupies as much space as possible
      </DocPlaceholder>
    </LF.Item>
    <DocPlaceholder @width="auto" @height="40px" @background="#d2f4ff">
      Extra content
    </DocPlaceholder>
  </HdsLayoutFlex>
</template>;

export default LocalComponent;
