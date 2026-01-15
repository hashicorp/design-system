import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';
import MockAppMainGenericAdvancedTableFiltering from 'showcase/components/mock/app/main/generic-advanced-table-filtering';

const PageComponentsAdvancedTableFramelessDemoFiltering: TemplateOnlyComponent =
  <template>
    {{pageTitle "AdvancedTable Component - Filtering"}}

    <MockApp>
      <:main as |M|>
        <M.PageHeader />
        <MockAppMainGenericAdvancedTableFiltering />
      </:main>
    </MockApp>
  </template>;

export default PageComponentsAdvancedTableFramelessDemoFiltering;
