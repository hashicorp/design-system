import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { HdsIcon } from '@hashicorp/design-system-components/components';

const MyComponent: TemplateOnlyComponent = <template>
  <HdsIcon @name="info" />
</template>;

export default MyComponent;
