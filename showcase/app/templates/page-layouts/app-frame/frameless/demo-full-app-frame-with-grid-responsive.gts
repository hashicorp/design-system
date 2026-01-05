import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import { hash } from '@ember/helper';

import MockApp from 'showcase/components/mock/app';
import CodeFragmentWithPlaceholderItems from '../../../../components/page-layouts/grid/code-fragments/with-placeholder-items';

const PageLayoutsAppFrameFramelessDemoFullAppFrameWithGridResponsive: TemplateOnlyComponent =
  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <MockApp>
      <:main as |M|>
        <M.PageHeader />
        <CodeFragmentWithPlaceholderItems
          @columnCount={{5}}
          @columnWidth={{hash
            sm="100%"
            md="50%"
            lg="33.33%"
            xl="25%"
            xxl="20%"
          }}
        />
      </:main>
    </MockApp>
  </template>;

export default PageLayoutsAppFrameFramelessDemoFullAppFrameWithGridResponsive;
