import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsInteractive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsInteractive>
    your content here (will be yielded)
  </HdsInteractive>
</template>;

export default LocalComponent;
