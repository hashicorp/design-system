import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const TokenAsComponentArgument: TemplateOnlyComponent = <template>
  <HdsIcon
    @name="alert-circle"
    @color="var(--token-color-foreground-success)"
  />
</template>;

export default TokenAsComponentArgument;
