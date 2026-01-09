import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';
import SubSectionWidthManagement from '../../../../components/page-layouts/grid/sub-sections/width-management';

const PageLayoutsAppFrameFramelessDemoFullAppFrameWithGridResponsive: TemplateOnlyComponent =
  <template>
    {{pageTitle "AppFrame with Grid Responsive - Frameless"}}
    <MockApp>
      <:main as |M|>
        <M.PageHeader />
        <SubSectionWidthManagement />
      </:main>
    </MockApp>
  </template>;

export default PageLayoutsAppFrameFramelessDemoFullAppFrameWithGridResponsive;
