import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';

const PageComponentsAppSideNavFramelessDemoRemoveFromDom: TemplateOnlyComponent =
  <template>
    {{pageTitle "App SideNav remove from DOM demo - Frameless"}}

    <MockApp>
      <:sidebar as |S|>
        <S.SideNav
          @showDevToggle={{true}}
          @shouldRemoveFromDomOnCollapse={{true}}
        />
      </:sidebar>
      <:main as |M|>
        <M.PageHeader @showActionButton={{true}} />
        <M.GenericTextContent />
        <M.GenericTextContent />
        <M.GenericTextContent />
        <M.GenericTextContent />
      </:main>
    </MockApp>
  </template>;

export default PageComponentsAppSideNavFramelessDemoRemoveFromDom;
