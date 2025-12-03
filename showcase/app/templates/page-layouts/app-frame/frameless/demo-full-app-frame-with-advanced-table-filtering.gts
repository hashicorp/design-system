import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';

const PageLayoutsAppFrameFramelessDemoFullAppFrameWithAdvancedTableFiltering: TemplateOnlyComponent =
  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <MockApp>
      <:main as |M|>
        <M.PageHeader />
        <M.GenericAdvancedTableFiltering />
      </:main>
    </MockApp>
  </template>;

export default PageLayoutsAppFrameFramelessDemoFullAppFrameWithAdvancedTableFiltering;
