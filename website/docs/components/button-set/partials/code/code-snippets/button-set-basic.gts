import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsButtonSet>
    <HdsButton @text="Submit" type="submit" />
    <HdsButton
      @text="Cancel"
      @color="secondary"
      @href="https://hashicorp.com"
    />
  </HdsButtonSet>
</template>;

export default LocalComponent;
