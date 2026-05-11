/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import MockApp from 'showcase/components/mock/app';

const PageLayoutsAppFrameFramelessDemoFullAppFrameWithAppHeaderAndAppSideNav: TemplateOnlyComponent =
  <template>
    {{pageTitle "AppFrame Component - Frameless"}}

    <MockApp>
      <:sidebar as |S|>
        <S.AppSideNav @showDevToggle={{true}} />
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

export default PageLayoutsAppFrameFramelessDemoFullAppFrameWithAppHeaderAndAppSideNav;
