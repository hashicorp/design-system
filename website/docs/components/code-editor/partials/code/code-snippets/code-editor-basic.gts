import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsCodeEditor @ariaLabel="Basic usage" />
</template>;

export default LocalComponent;
