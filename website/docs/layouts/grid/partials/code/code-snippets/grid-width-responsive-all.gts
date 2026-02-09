import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLayoutGrid } from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

import { hash } from '@ember/helper';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLayoutGrid
    @columnWidth={{hash sm="100%" md="50%" lg="33.33%" xl="25%" xxl="20%"}}
    @gap="16"
  >
    <DocPlaceholder @height="40px" @text="Item 1" @background="#e4c5f3" />
    <DocPlaceholder @height="40px" @text="Item 2" @background="#e5ffd2" />
    <DocPlaceholder @height="40px" @text="Item 3" @background="#d2f4ff" />
    <DocPlaceholder @height="40px" @text="Item 4" @background="#fff8d2" />
    <DocPlaceholder @height="40px" @text="Item 5" @background="#f3d9c5" />
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
