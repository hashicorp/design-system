import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsForm } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm @tag="div">
    This “form” is actually just a div.
  </HdsForm>
</template>;

export default LocalComponent;
