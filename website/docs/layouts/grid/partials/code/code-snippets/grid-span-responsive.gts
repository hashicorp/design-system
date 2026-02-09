import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

import { hash } from '@ember/helper';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid @columnWidth={{hash sm="100%" md="33.33%"}} @gap="12" as |LG|>
    <LG.Item @colspan={{hash sm=1 md=2}}>
      <DocPlaceholder @height="40px" @text="Item 1" @background="#e4c5f3" />
    </LG.Item>

    <DocPlaceholder @height="40px" @text="Item 2" @background="#e5ffd2" />

    <DocPlaceholder @height="40px" @text="Item 3" @background="#d2f4ff" />

    <LG.Item @colspan={{hash sm=1 md=2}}>
      <DocPlaceholder @height="40px" @text="Item 4" @background="#fff8d2" />
    </LG.Item>
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
