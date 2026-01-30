import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid @columnMinWidth="50%" @gap={{array "16" "48"}}>
    <DocPlaceholder @height="40px" @text="Item 1" @background="#e4c5f3" />
    <DocPlaceholder @height="40px" @text="Item 2" @background="#e5ffd2" />
    <DocPlaceholder @height="40px" @text="Item 3" @background="#d2f4ff" />
    <DocPlaceholder @height="40px" @text="Item 4" @background="#fff8d2" />
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
