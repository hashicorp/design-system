import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsInteractive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsInteractive @href="#your-local-anchor-id" @isHrefExternal={{false}}>
    your content here
  </HdsInteractive>
</template>;

export default LocalComponent;
