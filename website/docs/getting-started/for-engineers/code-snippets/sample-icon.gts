import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsIcon } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="info" />
</template>;

export default LocalComponent;
