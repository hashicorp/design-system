import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <div class="doc-icon-demo--constrain-max-width">
    <HdsIcon @name="zap" @size="24" @stretched={{true}} />
  </div>
</template>;

export default LocalComponent;
