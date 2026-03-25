import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIconTile } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIconTile @icon="user" />
  <br />
  <HdsIconTile @logo="vault" />
</template>;

export default LocalComponent;
