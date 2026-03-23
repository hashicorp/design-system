import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="zap" @color="rebeccapurple" @isInline={{true}} />
  <HdsIcon @name="zap" @color="rgb(46, 113, 229)" @isInline={{true}} />
</template>;

export default LocalComponent;
