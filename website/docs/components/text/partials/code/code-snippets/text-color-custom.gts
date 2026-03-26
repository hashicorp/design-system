import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody @tag="p" @color="#FF0000">This text has a "#FF0000" (red) color
    applied</HdsTextBody>
</template>;

export default LocalComponent;
