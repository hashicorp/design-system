import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIconTile } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIconTile @color="waypoint" @icon="user" />
</template>;

export default LocalComponent;
