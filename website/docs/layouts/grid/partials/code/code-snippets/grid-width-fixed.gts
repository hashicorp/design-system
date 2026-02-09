import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsLayoutGrid,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextDisplay>With 4 items</HdsTextDisplay>
  <HdsLayoutGrid @columnWidth="33.33%" @gap="16">
    <DocPlaceholder @height="40px" @text="Item 1" @background="#e4c5f3" />
    <DocPlaceholder @height="40px" @text="Item 2" @background="#e5ffd2" />
    <DocPlaceholder @height="40px" @text="Item 3" @background="#d2f4ff" />
    <DocPlaceholder @height="40px" @text="Item 4" @background="#fff8d2" />
  </HdsLayoutGrid>

  <hr class="doc-code-group-hr" />

  <HdsTextDisplay>With 2 items</HdsTextDisplay>
  <HdsLayoutGrid @columnWidth="33.33%" @gap="16">
    <DocPlaceholder @height="40px" @text="Item 1" @background="#e4c5f3" />
    <DocPlaceholder @height="40px" @text="Item 2" @background="#e5ffd2" />
  </HdsLayoutGrid>

  <hr class="doc-code-group-hr" />

  <HdsTextDisplay>With 1 item</HdsTextDisplay>
  <HdsLayoutGrid @columnWidth="33.33%" @gap="16">
    <DocPlaceholder @height="40px" @text="Item 1" @background="#e4c5f3" />
  </HdsLayoutGrid>
</template>;

export default LocalComponent;
