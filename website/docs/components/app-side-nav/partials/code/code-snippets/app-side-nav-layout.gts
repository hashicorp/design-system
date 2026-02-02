import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsAppSideNav } from '@hashicorp/design-system-components/components';
import DocPlaceholder from 'website/components/doc/placeholder';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsAppSideNav>
    <DocPlaceholder
      @height="500px"
      @text="&lt;:body /&gt;"
      @background="#e4e4e4"
    />
  </HdsAppSideNav>
</template>;

export default LocalComponent;
