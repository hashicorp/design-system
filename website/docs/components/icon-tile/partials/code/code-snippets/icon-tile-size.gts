import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsIconTile } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsIconTile @logo="boundary" @size="small" />
  <br />
  <HdsIconTile @logo="packer" @size="large" />
</template>;

export default LocalComponent;
