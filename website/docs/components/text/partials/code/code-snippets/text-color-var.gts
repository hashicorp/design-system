import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsTextBody @tag="p" @color="var(--token-color-palette-blue-400)">This text
    has a "blue-400" color applied</HdsTextBody>
</template>;

export default LocalComponent;
