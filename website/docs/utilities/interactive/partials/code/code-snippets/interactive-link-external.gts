import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsInteractive } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsInteractive @route="components" @isRouteExternal={{true}}>
    your content here
  </HdsInteractive>
</template>;

export default LocalComponent;
