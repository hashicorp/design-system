import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsLinkStandalone } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsLinkStandalone
    @icon="collections"
    @text="Go to the index page"
    @route="my.page.route"
    @model="my.page.model"
  />
</template>;

export default LocalComponent;
